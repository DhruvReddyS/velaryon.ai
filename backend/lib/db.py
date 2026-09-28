"""Shared Mongo handle — call `get_db()` from request handlers.

The Motor client is created lazily and cached per running event loop. That keeps
long-running servers (uvicorn, Render) on one pooled client while staying correct
on serverless runtimes (Vercel), where a request may run on a fresh event loop and
a module-level client would fail with "attached to a different loop".
"""

import asyncio
import logging
import os
import weakref
from pathlib import Path

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import DESCENDING, IndexModel

load_dotenv(Path(__file__).parent.parent / ".env")

logger = logging.getLogger(__name__)

# Keyed weakly by the loop object itself: an id() can be reused by a new loop after GC.
_clients: "weakref.WeakKeyDictionary[asyncio.AbstractEventLoop, AsyncIOMotorClient]" = weakref.WeakKeyDictionary()


def get_client() -> AsyncIOMotorClient:
    loop = asyncio.get_running_loop()
    client = _clients.get(loop)
    if client is None:
        client = AsyncIOMotorClient(os.environ["MONGO_URL"], serverSelectionTimeoutMS=8000)
        _clients[loop] = client
    return client


def get_db() -> AsyncIOMotorDatabase:
    return get_client()[os.environ.get("DB_NAME", "velaryon")]


def close_clients() -> None:
    for client in list(_clients.values()):
        client.close()
    _clients.clear()


# One entry per collection: every field a route filters, sorts, or dedupes on. Applied by ensure_indexes() at startup.
INDEXES: dict[str, list[IndexModel]] = {
    "enquiries": [IndexModel([("created_at", DESCENDING)], name="created_at_desc")],
}


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:  # one at a time so a bad spec skips only itself
            try:
                await get_db()[collection].create_indexes([model])
            except Exception as exc:  # never block boot on an index; the log line names what to fix
                logger.error("ensure_indexes(%s.%s): %s", collection, model.document["name"], exc)

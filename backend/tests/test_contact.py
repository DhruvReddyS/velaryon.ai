"""Backend tests for Velaryon contact endpoints (/api/contact)."""
import uuid


def test_root(client):
    r = client.get("/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "active"


def test_contact_create_and_persist(client):
    unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
    payload = {
        "name": "TEST User",
        "email": unique_email,
        "organization": "TEST Org",
        "interest": "platforms",
        "message": "TEST message from backend_test",
    }
    r = client.post("/contact", json=payload)
    assert r.status_code == 200, r.text
    created = r.json()
    assert created["email"] == unique_email
    assert created["name"] == payload["name"]
    assert created["interest"] == payload["interest"]
    assert "id" in created and isinstance(created["id"], str)
    assert "_id" not in created

    # Verify persistence via GET
    r2 = client.get("/contact")
    assert r2.status_code == 200
    items = r2.json()
    assert any(x["email"] == unique_email for x in items)
    # Ensure no mongo _id leaks
    for x in items:
        assert "_id" not in x


def test_contact_invalid_email_returns_422(client):
    r = client.post(
        "/contact",
        json={
            "name": "TEST Bad",
            "email": "not-an-email",
            "interest": "platforms",
            "message": "bad email test",
        },
    )
    assert r.status_code == 422


def test_contact_missing_fields_returns_422(client):
    r = client.post("/contact", json={"email": "a@b.com"})
    assert r.status_code == 422

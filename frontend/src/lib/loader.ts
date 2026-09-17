import { createContext, useContext } from "react";

export const LoaderContext = createContext(true);
export const useLoaded = () => useContext(LoaderContext);

export function scrollToId(id: string) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string, o?: object) => void } }).__lenis;
  if (lenis) {
    lenis.scrollTo(`#${id}`, { duration: 1.6 });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

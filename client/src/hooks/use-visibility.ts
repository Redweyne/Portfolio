import { useEffect, useMemo, useRef, useState } from "react";

export function useVisibilityObserver<T extends Element>(options?: IntersectionObserverInit) {
  const targetRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const observerOptions = useMemo(() => options, [options]);

  useEffect(() => {
    const node = targetRef.current;

    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, observerOptions);

    observer.observe(node);

    return () => observer.disconnect();
  }, [observerOptions]);

  return { ref: targetRef, isVisible } as const;
}

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    setPrefersReducedMotion(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

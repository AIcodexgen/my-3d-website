import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { threshold = 0.15, triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Batch state update inside rAF so React re-renders (and resulting
        // DOM class changes) are aligned with the browser's paint tick -
        // prevents synchronous layout thrash during scroll callbacks.
        requestAnimationFrame(() => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setInView(true);
            if (triggerOnce) observer.disconnect();
          } else if (!triggerOnce) {
            setInView(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, inView };
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { useStore } from "./StoreProvider";

let lenis: Lenis | null = null;

/**
 * One motion system for the whole site:
 *  - Lenis smooth scrolling (disabled under prefers-reduced-motion)
 *  - IntersectionObserver reveals for any element with [data-reveal]
 *  - restrained parallax for [data-parallax] containers
 * All effects use transform/opacity only.
 */
export function MotionProvider() {
  const pathname = usePathname();
  const { panel } = useStore();

  // Smooth scrolling + parallax
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    lenis = new Lenis({ duration: 1.1, smoothWheel: true, easing: (t) => 1 - Math.pow(1 - t, 3) });
    let frame = 0;
    const raf = (time: number) => {
      lenis?.raf(time);
      parallax();
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Pause page scrolling while a drawer or panel is open
  useEffect(() => {
    if (panel) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
  }, [panel]);

  // Reveal on scroll — re-scans after each navigation and DOM change
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    const scan = () =>
      document.querySelectorAll("[data-reveal]:not(.is-visible):not([data-observed])").forEach((el) => {
        el.setAttribute("data-observed", "");
        io.observe(el);
      });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  // Start each new page at the top (back/forward keeps the browser's restoration)
  useEffect(() => {
    lenis?.resize();
  }, [pathname]);

  return null;
}

function parallax() {
  const vh = window.innerHeight;
  document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
    const inner = el.querySelector<HTMLElement>("[data-parallax-inner]");
    if (!inner) return;
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const progress = (r.top + r.height / 2 - vh / 2) / (vh + r.height); // -0.5 … 0.5
    const strength = Number(el.dataset.parallax) || 0.06;
    inner.style.transform = `translate3d(0, ${(progress * strength * 100).toFixed(2)}%, 0)`;
  });
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

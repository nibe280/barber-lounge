"use client";
import { useEffect } from "react";

/**
 * useGsapAnimations
 * Gère les animations au scroll via IntersectionObserver + CSS.
 * Injecte automatiquement les styles nécessaires dans le <head>.
 */
export function useGsapAnimations() {
  useEffect(() => {
    // ── Injection des styles CSS ──────────────────────────
    const styleId = "scroll-reveal-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }
        .reveal.from-left {
          transform: translateX(-32px);
        }
        .reveal.from-right {
          transform: translateX(32px);
        }
        .reveal.scale-in {
          transform: scale(0.92);
        }
        .reveal.visible {
          opacity: 1;
          transform: none;
        }
        /* Délais de stagger */
        .reveal.d-100 { transition-delay: 0.1s; }
        .reveal.d-200 { transition-delay: 0.2s; }
        .reveal.d-300 { transition-delay: 0.3s; }
        .reveal.d-400 { transition-delay: 0.4s; }
        .reveal.d-500 { transition-delay: 0.5s; }
        .reveal.d-600 { transition-delay: 0.6s; }
      `;
      document.head.appendChild(style);
    }

    // ── IntersectionObserver ──────────────────────────────
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // one-shot
          }
        });
      },
      {
        rootMargin: "0px 0px -60px 0px", // déclenche 60px avant d'entrer
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
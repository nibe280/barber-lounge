"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── HERO : texte apparaît de bas en haut ──
      gsap.fromTo(".hero-title", 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(".hero-sub",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.7 }
      );
      gsap.fromTo(".hero-btn",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1 }
      );

      // ── ABOUT : slide depuis la gauche/droite ──
      gsap.fromTo(".about-image",
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".about-image", start: "top 80%" }
        }
      );
      gsap.fromTo(".about-content",
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".about-content", start: "top 80%" }
        }
      );

      // ── FEATURES : cascade ──
      gsap.fromTo(".feature-item",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ".feature-item", start: "top 85%" }
        }
      );

      // ── SERVICES : cascade ──
      gsap.fromTo(".service-card",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: { trigger: ".service-card", start: "top 85%" }
        }
      );

      // ── RÉALISATIONS : fade in ──
      gsap.fromTo(".realisation-photo",
        { scale: 0.92, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.8, ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".realisation-photo", start: "top 85%" }
        }
      );

      // ── BARBERS : cascade ──
      gsap.fromTo(".barber-card",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: { trigger: ".barber-card", start: "top 85%" }
        }
      );

      // ── CONTACT : fade ──
      gsap.fromTo(".contact-section",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: ".contact-section", start: "top 80%" }
        }
      );

      // ── CTA : zoom léger ──
      gsap.fromTo(".cta-section",
        { scale: 0.96, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: ".cta-section", start: "top 85%" }
        }
      );

    });

    return () => ctx.revert();
  }, []);
}
'use client';

import { useEffect } from 'react';

/**
 * CursorGlow — à ajouter dans layout.tsx
 * Ajoute un halo doré subtil qui suit le curseur.
 */
export default function CursorGlow() {
  useEffect(() => {
    const glow = document.querySelector<HTMLElement>('.cursor-glow');
    if (!glow) return;

    let raf: number;
    let cx = 0, cy = 0;
    let tx = 0, ty = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const animate = () => {
      // Lerp smooth (coller au curseur progressivement)
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      glow.style.left = cx + 'px';
      glow.style.top  = cy + 'px';
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className="cursor-glow"
      style={{
        position: 'fixed',
        width: 400,
        height: 400,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        transition: 'opacity 300ms ease',
      }}
    />
  );
}
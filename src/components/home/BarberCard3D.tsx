"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./BarberCard3D.module.css";

interface Props {
  nom: string;
  specialite: string;
  experience: string;
  styleBarber: string;
  color?: string;
}

export default function BarberCard3D({ nom, specialite, experience, styleBarber, color = "#e8d44d" }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const W = mountRef.current.clientWidth;
    const H = mountRef.current.clientHeight;

    // ── SCENE ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 1.2, 5);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const colorHex = new THREE.Color(color);

    // ── MATÉRIAUX ──
    const wireMat = new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true, transparent: true, opacity: 0.6 });
    const solidMat = new THREE.MeshPhongMaterial({ color: 0x111110, transparent: true, opacity: 0.85 });
    const glowMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.15 });

    // ── PERSONNAGE ──
    const group = new THREE.Group();

    const makePart = (geo: THREE.BufferGeometry, y: number, scale = 1) => {
      const solid = new THREE.Mesh(geo, solidMat);
      const wire = new THREE.Mesh(geo, wireMat);
      const glow = new THREE.Mesh(geo, glowMat);
      glow.scale.setScalar(1.08);
      solid.position.y = y;
      wire.position.y = y;
      glow.position.y = y;
      solid.scale.setScalar(scale);
      wire.scale.setScalar(scale);
      glow.scale.setScalar(scale * 1.08);
      group.add(solid, wire, glow);
    };

    // Tête
    makePart(new THREE.IcosahedronGeometry(0.42, 1), 2.85);
    // Cou
    makePart(new THREE.CylinderGeometry(0.14, 0.16, 0.28, 6), 2.32);
    // Torse
    makePart(new THREE.CylinderGeometry(0.42, 0.36, 0.95, 7), 1.68);
    // Tablier (prisme plat devant)
    const apronGeo = new THREE.BoxGeometry(0.52, 0.72, 0.08);
    const apron = new THREE.Mesh(apronGeo, wireMat);
    apron.position.set(0, 1.55, 0.38);
    group.add(apron);
    // Bras gauche
    makePart(new THREE.CylinderGeometry(0.13, 0.11, 0.72, 5), 1.52, 1);
    const armL = group.children[group.children.length - 3];
    armL.position.set(-0.62, 1.52, 0);
    armL.rotation.z = 0.35;
    // Bras droit
    makePart(new THREE.CylinderGeometry(0.13, 0.11, 0.72, 5), 1.52, 1);
    const armR = group.children[group.children.length - 3];
    armR.position.set(0.62, 1.52, 0);
    armR.rotation.z = -0.55;
    // Avant-bras droit (levé avec ciseaux)
    makePart(new THREE.CylinderGeometry(0.10, 0.09, 0.55, 5), 1.1, 1);
    const forearm = group.children[group.children.length - 3];
    forearm.position.set(0.82, 1.85, 0.1);
    forearm.rotation.z = -1.1;
    // Hanches
    makePart(new THREE.CylinderGeometry(0.38, 0.34, 0.42, 7), 0.95);
    // Jambe gauche
    makePart(new THREE.CylinderGeometry(0.16, 0.13, 0.88, 6), 0.35);
    const legL = group.children[group.children.length - 3];
    legL.position.set(-0.2, 0.35, 0);
    // Jambe droite
    makePart(new THREE.CylinderGeometry(0.16, 0.13, 0.88, 6), 0.35);
    const legR = group.children[group.children.length - 3];
    legR.position.set(0.2, 0.35, 0);
    // Pieds
    makePart(new THREE.BoxGeometry(0.22, 0.1, 0.32), -0.12);
    const footL = group.children[group.children.length - 3];
    footL.position.set(-0.2, -0.12, 0.06);
    makePart(new THREE.BoxGeometry(0.22, 0.1, 0.32), -0.12);
    const footR = group.children[group.children.length - 3];
    footR.position.set(0.2, -0.12, 0.06);

    // Ciseaux (outil)
    const scissorGeo = new THREE.BoxGeometry(0.04, 0.45, 0.04);
    const s1 = new THREE.Mesh(scissorGeo, new THREE.MeshBasicMaterial({ color: colorHex }));
    const s2 = new THREE.Mesh(scissorGeo, new THREE.MeshBasicMaterial({ color: colorHex }));
    s1.position.set(1.15, 2.1, 0);
    s1.rotation.z = 0.2;
    s2.position.set(1.22, 2.1, 0);
    s2.rotation.z = -0.2;
    group.add(s1, s2);

    group.position.y = -1.2;
    scene.add(group);

    // ── LUMIÈRES ──
    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(colorHex, 2.5, 8);
    pointLight.position.set(0, 2, 3);
    scene.add(pointLight);
    const backLight = new THREE.PointLight(colorHex, 1, 6);
    backLight.position.set(0, 1, -3);
    scene.add(backLight);

    // ── HALO DERRIÈRE ──
    const haloGeo = new THREE.CircleGeometry(1.4, 32);
    const haloMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.06, side: THREE.DoubleSide });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.set(0, 1.4, -0.5);
    scene.add(halo);

    // ── PARTICULES ──
    const particleCount = 60;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = Math.random() * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: colorHex, size: 0.06, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── ANIMATION ──
    let frameId: number;
    let t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.012;
      group.rotation.y = Math.sin(t * 0.4) * 0.25;
      group.position.y = -1.2 + Math.sin(t * 0.6) * 0.06;
      particles.rotation.y += 0.003;
      pointLight.intensity = 2.2 + Math.sin(t * 2) * 0.4;
      renderer.render(scene, camera);
    };
    animate();

    // ── INTERACTION SOURIS ──
    const handleMouse = (e: MouseEvent) => {
      const rect = mountRef.current!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / W - 0.5) * 2;
      const y = -((e.clientY - rect.top) / H - 0.5) * 2;
      group.rotation.y = x * 0.4;
      group.rotation.x = y * 0.1;
    };
    mountRef.current.addEventListener("mousemove", handleMouse);

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeEventListener("mousemove", handleMouse);
        if (renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, [color]);

  return (
    <div className={styles.card}>
      <div ref={mountRef} className={styles.canvas} />
      <div className={styles.info}>
        <div className={styles.nom}>{nom}</div>
        <div className={styles.specialite} style={{ color }}>{specialite}</div>
        <div className={styles.details}>
          <span>{experience}</span>
          <span className={styles.dot}>·</span>
          <span>{styleBarber}</span>
        </div>
      </div>
    </div>
  );
}
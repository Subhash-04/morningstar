import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/AnimatedBackground.css';

const AnimatedBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 1.5, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 1.5, 100);
    pointLight2.position.set(-20, -20, 20);
    scene.add(pointLight2);



    // Create particles
    const particleCount = 800;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const color = new THREE.Color();
      const hue = Math.random() > 0.5 ? 0.55 + Math.random() * 0.08 : 0.48 + Math.random() * 0.08;
      color.setHSL(hue, 0.85, 0.65);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Create wave grid
    const gridGroup = new THREE.Group();
    const gridSize = 15;
    const gridSpacing = 2;
    const gridPoints: THREE.Mesh[][] = [];

    for (let x = 0; x < gridSize; x++) {
      gridPoints[x] = [];
      for (let z = 0; z < gridSize; z++) {
        const pointGeometry = new THREE.SphereGeometry(0.1, 8, 8);
        const pointMaterial = new THREE.MeshStandardMaterial({
          color: 0x60a5fa,
          transparent: true,
          opacity: 0.6
        });

        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        point.position.set(
          (x - gridSize / 2) * gridSpacing,
          -15,
          (z - gridSize / 2) * gridSpacing
        );
        point.userData = { baseY: -15, x, z };

        gridGroup.add(point);
        gridPoints[x][z] = point;
      }
    }
    scene.add(gridGroup);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      // Animate particles
      particles.rotation.y += 0.0003;

      // Animate wave grid
      gridPoints.forEach((row) => {
        row.forEach((point) => {
          const distance = Math.sqrt(
            Math.pow(point.userData.x - gridSize / 2, 2) +
            Math.pow(point.userData.z - gridSize / 2, 2)
          );
          point.position.y = point.userData.baseY +
            Math.sin(distance * 0.3 - time * 2) * 1.5 +
            Math.cos(point.userData.x * 0.2 + time) * 0.5;
        });
      });

      // Camera movement
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Animate lights
      pointLight1.position.x = Math.sin(time * 0.3) * 25;
      pointLight1.position.z = Math.cos(time * 0.3) * 25;
      pointLight2.position.x = Math.cos(time * 0.4) * 25;
      pointLight2.position.z = Math.sin(time * 0.4) * 25;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (frameRef.current) cancelAnimationFrame(frameRef.current);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });

      particleGeometry.dispose();
      particleMaterial.dispose();

      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="three-background" />;
};

export default AnimatedBackground;

'use client';

import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

type DogState = 'idle' | 'looking' | 'barking' | 'playing_dead';

const IDLE_CLIPS = [
  'Arm_JRTerrierIdle_1',
  'Arm_JRTerrierIdle_2',
  'Arm_JRTerrierSitting_loop_1',
];
const BARK_CLIP = 'Arm_JRTerrierBark';
const LIE_START = 'Arm_JRTerrierLie_belly_start';
const LIE_LOOP = 'Arm_JRTerrierLie_belly_loop_1';
const LIE_END = 'Arm_JRTerrierLie_belly_end';

const BARK_COOLDOWN = 3000;
const VELOCITY_THRESHOLD = 40;
const IDLE_SWAP_MIN = 5000;
const IDLE_SWAP_MAX = 10000;
const IDLE_VARIANT_DURATION_MIN = 3000;
const IDLE_VARIANT_DURATION_MAX = 5000;

export function DogScene({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const mouseVelRef = useRef(0);
  const prevMouseRef = useRef({ x: 0, y: 0, time: Date.now() });
  const stateRef = useRef<DogState>('idle');
  const lastBarkRef = useRef(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const setupScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      35,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.45, 1.9);
    camera.lookAt(0, 0.2, 0);

    // Scene & Lights
    const scene = new THREE.Scene();
    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);
    const directional = new THREE.DirectionalLight(0xffffff, 1.2);
    directional.position.set(3, 5, 4);
    scene.add(directional);
    const fillLight = new THREE.DirectionalLight(0xfff5e6, 0.6);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 3, -4);
    scene.add(rimLight);

    // Animation state
    let mixer: THREE.AnimationMixer | null = null;
    let currentAction: THREE.AnimationAction | null = null;
    const actionsMap = new Map<string, THREE.AnimationAction>();
    let model: THREE.Group | null = null;
    let targetRotationY = 0;
    let animationId = 0;
    let idleTimerId: ReturnType<typeof setTimeout> | null = null;
    let variantTimerId: ReturnType<typeof setTimeout> | null = null;
    let disposed = false;

    // Hover state
    let isHoveringDog = false;

    function crossFadeTo(clipName: string, duration = 0.3, loop = true) {
      const next = actionsMap.get(clipName);
      if (!next || !currentAction) return;
      next.reset();
      next.setEffectiveWeight(1);
      next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
      next.clampWhenFinished = !loop;
      currentAction.crossFadeTo(next, duration, true);
      next.play();
      currentAction = next;
    }

    function scheduleIdleVariant() {
      if (disposed) return;
      const delay = IDLE_SWAP_MIN + Math.random() * (IDLE_SWAP_MAX - IDLE_SWAP_MIN);
      idleTimerId = setTimeout(() => {
        if (stateRef.current !== 'idle' && stateRef.current !== 'looking') return;
        const variants = IDLE_CLIPS.slice(1);
        const pick = variants[Math.floor(Math.random() * variants.length)];
        crossFadeTo(pick);
        const variantDuration =
          IDLE_VARIANT_DURATION_MIN +
          Math.random() * (IDLE_VARIANT_DURATION_MAX - IDLE_VARIANT_DURATION_MIN);
        variantTimerId = setTimeout(() => {
          if (stateRef.current === 'idle' || stateRef.current === 'looking') {
            crossFadeTo(IDLE_CLIPS[0]);
          }
          scheduleIdleVariant();
        }, variantDuration);
      }, delay);
    }

    function returnToIdle() {
      stateRef.current = 'idle';
      crossFadeTo(IDLE_CLIPS[0]);
      scheduleIdleVariant();
    }

    // Load model
    const loader = new GLTFLoader();
    loader.load('/jrterrier.glb', (gltf) => {
      if (disposed) return;

      model = gltf.scene;
      model.scale.setScalar(1.3);
      model.position.set(0, -0.15, 0);
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);

      // Build actions map
      for (const clip of gltf.animations) {
        const action = mixer.clipAction(clip);
        actionsMap.set(clip.name, action);
      }

      // Start with idle
      const idleAction = actionsMap.get(IDLE_CLIPS[0]);
      if (idleAction) {
        idleAction.play();
        currentAction = idleAction;
      }

      // Listen for animation finish events
      mixer.addEventListener('finished', (e: { action: THREE.AnimationAction }) => {
        const finishedClip = e.action.getClip().name;
        if (finishedClip === BARK_CLIP) {
          returnToIdle();
        }
        if (finishedClip === LIE_START) {
          crossFadeTo(LIE_LOOP, 0.2);
        }
        if (finishedClip === LIE_END) {
          returnToIdle();
        }
      });

      scheduleIdleVariant();
    }, undefined, (error) => {
      console.error('Failed to load dog model:', error);
    });

    // Mouse tracking — listens on window for cursor-following
    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      const dt = Math.max(now - prevMouseRef.current.time, 1);
      const vel = Math.sqrt(dx * dx + dy * dy) / dt * 16;

      mouseVelRef.current = vel;
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      prevMouseRef.current = { x: e.clientX, y: e.clientY, time: now };

      if (stateRef.current === 'idle') {
        stateRef.current = 'looking';
      }

      // Bark on fast mouse movement
      if (
        vel > VELOCITY_THRESHOLD &&
        now - lastBarkRef.current > BARK_COOLDOWN &&
        stateRef.current !== 'playing_dead' &&
        stateRef.current !== 'barking'
      ) {
        stateRef.current = 'barking';
        lastBarkRef.current = now;
        if (idleTimerId) clearTimeout(idleTimerId);
        if (variantTimerId) clearTimeout(variantTimerId);
        crossFadeTo(BARK_CLIP, 0.2, false);
      }

      // Check if mouse is within the dog container
      const rect = container.getBoundingClientRect();
      const inContainer = e.clientX >= rect.left && e.clientX <= rect.right &&
                          e.clientY >= rect.top && e.clientY <= rect.bottom;
      const wasHovering = isHoveringDog;
      isHoveringDog = inContainer;

      // Enter hover → play dead
      if (isHoveringDog && !wasHovering && stateRef.current !== 'barking' && stateRef.current !== 'playing_dead') {
        stateRef.current = 'playing_dead';
        if (idleTimerId) clearTimeout(idleTimerId);
        if (variantTimerId) clearTimeout(variantTimerId);
        crossFadeTo(LIE_START, 0.3, false);
      }

      // Leave hover → get up
      if (!isHoveringDog && wasHovering && stateRef.current === 'playing_dead') {
        crossFadeTo(LIE_END, 0.3, false);
        stateRef.current = 'idle';
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Render loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixer) mixer.update(delta);

      // Model rotation toward cursor
      if (model && (stateRef.current === 'looking' || stateRef.current === 'idle')) {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normalizedX = (mousePosRef.current.x - centerX) / (window.innerWidth / 2);
        const normalizedY = (mousePosRef.current.y - centerY) / (window.innerHeight / 2);
        targetRotationY = normalizedX * 0.8;
        model.rotation.y = THREE.MathUtils.lerp(model.rotation.y, targetRotationY, 0.08);
        // Slight head tilt on vertical mouse movement
        const targetRotationX = normalizedY * 0.15;
        model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, targetRotationX, 0.06);
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    cleanupRef.current = () => {
      disposed = true;
      cancelAnimationFrame(animationId);
      if (idleTimerId) clearTimeout(idleTimerId);
      if (variantTimerId) clearTimeout(variantTimerId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          setupScene();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      cleanupRef.current?.();
    };
  }, [setupScene]);

  return (
    <div className={className} style={{ position: 'relative' }}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}

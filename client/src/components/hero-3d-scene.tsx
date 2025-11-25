import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { Mesh } from 'three';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';

function MorphingShape() {
  const meshRef = useRef<Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = scrollTop / maxScroll;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const mouse = mouseRef.current;
    const scroll = scrollRef.current;
    
    meshRef.current.rotation.x = mouse.y * 0.3 + scroll * Math.PI;
    meshRef.current.rotation.y = mouse.x * 0.3 + time * 0.2;
    
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
  });

  return (
    <Sphere ref={meshRef} args={[2, 128, 128]} scale={1.5}>
      <MeshDistortMaterial
        color="#8b5cf6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#8b5cf6" />
      <MorphingShape />
    </>
  );
}

export function Hero3DScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        className="cursor-pointer"
      >
        <Scene />
      </Canvas>
    </div>
  );
}

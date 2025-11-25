import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Group, Color } from 'three';
import { Sphere, Cylinder, Box, RoundedBox, Cone } from '@react-three/drei';
import * as THREE from 'three';

function RobotHead() {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const leftEyeRef = useRef<Mesh>(null);
  const rightEyeRef = useRef<Mesh>(null);
  const visorGlowRef = useRef<Mesh>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Ultra-smooth mouse tracking
    mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, state.pointer.x, 0.06);
    mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, state.pointer.y, 0.06);
    
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    // Head follows mouse
    if (headRef.current) {
      headRef.current.rotation.y = mx * 0.4;
      headRef.current.rotation.x = -my * 0.3;
    }

    // Eyes track mouse independently
    const eyeTrackRange = 0.12;
    if (leftEyeRef.current) {
      leftEyeRef.current.position.x = -0.25 + mx * eyeTrackRange;
      leftEyeRef.current.position.y = 0.15 + my * eyeTrackRange;
    }
    if (rightEyeRef.current) {
      rightEyeRef.current.position.x = 0.25 + mx * eyeTrackRange;
      rightEyeRef.current.position.y = 0.15 + my * eyeTrackRange;
    }

    // Pulsing glow on eyes and visor
    const glowPulse = 2.5 + Math.sin(time * 2) * 0.5;
    [leftEyeRef, rightEyeRef].forEach(ref => {
      if (ref.current?.material instanceof THREE.MeshStandardMaterial) {
        ref.current.material.emissiveIntensity = glowPulse;
      }
    });

    if (visorGlowRef.current?.material instanceof THREE.MeshStandardMaterial) {
      visorGlowRef.current.material.emissiveIntensity = 0.4 + Math.sin(time * 1.5) * 0.2;
    }

    // Subtle floating
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={1.8}>
      <group ref={headRef}>
        
        {/* HELMET SHELL - Sleek white/silver dome */}
        <Sphere args={[1, 64, 64]} position={[0, 0.1, 0]}>
          <meshStandardMaterial
            color="#e8e8f0"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={2}
          />
        </Sphere>

        {/* Helmet chin guard */}
        <Sphere args={[0.85, 32, 32]} position={[0, -0.35, 0.15]} scale={[1, 0.6, 1]}>
          <meshStandardMaterial
            color="#d0d0e0"
            metalness={0.92}
            roughness={0.12}
          />
        </Sphere>

        {/* DARK VISOR - Main face shield */}
        <Box ref={visorGlowRef} args={[1.4, 0.5, 0.3]} position={[0, 0.1, 0.82]}>
          <meshStandardMaterial
            color="#0a0a1a"
            metalness={0.95}
            roughness={0.05}
            emissive="#0099cc"
            emissiveIntensity={0.3}
          />
        </Box>

        {/* Visor top edge accent */}
        <Cylinder args={[0.75, 0.75, 0.08, 32]} position={[0, 0.38, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#00ccff"
            metalness={1}
            roughness={0}
            emissive="#00ccff"
            emissiveIntensity={0.6}
          />
        </Cylinder>

        {/* Side helmet panels */}
        <Box args={[0.15, 0.9, 0.7]} position={[-0.75, 0, 0.2]}>
          <meshStandardMaterial color="#c0c0d5" metalness={0.9} roughness={0.15} />
        </Box>
        <Box args={[0.15, 0.9, 0.7]} position={[0.75, 0, 0.2]}>
          <meshStandardMaterial color="#c0c0d5" metalness={0.9} roughness={0.15} />
        </Box>

        {/* Cyan accent strips on sides */}
        <Box args={[0.08, 0.6, 0.05]} position={[-0.82, 0.1, 0.5]}>
          <meshStandardMaterial
            color="#00ffff"
            metalness={0.5}
            roughness={0.2}
            emissive="#00ffff"
            emissiveIntensity={1.2}
          />
        </Box>
        <Box args={[0.08, 0.6, 0.05]} position={[0.82, 0.1, 0.5]}>
          <meshStandardMaterial
            color="#00ffff"
            metalness={0.5}
            roughness={0.2}
            emissive="#00ffff"
            emissiveIntensity={1.2}
          />
        </Box>

        {/* LEFT EYE - Glowing cyan orb that tracks mouse */}
        <Sphere ref={leftEyeRef} args={[0.15, 32, 32]} position={[-0.25, 0.15, 0.95]}>
          <meshStandardMaterial
            color="#00ffff"
            metalness={0.3}
            roughness={0.2}
            emissive="#00ffff"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </Sphere>

        {/* Left eye glow halo */}
        <Sphere args={[0.22, 32, 32]} position={[-0.25, 0.15, 0.93]}>
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.8}
            transparent
            opacity={0.3}
            toneMapped={false}
          />
        </Sphere>

        {/* RIGHT EYE - Glowing cyan orb that tracks mouse */}
        <Sphere ref={rightEyeRef} args={[0.15, 32, 32]} position={[0.25, 0.15, 0.95]}>
          <meshStandardMaterial
            color="#00ffff"
            metalness={0.3}
            roughness={0.2}
            emissive="#00ffff"
            emissiveIntensity={3}
            toneMapped={false}
          />
        </Sphere>

        {/* Right eye glow halo */}
        <Sphere args={[0.22, 32, 32]} position={[0.25, 0.15, 0.93]}>
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.8}
            transparent
            opacity={0.3}
            toneMapped={false}
          />
        </Sphere>

        {/* Forehead sensor panel */}
        <Box args={[0.4, 0.12, 0.08]} position={[0, 0.55, 0.75]}>
          <meshStandardMaterial
            color="#001a33"
            metalness={0.9}
            roughness={0.1}
            emissive="#0066cc"
            emissiveIntensity={0.4}
          />
        </Box>

        {/* Small sensor dots */}
        {[-0.12, 0, 0.12].map((x, i) => (
          <Sphere key={i} args={[0.025, 16, 16]} position={[x, 0.55, 0.8]}>
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={2}
            />
          </Sphere>
        ))}

        {/* Neck connector */}
        <Cylinder args={[0.35, 0.4, 0.4, 32]} position={[0, -0.85, 0]}>
          <meshStandardMaterial
            color="#b0b0c0"
            metalness={0.9}
            roughness={0.15}
          />
        </Cylinder>

        {/* Neck glow ring */}
        <Cylinder args={[0.42, 0.42, 0.06, 32]} position={[0, -0.7, 0]}>
          <meshStandardMaterial
            color="#00ccff"
            metalness={1}
            roughness={0}
            emissive="#00ccff"
            emissiveIntensity={1}
          />
        </Cylinder>

      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      {/* Strong ambient for visibility */}
      <ambientLight intensity={0.5} />
      
      {/* Main key light from front-top */}
      <directionalLight position={[3, 6, 8]} intensity={2} color="#ffffff" />
      
      {/* Bright cyan rim light from below to highlight eyes */}
      <pointLight position={[0, -2, 4]} intensity={3} color="#00ffff" distance={12} />
      
      {/* Side fill lights - cyan sci-fi aesthetic */}
      <pointLight position={[-5, 2, 3]} intensity={2} color="#0099ff" distance={15} />
      <pointLight position={[5, 2, 3]} intensity={2} color="#00ccff" distance={15} />
      
      {/* Back rim light for dramatic edge glow */}
      <pointLight position={[0, 1, -4]} intensity={1.5} color="#4a90e2" distance={10} />
      
      {/* Top spotlight for helmet shine */}
      <spotLight
        position={[0, 10, 3]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.4}
        color="#ffffff"
      />
      
      <RobotHead />
    </>
  );
}

export function Hero3DScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 45 }}
        className="cursor-pointer"
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 8, 15]} />
        <Scene />
      </Canvas>
    </div>
  );
}

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Group } from 'three';
import { Sphere, Cylinder, Torus, Box, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function RobotHead() {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const leftPupilRef = useRef<Mesh>(null);
  const rightPupilRef = useRef<Mesh>(null);
  const antennaRef = useRef<Group>(null);
  const scanLineRef = useRef<Mesh>(null);
  
  const currentMouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Smooth mouse tracking with lerp
    currentMouseRef.current.x = THREE.MathUtils.lerp(currentMouseRef.current.x, state.pointer.x, 0.08);
    currentMouseRef.current.y = THREE.MathUtils.lerp(currentMouseRef.current.y, state.pointer.y, 0.08);
    
    const mouse = currentMouseRef.current;

    // Head follows mouse with smooth constraints
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.clamp(mouse.x * 0.35, -0.5, 0.5);
      headRef.current.rotation.x = THREE.MathUtils.clamp(mouse.y * 0.25, -0.35, 0.35);
    }

    // Pupils follow mouse with enhanced range
    const eyeRange = 0.18;
    if (leftPupilRef.current) {
      leftPupilRef.current.position.x = THREE.MathUtils.clamp(mouse.x * eyeRange, -eyeRange, eyeRange);
      leftPupilRef.current.position.y = THREE.MathUtils.clamp(mouse.y * eyeRange, -eyeRange, eyeRange);
    }
    if (rightPupilRef.current) {
      rightPupilRef.current.position.x = THREE.MathUtils.clamp(mouse.x * eyeRange, -eyeRange, eyeRange);
      rightPupilRef.current.position.y = THREE.MathUtils.clamp(mouse.y * eyeRange, -eyeRange, eyeRange);
    }

    // Pulsing eye glow effect
    const glowIntensity = 1.2 + Math.sin(time * 3) * 0.3;
    if (leftPupilRef.current && leftPupilRef.current.material instanceof THREE.MeshStandardMaterial) {
      leftPupilRef.current.material.emissiveIntensity = glowIntensity;
    }
    if (rightPupilRef.current && rightPupilRef.current.material instanceof THREE.MeshStandardMaterial) {
      rightPupilRef.current.material.emissiveIntensity = glowIntensity;
    }

    // Elegant floating animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.6) * 0.15 + Math.sin(time * 1.2) * 0.08;
      groupRef.current.rotation.z = Math.sin(time * 0.4) * 0.03;
    }

    // Antenna subtle movement
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(time * 1.5) * 0.12 + Math.cos(time * 0.8) * 0.08;
    }

    // Animated scan line
    if (scanLineRef.current) {
      scanLineRef.current.position.y = -0.8 + ((time * 0.5) % 2);
      const material = scanLineRef.current.material;
      if (material instanceof THREE.MeshStandardMaterial) {
        material.opacity = 0.3 + Math.sin(time * 4) * 0.2;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={headRef}>
        {/* Main head - premium metallic finish */}
        <Sphere args={[1.3, 64, 64]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.95}
            roughness={0.15}
            emissive="#4a148c"
            emissiveIntensity={0.15}
            envMapIntensity={1.5}
          />
        </Sphere>

        {/* Face panel with brushed metal effect */}
        <RoundedBox args={[1.8, 1.6, 0.15]} position={[0, 0, 0.65]} radius={0.08} smoothness={8}>
          <meshStandardMaterial
            color="#2d2d44"
            metalness={0.9}
            roughness={0.2}
            emissive="#6a1b9a"
            emissiveIntensity={0.1}
          />
        </RoundedBox>

        {/* Top panel accent */}
        <Box args={[1.2, 0.15, 0.8]} position={[0, 0.8, 0.2]}>
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.95}
            roughness={0.1}
            emissive="#7c3aed"
            emissiveIntensity={0.3}
          />
        </Box>

        {/* Chin panel */}
        <Box args={[1, 0.3, 0.6]} position={[0, -0.8, 0.2]}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.2}
          />
        </Box>

        {/* Left eye housing with glow */}
        <group position={[-0.4, 0.2, 0.7]}>
          {/* Eye socket rim */}
          <Torus args={[0.22, 0.04, 16, 32]}>
            <meshStandardMaterial
              color="#8b5cf6"
              metalness={0.95}
              roughness={0.1}
              emissive="#7c3aed"
              emissiveIntensity={0.5}
            />
          </Torus>
          {/* Eye white with subtle glow */}
          <Sphere args={[0.2, 32, 32]}>
            <meshStandardMaterial
              color="#e0e0e0"
              metalness={0.3}
              roughness={0.4}
              emissive="#ffffff"
              emissiveIntensity={0.15}
            />
          </Sphere>
          {/* Iris ring */}
          <Torus args={[0.12, 0.02, 16, 32]} position={[0, 0, 0.15]}>
            <meshStandardMaterial
              color="#00d4ff"
              metalness={0.8}
              roughness={0.2}
              emissive="#00d4ff"
              emissiveIntensity={0.6}
            />
          </Torus>
          {/* Pupil with intense glow */}
          <Sphere ref={leftPupilRef} args={[0.11, 32, 32]} position={[0, 0, 0.12]}>
            <meshStandardMaterial
              color="#00ffff"
              metalness={0.5}
              roughness={0.3}
              emissive="#00ffff"
              emissiveIntensity={1.5}
            />
          </Sphere>
        </group>

        {/* Right eye housing (mirrored) */}
        <group position={[0.4, 0.2, 0.7]}>
          <Torus args={[0.22, 0.04, 16, 32]}>
            <meshStandardMaterial
              color="#8b5cf6"
              metalness={0.95}
              roughness={0.1}
              emissive="#7c3aed"
              emissiveIntensity={0.5}
            />
          </Torus>
          <Sphere args={[0.2, 32, 32]}>
            <meshStandardMaterial
              color="#e0e0e0"
              metalness={0.3}
              roughness={0.4}
              emissive="#ffffff"
              emissiveIntensity={0.15}
            />
          </Sphere>
          <Torus args={[0.12, 0.02, 16, 32]} position={[0, 0, 0.15]}>
            <meshStandardMaterial
              color="#00d4ff"
              metalness={0.8}
              roughness={0.2}
              emissive="#00d4ff"
              emissiveIntensity={0.6}
            />
          </Torus>
          <Sphere ref={rightPupilRef} args={[0.11, 32, 32]} position={[0, 0, 0.12]}>
            <meshStandardMaterial
              color="#00ffff"
              metalness={0.5}
              roughness={0.3}
              emissive="#00ffff"
              emissiveIntensity={1.5}
            />
          </Sphere>
        </group>

        {/* Antenna assembly */}
        <group ref={antennaRef} position={[0, 1.3, 0]}>
          {/* Base mount */}
          <Cylinder args={[0.12, 0.08, 0.15, 16]}>
            <meshStandardMaterial color="#2d2d44" metalness={0.9} roughness={0.2} />
          </Cylinder>
          {/* Antenna rod */}
          <Cylinder args={[0.04, 0.04, 0.6, 16]} position={[0, 0.3, 0]}>
            <meshStandardMaterial
              color="#8b5cf6"
              metalness={0.95}
              roughness={0.05}
              emissive="#7c3aed"
              emissiveIntensity={0.2}
            />
          </Cylinder>
          {/* Antenna tip with intense glow */}
          <Sphere args={[0.1, 32, 32]} position={[0, 0.65, 0]}>
            <meshStandardMaterial
              color="#00ffff"
              metalness={0.5}
              roughness={0.3}
              emissive="#00ffff"
              emissiveIntensity={2}
            />
          </Sphere>
          {/* Antenna glow halo */}
          <Sphere args={[0.15, 32, 32]} position={[0, 0.65, 0]}>
            <meshStandardMaterial
              color="#00ffff"
              metalness={0}
              roughness={1}
              emissive="#00ffff"
              emissiveIntensity={0.5}
              transparent
              opacity={0.3}
            />
          </Sphere>
        </group>

        {/* Side panels with edge lighting */}
        <RoundedBox args={[0.3, 1.2, 0.8]} position={[-0.9, 0, 0]} radius={0.05} smoothness={4}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.2}
            emissive="#7c3aed"
            emissiveIntensity={0.1}
          />
        </RoundedBox>
        <RoundedBox args={[0.3, 1.2, 0.8]} position={[0.9, 0, 0]} radius={0.05} smoothness={4}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.2}
            emissive="#7c3aed"
            emissiveIntensity={0.1}
          />
        </RoundedBox>

        {/* Ear details with glow */}
        <Torus args={[0.18, 0.04, 16, 32]} position={[-1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.95}
            roughness={0.1}
            emissive="#7c3aed"
            emissiveIntensity={0.4}
          />
        </Torus>
        <Torus args={[0.18, 0.04, 16, 32]} position={[1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial
            color="#8b5cf6"
            metalness={0.95}
            roughness={0.1}
            emissive="#7c3aed"
            emissiveIntensity={0.4}
          />
        </Torus>

        {/* Decorative rivets */}
        {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
          <Sphere key={i} args={[0.03, 16, 16]} position={[x, 0.6, 0.72]}>
            <meshStandardMaterial
              color="#8b5cf6"
              metalness={1}
              roughness={0}
              emissive="#7c3aed"
              emissiveIntensity={0.3}
            />
          </Sphere>
        ))}

        {/* Animated scan line effect */}
        <Box ref={scanLineRef} args={[1.8, 0.02, 0.16]} position={[0, 0, 0.66]}>
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={1}
            transparent
            opacity={0.5}
          />
        </Box>
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      {/* Ambient base lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Key light - main illumination */}
      <directionalLight position={[5, 5, 8]} intensity={1.2} color="#ffffff" castShadow />
      
      {/* Purple accent lights from sides */}
      <pointLight position={[-4, 2, 4]} intensity={1.2} color="#8b5cf6" distance={10} decay={2} />
      <pointLight position={[4, 2, 4]} intensity={1.2} color="#7c3aed" distance={10} decay={2} />
      
      {/* Cyan rim light from below */}
      <pointLight position={[0, -3, 3]} intensity={0.8} color="#00d4ff" distance={8} decay={2} />
      
      {/* Top highlight */}
      <spotLight
        position={[0, 8, 2]}
        intensity={0.6}
        angle={0.5}
        penumbra={0.5}
        color="#ffffff"
        castShadow
      />
      
      {/* Atmospheric back lights */}
      <pointLight position={[-3, 0, -2]} intensity={0.4} color="#6a1b9a" distance={6} />
      <pointLight position={[3, 0, -2]} intensity={0.4} color="#4a148c" distance={6} />
      
      <RobotHead />
    </>
  );
}

export function Hero3DScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="cursor-pointer"
      >
        <Scene />
      </Canvas>
    </div>
  );
}

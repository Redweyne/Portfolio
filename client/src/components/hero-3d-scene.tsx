import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Group } from 'three';
import { Sphere, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

function RobotHead() {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const leftPupilRef = useRef<Mesh>(null);
  const rightPupilRef = useRef<Mesh>(null);
  const antennaRef = useRef<Group>(null);
  
  const currentMouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Use state.pointer which tracks across entire canvas
    currentMouseRef.current.x = THREE.MathUtils.lerp(currentMouseRef.current.x, state.pointer.x, 0.1);
    currentMouseRef.current.y = THREE.MathUtils.lerp(currentMouseRef.current.y, state.pointer.y, 0.1);
    
    const mouse = currentMouseRef.current;

    // Head follows mouse with limits
    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.clamp(mouse.x * 0.3, -0.4, 0.4);
      headRef.current.rotation.x = THREE.MathUtils.clamp(mouse.y * 0.2, -0.3, 0.3);
    }

    // Eyes look at mouse
    const eyeRange = 0.15;
    if (leftPupilRef.current) {
      leftPupilRef.current.position.x = THREE.MathUtils.clamp(mouse.x * eyeRange, -eyeRange, eyeRange);
      leftPupilRef.current.position.y = THREE.MathUtils.clamp(mouse.y * eyeRange, -eyeRange, eyeRange);
    }
    if (rightPupilRef.current) {
      rightPupilRef.current.position.x = THREE.MathUtils.clamp(mouse.x * eyeRange, -eyeRange, eyeRange);
      rightPupilRef.current.position.y = THREE.MathUtils.clamp(mouse.y * eyeRange, -eyeRange, eyeRange);
    }

    // Gentle floating animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.8) * 0.2;
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    }

    // Antenna bobbing
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(time * 2) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={headRef}>
        <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#7c3aed"
            metalness={0.6}
            roughness={0.3}
            emissive="#5b21b6"
            emissiveIntensity={0.2}
          />
        </Sphere>

        <Cylinder args={[0.9, 1, 0.3, 32]} position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color="#a78bfa"
            metalness={0.8}
            roughness={0.2}
          />
        </Cylinder>

        <group position={[-0.35, 0.2, 0.7]}>
          <Sphere args={[0.18, 16, 16]}>
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.3}
            />
          </Sphere>
          <Sphere ref={leftPupilRef} args={[0.09, 16, 16]} position={[0, 0, 0.1]}>
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.8}
            />
          </Sphere>
        </group>

        <group position={[0.35, 0.2, 0.7]}>
          <Sphere args={[0.18, 16, 16]}>
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.3}
            />
          </Sphere>
          <Sphere ref={rightPupilRef} args={[0.09, 16, 16]} position={[0, 0, 0.1]}>
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={0.8}
            />
          </Sphere>
        </group>

        <group ref={antennaRef} position={[0, 1.2, 0]}>
          <Cylinder args={[0.03, 0.03, 0.5, 8]}>
            <meshStandardMaterial color="#a78bfa" metalness={0.9} roughness={0.1} />
          </Cylinder>
          <Sphere args={[0.08, 16, 16]} position={[0, 0.3, 0]}>
            <meshStandardMaterial
              color="#06b6d4"
              emissive="#06b6d4"
              emissiveIntensity={1}
            />
          </Sphere>
        </group>

        <Torus args={[0.15, 0.03, 16, 32]} position={[-1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
        </Torus>
        <Torus args={[0.15, 0.03, 16, 32]} position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
        </Torus>
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 2, 3]} intensity={0.6} color="#8b5cf6" />
      <pointLight position={[3, 2, 3]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[0, -2, 2]} intensity={0.3} color="#06b6d4" />
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

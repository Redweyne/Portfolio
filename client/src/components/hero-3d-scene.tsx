import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, Suspense, useEffect } from 'react';
import { Group, Mesh, MeshStandardMaterial } from 'three';
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

function RobotModel() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/src/assets/robot-model.glb');
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof Mesh) {
        const material = child.material as MeshStandardMaterial;
        if (material) {
          material.envMapIntensity = 1.5;
          material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, state.pointer.x, 0.05);
    mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, state.pointer.y, 0.05);
    
    if (groupRef.current) {
      groupRef.current.rotation.y = mousePos.current.x * 0.5;
      groupRef.current.rotation.x = -mousePos.current.y * 0.2;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} scale={2.5} position={[0, -0.5, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#00ccff" emissive="#00ccff" emissiveIntensity={0.5} wireframe />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" castShadow />
      <pointLight position={[-3, 2, 4]} intensity={2} color="#00ccff" distance={15} />
      <pointLight position={[3, 2, 4]} intensity={2} color="#0099ff" distance={15} />
      <pointLight position={[0, -2, 3]} intensity={1.5} color="#00ffff" distance={12} />
      <spotLight
        position={[0, 10, 5]}
        intensity={1}
        angle={0.5}
        penumbra={0.5}
        color="#ffffff"
        castShadow
      />
      
      <Suspense fallback={<LoadingFallback />}>
        <RobotModel />
        <Environment preset="city" />
      </Suspense>
      
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={10}
        blur={2}
        far={4}
      />
    </>
  );
}

export function Hero3DScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 50 }}
        className="cursor-pointer"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        shadows
      >
        <color attach="background" args={['#0a0a0f']} />
        <fog attach="fog" args={['#0a0a0f', 6, 15]} />
        <Scene />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/src/assets/robot-model.glb');

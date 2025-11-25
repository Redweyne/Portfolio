import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  
  const particleCount = 3000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 4 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      const t = Math.random();
      colors[i3] = 0 + t * 0.2;
      colors[i3 + 1] = 0.7 + t * 0.3;
      colors[i3 + 2] = 1;
    }
    
    return [positions, colors];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, state.pointer.x, 0.03);
    mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, state.pointer.y, 0.03);
    
    if (ref.current) {
      ref.current.rotation.y = time * 0.05 + mousePos.current.x * 0.5;
      ref.current.rotation.x = mousePos.current.y * 0.3;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function HolographicRings() {
  const groupRef = useRef<THREE.Group>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  
  const rings = useMemo(() => {
    return [
      { radius: 1.2, tube: 0.015, rotationSpeed: 0.3, color: '#00ffff' },
      { radius: 1.5, tube: 0.01, rotationSpeed: -0.2, color: '#0088ff' },
      { radius: 1.8, tube: 0.008, rotationSpeed: 0.15, color: '#00ccff' },
      { radius: 2.1, tube: 0.012, rotationSpeed: -0.1, color: '#00ffff' },
    ];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, state.pointer.x, 0.04);
    mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, state.pointer.y, 0.04);
    
    if (groupRef.current) {
      groupRef.current.rotation.y = mousePos.current.x * 0.4;
      groupRef.current.rotation.x = mousePos.current.y * 0.3;
      
      groupRef.current.children.forEach((child, i) => {
        child.rotation.z = time * rings[i].rotationSpeed;
        child.rotation.x = Math.sin(time * 0.5 + i) * 0.2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, 0]}>
          <torusGeometry args={[ring.radius, ring.tube, 16, 100]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function CoreOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, state.pointer.x, 0.05);
    mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, state.pointer.y, 0.05);
    
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.2 + mousePos.current.x * 0.5;
      meshRef.current.rotation.x = mousePos.current.y * 0.3;
      const scale = 1 + Math.sin(time * 2) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
    
    if (glowRef.current) {
      const glowScale = 1.3 + Math.sin(time * 1.5) * 0.1;
      glowRef.current.scale.setScalar(glowScale);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#001a33"
          metalness={0.9}
          roughness={0.1}
          emissive="#00ccff"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      
      <pointLight position={[0, 0, 0]} intensity={2} color="#00ffff" distance={8} />
    </group>
  );
}

function FloatingData() {
  const groupRef = useRef<THREE.Group>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  
  const dataPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 0.5;
      const height = (Math.random() - 0.5) * 2;
      points.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number],
        size: 0.02 + Math.random() * 0.03,
        speed: 0.5 + Math.random() * 0.5
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, state.pointer.x, 0.03);
    mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, state.pointer.y, 0.03);
    
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1 + mousePos.current.x * 0.3;
      
      groupRef.current.children.forEach((child, i) => {
        const point = dataPoints[i];
        child.position.y = point.position[1] + Math.sin(time * point.speed + i) * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {dataPoints.map((point, i) => (
        <mesh key={i} position={point.position}>
          <sphereGeometry args={[point.size, 8, 8]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function HexGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, state.pointer.x, 0.04);
    mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, state.pointer.y, 0.04);
    
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2 + mousePos.current.y * 0.1;
      meshRef.current.rotation.z = mousePos.current.x * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2, 6, 6, 1]} />
      <meshBasicMaterial color="#00ccff" transparent opacity={0.1} wireframe />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-5, 3, 5]} intensity={1} color="#00ccff" />
      <pointLight position={[0, -3, 5]} intensity={0.8} color="#0066ff" />
      
      <CoreOrb />
      <HolographicRings />
      <ParticleField />
      <FloatingData />
      <HexGrid />
    </>
  );
}

export function Hero3DScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        className="cursor-pointer"
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <color attach="background" args={['#050510']} />
        <fog attach="fog" args={['#050510', 5, 15]} />
        <Scene />
      </Canvas>
    </div>
  );
}

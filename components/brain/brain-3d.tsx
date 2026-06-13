"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { type BrainRegion, brainRegions } from "@/lib/portfolio-data";

// Per-region colors — all purple-family, distinct but harmonious
const regionColors: Record<BrainRegion, string> = {
  frontal:    "#a78bfa", // violet
  temporal:   "#c084fc", // purple
  parietal:   "#e879f9", // fuchsia
  occipital:  "#818cf8", // indigo
  cerebellum: "#f0abfc", // light pink-purple
  brainstem:  "#7c3aed", // deep violet
};

interface NeuralNodeProps {
  position: [number, number, number];
  region: BrainRegion;
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
}

function NeuralNode({
  position,
  region,
  isActive,
  isHovered,
  onClick,
  onHover,
}: NeuralNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const color = regionColors[region];

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
      meshRef.current.scale.setScalar(isHovered || isActive ? 1.3 + pulse : 1 + pulse * 0.5);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(isHovered || isActive ? 2.5 : 1.8);
    }
  });

  const regionData = brainRegions[region];

  return (
    <group position={position}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>

      {/* Main node */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(false);
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered || isActive ? 2 : 0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Label on hover */}
      {isHovered && (
        <Html position={[0, 0.3, 0]} center distanceFactor={4}>
          <div className="glass-card px-3 py-1.5 rounded-lg whitespace-nowrap">
            <p className="text-xs font-medium text-primary">{regionData.label}</p>
            <p className="text-[10px] text-muted-foreground">{regionData.description}</p>
          </div>
        </Html>
      )}
    </group>
  );
}

interface NeuralConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  isActive: boolean;
  startRegion: BrainRegion;
  endRegion: BrainRegion;
}

function NeuralConnection({ start, end, isActive, startRegion, endRegion }: NeuralConnectionProps) {
  const lineRef = useRef<THREE.Line>(null);

  const curve = useMemo(() => {
    const midPoint = new THREE.Vector3(
      (start[0] + end[0]) / 2 + (Math.random() - 0.5) * 0.3,
      (start[1] + end[1]) / 2 + (Math.random() - 0.5) * 0.3,
      (start[2] + end[2]) / 2 + (Math.random() - 0.5) * 0.3
    );
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      midPoint,
      new THREE.Vector3(...end)
    );
  }, [start, end]);

  const points = useMemo(() => curve.getPoints(50), [curve]);
  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(points),
    [points]
  );

  const activeColor = regionColors[startRegion];

  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = isActive
        ? 0.4 + Math.sin(state.clock.elapsedTime * 3) * 0.2
        : 0.12 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial
        color={isActive ? activeColor : "#7c3aed"}
        transparent
        opacity={0.15}
        linewidth={1}
      />
    </line>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 1.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positionAttribute = particlesRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        const dist = Math.sqrt(positions[i * 3] ** 2 + positions[i * 3 + 1] ** 2 + positions[i * 3 + 2] ** 2);
        if (dist > 3.5 || dist < 1.5) {
          velocities[i * 3] *= -1;
          velocities[i * 3 + 1] *= -1;
          velocities[i * 3 + 2] *= -1;
        }
      }
      positionAttribute.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#a78bfa"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

const regionPositions: Record<BrainRegion, [number, number, number]> = {
  frontal:    [0, 0.8, 0.5],
  temporal:   [-0.9, 0, 0],
  parietal:   [0, 0.6, -0.4],
  occipital:  [0, 0, -0.9],
  cerebellum: [0, -0.7, -0.5],
  brainstem:  [0, -1, 0],
};

function BrainMesh({
  activeRegion,
  hoveredRegion,
  onRegionClick,
  onRegionHover,
}: {
  activeRegion: BrainRegion | null;
  hoveredRegion: BrainRegion | null;
  onRegionClick: (region: BrainRegion) => void;
  onRegionHover: (region: BrainRegion | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const connections = useMemo(() => {
    const regions = Object.keys(regionPositions) as BrainRegion[];
    const conns: { start: BrainRegion; end: BrainRegion }[] = [];
    for (let i = 0; i < regions.length; i++) {
      for (let j = i + 1; j < regions.length; j++) {
        if (Math.random() > 0.3) {
          conns.push({ start: regions[i], end: regions[j] });
        }
      }
    }
    return conns;
  }, []);

  const innerNodes = useMemo(() => {
    const nodes: [number, number, number][] = [];
    for (let i = 0; i < 30; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.3 + Math.random() * 0.5;
      nodes.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.8,
        r * Math.cos(phi) * 0.9,
      ]);
    }
    return nodes;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Outer skull shell */}
      <mesh>
        <sphereGeometry args={[1.3, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.85]} />
        <meshPhysicalMaterial
          color="#0a0a14"
          metalness={0.2}
          roughness={0.1}
          transmission={0.85}
          thickness={0.3}
          transparent
          opacity={0.2}
          side={2}
        />
      </mesh>

      {/* Skull wireframe — purple tint */}
      <mesh>
        <sphereGeometry args={[1.32, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.85]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Inner cavity glow */}
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.03} />
      </mesh>

      {/* Lower jaw */}
      <mesh position={[0, -0.95, 0.3]} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.35, 0.05, 8, 24, Math.PI]} />
        <meshPhysicalMaterial
          color="#0a0a14"
          metalness={0.3}
          roughness={0.2}
          transmission={0.7}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Eye sockets */}
      <mesh position={[-0.35, 0.15, 0.95]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.15} />
      </mesh>
      <mesh position={[0.35, 0.15, 0.95]}>
        <torusGeometry args={[0.15, 0.02, 8, 16]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.15} />
      </mesh>

      {/* Brain region nodes */}
      {(Object.keys(regionPositions) as BrainRegion[]).map((region) => (
        <NeuralNode
          key={region}
          position={regionPositions[region]}
          region={region}
          isActive={activeRegion === region}
          isHovered={hoveredRegion === region}
          onClick={() => onRegionClick(region)}
          onHover={(hovered) => onRegionHover(hovered ? region : null)}
        />
      ))}

      {/* Neural connections */}
      {connections.map((conn, i) => (
        <NeuralConnection
          key={i}
          start={regionPositions[conn.start]}
          end={regionPositions[conn.end]}
          isActive={
            activeRegion === conn.start ||
            activeRegion === conn.end ||
            hoveredRegion === conn.start ||
            hoveredRegion === conn.end
          }
          startRegion={conn.start}
          endRegion={conn.end}
        />
      ))}

      {/* Inner neural nodes */}
      {innerNodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.35} />
        </mesh>
      ))}

      <ParticleField />
    </group>
  );
}

interface Brain3DProps {
  activeRegion: BrainRegion | null;
  onRegionClick: (region: BrainRegion) => void;
  isReducedMotion: boolean;
}

export default function Brain3D({ activeRegion, onRegionClick, isReducedMotion }: Brain3DProps) {
  const [hoveredRegion, setHoveredRegion] = useState<BrainRegion | null>(null);

  if (isReducedMotion) {
    return <Brain2DFallback activeRegion={activeRegion} onRegionClick={onRegionClick} />;
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#09090f"]} />
        <fog attach="fog" args={["#09090f", 4, 12]} />

        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#a78bfa" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#e879f9" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#ffffff" />

        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <BrainMesh
            activeRegion={activeRegion}
            hoveredRegion={hoveredRegion}
            onRegionClick={onRegionClick}
            onRegionHover={setHoveredRegion}
          />
        </Float>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={2.5}
          maxDistance={6}
          autoRotate={!activeRegion && !hoveredRegion}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

function Brain2DFallback({
  activeRegion,
  onRegionClick,
}: {
  activeRegion: BrainRegion | null;
  onRegionClick: (region: BrainRegion) => void;
}) {
  const regions = Object.entries(brainRegions) as [BrainRegion, (typeof brainRegions)[BrainRegion]][];

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="relative w-full max-w-md aspect-square">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center neural-glow">
            <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>

        {regions.map(([region, data], index) => {
          const angle = (index / regions.length) * Math.PI * 2 - Math.PI / 2;
          const radius = 45;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          const color = regionColors[region];

          return (
            <button
              key={region}
              onClick={() => onRegionClick(region)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 rounded-lg glass-card transition-all duration-300 hover:scale-110 ${
                activeRegion === region ? "border-primary bg-primary/20 text-primary" : "hover:border-primary/50"
              }`}
              style={{ left: `${x}%`, top: `${y}%`, borderColor: activeRegion === region ? color : undefined }}
              aria-label={`View ${data.description}`}
            >
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: activeRegion === region ? color : undefined }}>
                {data.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment, Float } from '@react-three/drei';
import { Group } from 'three';

// Simplified 3D component using simple shapes instead of loading a model
const ComputerModel = () => {
  const group = useRef<Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Monitor */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[3, 2, 0.1]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        
        {/* Screen */}
        <mesh position={[0, 0.5, 0.06]}>
          <boxGeometry args={[2.8, 1.8, 0.01]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
        </mesh>
        
        {/* Stand */}
        <mesh position={[0, -0.7, 0]}>
          <cylinderGeometry args={[0.1, 0.3, 1, 16]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        
        {/* Base */}
        <mesh position={[0, -1.2, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </Float>
      
      {/* Keyboard */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[0, -1.5, 1]}>
          <boxGeometry args={[2, 0.1, 0.8]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </Float>
      
      {/* Decorative elements - code symbols */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh position={[1.5, 0.8, 1]}>
          <torusGeometry args={[0.3, 0.1, 16, 32]} />
          <meshStandardMaterial color="#14b8a6" emissive="#14b8a6" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-1.5, 1, 1]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.5} />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh position={[-1, -0.5, 1]}>
          <tetrahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
};

const ThreeDModel: React.FC = () => {
  return (
    <Canvas style={{ height: '100%', width: '100%' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 2 - 0.5}
        maxPolarAngle={Math.PI / 2 + 0.5}
      />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#0ea5e9" intensity={0.5} />
      <ComputerModel />
      <Environment preset="city" />
    </Canvas>
  );
};

export default ThreeDModel;
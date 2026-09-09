import React from 'react'
import { Box, Sphere, Cylinder } from '@react-three/drei'
import { Tree, PineTree } from '../Infrastructure/Trees'

export default function Park() {
  return (
    <group position={[-15, 0, 10]}>
      {/* Ground */}
      <Box position={[0, 0.1, 0]} args={[20, 0.2, 15]} color="#44aa33" />
      
      {/* Paths */}
      <Box position={[0, 0.2, 0]} args={[2, 0.1, 15]} color="#cccccc" />
      <Box position={[0, 0.2, 0]} args={[20, 0.1, 2]} color="#cccccc" />
      
      {/* Trees */}
      <Tree position={[-5, 0.5, -4]} scale={1.2} />
      <Tree position={[6, 0.5, -5]} scale={1.0} />
      <PineTree position={[-7, 0.5, 5]} scale={1.3} />
      <PineTree position={[5, 0.5, 6]} scale={1.1} />
      <Tree position={[0, 0.5, -7]} scale={0.9} />
      
      {/* Playground */}
      <Box position={[4, 0.5, -2]} args={[4, 0.2, 4]} color="#ffaa55" />
      <Cylinder position={[4, 2, -2]} args={[0.2, 0.2, 4]} color="#666666" />
      <Sphere position={[4, 4, -2]} args={[0.8, 8, 8]} color="#ff4444" />
      
      {/* Seating */}
      <Box position={[-3, 0.5, 0]} args={[2, 0.5, 1]} color="#8B4513" />
      <Box position={[-3, 1, 0]} args={[2, 0.5, 0.2]} color="#8B4513" />
      
      <Box position={[3, 0.5, 3]} args={[2, 0.5, 1]} color="#8B4513" />
      <Box position={[3, 1, 3]} args={[2, 0.5, 0.2]} color="#8B4513" />
      
      {/* Pond */}
      <Sphere position={[0, 0.3, 5]} args={[2, 16, 16]} color="#4488aa" transparent opacity={0.7} />
      
      {/* Smart irrigation */}
      <Box position={[-5, 0.3, -5]} args={[1, 0.3, 1]} color="#0066aa" />
      <Sphere position={[-5, 0.6, -5]} args={[0.3, 8, 8]} color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
    </group>
  )
}

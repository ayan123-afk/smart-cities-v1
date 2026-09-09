import React from 'react'
import { Box, Cylinder, Sphere } from '@react-three/drei'
import { Tree } from '../Infrastructure/Trees'

export default function School() {
  return (
    <group position={[20, 0, -10]}>
      {/* School building */}
      <Box position={[0, 4, 0]} args={[12, 8, 8]} color="#e8d8c8" />
      <Box position={[0, 8, 0]} args={[12, 0.3, 8]} color="#d8c8b8" />
      
      {/* Green roof */}
      <Box position={[0, 8.2, 0]} args={[11, 0.3, 7]} color="#44aa33" />
      
      {/* Solar panels */}
      <Box position={[3, 8.5, 2]} args={[4, 0.2, 3]} color="#003366" />
      <Box position={[3, 8.5, 2]} args={[3.8, 0.1, 2.8]} color="#66aaff" transparent opacity={0.6} />
      
      {/* Playground */}
      <Box position={[0, 0.3, 6]} args={[8, 0.5, 4]} color="#ffaa55" />
      <Cylinder position={[-2, 2, 6]} args={[0.2, 0.2, 4]} color="#666666" />
      <Sphere position={[-2, 4, 6]} args={[0.5, 8, 8]} color="#ff4444" />
      
      {/* Accessible entrance */}
      <Box position={[0, 1, 4.5]} args={[4, 2, 0.5]} color="#ffffff" />
      <Box position={[0, 0.2, 5]} args={[4, 0.4, 1]} color="#88ccff" /> {/* Ramp */}
      
      {/* Smart displays */}
      <Box position={[5, 5, 4.1]} args={[3, 2, 0.1]} color="#222222" />
      <Box position={[5, 5, 4.15]} args={[2.8, 1.8, 0.05]} color="#44aaff" emissive="#2266aa" emissiveIntensity={0.3} />
      
      {/* Pedestrian area */}
      <Box position={[0, 0.05, 8]} args={[12, 0.1, 4]} color="#555555" />
      
      {/* Landscaping */}
      <Tree position={[7, 0, 3]} scale={0.8} />
      <Tree position={[-7, 0, 3]} scale={0.9} />
    </group>
  )
}

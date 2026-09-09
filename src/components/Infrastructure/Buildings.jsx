import React from 'react'
import { Box, Cylinder, Cone, Sphere } from '@react-three/drei'

export function Building({ position, size = [5, 8, 5], color = '#8a8a8a', windows = true }) {
  const [w, h, d] = size
  
  return (
    <group position={position}>
      {/* Main body */}
      <Box args={[w, h, d]} color={color} castShadow />
      
      {/* Windows (front face) */}
      {windows && (
        <group position={[0, 0, d/2 + 0.01]}>
          {Array.from({ length: Math.floor(h/2) }).map((_, floor) => (
            <Box 
              key={floor} 
              position={[0, -h/2 + 1 + floor * 2, 0]} 
              args={[w*0.7, 0.8, 0.05]} 
              color="#88ccee" 
              emissive="#4488aa"
              emissiveIntensity={0.3}
            />
          ))}
        </group>
      )}
      
      {/* Roof detail */}
      <Box position={[0, h/2 + 0.2, 0]} args={[w*0.8, 0.3, d*0.8]} color="#666666" />
    </group>
  )
}

export function TallTower({ position, height = 15, color = '#9a9a9a' }) {
  return (
    <group position={position}>
      <Box args={[6, height, 6]} color={color} />
      {/* Tapered top */}
      <Cone args={[4, 3, 4]} position={[0, height/2 + 1.5, 0]} color="#777777" />
      {/* Antenna */}
      <Cylinder args={[0.2, 0.2, 4]} position={[0, height/2 + 5, 0]} color="#ff3333" />
    </group>
  )
}

export function GlassBuilding({ position, height = 10 }) {
  return (
    <group position={position}>
      <Box args={[5, height, 5]} color="#88aacc" transparent opacity={0.7} />
      <Box args={[4.8, height, 4.8]} color="#66aadd" transparent opacity={0.5} />
      {/* Structural frame */}
      {Array.from({ length: Math.floor(height/2) }).map((_, i) => (
        <Box 
          key={i} 
          position={[0, -height/2 + 1 + i*2, 0]} 
          args={[5.1, 0.3, 5.1]} 
          color="#555555"
        />
      ))}
    </group>
  )
}

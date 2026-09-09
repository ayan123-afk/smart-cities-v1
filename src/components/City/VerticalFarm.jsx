import React, { useRef } from 'react'
import { Box, Cylinder } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function VerticalFarm() {
  const waterRef = useRef()
  
  useFrame((state) => {
    // Animate water flow
    if (waterRef.current) {
      waterRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.5
    }
  })
  
  return (
    <group position={[10, 0, 0]}>
      {/* Main building */}
      <Box position={[0, 10, 0]} args={[8, 20, 6]} color="#2d5a27" />
      
      {/* Farming floors */}
      {[2, 5, 8, 11, 14, 17].map((y) => (
        <group key={y}>
          <Box position={[0, y, 0]} args={[8, 0.2, 6]} color="#1a3a15" />
          {/* Plants on each floor */}
          <Box position={[0, y+0.2, 0]} args={[7, 0.3, 5]} color="#44aa33" emissive="#228822" emissiveIntensity={0.2} />
        </group>
      ))}
      
      {/* Water circulation pipes */}
      <Cylinder position={[-4.5, 10, 0]} args={[0.2, 0.2, 20, 8]} color="#00aaff" />
      <Cylinder position={[4.5, 10, 0]} args={[0.2, 0.2, 20, 8]} color="#00aaff" />
      
      {/* Animated water effect */}
      <group ref={waterRef}>
        <Box position={[0, 5, 0]} args={[1, 0.2, 0.5]} color="#00ffff" transparent opacity={0.7} />
        <Box position={[0, 12, 0]} args={[1, 0.2, 0.5]} color="#00ffff" transparent opacity={0.7} />
      </group>
      
      {/* Solar panels on roof */}
      <Box position={[0, 20, 0]} args={[8, 0.3, 6]} color="#003366" />
      <Box position={[0, 20, 0]} args={[8, 0.1, 6]} color="#66aaff" transparent opacity={0.6} />
      
      {/* Green terraces */}
      <Box position={[5, 8, 0]} args={[2, 0.5, 5]} color="#44aa33" />
      <Box position={[5, 12, 0]} args={[2, 0.5, 5]} color="#44aa33" />
      
      {/* Label */}
      <Box position={[0, 21, 0]} args={[5, 0.5, 0.1]} color="#ffffff" />
    </group>
  )
}

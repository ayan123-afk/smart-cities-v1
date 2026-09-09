import React from 'react'
import { Box, Cylinder } from '@react-three/drei'

export default function AccessibilityZone() {
  return (
    <group position={[10, 0, 5]}>
      {/* Accessible building */}
      <Box position={[0, 3, 0]} args={[6, 6, 6]} color="#ccaa88" />
      <Box position={[0, 6, 0]} args={[6, 0.3, 6]} color="#aa8866" />
      
      {/* Wide entrance */}
      <Box position={[0, 1, 3]} args={[4, 2, 0.5]} color="#ffffff" />
      
      {/* Wheelchair ramp */}
      <Box position={[2, 0.3, 4]} args={[3, 0.6, 2]} color="#88ccff" />
      <Box position={[2, 0.6, 3]} args={[3, 0.3, 1]} color="#88ccff" />
      
      {/* Tactile paving */}
      <Box position={[0, 0.15, 5]} args={[4, 0.1, 0.5]} color="#ffaa00" />
      
      {/* Accessible crossing */}
      <Box position={[0, 0.15, 7]} args={[3, 0.1, 0.3]} color="#ffaa00" />
      
      {/* Signage */}
      <Box position={[2, 4, 3.1]} args={[2, 1, 0.1]} color="#ffffff" />
      <Box position={[2, 4, 3.15]} args={[1.8, 0.8, 0.05]} color="#0000ff" />
      
      {/* Accessible seating */}
      <Box position={[-4, 0.5, 0]} args={[2, 0.5, 1]} color="#8B4513" />
      <Box position={[-4, 1, 0]} args={[2, 0.5, 0.2]} color="#8B4513" />
      
      {/* Elevator shaft */}
      <Box position={[3, 2, 0]} args={[2, 4, 2]} color="#888888" />
      <Box position={[3, 2, 0.1]} args={[1.5, 3, 0.1]} color="#88aaff" transparent opacity={0.7} />
      
      {/* Accessible parking */}
      <Box position={[-5, 0.15, 3]} args={[3, 0.1, 4]} color="#ffffff" />
      <Box position={[-5, 0.15, 3]} args={[3, 0.1, 0.2]} color="#88ccff" />
    </group>
  )
}

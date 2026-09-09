import React from 'react'
import { Box, Cylinder, Sphere } from '@react-three/drei'
import { WasteTruck } from '../Infrastructure/Vehicles'

export default function WasteManagement() {
  return (
    <group position={[35, 0, -15]}>
      {/* Recycling facility */}
      <Box position={[0, 4, 0]} args={[10, 8, 8]} color="#667766" />
      <Box position={[0, 8, 0]} args={[10, 0.3, 8]} color="#556655" />
      
      {/* Conveyor system */}
      <Box position={[8, 2, 0]} args={[4, 0.5, 2]} color="#888888" />
      <Sphere position={[8, 2.5, 0]} args={[0.3, 8, 8]} color="#ffaa00" />
      
      {/* Sorting bins */}
      <Box position={[-5, 1, 4]} args={[2, 2, 2]} color="#00aa44" />
      <Box position={[-5, 1, 0]} args={[2, 2, 2]} color="#0088ff" />
      <Box position={[-5, 1, -4]} args={[2, 2, 2]} color="#ffaa00" />
      
      {/* Smart bins */}
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} position={[-15 + i * 4, 0.5, 5]}>
          <Box args={[2, 1, 1.5]} color="#334455" />
          <Box position={[0, 1, 0]} args={[1.5, 0.5, 1]} color="#ff4444" emissive="#ff0000" emissiveIntensity={0.3} />
        </group>
      ))}
      
      {/* Waste collection vehicles */}
      <WasteTruck position={[0, 0, 5]} direction={[1, 0, 0]} speed={0.04} />
      <WasteTruck position={[10, 0, -5]} direction={[0, 0, 1]} speed={0.03} />
      
      {/* Status indicators */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Sphere 
          key={i} 
          position={[-15 + i * 4, 1.8, 5]} 
          args={[0.15, 8, 8]} 
          color={i % 2 === 0 ? '#00ff00' : '#ffff00'} 
          emissive={i % 2 === 0 ? '#00ff00' : '#ffff00'} 
          emissiveIntensity={0.5}
        />
      ))}
    </group>
  )
}

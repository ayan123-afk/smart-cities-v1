import React from 'react'
import { Box, Cylinder } from '@react-three/drei'
import { Bus } from '../Infrastructure/Vehicles'

export default function PublicTransport() {
  return (
    <group position={[0, 0, -20]}>
      {/* Bus station */}
      <Box position={[0, 2, 0]} args={[12, 4, 4]} color="#334455" />
      <Box position={[0, 4, 0]} args={[12, 0.3, 4]} color="#445566" />
      
      {/* Digital information display */}
      <Box position={[-4, 4, 2]} args={[3, 1.5, 0.2]} color="#222222" />
      <Box position={[-4, 4, 2.1]} args={[2.8, 1.3, 0.1]} color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} />
      
      {/* EV charging stations */}
      <Box position={[4, 1, 2]} args={[2, 2, 1]} color="#555555" />
      <Box position={[4, 2, 2]} args={[1, 1, 0.5]} color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      
      <Box position={[6, 1, 2]} args={[2, 2, 1]} color="#555555" />
      <Box position={[6, 2, 2]} args={[1, 1, 0.5]} color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      
      {/* Bus lane */}
      <Box position={[0, 0.05, 6]} args={[240, 0.1, 3]} color="#006633" />
      
      {/* Animated buses */}
      <Bus position={[-40, 0, 6]} direction={[1, 0, 0]} speed={0.08} />
      <Bus position={[40, 0, 6]} direction={[-1, 0, 0]} speed={0.06} />
      
      {/* Bus stop shelter */}
      <Box position={[0, 1, 5]} args={[4, 2, 3]} color="#ffffff" transparent opacity={0.7} />
    </group>
  )
}

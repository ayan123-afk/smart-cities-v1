import React from 'react'
import { Box, Cylinder } from '@react-three/drei'

export default function Ambient() {
  return (
    <group>
      {/* Ground */}
      <Box position={[0, -0.5, 0]} args={[200, 1, 200]} color="#1a1a2e" />
      
      {/* Water reservoir */}
      <Cylinder position={[15, 2, 20]} args={[5, 5, 4, 16]} color="#0066aa" />
      <Cylinder position={[15, 4, 20]} args={[4.5, 5, 0.5, 16]} color="#00aaff" />
      
      {/* Smart irrigation system */}
      <Box position={[20, 1, 5]} args={[2, 2, 2]} color="#0066aa" />
      <Box position={[20, 2, 5]} args={[1, 1, 1]} color="#00ff88" />
      
      {/* Rainwater harvesting */}
      <Box position={[-5, 5, -20]} args={[3, 3, 3]} color="#4488aa" />
      <Box position={[-5, 5, -20]} args={[2.5, 2.5, 2.5]} color="#88ccff" transparent opacity={0.5} />
      
      {/* Emergency services hub */}
      <Box position={[-25, 3, -10]} args={[8, 6, 6]} color="#ff4444" />
      <Box position={[-25, 6, -10]} args={[8, 0.3, 6]} color="#cc3333" />
      
      {/* Green corridors */}
      <Box position={[0, 0.05, 30]} args={[100, 0.1, 2]} color="#44aa33" />
      <Box position={[0, 0.05, -30]} args={[100, 0.1, 2]} color="#44aa33" />
      <Box position={[30, 0.05, 0]} args={[2, 0.1, 100]} color="#44aa33" />
      <Box position={[-30, 0.05, 0]} args={[2, 0.1, 100]} color="#44aa33" />
    </group>
  )
}

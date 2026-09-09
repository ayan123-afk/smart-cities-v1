import React from 'react'
import { Box, Plane } from '@react-three/drei'

export default function Roads() {
  return (
    <group>
      {/* Horizontal Main Road */}
      <MeshRoad position={[0, 0.05, 0]} rotation={[0, 0, 0]} width={240} depth={8} />
      {/* Vertical Main Road */}
      <MeshRoad position={[0, 0.05, 0]} rotation={[0, 0, 0]} width={8} depth={240} />
      {/* Secondary Roads */}
      <MeshRoad position={[-40, 0.05, -40]} rotation={[0, 0, 0]} width={4} depth={120} />
      <MeshRoad position={[40, 0.05, -40]} rotation={[0, 0, 0]} width={4} depth={120} />
      <MeshRoad position={[-40, 0.05, 40]} rotation={[0, 0, 0]} width={4} depth={120} />
      <MeshRoad position={[40, 0.05, 40]} rotation={[0, 0, 0]} width={4} depth={120} />
      
      {/* Intersection markings */}
      <Plane position={[0, 0.06, 0]} args={[12, 12]} color="#333333" />
      
      {/* Sidewalks */}
      <Box position={[0, 0.03, 4.5]} args={[240, 0.1, 1]} color="#555555" />
      <Box position={[0, 0.03, -4.5]} args={[240, 0.1, 1]} color="#555555" />
      <Box position={[4.5, 0.03, 0]} args={[1, 0.1, 240]} color="#555555" />
      <Box position={[-4.5, 0.03, 0]} args={[1, 0.1, 240]} color="#555555" />
    </group>
  )
}

function MeshRoad({ position, rotation, width, depth }) {
  return (
    <Box 
      position={position} 
      rotation={rotation} 
      args={[width, 0.1, depth]} 
      color="#444444"
    />
  )
}

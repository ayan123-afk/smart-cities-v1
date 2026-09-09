import React from 'react'
import { Box, Cylinder, Sphere } from '@react-three/drei'
import { Tree } from '../Infrastructure/Trees'

export default function Residential() {
  return (
    <group position={[30, 0, 15]}>
      {/* Apartment buildings */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[i * 8 - 12, 0, 0]}>
          <Box position={[0, 8, 0]} args={[6, 16, 6]} color={i % 2 === 0 ? '#ccbbaa' : '#aabbcc'} />
          <Box position={[0, 16, 0]} args={[6, 0.3, 6]} color="#998877" />
          
          {/* Windows */}
          {[1, 3, 5, 7, 9, 11, 13, 15].map((y) => (
            <Box key={y} position={[0, y, 3]} args={[4, 0.8, 0.1]} color="#88ccff" emissive="#4488aa" emissiveIntensity={0.2} />
          ))}
        </group>
      ))}
      
      {/* Green spaces */}
      <Tree position={[-15, 0, -3]} scale={1.0} />
      <Tree position={[15, 0, -3]} scale={1.1} />
      <Tree position={[0, 0, -3]} scale={0.9} />
      
      {/* Community center */}
      <Box position={[0, 2, -5]} args={[10, 4, 4]} color="#ddccbb" />
      <Box position={[0, 4, -5]} args={[10, 0.3, 4]} color="#ccbbaa" />
      
      {/* Streetlights */}
      <Cylinder position={[-18, 3, 3]} args={[0.1, 0.15, 6]} color="#555555" />
      <Cylinder position={[18, 3, 3]} args={[0.1, 0.15, 6]} color="#555555" />
    </group>
  )
}

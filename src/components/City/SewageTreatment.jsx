import React, { useRef } from 'react'
import { Box, Cylinder } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function SewageTreatment() {
  const water1Ref = useRef()
  const water2Ref = useRef()
  
  useFrame((state) => {
    if (water1Ref.current) {
      water1Ref.current.position.z = (state.clock.elapsedTime * 2) % 6 - 3
    }
    if (water2Ref.current) {
      water2Ref.current.position.z = (state.clock.elapsedTime * 2) % 6 - 3
    }
  })
  
  return (
    <group position={[25, 0, 0]}>
      {/* Treatment tanks */}
      <Cylinder position={[-5, 2, 0]} args={[3, 3, 4, 16]} color="#555555" />
      <Cylinder position={[-5, 3.8, 0]} args={[2.5, 2.8, 0.5, 16]} color="#777777" />
      
      <Cylinder position={[0, 2, 0]} args={[3, 3, 4, 16]} color="#555555" />
      <Cylinder position={[0, 3.8, 0]} args={[2.5, 2.8, 0.5, 16]} color="#777777" />
      
      <Cylinder position={[5, 2, 0]} args={[3, 3, 4, 16]} color="#555555" />
      <Cylinder position={[5, 3.8, 0]} args={[2.5, 2.8, 0.5, 16]} color="#777777" />
      
      {/* Filtration units */}
      <Box position={[-5, 5, 0]} args={[2, 2, 2]} color="#888888" />
      <Box position={[0, 5, 0]} args={[2, 2, 2]} color="#888888" />
      <Box position={[5, 5, 0]} args={[2, 2, 2]} color="#888888" />
      
      {/* Pipes */}
      <Cylinder position={[-2.5, 2, 0]} args={[0.3, 0.3, 5, 8]} rotation={[0, 0, Math.PI/2]} color="#00aaff" />
      <Cylinder position={[2.5, 2, 0]} args={[0.3, 0.3, 5, 8]} rotation={[0, 0, Math.PI/2]} color="#00aaff" />
      
      {/* Animated water flow */}
      <group ref={water1Ref}>
        <Sphere position={[-5, 2, 0]} args={[0.2, 8, 8]} color="#00ffff" />
      </group>
      <group ref={water2Ref}>
        <Sphere position={[0, 2, 0]} args={[0.2, 8, 8]} color="#00ffff" />
      </group>
      
      {/* Water storage tank */}
      <Cylinder position={[10, 3, 0]} args={[4, 4, 6, 16]} color="#0066aa" />
      <Cylinder position={[10, 6, 0]} args={[4, 4, 0.5, 16]} color="#00aaff" />
      
      {/* Control building */}
      <Box position={[10, 7, 0]} args={[6, 4, 4]} color="#333333" />
      
      {/* Pumps */}
      <Box position={[-8, 1, 0]} args={[2, 2, 2]} color="#ffaa00" />
      <Box position={[8, 1, 0]} args={[2, 2, 2]} color="#ffaa00" />
    </group>
  )
}

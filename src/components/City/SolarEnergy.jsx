import React, { useRef } from 'react'
import { Box, Cylinder } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function SolarEnergy() {
  const energyRef = useRef()
  
  useFrame((state) => {
    if (energyRef.current) {
      energyRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 2 + 3
      energyRef.current.rotation.y = state.clock.elapsedTime
    }
  })
  
  const solarPanels = []
  
  // Create solar panel array
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      solarPanels.push({
        position: [-25 + i * 6, 1, -15 + j * 6],
        rotation: [0.3, 0, 0]
      })
    }
  }
  
  return (
    <group>
      {/* Solar farm */}
      {solarPanels.map((panel, index) => (
        <Box 
          key={index} 
          position={panel.position} 
          rotation={panel.rotation} 
          args={[4, 0.2, 3]} 
          color="#003366" 
        >
          <Box 
            position={[0, 0.1, 0]} 
            args={[3.8, 0.1, 2.8]} 
            color="#66aaff" 
            transparent 
            opacity={0.6} 
          />
        </Box>
      ))}
      
      {/* Battery storage */}
      <Box position={[-28, 2, -18]} args={[4, 4, 2]} color="#444444" />
      <Box position={[-28, 3.5, -18]} args={[3, 1, 1.5]} color="#ffaa00" />
      
      {/* Energy monitoring tower */}
      <Cylinder position={[-28, 8, -18]} args={[0.5, 0.8, 12, 8]} color="#888888" />
      <Box position={[-28, 14, -18]} args={[3, 2, 2]} color="#333333" />
      
      {/* Animated energy flow */}
      <group ref={energyRef}>
        <Sphere position={[-28, 5, -18]} args={[0.5, 8, 8]} color="#ffdd00" emissive="#ffaa00" emissiveIntensity={0.8} />
      </group>
      
      {/* Energy lines (static indicators) */}
      {[0, 1, 2, 3].map((i) => (
        <Box 
          key={i} 
          position={[-28 + i * 2, 4 + i, -18]} 
          args={[2, 0.1, 0.1]} 
          color="#ffaa00" 
          transparent 
          opacity={0.5 - i * 0.1} 
        />
      ))}
    </group>
  )
}

import React, { useRef } from 'react'
import { Box, Cylinder } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Car } from '../Infrastructure/Vehicles'

export function TrafficLight({ position, rotation = 0 }) {
  const lightRef = useRef()
  const state = useRef(0)
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const phase = Math.floor(time / 3) % 3
    
    if (lightRef.current) {
      // Change colors
      const colors = [
        ['#ff0000', '#333333', '#333333'],
        ['#333333', '#ffaa00', '#333333'],
        ['#333333', '#333333', '#00ff00']
      ]
      
      lightRef.current.children[0].material.color.set(colors[phase][0])
      lightRef.current.children[1].material.color.set(colors[phase][1])
      lightRef.current.children[2].material.color.set(colors[phase][2])
    }
  })
  
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Cylinder position={[0, 2, 0]} args={[0.1, 0.15, 4]} color="#555555" />
      <Box position={[0, 4, 0]} args={[0.4, 1.2, 0.4]} color="#222222" />
      <group ref={lightRef}>
        <Sphere position={[0, 4.4, 0.3]} args={[0.2, 8, 8]} color="#ff0000" />
        <Sphere position={[0, 4, 0.3]} args={[0.2, 8, 8]} color="#ffaa00" />
        <Sphere position={[0, 3.6, 0.3]} args={[0.2, 8, 8]} color="#00ff00" />
      </group>
    </group>
  )
}

export default function TrafficSystem() {
  return (
    <group>
      {/* Traffic lights at intersections */}
      <TrafficLight position={[2, 0, 2]} rotation={Math.PI/4} />
      <TrafficLight position={[-2, 0, 2]} rotation={-Math.PI/4} />
      <TrafficLight position={[2, 0, -2]} rotation={Math.PI/4} />
      <TrafficLight position={[-2, 0, -2]} rotation={-Math.PI/4} />
      
      {/* Smart cameras */}
      <Box position={[0, 8, 0]} args={[2, 1, 1]} color="#333333" />
      <Cylinder position={[0, 8, 0.5]} args={[0.3, 0.3, 0.8]} color="#666666" />
      <Sphere position={[0, 8, 1]} args={[0.2, 8, 8]} color="#ff4444" emissive="#ff0000" emissiveIntensity={0.5} />
      
      {/* Sensors */}
      <Box position={[10, 1, 5]} args={[1, 0.5, 0.5]} color="#0066aa" />
      <Box position={[-10, 1, -5]} args={[1, 0.5, 0.5]} color="#0066aa" />
      
      {/* Animated cars */}
      <Car position={[-40, 0, 0]} direction={[1, 0, 0]} speed={0.15} color="#ff4444" />
      <Car position={[40, 0, 0]} direction={[-1, 0, 0]} speed={0.12} color="#44aaff" />
      <Car position={[0, 0, -40]} direction={[0, 0, 1]} speed={0.13} color="#44ffaa" />
      <Car position={[0, 0, 40]} direction={[0, 0, -1]} speed={0.11} color="#ff44aa" />
      <Car position={[-20, 0, -20]} direction={[1, 0, 1]} speed={0.09} color="#ffaa44" />
      <Car position={[20, 0, 20]} direction={[-1, 0, -1]} speed={0.10} color="#aa44ff" />
    </group>
  )
}

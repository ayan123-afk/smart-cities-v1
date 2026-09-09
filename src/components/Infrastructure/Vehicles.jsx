import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Sphere, Cylinder } from '@react-three/drei'

export function Car({ position, direction = [1, 0, 0], speed = 0.1, color = '#ff4444' }) {
  const ref = useRef()
  
  useFrame((state, delta) => {
    ref.current.position.x += direction[0] * speed * delta
    ref.current.position.z += direction[2] * speed * delta
    
    // Wrap around
    if (ref.current.position.x > 60) ref.current.position.x = -60
    if (ref.current.position.x < -60) ref.current.position.x = 60
    if (ref.current.position.z > 60) ref.current.position.z = -60
    if (ref.current.position.z < -60) ref.current.position.z = 60
  })
  
  return (
    <group ref={ref} position={position}>
      <Box args={[2, 0.6, 1.2]} color={color} />
      <Box position={[0, 0.5, 0]} args={[1.2, 0.6, 1]} color="#333333" />
      <Sphere position={[-0.8, -0.3, 0.7]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[-0.8, -0.3, -0.7]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[0.8, -0.3, 0.7]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[0.8, -0.3, -0.7]} args={[0.2, 8, 8]} color="#222222" />
    </group>
  )
}

export function Bus({ position, direction = [1, 0, 0], speed = 0.08 }) {
  const ref = useRef()
  
  useFrame((state, delta) => {
    ref.current.position.x += direction[0] * speed * delta
    ref.current.position.z += direction[2] * speed * delta
    
    if (ref.current.position.x > 60) ref.current.position.x = -60
    if (ref.current.position.x < -60) ref.current.position.x = 60
    if (ref.current.position.z > 60) ref.current.position.z = -60
    if (ref.current.position.z < -60) ref.current.position.z = 60
  })
  
  return (
    <group ref={ref} position={position}>
      <Box args={[6, 2, 2.5]} color="#00aa44" />
      <Box position={[0, 1.2, 0]} args={[5, 1, 2]} color="#88ff88" transparent opacity={0.6} />
      <Box position={[-2.5, 0.5, 0]} args={[1, 1, 2]} color="#006633" />
    </group>
  )
}

export function Ambulance({ position, target, speed = 0.3 }) {
  const ref = useRef()
  const reached = useRef(false)
  
  useFrame((state, delta) => {
    if (reached.current) return
    
    // Move toward target
    const dx = target[0] - ref.current.position.x
    const dz = target[2] - ref.current.position.z
    
    const distance = Math.sqrt(dx*dx + dz*dz)
    
    if (distance < 1) {
      reached.current = true
      return
    }
    
    ref.current.position.x += (dx / distance) * speed * delta
    ref.current.position.z += (dz / distance) * speed * delta
  })
  
  return (
    <group ref={ref} position={position}>
      <Box args={[3, 1.5, 1.5]} color="#ffffff" />
      <Box position={[0, 1, 0]} args={[2, 0.8, 1.3]} color="#ffffff" />
      <Box position={[-1.2, 1, 0]} args={[0.5, 0.5, 1]} color="#ff2222" />
      <Box position={[-1.5, 0.8, 0]} args={[0.3, 0.3, 1]} color="#ff2222" />
      <Sphere position={[-0.8, -0.5, 0.8]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[-0.8, -0.5, -0.8]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[0.8, -0.5, 0.8]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[0.8, -0.5, -0.8]} args={[0.2, 8, 8]} color="#222222" />
    </group>
  )
}

export function WasteTruck({ position, direction = [1, 0, 0], speed = 0.05 }) {
  const ref = useRef()
  
  useFrame((state, delta) => {
    ref.current.position.x += direction[0] * speed * delta
    ref.current.position.z += direction[2] * speed * delta
    
    if (ref.current.position.x > 60) ref.current.position.x = -60
    if (ref.current.position.x < -60) ref.current.position.x = 60
    if (ref.current.position.z > 60) ref.current.position.z = -60
    if (ref.current.position.z < -60) ref.current.position.z = 60
  })
  
  return (
    <group ref={ref} position={position}>
      <Box args={[4, 1.8, 2]} color="#ff8800" />
      <Box position={[2, 1, 0]} args={[1.5, 1, 1.8]} color="#ffaa33" />
      <Sphere position={[-1.5, -0.6, 1]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[-1.5, -0.6, -1]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[1.5, -0.6, 1]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[1.5, -0.6, -1]} args={[0.2, 8, 8]} color="#222222" />
    </group>
  )
}

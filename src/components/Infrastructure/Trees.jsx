import React from 'react'
import { Sphere, Cylinder } from '@react-three/drei'

export function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <Cylinder position={[0, 1, 0]} args={[0.3, 0.4, 2]} color="#8B4513" />
      <Sphere position={[0, 2.5, 0]} args={[1.2, 8, 8]} color="#228B22" />
      <Sphere position={[0.5, 2.8, 0.3]} args={[0.8, 8, 8]} color="#2E8B57" />
    </group>
  )
}

export function PineTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <Cylinder position={[0, 1, 0]} args={[0.2, 0.3, 2]} color="#5C4033" />
      <Cone position={[0, 2, 0]} args={[1, 2, 8]} color="#006400" />
      <Cone position={[0, 3.5, 0]} args={[0.8, 2, 8]} color="#008000" />
    </group>
  )
}

export function TreeRow({ start, end, count, spacing = 5 }) {
  const points = []
  for (let i = 0; i < count; i++) {
    points.push([
      start[0] + (end[0] - start[0]) * (i / (count - 1)),
      start[1] + (end[1] - start[1]) * (i / (count - 1)),
      start[2] + (end[2] - start[2]) * (i / (count - 1))
    ])
  }
  
  return (
    <>
      {points.map((p, i) => (
        <Tree key={i} position={p} scale={0.8 + Math.random() * 0.4} />
      ))}
    </>
  )
}

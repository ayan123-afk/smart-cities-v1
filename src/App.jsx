import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Sky } from '@react-three/drei';
import * as THREE from 'three';

// ============================================
// DATA & CONFIGURATION
// ============================================

const FACILITIES = [
  { id: 'overview', name: 'City Overview', icon: '🌆', position: [80, 60, 80], target: [0, 10, 0] },
  { id: 'ai-control', name: 'AI Control Center', icon: '🤖', position: [20, 30, 40], target: [0, 10, 0] },
  { id: 'hospital', name: 'Smart Hospital', icon: '🏥', position: [-30, 25, 30], target: [-15, 5, 5] },
  { id: 'vertical-farm', name: 'Vertical Farm', icon: '🌱', position: [10, 20, 25], target: [10, 15, 0] },
  { id: 'sewage', name: 'Sewage Treatment', icon: '💧', position: [35, 20, 25], target: [25, 5, 0] },
  { id: 'solar', name: 'Solar Energy', icon: '☀️', position: [-20, 25, -20], target: [-25, 5, -15] },
  { id: 'traffic', name: 'AI Traffic', icon: '🚦', position: [0, 20, 25], target: [0, 5, 0] },
  { id: 'waste', name: 'Smart Waste', icon: '♻️', position: [45, 20, -20], target: [35, 5, -15] },
  { id: 'transport', name: 'Public Transport', icon: '🚌', position: [-10, 20, -25], target: [0, 5, -20] },
  { id: 'school', name: 'Smart School', icon: '🏫', position: [30, 20, -10], target: [20, 5, -10] },
  { id: 'park', name: 'Green Park', icon: '🌳', position: [-25, 20, 15], target: [-15, 5, 10] },
  { id: 'accessibility', name: 'Accessibility Zone', icon: '♿', position: [15, 15, 15], target: [10, 2, 5] },
];

const FACILITY_INFO = {
  'ai-control': {
    name: 'AI City Control Center',
    purpose: 'Central brain managing all city operations through AI algorithms',
    sustainability: 'Optimizes resource usage across the entire city',
    technology: 'AI algorithms, IoT sensors, Machine Learning, Neural Networks'
  },
  'hospital': {
    name: 'Smart Hospital',
    purpose: 'Advanced healthcare facility with emergency response systems',
    sustainability: 'Energy-efficient systems, medical waste reduction',
    technology: 'AI diagnostics, telemedicine, smart patient monitoring'
  },
  'vertical-farm': {
    name: 'Vertical Farming District',
    purpose: 'Local food production in urban environment',
    sustainability: '90% less water than traditional farming',
    technology: 'Hydroponics, LED growth lighting, climate control systems'
  },
  'sewage': {
    name: 'Sewage Treatment Plant',
    purpose: 'Water recycling and waste management facility',
    sustainability: 'Recycled water for irrigation and cooling',
    technology: 'Membrane filtration, UV purification, smart sensors'
  },
  'solar': {
    name: 'Solar Energy District',
    purpose: 'Renewable energy generation for the entire city',
    sustainability: 'Zero-emission power source',
    technology: 'Photovoltaic cells, smart grid integration, battery storage'
  },
  'traffic': {
    name: 'AI Traffic System',
    purpose: 'Intelligent traffic management and optimization',
    sustainability: 'Reduced idle time, lower emissions',
    technology: 'Computer vision, predictive analytics, adaptive signaling'
  },
  'waste': {
    name: 'Smart Waste Management',
    purpose: 'Automated waste collection and sorting',
    sustainability: '95% waste diversion from landfill',
    technology: 'Smart bins, AI sorting, route optimization'
  },
  'transport': {
    name: 'Public Transportation Hub',
    purpose: 'Efficient public transit system',
    sustainability: 'Electric buses, reduced car usage',
    technology: 'EV charging, smart scheduling, real-time tracking'
  },
  'school': {
    name: 'Smart School',
    purpose: 'Modern education for future generations',
    sustainability: 'Green roof, solar power, natural lighting',
    technology: 'Smart classrooms, interactive learning, AI assistance'
  },
  'park': {
    name: 'Green Park',
    purpose: 'Community recreation and biodiversity hub',
    sustainability: 'Carbon capture, urban cooling',
    technology: 'Smart irrigation, environmental monitoring'
  },
  'accessibility': {
    name: 'Accessibility Zone',
    purpose: 'Inclusive public spaces for all abilities',
    sustainability: 'Universal design principles',
    technology: 'Assistive technologies, smart navigation'
  }
};

// ============================================
// SIMPLE 3D COMPONENTS
// ============================================

function Box({ position, args = [1, 1, 1], color = '#888888', rotation = [0, 0, 0] }) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Sphere({ position, args = [0.5, 16, 16], color = '#ff4444', emissive = null, emissiveIntensity = 0 }) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={args} />
      <meshStandardMaterial 
        color={color} 
        emissive={emissive || color} 
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}

function Cylinder({ position, args = [0.5, 0.5, 1, 16], color = '#888888', rotation = [0, 0, 0] }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <cylinderGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Cone({ position, args = [0.5, 1, 16], color = '#888888' }) {
  return (
    <mesh position={position} castShadow>
      <coneGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

// ============================================
// TREE COMPONENT
// ============================================

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <Cylinder position={[0, 1, 0]} args={[0.3, 0.4, 2, 8]} color="#8B4513" />
      <Sphere position={[0, 2.5, 0]} args={[1.2, 8, 8]} color="#228B22" />
      <Sphere position={[0.5, 2.8, 0.3]} args={[0.8, 8, 8]} color="#2E8B57" />
    </group>
  );
}

function PineTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <Cylinder position={[0, 1, 0]} args={[0.2, 0.3, 2, 8]} color="#5C4033" />
      <Cone position={[0, 2, 0]} args={[1, 2, 8]} color="#006400" />
      <Cone position={[0, 3.5, 0]} args={[0.8, 2, 8]} color="#008000" />
    </group>
  );
}

// ============================================
// VEHICLES
// ============================================

function Car({ position, direction = [1, 0, 0], speed = 0.1, color = '#ff4444' }) {
  const ref = useRef();
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.x += direction[0] * speed * delta;
    ref.current.position.z += direction[2] * speed * delta;
    
    // Wrap around
    if (ref.current.position.x > 60) ref.current.position.x = -60;
    if (ref.current.position.x < -60) ref.current.position.x = 60;
    if (ref.current.position.z > 60) ref.current.position.z = -60;
    if (ref.current.position.z < -60) ref.current.position.z = 60;
  });
  
  return (
    <group ref={ref} position={position}>
      <Box position={[0, 0.3, 0]} args={[2, 0.6, 1.2]} color={color} />
      <Box position={[0, 0.8, 0]} args={[1.2, 0.6, 1]} color="#333333" />
      <Sphere position={[-0.8, -0.1, 0.7]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[-0.8, -0.1, -0.7]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[0.8, -0.1, 0.7]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[0.8, -0.1, -0.7]} args={[0.2, 8, 8]} color="#222222" />
    </group>
  );
}

function Bus({ position, direction = [1, 0, 0], speed = 0.08 }) {
  const ref = useRef();
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.x += direction[0] * speed * delta;
    ref.current.position.z += direction[2] * speed * delta;
    
    if (ref.current.position.x > 60) ref.current.position.x = -60;
    if (ref.current.position.x < -60) ref.current.position.x = 60;
    if (ref.current.position.z > 60) ref.current.position.z = -60;
    if (ref.current.position.z < -60) ref.current.position.z = 60;
  });
  
  return (
    <group ref={ref} position={position}>
      <Box position={[0, 1, 0]} args={[6, 2, 2.5]} color="#00aa44" />
      <Box position={[0, 2.2, 0]} args={[5, 1, 2]} color="#88ff88" transparent opacity={0.6} />
      <Box position={[-2.5, 0.5, 0]} args={[1, 1, 2]} color="#006633" />
    </group>
  );
}

function Ambulance({ position, target, speed = 0.3 }) {
  const ref = useRef();
  const reached = useRef(false);
  
  useFrame((state, delta) => {
    if (!ref.current || reached.current) return;
    
    const dx = target[0] - ref.current.position.x;
    const dz = target[2] - ref.current.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);
    
    if (distance < 1) {
      reached.current = true;
      return;
    }
    
    ref.current.position.x += (dx / distance) * speed * delta;
    ref.current.position.z += (dz / distance) * speed * delta;
  });
  
  return (
    <group ref={ref} position={position}>
      <Box position={[0, 0.75, 0]} args={[3, 1.5, 1.5]} color="#ffffff" />
      <Box position={[0, 1.8, 0]} args={[2, 0.8, 1.3]} color="#ffffff" />
      <Box position={[-1.2, 1.8, 0]} args={[0.5, 0.5, 1]} color="#ff2222" />
      <Box position={[-1.5, 1.5, 0]} args={[0.3, 0.3, 1]} color="#ff2222" />
      <Sphere position={[-0.8, -0.1, 0.8]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[-0.8, -0.1, -0.8]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[0.8, -0.1, 0.8]} args={[0.2, 8, 8]} color="#222222" />
      <Sphere position={[0.8, -0.1, -0.8]} args={[0.2, 8, 8]} color="#222222" />
    </group>
  );
}

// ============================================
// TRAFFIC LIGHT
// ============================================

function TrafficLight({ position, rotation = 0 }) {
  const lightsRef = useRef();
  
  useFrame(({ clock }) => {
    if (!lightsRef.current) return;
    
    const time = clock.getElapsedTime();
    const phase = Math.floor(time / 3) % 3;
    
    const colors = [
      ['#ff0000', '#333333', '#333333'],
      ['#333333', '#ffaa00', '#333333'],
      ['#333333', '#333333', '#00ff00']
    ];
    
    lightsRef.current.children[0].material.color.set(colors[phase][0]);
    lightsRef.current.children[1].material.color.set(colors[phase][1]);
    lightsRef.current.children[2].material.color.set(colors[phase][2]);
  });
  
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <Cylinder position={[0, 2, 0]} args={[0.1, 0.15, 4, 8]} color="#555555" />
      <Box position={[0, 4, 0]} args={[0.4, 1.2, 0.4]} color="#222222" />
      <group ref={lightsRef}>
        <Sphere position={[0, 4.4, 0.3]} args={[0.2, 8, 8]} color="#ff0000" />
        <Sphere position={[0, 4, 0.3]} args={[0.2, 8, 8]} color="#ffaa00" />
        <Sphere position={[0, 3.6, 0.3]} args={[0.2, 8, 8]} color="#00ff00" />
      </group>
    </group>
  );
}

// ============================================
// CITY FACILITY COMPONENTS
// ============================================

function AI_ControlCenter() {
  return (
    <group position={[0, 0, 0]}>
      <Box position={[0, 8, 0]} args={[12, 16, 12]} color="#1a2a3a" />
      <Box position={[0, 8, 6.01]} args={[10, 14, 0.1]} color="#00aaff" transparent opacity={0.5} />
      <Cylinder position={[0, 16, 0]} args={[3, 4, 6, 16]} color="#00ccff" />
      <Cylinder position={[0, 22, 0]} args={[0.2, 0.2, 6, 8]} color="#ffffff" />
      <Sphere position={[0, 25, 0]} args={[0.6, 12, 12]} color="#ff4444" emissive="#ff0000" emissiveIntensity={0.8} />
      <Box position={[-9, 4, 0]} args={[4, 8, 8]} color="#2a3a4a" />
      <Box position={[9, 4, 0]} args={[4, 8, 8]} color="#2a3a4a" />
      <Box position={[0, -0.25, 0]} args={[18, 0.5, 18]} color="#333333" />
    </group>
  );
}

function Hospital() {
  return (
    <group position={[-15, 0, 5]}>
      <Box position={[0, 8, 0]} args={[10, 16, 8]} color="#e8e8e8" />
      <Box position={[0, 4, 4]} args={[8, 8, 0.1]} color="#ffffff" transparent opacity={0.7} />
      <Box position={[-4, 2, 4]} args={[3, 4, 2]} color="#ffffff" />
      <Box position={[-4, 4, 5]} args={[3, 0.5, 0.5]} color="#ff4444" />
      <Box position={[2, 1, 5]} args={[4, 2, 3]} color="#ffdddd" />
      <Box position={[2, 2.5, 5]} args={[4, 0.3, 3]} color="#ff4444" />
      <Box position={[3, 16.5, -1]} args={[3, 1, 3]} color="#999999" />
      <Cylinder position={[-3, 16.5, -2]} args={[1, 1, 2, 8]} color="#aaaaaa" />
      <Sphere position={[0, 16.5, 0]} args={[3, 8, 8]} color="#66aa66" />
      <Box position={[0, 16.7, 0]} args={[5, 0.1, 1]} color="#ffffff" />
      <Box position={[0, 10, 4.1]} args={[6, 1, 0.1]} color="#ff4444" />
      
      <Ambulance position={[5, 0, -10]} target={[2, 0, 3]} speed={0.4} />
      
      <Tree position={[6, 0, 3]} scale={0.8} />
      <Tree position={[-7, 0, 3]} scale={0.9} />
    </group>
  );
}

function VerticalFarm() {
  return (
    <group position={[10, 0, 0]}>
      <Box position={[0, 10, 0]} args={[8, 20, 6]} color="#2d5a27" />
      
      {[2, 5, 8, 11, 14, 17].map((y) => (
        <group key={y}>
          <Box position={[0, y, 0]} args={[8, 0.2, 6]} color="#1a3a15" />
          <Box position={[0, y + 0.2, 0]} args={[7, 0.3, 5]} color="#44aa33" />
        </group>
      ))}
      
      <Cylinder position={[-4.5, 10, 0]} args={[0.2, 0.2, 20, 8]} color="#00aaff" />
      <Cylinder position={[4.5, 10, 0]} args={[0.2, 0.2, 20, 8]} color="#00aaff" />
      
      <Box position={[0, 20, 0]} args={[8, 0.3, 6]} color="#003366" />
      <Box position={[0, 20, 0]} args={[8, 0.1, 6]} color="#66aaff" transparent opacity={0.6} />
      <Box position={[5, 8, 0]} args={[2, 0.5, 5]} color="#44aa33" />
      <Box position={[5, 12, 0]} args={[2, 0.5, 5]} color="#44aa33" />
    </group>
  );
}

function SewageTreatment() {
  return (
    <group position={[25, 0, 0]}>
      <Cylinder position={[-5, 2, 0]} args={[3, 3, 4, 16]} color="#555555" />
      <Cylinder position={[0, 2, 0]} args={[3, 3, 4, 16]} color="#555555" />
      <Cylinder position={[5, 2, 0]} args={[3, 3, 4, 16]} color="#555555" />
      
      <Box position={[-5, 5, 0]} args={[2, 2, 2]} color="#888888" />
      <Box position={[0, 5, 0]} args={[2, 2, 2]} color="#888888" />
      <Box position={[5, 5, 0]} args={[2, 2, 2]} color="#888888" />
      
      <Cylinder position={[-2.5, 2, 0]} args={[0.3, 0.3, 5, 8]} rotation={[0, 0, Math.PI / 2]} color="#00aaff" />
      <Cylinder position={[2.5, 2, 0]} args={[0.3, 0.3, 5, 8]} rotation={[0, 0, Math.PI / 2]} color="#00aaff" />
      
      <Cylinder position={[10, 3, 0]} args={[4, 4, 6, 16]} color="#0066aa" />
      <Cylinder position={[10, 6, 0]} args={[4, 4, 0.5, 16]} color="#00aaff" />
      <Box position={[10, 7, 0]} args={[6, 4, 4]} color="#333333" />
      <Box position={[-8, 1, 0]} args={[2, 2, 2]} color="#ffaa00" />
      <Box position={[8, 1, 0]} args={[2, 2, 2]} color="#ffaa00" />
    </group>
  );
}

function SolarEnergy() {
  const panels = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      panels.push({ position: [-25 + i * 6, 1, -15 + j * 6] });
    }
  }
  
  return (
    <group>
      {panels.map((panel, index) => (
        <group key={index} position={panel.position} rotation={[0.3, 0, 0]}>
          <Box position={[0, 0, 0]} args={[4, 0.2, 3]} color="#003366" />
          <Box position={[0, 0.1, 0]} args={[3.8, 0.1, 2.8]} color="#66aaff" transparent opacity={0.6} />
        </group>
      ))}
      
      <Box position={[-28, 2, -18]} args={[4, 4, 2]} color="#444444" />
      <Box position={[-28, 3.5, -18]} args={[3, 1, 1.5]} color="#ffaa00" />
      <Cylinder position={[-28, 8, -18]} args={[0.5, 0.8, 12, 8]} color="#888888" />
      <Box position={[-28, 14, -18]} args={[3, 2, 2]} color="#333333" />
      <Sphere position={[-28, 5, -18]} args={[0.5, 8, 8]} color="#ffdd00" emissive="#ffaa00" emissiveIntensity={0.8} />
    </group>
  );
}

function WasteManagement() {
  return (
    <group position={[35, 0, -15]}>
      <Box position={[0, 4, 0]} args={[10, 8, 8]} color="#667766" />
      <Box position={[0, 8, 0]} args={[10, 0.3, 8]} color="#556655" />
      <Box position={[8, 2, 0]} args={[4, 0.5, 2]} color="#888888" />
      <Sphere position={[8, 2.5, 0]} args={[0.3, 8, 8]} color="#ffaa00" />
      
      <Box position={[-5, 1, 4]} args={[2, 2, 2]} color="#00aa44" />
      <Box position={[-5, 1, 0]} args={[2, 2, 2]} color="#0088ff" />
      <Box position={[-5, 1, -4]} args={[2, 2, 2]} color="#ffaa00" />
      
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} position={[-15 + i * 4, 0.5, 5]}>
          <Box args={[2, 1, 1.5]} color="#334455" />
          <Box position={[0, 1, 0]} args={[1.5, 0.5, 1]} color="#ff4444" />
          <Sphere position={[0, 1.8, 0]} args={[0.15, 8, 8]} color={i % 2 === 0 ? '#00ff00' : '#ffff00'} />
        </group>
      ))}
      
      <Car position={[0, 0, 10]} direction={[1, 0, 0]} speed={0.04} color="#ff8800" />
    </group>
  );
}

function TrafficSystem() {
  return (
    <group>
      <TrafficLight position={[2, 0, 2]} rotation={Math.PI / 4} />
      <TrafficLight position={[-2, 0, 2]} rotation={-Math.PI / 4} />
      <TrafficLight position={[2, 0, -2]} rotation={Math.PI / 4} />
      <TrafficLight position={[-2, 0, -2]} rotation={-Math.PI / 4} />
      
      <Box position={[0, 8, 0]} args={[2, 1, 1]} color="#333333" />
      <Cylinder position={[0, 8, 0.5]} args={[0.3, 0.3, 0.8, 8]} color="#666666" />
      <Sphere position={[0, 8, 1]} args={[0.2, 8, 8]} color="#ff4444" emissive="#ff0000" emissiveIntensity={0.5} />
      
      <Car position={[-40, 0, 0]} direction={[1, 0, 0]} speed={0.15} color="#ff4444" />
      <Car position={[40, 0, 0]} direction={[-1, 0, 0]} speed={0.12} color="#44aaff" />
      <Car position={[0, 0, -40]} direction={[0, 0, 1]} speed={0.13} color="#44ffaa" />
      <Car position={[0, 0, 40]} direction={[0, 0, -1]} speed={0.11} color="#ff44aa" />
      <Car position={[-20, 0, -20]} direction={[1, 0, 1]} speed={0.09} color="#ffaa44" />
      <Car position={[20, 0, 20]} direction={[-1, 0, -1]} speed={0.10} color="#aa44ff" />
    </group>
  );
}

function PublicTransport() {
  return (
    <group position={[0, 0, -20]}>
      <Box position={[0, 2, 0]} args={[12, 4, 4]} color="#334455" />
      <Box position={[0, 4, 0]} args={[12, 0.3, 4]} color="#445566" />
      <Box position={[-4, 4, 2]} args={[3, 1.5, 0.2]} color="#222222" />
      <Box position={[-4, 4, 2.1]} args={[2.8, 1.3, 0.1]} color="#00ff88" />
      
      <Box position={[4, 1, 2]} args={[2, 2, 1]} color="#555555" />
      <Box position={[4, 2, 2]} args={[1, 1, 0.5]} color="#00ff00" />
      <Box position={[6, 1, 2]} args={[2, 2, 1]} color="#555555" />
      <Box position={[6, 2, 2]} args={[1, 1, 0.5]} color="#00ff00" />
      
      <Box position={[0, 0.05, 6]} args={[240, 0.1, 3]} color="#006633" />
      
      <Bus position={[-40, 0, 6]} direction={[1, 0, 0]} speed={0.08} />
      <Bus position={[40, 0, 6]} direction={[-1, 0, 0]} speed={0.06} />
    </group>
  );
}

function School() {
  return (
    <group position={[20, 0, -10]}>
      <Box position={[0, 4, 0]} args={[12, 8, 8]} color="#e8d8c8" />
      <Box position={[0, 8, 0]} args={[12, 0.3, 8]} color="#d8c8b8" />
      <Box position={[0, 8.2, 0]} args={[11, 0.3, 7]} color="#44aa33" />
      
      <Box position={[3, 8.5, 2]} args={[4, 0.2, 3]} color="#003366" />
      <Box position={[3, 8.5, 2]} args={[3.8, 0.1, 2.8]} color="#66aaff" transparent opacity={0.6} />
      
      <Box position={[0, 0.3, 6]} args={[8, 0.5, 4]} color="#ffaa55" />
      <Cylinder position={[-2, 2, 6]} args={[0.2, 0.2, 4, 8]} color="#666666" />
      <Sphere position={[-2, 4, 6]} args={[0.5, 8, 8]} color="#ff4444" />
      
      <Box position={[0, 1, 4.5]} args={[4, 2, 0.5]} color="#ffffff" />
      <Box position={[0, 0.2, 5]} args={[4, 0.4, 1]} color="#88ccff" />
      
      <Box position={[5, 5, 4.1]} args={[3, 2, 0.1]} color="#222222" />
      <Box position={[5, 5, 4.15]} args={[2.8, 1.8, 0.05]} color="#44aaff" />
      
      <Tree position={[7, 0, 3]} scale={0.8} />
      <Tree position={[-7, 0, 3]} scale={0.9} />
    </group>
  );
}

function Park() {
  return (
    <group position={[-15, 0, 10]}>
      <Box position={[0, 0.1, 0]} args={[20, 0.2, 15]} color="#44aa33" />
      <Box position={[0, 0.2, 0]} args={[2, 0.1, 15]} color="#cccccc" />
      <Box position={[0, 0.2, 0]} args={[20, 0.1, 2]} color="#cccccc" />
      
      <Tree position={[-5, 0.5, -4]} scale={1.2} />
      <Tree position={[6, 0.5, -5]} scale={1.0} />
      <PineTree position={[-7, 0.5, 5]} scale={1.3} />
      <PineTree position={[5, 0.5, 6]} scale={1.1} />
      
      <Box position={[4, 0.5, -2]} args={[4, 0.2, 4]} color="#ffaa55" />
      <Cylinder position={[4, 2, -2]} args={[0.2, 0.2, 4, 8]} color="#666666" />
      <Sphere position={[4, 4, -2]} args={[0.8, 8, 8]} color="#ff4444" />
      
      <Box position={[-3, 0.5, 0]} args={[2, 0.5, 1]} color="#8B4513" />
      <Box position={[3, 0.5, 3]} args={[2, 0.5, 1]} color="#8B4513" />
      
      <Sphere position={[0, 0.3, 5]} args={[2, 16, 16]} color="#4488aa" transparent opacity={0.7} />
    </group>
  );
}

function AccessibilityZone() {
  return (
    <group position={[10, 0, 5]}>
      <Box position={[0, 3, 0]} args={[6, 6, 6]} color="#ccaa88" />
      <Box position={[0, 6, 0]} args={[6, 0.3, 6]} color="#aa8866" />
      <Box position={[0, 1, 3]} args={[4, 2, 0.5]} color="#ffffff" />
      
      <Box position={[2, 0.3, 4]} args={[3, 0.6, 2]} color="#88ccff" />
      <Box position={[2, 0.6, 3]} args={[3, 0.3, 1]} color="#88ccff" />
      
      <Box position={[0, 0.15, 5]} args={[4, 0.1, 0.5]} color="#ffaa00" />
      <Box position={[0, 0.15, 7]} args={[3, 0.1, 0.3]} color="#ffaa00" />
      
      <Box position={[2, 4, 3.1]} args={[2, 1, 0.1]} color="#ffffff" />
      <Box position={[2, 4, 3.15]} args={[1.8, 0.8, 0.05]} color="#0000ff" />
      
      <Box position={[-4, 0.5, 0]} args={[2, 0.5, 1]} color="#8B4513" />
      <Box position={[3, 2, 0]} args={[2, 4, 2]} color="#888888" />
      
      <Box position={[-5, 0.15, 3]} args={[3, 0.1, 4]} color="#ffffff" />
    </group>
  );
}

function Residential() {
  return (
    <group position={[30, 0, 15]}>
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[i * 8 - 12, 0, 0]}>
          <Box position={[0, 8, 0]} args={[6, 16, 6]} color={i % 2 === 0 ? '#ccbbaa' : '#aabbcc'} />
          <Box position={[0, 16, 0]} args={[6, 0.3, 6]} color="#998877" />
          {[1, 3, 5, 7, 9, 11, 13, 15].map((y) => (
            <Box key={y} position={[0, y, 3]} args={[4, 0.8, 0.1]} color="#88ccff" />
          ))}
        </group>
      ))}
      
      <Tree position={[-15, 0, -3]} scale={1.0} />
      <Tree position={[15, 0, -3]} scale={1.1} />
      <Tree position={[0, 0, -3]} scale={0.9} />
      
      <Box position={[0, 2, -5]} args={[10, 4, 4]} color="#ddccbb" />
    </group>
  );
}

function Commercial() {
  return (
    <group position={[-30, 0, 15]}>
      <Box position={[0, 5, 0]} args={[5, 10, 5]} color="#88aacc" />
      <Box position={[-8, 7, 0]} args={[4, 14, 4]} color="#88aacc" />
      <Box position={[8, 6, 0]} args={[5, 12, 5]} color="#88aacc" />
      
      <Box position={[0, 3, -6]} args={[15, 6, 8]} color="#dddddd" />
      <Box position={[0, 6, -6]} args={[15, 0.3, 8]} color="#cccccc" />
      <Box position={[0, 2, -2]} args={[14, 3, 0.2]} color="#ffaa00" transparent opacity={0.5} />
      
      <Box position={[12, 3, -6]} args={[6, 6, 8]} color="#aaaacc" />
      {[1, 3, 5].map((y) => (
        <Box key={y} position={[12, y, -2]} args={[5, 0.2, 0.5]} color="#888899" />
      ))}
      
      <Cylinder position={[-10, 3, 8]} args={[0.1, 0.15, 6, 8]} color="#555555" />
      <Cylinder position={[10, 3, 8]} args={[0.1, 0.15, 6, 8]} color="#555555" />
    </group>
  );
}

function Ambient() {
  return (
    <group>
      <Box position={[0, -0.5, 0]} args={[200, 1, 200]} color="#1a1a2e" />
      <Cylinder position={[15, 2, 20]} args={[5, 5, 4, 16]} color="#0066aa" />
      <Cylinder position={[15, 4, 20]} args={[4.5, 5, 0.5, 16]} color="#00aaff" />
      
      <Box position={[20, 1, 5]} args={[2, 2, 2]} color="#0066aa" />
      <Box position={[-5, 5, -20]} args={[3, 3, 3]} color="#4488aa" />
      <Box position={[-25, 3, -10]} args={[8, 6, 6]} color="#ff4444" />
      
      <Box position={[0, 0.05, 30]} args={[100, 0.1, 2]} color="#44aa33" />
      <Box position={[0, 0.05, -30]} args={[100, 0.1, 2]} color="#44aa33" />
      <Box position={[30, 0.05, 0]} args={[2, 0.1, 100]} color="#44aa33" />
      <Box position={[-30, 0.05, 0]} args={[2, 0.1, 100]} color="#44aa33" />
    </group>
  );
}

// ============================================
// ROADS
// ============================================

function Roads() {
  return (
    <group>
      <Box position={[0, 0.05, 0]} args={[240, 0.1, 8]} color="#444444" />
      <Box position={[0, 0.05, 0]} args={[8, 0.1, 240]} color="#444444" />
      <Box position={[-40, 0.05, -40]} args={[4, 0.1, 120]} color="#444444" />
      <Box position={[40, 0.05, -40]} args={[4, 0.1, 120]} color="#444444" />
      <Box position={[-40, 0.05, 40]} args={[4, 0.1, 120]} color="#444444" />
      <Box position={[40, 0.05, 40]} args={[4, 0.1, 120]} color="#444444" />
      
      <Box position={[0, 0.06, 0]} args={[12, 0.02, 12]} color="#333333" />
      
      <Box position={[0, 0.03, 4.5]} args={[240, 0.1, 1]} color="#555555" />
      <Box position={[0, 0.03, -4.5]} args={[240, 0.1, 1]} color="#555555" />
      <Box position={[4.5, 0.03, 0]} args={[1, 0.1, 240]} color="#555555" />
      <Box position={[-4.5, 0.03, 0]} args={[1, 0.1, 240]} color="#555555" />
    </group>
  );
}

// ============================================
// CAMERA CONTROLLER
// ============================================

function CameraRig({ target }) {
  const { camera } = useThree();
  
  useEffect(() => {
    const facility = FACILITIES.find(f => f.id === target);
    if (facility) {
      camera.position.set(...facility.position);
      camera.lookAt(...facility.target);
    }
  }, [target, camera]);
  
  return null;
}

// ============================================
// MAIN CITY SCENE
// ============================================

function CityScene({ selectedFacility }) {
  return (
    <Canvas
      camera={{ position: [80, 60, 80], fov: 60 }}
      shadows
      dpr={[1, 2]}
    >
      <color attach="background" args={['#0a0e1a']} />
      
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[50, 80, 50]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 30, 0]} intensity={0.5} color="#00aaff" />
      
      <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
      <Sky distance={450000} sunPosition={[100, 50, 100]} />
      
      <Roads />
      <Ambient />
      
      <AI_ControlCenter />
      <Hospital />
      <VerticalFarm />
      <SewageTreatment />
      <SolarEnergy />
      <WasteManagement />
      <TrafficSystem />
      <PublicTransport />
      <School />
      <Park />
      <AccessibilityZone />
      <Residential />
      <Commercial />
      
      <Tree position={[-40, 0.5, 40]} scale={0.8} />
      <PineTree position={[40, 0.5, 40]} scale={1.2} />
      <Tree position={[-40, 0.5, -40]} scale={1.0} />
      <PineTree position={[40, 0.5, -40]} scale={0.9} />
      
      <CameraRig target={selectedFacility} />
      
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={10}
        maxDistance={200}
      />
    </Canvas>
  );
}

// ============================================
// UI COMPONENTS
// ============================================

function Dashboard() {
  const [cityStatus, setCityStatus] = useState({
    online: true,
    traffic: 'AI OPTIMIZED',
    energy: 'RENEWABLE',
    water: 'RECYCLING ACTIVE',
    waste: 'SMART COLLECTION',
    transport: 'ACTIVE',
    emergency: 'READY'
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCityStatus(prev => ({
        ...prev,
        energy: Math.random() > 0.1 ? 'RENEWABLE' : 'STORAGE',
        traffic: Math.random() > 0.05 ? 'AI OPTIMIZED' : 'MONITORING'
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '320px',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      borderRadius: '12px',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      padding: '20px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      zIndex: 1000
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#38bdf8', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        BSS WORLD — CITY STATUS
      </h3>
      
      {[
        ['City Status', cityStatus.online ? 'ONLINE' : 'OFFLINE'],
        ['Traffic', cityStatus.traffic],
        ['Energy', cityStatus.energy],
        ['Water', cityStatus.water],
        ['Waste', cityStatus.waste],
        ['Transport', cityStatus.transport],
        ['Emergency', cityStatus.emergency]
      ].map(([label, value]) => (
        <div key={label} style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '8px 0',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>{label}</span>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#4ade80' }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function Navigation({ onSelect, selected }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '8px',
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(12px)',
      padding: '12px 20px',
      borderRadius: '50px',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      zIndex: 1000,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      overflowX: 'auto',
      maxWidth: '90vw'
    }}>
      {FACILITIES.map((facility) => (
        <button
          key={facility.id}
          onClick={() => onSelect(facility.id)}
          style={{
            background: selected === facility.id ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
            border: `1px solid ${selected === facility.id ? '#38bdf8' : 'rgba(148, 163, 184, 0.5)'}`,
            color: selected === facility.id ? '#38bdf8' : '#94a3b8',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '13px',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap'
          }}
        >
          {facility.icon} {facility.name}
        </button>
      ))}
    </div>
  );
}

function InfoPanel({ facilityId, onClose }) {
  const info = FACILITY_INFO[facilityId];
  
  if (!info) return null;
  
  return (
    <div style={{
      position: 'fixed',
      left: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '340px',
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(12px)',
      borderRadius: '12px',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      padding: '24px',
      zIndex: 1000,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      maxHeight: '70vh',
      overflowY: 'auto'
    }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(239, 68, 68, 0.2)',
          border: 'none',
          color: '#f87171',
          fontSize: '18px',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
      >
        ×
      </button>
      
      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#38bdf8', marginBottom: '12px' }}>
        {info.name}
      </h3>
      
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
          Purpose
        </div>
        <div style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: '1.6' }}>
          {info.purpose}
        </div>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
          Sustainability
        </div>
        <div style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: '1.6' }}>
          {info.sustainability}
        </div>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
          Technology
        </div>
        <div style={{ fontSize: '14px', color: '#e2e8f0', lineHeight: '1.6' }}>
          {info.technology}
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN APP
// ============================================

export default function App() {
  const [selectedFacility, setSelectedFacility] = useState('overview');
  const [showInfo, setShowInfo] = useState(false);
  
  const handleFacilitySelect = (id) => {
    setSelectedFacility(id);
    setShowInfo(id !== 'overview' && !!FACILITY_INFO[id]);
  };
  
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <CityScene selectedFacility={selectedFacility} />
      
      <Dashboard />
      
      <Navigation onSelect={handleFacilitySelect} selected={selectedFacility} />
      
      {showInfo && (
        <InfoPanel 
          facilityId={selectedFacility} 
          onClose={() => {
            setSelectedFacility('overview');
            setShowInfo(false);
          }}
        />
      )}
      
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.8)',
        padding: '12px 20px',
        borderRadius: '8px',
        border: '1px solid rgba(56, 189, 248, 0.3)'
      }}>
        <h1 style={{ fontSize: '24px', color: '#38bdf8', margin: 0 }}>BSS WORLD</h1>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>Smart Sustainable City</p>
      </div>
    </div>
  );
}

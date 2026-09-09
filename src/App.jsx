import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Sky } from '@react-three/drei';
import * as THREE from 'three';

// ============================================
// DATA & CONFIGURATION
// ============================================

const FACILITIES = [
  { id: 'overview', name: 'Overview', icon: '🌆', position: [100, 80, 100], target: [0, 15, 0] },
  { id: 'ai-control', name: 'AI Control', icon: '🤖', position: [15, 25, 35], target: [0, 12, 0] },
  { id: 'hospital', name: 'Hospital', icon: '🏥', position: [-35, 20, 25], target: [-20, 8, 5] },
  { id: 'farm', name: 'Vertical Farm', icon: '🌱', position: [25, 18, 20], target: [15, 12, 0] },
  { id: 'sewage', name: 'Sewage Plant', icon: '💧', position: [45, 15, 15], target: [35, 5, 0] },
  { id: 'solar', name: 'Solar Energy', icon: '☀️', position: [-25, 20, -25], target: [-30, 5, -20] },
  { id: 'traffic', name: 'AI Traffic', icon: '🚦', position: [5, 18, 30], target: [0, 4, 0] },
  { id: 'waste', name: 'Smart Waste', icon: '♻️', position: [55, 15, -15], target: [45, 4, -10] },
  { id: 'school', name: 'School', icon: '🏫', position: [35, 15, -5], target: [25, 6, -5] },
  { id: 'park', name: 'Green Park', icon: '🌳', position: [-30, 18, 10], target: [-20, 4, 5] },
  { id: 'access', name: 'Accessibility', icon: '♿', position: [20, 12, 12], target: [12, 3, 6] },
];

const FACILITY_INFO = {
  'ai-control': {
    name: 'AI City Control Center',
    purpose: 'Central brain managing all city operations through real-time AI analysis',
    sustainability: 'Optimizes energy, water, and waste across the entire city',
    technology: 'AI algorithms, IoT sensors, Machine Learning, Neural Networks, Digital Twins',
    status: 'ONLINE',
  },
  'hospital': {
    name: 'Smart Hospital',
    purpose: 'Advanced healthcare facility with emergency response and telemedicine',
    sustainability: 'Energy-efficient systems, medical waste reduction, green design',
    technology: 'AI diagnostics, IoT patient monitoring, Autonomous ambulances',
    status: 'ACTIVE',
  },
  'farm': {
    name: 'Vertical Farming District',
    purpose: 'Local food production in urban environment for food security',
    sustainability: '90% less water, 95% less land, zero pesticides',
    technology: 'Hydroponics, LED growth lighting, AI climate control, Robotic harvesting',
    status: 'GROWING',
  },
  'sewage': {
    name: 'Sewage Treatment Plant',
    purpose: 'Water recycling and waste management for the entire city',
    sustainability: 'Recycled water for irrigation and cooling, reduced freshwater demand',
    technology: 'Membrane filtration, UV purification, AI process control',
    status: 'RECYCLING',
  },
  'solar': {
    name: 'Solar Energy District',
    purpose: 'Renewable energy generation for the entire city grid',
    sustainability: 'Zero-emission power source, reduces carbon footprint by 60%',
    technology: 'Photovoltaic cells, Smart grid, Battery storage, AI load balancing',
    status: 'PRODUCING',
  },
  'traffic': {
    name: 'AI Traffic System',
    purpose: 'Intelligent traffic management and flow optimization',
    sustainability: 'Reduces emissions by 30% through optimized routing',
    technology: 'Computer vision, predictive analytics, Adaptive signals, V2X communication',
    status: 'OPTIMIZED',
  },
  'waste': {
    name: 'Smart Waste Management',
    purpose: 'Automated waste collection, sorting, and recycling',
    sustainability: '95% waste diversion from landfill, circular economy',
    technology: 'Smart bins, AI sorting, Route optimization, Automated collection',
    status: 'ACTIVE',
  },
  'school': {
    name: 'Smart School',
    purpose: 'Modern education for future generations with AI-assisted learning',
    sustainability: 'Green roof, solar power, natural lighting, water recycling',
    technology: 'Smart classrooms, Interactive learning, AI tutoring, Smart monitoring',
    status: 'EDUCATING',
  },
  'park': {
    name: 'Green Park',
    purpose: 'Community recreation and biodiversity hub',
    sustainability: 'Carbon capture, urban cooling, habitat for biodiversity',
    technology: 'Smart irrigation, Environmental monitoring, Smart lighting',
    status: 'THRIVING',
  },
  'access': {
    name: 'Accessibility Zone',
    purpose: 'Inclusive public spaces designed for all abilities',
    sustainability: 'Universal design, reduced barriers, inclusive infrastructure',
    technology: 'Assistive technologies, Smart navigation, Audio guidance',
    status: 'ACCESSIBLE',
  },
};

// ============================================
// ADVANCED PROCEDURAL GEOMETRY COMPONENTS
// ============================================

function AdvancedBuilding({ position, width = 5, height = 10, depth = 5, color = '#8a8a8a', glassRatio = 0.4 }) {
  const [w, h, d] = [width, height, depth];
  
  return (
    <group position={position}>
      {/* Main building body */}
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.3} />
      </mesh>
      
      {/* Glass facade sections */}
      {[-1, 0, 1].map((faceIndex) => (
        <mesh key={faceIndex} position={[0, h / 2, faceIndex * (d / 2 + 0.01)]}>
          <boxGeometry args={[w * 0.9, h * glassRatio, 0.05]} />
          <meshStandardMaterial 
            color="#88ccff" 
            transparent 
            opacity={0.6} 
            emissive="#4488aa"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
      
      {/* Windows pattern */}
      {Array.from({ length: Math.floor(h / 2) }).map((_, floor) => (
        <group key={floor} position={[0, 1 + floor * 2, d / 2 + 0.02]}>
          {[-1, 1].map((windowPos) => (
            <mesh key={windowPos} position={[windowPos * (w / 4), 0, 0]}>
              <boxGeometry args={[1.2, 0.8, 0.05]} />
              <meshStandardMaterial color="#aaddff" emissive="#4488aa" emissiveIntensity={0.4} />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Roof structure */}
      <mesh position={[0, h + 0.3, 0]} castShadow>
        <boxGeometry args={[w * 0.8, 0.4, d * 0.8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      
      {/* Roof equipment */}
      {Math.random() > 0.5 && (
        <mesh position={[w * 0.2, h + 0.8, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 1, 8]} />
          <meshStandardMaterial color="#999999" />
        </mesh>
      )}
    </group>
  );
}

function Skyscraper({ position, height = 20 }) {
  return (
    <group position={position}>
      {/* Main tower */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[6, height, 6]} />
        <meshStandardMaterial color="#9aa8b8" roughness={0.4} metalness={0.5} />
      </mesh>
      
      {/* Glass sections */}
      {[0, 2, 4].map((offset) => (
        <mesh key={offset} position={[0, height * 0.3 + offset, 3.01]}>
          <boxGeometry args={[5, height * 0.2, 0.05]} />
          <meshStandardMaterial 
            color="#66aadd" 
            transparent 
            opacity={0.5} 
            emissive="#4488aa"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* Tapered top */}
      <mesh position={[0, height + 1, 0]}>
        <coneGeometry args={[3.5, 4, 4]} />
        <meshStandardMaterial color="#7788aa" />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, height + 5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 6, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Red beacon */}
      <mesh position={[0, height + 8, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function GlassTower({ position, height = 15 }) {
  return (
    <group position={position}>
      {/* Glass body */}
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[5, height, 5]} />
        <meshStandardMaterial 
          color="#88aadd" 
          transparent 
          opacity={0.7} 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Interior structure */}
      {Array.from({ length: Math.floor(height / 3) }).map((_, i) => (
        <mesh key={i} position={[0, 1.5 + i * 3, 0]}>
          <boxGeometry args={[5.1, 0.2, 5.1]} />
          <meshStandardMaterial color="#556677" />
        </mesh>
      ))}
      
      {/* Reflective surface */}
      <mesh position={[0, height / 2, 2.51]}>
        <planeGeometry args={[5, height]} />
        <meshStandardMaterial 
          color="#aaccff" 
          metalness={0.9} 
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

function ResidentialBuilding({ position, floors = 8 }) {
  const buildingColor = Math.random() > 0.5 ? '#c8b8a8' : '#a8b8c8';
  
  return (
    <group position={position}>
      {/* Body */}
      <mesh position={[0, floors * 2, 0]} castShadow>
        <boxGeometry args={[7, floors * 2, 7]} />
        <meshStandardMaterial color={buildingColor} roughness={0.8} />
      </mesh>
      
      {/* Balconies */}
      {Array.from({ length: floors }).map((_, floor) => (
        <group key={floor} position={[0, 1 + floor * 2, 3.6]}>
          <mesh>
            <boxGeometry args={[6, 0.3, 0.8]} />
            <meshStandardMaterial color="#dddddd" />
          </mesh>
          {/* Railing */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[5.8, 0.2, 0.1]} />
            <meshStandardMaterial color="#999999" />
          </mesh>
        </group>
      ))}
      
      {/* Roof */}
      <mesh position={[0, floors * 2 + 0.3, 0]}>
        <boxGeometry args={[7.2, 0.4, 7.2]} />
        <meshStandardMaterial color="#887766" />
      </mesh>
    </group>
  );
}

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 2, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.8, 0]}>
        <sphereGeometry args={[1.4, 8, 8]} />
        <meshStandardMaterial color="#228B22" roughness={0.8} />
      </mesh>
      <mesh position={[0.4, 3.2, 0.3]}>
        <sphereGeometry args={[0.9, 8, 8]} />
        <meshStandardMaterial color="#2E8B57" roughness={0.8} />
      </mesh>
    </group>
  );
}

function PineTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 2, 8]} />
        <meshStandardMaterial color="#5C4033" />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[1.2, 2.5, 8]} />
        <meshStandardMaterial color="#006400" />
      </mesh>
      <mesh position={[0, 4, 0]}>
        <coneGeometry args={[0.8, 2, 8]} />
        <meshStandardMaterial color="#008000" />
      </mesh>
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
    if (ref.current.position.x > 80) ref.current.position.x = -80;
    if (ref.current.position.x < -80) ref.current.position.x = 80;
    if (ref.current.position.z > 80) ref.current.position.z = -80;
    if (ref.current.position.z < -80) ref.current.position.z = 80;
  });
  
  return (
    <group ref={ref} position={position}>
      {/* Body */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[2.2, 0.5, 1.2]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1.4, 0.6, 1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      {/* Wheels */}
      {[[-0.8, 0, 0.7], [-0.8, 0, -0.7], [0.8, 0, 0.7], [0.8, 0, -0.7]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 8]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      ))}
      {/* Headlights */}
      <mesh position={[1.1, 0.4, 0.4]}>
        <boxGeometry args={[0.1, 0.2, 0.2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Bus({ position, direction = [1, 0, 0], speed = 0.08 }) {
  const ref = useRef();
  
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.position.x += direction[0] * speed * delta;
    ref.current.position.z += direction[2] * speed * delta;
    
    if (ref.current.position.x > 80) ref.current.position.x = -80;
    if (ref.current.position.x < -80) ref.current.position.x = 80;
    if (ref.current.position.z > 80) ref.current.position.z = -80;
    if (ref.current.position.z < -80) ref.current.position.z = 80;
  });
  
  return (
    <group ref={ref} position={position}>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[6, 2.2, 2.5]} />
        <meshStandardMaterial color="#00aa44" />
      </mesh>
      <mesh position={[0, 2.8, 0]}>
        <boxGeometry args={[5.5, 1, 2.3]} />
        <meshStandardMaterial color="#88ff88" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-2.8, 0.5, 0]}>
        <boxGeometry args={[1, 1, 2.2]} />
        <meshStandardMaterial color="#006633" />
      </mesh>
      {/* Route display */}
      <mesh position={[0, 3.2, 2.5]}>
        <boxGeometry args={[1, 0.4, 0.1]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
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
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[3, 1.5, 1.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[2, 0.8, 1.3]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-1.2, 1.8, 0]}>
        <boxGeometry args={[0.5, 0.5, 1]} />
        <meshStandardMaterial color="#ff2222" />
      </mesh>
      <mesh position={[-1.5, 1.5, 0]}>
        <boxGeometry args={[0.3, 0.3, 1]} />
        <meshStandardMaterial color="#ff2222" />
      </mesh>
      {/* Emergency light */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[1, 0.3, 0.3]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={1} />
      </mesh>
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
    const phase = Math.floor(time / 4) % 3;
    
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
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 4, 8]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[0, 4.2, 0]}>
        <boxGeometry args={[0.5, 1.5, 0.5]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <group ref={lightsRef}>
        {[4.8, 4.2, 3.6].map((y, i) => (
          <mesh key={i} position={[0, y, 0.3]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ============================================
// SMART STREETLIGHT
// ============================================

function SmartStreetlight({ position, rotation = 0 }) {
  const lightRef = useRef();
  
  useFrame((state) => {
    if (!lightRef.current) return;
    
    // Subtle pulsing
    lightRef.current.material.emissiveIntensity = 
      0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
  });
  
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 6, 8]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[0.5, 6, 0]}>
        <boxGeometry args={[1, 0.2, 0.2]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh ref={lightRef} position={[0.9, 5.8, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial 
          color="#ffdd55" 
          emissive="#ffaa00" 
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

// ============================================
// AI CONTROL CENTER
// ============================================

function AIControlCenter() {
  const dataLinesRef = useRef([]);
  
  useFrame((state) => {
    // Animate data connections
    dataLinesRef.current.forEach((line, i) => {
      if (line) {
        line.rotation.y = state.clock.elapsedTime * (0.5 + i * 0.1);
      }
    });
  });
  
  return (
    <group position={[0, 0, 0]}>
      {/* Main building */}
      <mesh position={[0, 10, 0]} castShadow>
        <boxGeometry args={[14, 20, 14]} />
        <meshStandardMaterial color="#1a2a4a" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Glass facade */}
      <mesh position={[0, 10, 7.01]}>
        <boxGeometry args={[12, 18, 0.1]} />
        <meshStandardMaterial 
          color="#00aaff" 
          transparent 
          opacity={0.4} 
          emissive="#0066aa"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Central tower */}
      <mesh position={[0, 22, 0]}>
        <cylinderGeometry args={[3, 4, 8, 16]} />
        <meshStandardMaterial color="#00ccff" emissive="#00aaff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 28, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 8, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 32, 0]}>
        <sphereGeometry args={[0.8, 8, 8]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.8} />
      </mesh>
      
      {/* Side wings */}
      <mesh position={[-10, 6, 0]}>
        <boxGeometry args={[5, 12, 8]} />
        <meshStandardMaterial color="#2a3a5a" />
      </mesh>
      <mesh position={[10, 6, 0]}>
        <boxGeometry args={[5, 12, 8]} />
        <meshStandardMaterial color="#2a3a5a" />
      </mesh>
      
      {/* Base platform */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[22, 1, 22]} />
        <meshStandardMaterial color="#333344" />
      </mesh>
      
      {/* Holographic displays */}
      {[0, 2, 4, 6].map((i) => (
        <mesh key={i} position={[0, 14 + i, 0]}>
          <cylinderGeometry args={[2 - i * 0.3, 2 - i * 0.3, 0.05, 16]} />
          <meshStandardMaterial 
            color="#00ff88" 
            transparent 
            opacity={0.2} 
            emissive="#00ff88"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
      
      {/* Animated data connection rings */}
      {[0, 1, 2, 3].map((i) => (
        <mesh 
          key={i} 
          ref={(el) => (dataLinesRef.current[i] = el)} 
          position={[0, 5 + i * 3, 0]}
        >
          <torusGeometry args={[10, 0.1, 8, 32]} />
          <meshStandardMaterial 
            color="#00aaff" 
            transparent 
            opacity={0.5} 
            emissive="#00aaff"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// SMART HOSPITAL
// ============================================

function SmartHospital() {
  return (
    <group position={[-20, 0, 5]}>
      {/* Main hospital building */}
      <mesh position={[0, 10, 0]} castShadow>
        <boxGeometry args={[14, 20, 10]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.4} />
      </mesh>
      
      {/* Glass sections */}
      <mesh position={[0, 5, 5.01]}>
        <boxGeometry args={[10, 8, 0.1]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 14, 5.01]}>
        <boxGeometry args={[10, 8, 0.1]} />
        <meshStandardMaterial color="#88ccff" transparent opacity={0.5} />
      </mesh>
      
      {/* Emergency entrance */}
      <mesh position={[-5, 2, 5]}>
        <boxGeometry args={[4, 4, 2]} />
        <meshStandardMaterial color="#ffdddd" />
      </mesh>
      <mesh position={[-5, 4.5, 5]}>
        <boxGeometry args={[4, 0.5, 0.5]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Ambulance bay */}
      <mesh position={[2, 1, 5]}>
        <boxGeometry args={[5, 2, 3]} />
        <meshStandardMaterial color="#ffdddd" />
      </mesh>
      <mesh position={[2, 2.5, 5]}>
        <boxGeometry args={[5, 0.4, 3]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
      
      {/* Rooftop equipment */}
      <mesh position={[4, 20, -2]}>
        <boxGeometry args={[3, 1, 3]} />
        <meshStandardMaterial color="#999999" />
      </mesh>
      <mesh position={[-3, 20, 2]}>
        <cylinderGeometry args={[1, 1, 2, 8]} />
        <meshStandardMaterial color="#aaaaaa" />
      </mesh>
      
      {/* Helipad */}
      <mesh position={[0, 20.5, 0]}>
        <cylinderGeometry args={[4, 4, 0.3, 16]} />
        <meshStandardMaterial color="#66aa66" />
      </mesh>
      <mesh position={[0, 20.7, 0]}>
        <boxGeometry args={[6, 0.1, 1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Signage */}
      <mesh position={[0, 12, 5.1]}>
        <boxGeometry args={[8, 1.2, 0.1]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Animated ambulance */}
      <Ambulance position={[5, 0, -10]} target={[2, 0, 3]} speed={0.4} />
      
      {/* Landscaping */}
      <Tree position={[8, 0, 4]} scale={0.8} />
      <Tree position={[-9, 0, 4]} scale={0.9} />
      
      {/* Accessible ramp */}
      <mesh position={[5, 0.2, 5]}>
        <boxGeometry args={[3, 0.4, 2]} />
        <meshStandardMaterial color="#88ccff" />
      </mesh>
    </group>
  );
}

// ============================================
// VERTICAL FARM
// ============================================

function VerticalFarm() {
  const waterRef = useRef();
  const growLightsRef = useRef([]);
  
  useFrame((state) => {
    // Animate water circulation
    if (waterRef.current) {
      waterRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
    
    // Animate growing lights
    growLightsRef.current.forEach((light, i) => {
      if (light) {
        light.material.emissiveIntensity = 
          0.3 + Math.sin(state.clock.elapsedTime + i) * 0.2;
      }
    });
  });
  
  return (
    <group position={[15, 0, 0]}>
      {/* Main farm building */}
      <mesh position={[0, 12, 0]} castShadow>
        <boxGeometry args={[10, 24, 8]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.7} />
      </mesh>
      
      {/* Farming floors */}
      {[2, 5, 8, 11, 14, 17, 20].map((y, i) => (
        <group key={y}>
          {/* Floor platform */}
          <mesh position={[0, y, 0]}>
            <boxGeometry args={[10, 0.2, 8]} />
            <meshStandardMaterial color="#1a3a15" />
          </mesh>
          
          {/* Plants */}
          <mesh position={[0, y + 0.3, 0]}>
            <boxGeometry args={[9, 0.4, 7]} />
            <meshStandardMaterial 
              color="#44aa33" 
              emissive="#228822" 
              emissiveIntensity={0.3}
            />
          </mesh>
          
          {/* Growing lights */}
          <mesh 
            ref={(el) => (growLightsRef.current[i] = el)} 
            position={[0, y + 0.8, 0]}
          >
            <boxGeometry args={[9, 0.1, 7]} />
            <meshStandardMaterial 
              color="#ff88cc" 
              emissive="#ff66aa" 
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}
      
      {/* Water pipes */}
      <mesh position={[-5.5, 12, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 24, 8]} />
        <meshStandardMaterial color="#00aaff" />
      </mesh>
      <mesh position={[5.5, 12, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 24, 8]} />
        <meshStandardMaterial color="#00aaff" />
      </mesh>
      
      {/* Animated water */}
      <group ref={waterRef}>
        <mesh position={[0, 8, 0]}>
          <boxGeometry args={[1, 0.3, 0.5]} />
          <meshStandardMaterial color="#00ffff" transparent opacity={0.7} />
        </mesh>
      </group>
      
      {/* Rooftop solar panels */}
      <mesh position={[0, 24, 0]}>
        <boxGeometry args={[10, 0.3, 8]} />
        <meshStandardMaterial color="#003366" />
      </mesh>
      <mesh position={[0, 24.2, 0]}>
        <boxGeometry args={[9.5, 0.1, 7.5]} />
        <meshStandardMaterial color="#66aaff" transparent opacity={0.6} />
      </mesh>
      
      {/* Green terraces */}
      <mesh position={[6, 8, 0]}>
        <boxGeometry args={[2, 0.5, 6]} />
        <meshStandardMaterial color="#44aa33" />
      </mesh>
      <mesh position={[6, 14, 0]}>
        <boxGeometry args={[2, 0.5, 6]} />
        <meshStandardMaterial color="#44aa33" />
      </mesh>
    </group>
  );
}

// ============================================
// SEWAGE TREATMENT PLANT
// ============================================

function SewageTreatmentPlant() {
  const waterRef = useRef();
  
  useFrame((state) => {
    // Animate water flow
    if (waterRef.current) {
      waterRef.current.position.z = (state.clock.elapsedTime * 1.5) % 10 - 5;
    }
  });
  
  return (
    <group position={[35, 0, 0]}>
      {/* Circular treatment tanks */}
      {[-8, -3, 3, 8].map((x) => (
        <group key={x}>
          <mesh position={[x, 2, 0]}>
            <cylinderGeometry args={[3, 3, 4, 16]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          <mesh position={[x, 3.8, 0]}>
            <cylinderGeometry args={[2.5, 2.8, 0.5, 16]} />
            <meshStandardMaterial color="#777777" />
          </mesh>
          {/* Water in tank */}
          <mesh position={[x, 3.5, 0]}>
            <cylinderGeometry args={[2.2, 2.4, 0.3, 16]} />
            <meshStandardMaterial color="#44aaff" transparent opacity={0.7} />
          </mesh>
        </group>
      ))}
      
      {/* Filtration units */}
      {[-8, -3, 3, 8].map((x) => (
        <mesh key={x} position={[x, 5, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
      ))}
      
      {/* Connecting pipes */}
      <mesh position={[0, 2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 16, 8]} />
        <meshStandardMaterial color="#00aaff" />
      </mesh>
      
      {/* Animated water particles */}
      <group ref={waterRef}>
        <mesh position={[-5, 2, 0]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
        </mesh>
      </group>
      
      {/* Water storage tank */}
      <mesh position={[15, 3, 0]}>
        <cylinderGeometry args={[4, 4, 6, 16]} />
        <meshStandardMaterial color="#0066aa" />
      </mesh>
      <mesh position={[15, 6, 0]}>
        <cylinderGeometry args={[4, 4, 0.5, 16]} />
        <meshStandardMaterial color="#00aaff" />
      </mesh>
      
      {/* Control building */}
      <mesh position={[15, 8, 0]}>
        <boxGeometry args={[6, 4, 4]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Pumps */}
      <mesh position={[-10, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ffaa00" />
      </mesh>
      <mesh position={[12, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ffaa00" />
      </mesh>
    </group>
  );
}

// ============================================
// SOLAR ENERGY DISTRICT
// ============================================

function SolarEnergyDistrict() {
  const energyRef = useRef();
  
  useFrame((state) => {
    if (energyRef.current) {
      energyRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 2 + 3;
    }
  });
  
  // Generate solar panel array
  const panels = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        arr.push({
          position: [-30 + i * 5, 1, -20 + j * 5],
          rotation: [0.3, 0, 0]
        });
      }
    }
    return arr;
  }, []);
  
  return (
    <group>
      {/* Solar farm panels */}
      {panels.map((panel, index) => (
        <group key={index} position={panel.position} rotation={panel.rotation}>
          <mesh castShadow>
            <boxGeometry args={[4, 0.3, 3]} />
            <meshStandardMaterial color="#003366" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[3.8, 0.1, 2.8]} />
            <meshStandardMaterial 
              color="#66aaff" 
              transparent 
              opacity={0.7} 
              emissive="#4488aa"
              emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}
      
      {/* Battery storage */}
      <mesh position={[-33, 2, -23]}>
        <boxGeometry args={[5, 4, 3]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[-33, 3.8, -23]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Energy monitoring tower */}
      <mesh position={[-33, 10, -23]}>
        <cylinderGeometry args={[0.5, 0.8, 12, 8]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[-33, 16, -23]}>
        <boxGeometry args={[4, 2, 2]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      
      {/* Animated energy indicator */}
      <group ref={energyRef}>
        <mesh position={[-33, 8, -23]}>
          <sphereGeometry args={[0.5, 8, 8]} />
          <meshStandardMaterial color="#ffdd00" emissive="#ffaa00" emissiveIntensity={0.8} />
        </mesh>
      </group>
      
      {/* Energy flow lines */}
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[-30 + i * 2, 5 + i, -23]}>
          <boxGeometry args={[3, 0.1, 0.1]} />
          <meshStandardMaterial 
            color="#ffaa00" 
            transparent 
            opacity={0.6 - i * 0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================
// AI TRAFFIC SYSTEM
// ============================================

function AITrafficSystem() {
  return (
    <group>
      {/* Traffic lights at intersections */}
      <TrafficLight position={[2, 0, 2]} rotation={Math.PI / 4} />
      <TrafficLight position={[-2, 0, 2]} rotation={-Math.PI / 4} />
      <TrafficLight position={[2, 0, -2]} rotation={Math.PI / 4} />
      <TrafficLight position={[-2, 0, -2]} rotation={-Math.PI / 4} />
      
      {/* Smart cameras */}
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <mesh position={[0, 8, 0.5]}>
        <cylinderGeometry args={[0.3, 0.3, 0.8, 8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      <mesh position={[0, 8, 1]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Traffic sensors */}
      <mesh position={[10, 1, 5]}>
        <boxGeometry args={[1, 0.5, 0.5]} />
        <meshStandardMaterial color="#0066aa" />
      </mesh>
      <mesh position={[-10, 1, -5]}>
        <boxGeometry args={[1, 0.5, 0.5]} />
        <meshStandardMaterial color="#0066aa" />
      </mesh>
      
      {/* Animated cars */}
      <Car position={[-60, 0, 0]} direction={[1, 0, 0]} speed={0.15} color="#ff4444" />
      <Car position={[60, 0, 0]} direction={[-1, 0, 0]} speed={0.12} color="#44aaff" />
      <Car position={[0, 0, -60]} direction={[0, 0, 1]} speed={0.13} color="#44ffaa" />
      <Car position={[0, 0, 60]} direction={[0, 0, -1]} speed={0.11} color="#ff44aa" />
      <Car position={[-30, 0, -30]} direction={[1, 0, 1]} speed={0.09} color="#ffaa44" />
      <Car position={[30, 0, 30]} direction={[-1, 0, -1]} speed={0.10} color="#aa44ff" />
      <Car position={[-30, 0, 30]} direction={[1, 0, -1]} speed={0.08} color="#44ff44" />
      <Car position={[30, 0, -30]} direction={[-1, 0, 1]} speed={0.07} color="#ff44ff" />
    </group>
  );
}

// ============================================
// SMART WASTE MANAGEMENT
// ============================================

function SmartWasteManagement() {
  return (
    <group position={[45, 0, -10]}>
      {/* Recycling facility */}
      <mesh position={[0, 4, 0]} castShadow>
        <boxGeometry args={[12, 8, 8]} />
        <meshStandardMaterial color="#667766" />
      </mesh>
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[12, 0.3, 8]} />
        <meshStandardMaterial color="#556655" />
      </mesh>
      
      {/* Sorting equipment */}
      <mesh position={[8, 2, 0]}>
        <boxGeometry args={[5, 0.5, 2]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[8, 2.5, 0]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial color="#ffaa00" />
      </mesh>
      
      {/* Smart bins */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <group key={i} position={[-20 + i * 4, 0.5, 5]}>
          <mesh castShadow>
            <boxGeometry args={[2, 1.2, 1.5]} />
            <meshStandardMaterial color="#334455" />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[1.5, 0.5, 1]} />
            <meshStandardMaterial color="#ff4444" />
          </mesh>
          {/* Sensor indicator */}
          <mesh position={[0, 1.8, 0]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? '#00ff00' : '#ffff00'} 
              emissive={i % 2 === 0 ? '#00ff00' : '#ffff00'} 
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}
      
      {/* Waste collection truck */}
      <Car position={[0, 0, 10]} direction={[1, 0, 0]} speed={0.04} color="#ff8800" />
      
      {/* Sort bins */}
      <mesh position={[-5, 1, 4]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#00aa44" />
      </mesh>
      <mesh position={[-5, 1, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#0088ff" />
      </mesh>
      <mesh position={[-5, 1, -4]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#ffaa00" />
      </mesh>
    </group>
  );
}

// ============================================
// PUBLIC TRANSPORT
// ============================================

function PublicTransport() {
  return (
    <group position={[0, 0, -25]}>
      {/* Bus station */}
      <mesh position={[0, 2, 0]} castShadow>
        <boxGeometry args={[14, 4, 4]} />
        <meshStandardMaterial color="#334455" />
      </mesh>
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[14, 0.3, 4]} />
        <meshStandardMaterial color="#445566" />
      </mesh>
      
      {/* Digital information board */}
      <mesh position={[-4, 5, 2]}>
        <boxGeometry args={[4, 2, 0.2]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[-4, 5, 2.1]}>
        <boxGeometry args={[3.8, 1.8, 0.1]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.3} />
      </mesh>
      
      {/* EV charging stations */}
      {[4, 6, 8].map((x) => (
        <group key={x}>
          <mesh position={[x, 1, 2]}>
            <boxGeometry args={[2, 2, 1]} />
            <meshStandardMaterial color="#555555" />
          </mesh>
          <mesh position={[x, 2, 2]}>
            <boxGeometry args={[1, 1, 0.5]} />
            <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}
      
      {/* Bus lane */}
      <mesh position={[0, 0.05, 6]}>
        <boxGeometry args={[200, 0.1, 3]} />
        <meshStandardMaterial color="#006633" />
      </mesh>
      
      {/* Animated buses */}
      <Bus position={[-50, 0, 6]} direction={[1, 0, 0]} speed={0.08} />
      <Bus position={[50, 0, 6]} direction={[-1, 0, 0]} speed={0.06} />
      
      {/* Bus stop shelter */}
      <mesh position={[0, 1, 5]}>
        <boxGeometry args={[5, 2, 3]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// ============================================
// SMART SCHOOL
// ============================================

function SmartSchool() {
  return (
    <group position={[25, 0, -5]}>
      {/* School building */}
      <mesh position={[0, 4, 0]} castShadow>
        <boxGeometry args={[14, 8, 8]} />
        <meshStandardMaterial color="#e8d8c8" />
      </mesh>
      <mesh position={[0, 8, 0]}>
        <boxGeometry args={[14, 0.3, 8]} />
        <meshStandardMaterial color="#d8c8b8" />
      </mesh>
      
      {/* Green roof */}
      <mesh position={[0, 8.2, 0]}>
        <boxGeometry args={[13, 0.3, 7]} />
        <meshStandardMaterial color="#44aa33" />
      </mesh>
      
      {/* Solar panels */}
      <mesh position={[4, 8.5, 2]}>
        <boxGeometry args={[5, 0.2, 3]} />
        <meshStandardMaterial color="#003366" />
      </mesh>
      <mesh position={[4, 8.6, 2]}>
        <boxGeometry args={[4.8, 0.1, 2.8]} />
        <meshStandardMaterial color="#66aaff" transparent opacity={0.6} />
      </mesh>
      
      {/* Playground */}
      <mesh position={[0, 0.3, 6]}>
        <boxGeometry args={[10, 0.5, 4]} />
        <meshStandardMaterial color="#ffaa55" />
      </mesh>
      <mesh position={[-3, 2, 6]}>
        <cylinderGeometry args={[0.2, 0.2, 4, 8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      <mesh position={[-3, 4, 6]}>
        <sphereGeometry args={[0.6, 8, 8]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
      
      {/* Accessible entrance */}
      <mesh position={[0, 1, 4.5]}>
        <boxGeometry args={[5, 2, 0.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 0.2, 5]}>
        <boxGeometry args={[5, 0.4, 1]} />
        <meshStandardMaterial color="#88ccff" />
      </mesh>
      
      {/* Smart displays */}
      <mesh position={[6, 5, 4.1]}>
        <boxGeometry args={[4, 2, 0.1]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[6, 5, 4.15]}>
        <boxGeometry args={[3.8, 1.8, 0.05]} />
        <meshStandardMaterial color="#44aaff" emissive="#2266aa" emissiveIntensity={0.3} />
      </mesh>
      
      {/* Landscaping */}
      <Tree position={[9, 0, 3]} scale={0.8} />
      <Tree position={[-9, 0, 3]} scale={0.9} />
    </group>
  );
}

// ============================================
// GREEN PARK
// ============================================

function GreenPark() {
  return (
    <group position={[-20, 0, 5]}>
      {/* Ground */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[25, 0.2, 20]} />
        <meshStandardMaterial color="#44aa33" />
      </mesh>
      
      {/* Paths */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[2.5, 0.1, 20]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[25, 0.1, 2.5]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      
      {/* Trees */}
      <Tree position={[-8, 0.5, -5]} scale={1.3} />
      <Tree position={[8, 0.5, -6]} scale={1.1} />
      <PineTree position={[-10, 0.5, 6]} scale={1.4} />
      <PineTree position={[7, 0.5, 7]} scale={1.2} />
      <Tree position={[0, 0.5, -8]} scale={1.0} />
      <PineTree position={[-5, 0.5, 8]} scale={0.9} />
      
      {/* Playground */}
      <mesh position={[5, 0.5, -3]}>
        <boxGeometry args={[5, 0.2, 5]} />
        <meshStandardMaterial color="#ffaa55" />
      </mesh>
      <mesh position={[5, 2, -3]}>
        <cylinderGeometry args={[0.2, 0.2, 4, 8]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      <mesh position={[5, 4, -3]}>
        <sphereGeometry args={[0.8, 8, 8]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
      
      {/* Seating */}
      <mesh position={[-4, 0.5, 0]}>
        <boxGeometry args={[2.5, 0.5, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[4, 0.5, 4]}>
        <boxGeometry args={[2.5, 0.5, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Pond */}
      <mesh position={[0, 0.3, 6]}>
        <cylinderGeometry args={[3, 3, 0.5, 16]} />
        <meshStandardMaterial color="#4488aa" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

// ============================================
// ACCESSIBILITY ZONE
// ============================================

function AccessibilityZone() {
  return (
    <group position={[12, 0, 6]}>
      {/* Accessible building */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[7, 6, 7]} />
        <meshStandardMaterial color="#ccaa88" />
      </mesh>
      <mesh position={[0, 6, 0]}>
        <boxGeometry args={[7, 0.3, 7]} />
        <meshStandardMaterial color="#aa8866" />
      </mesh>
      
      {/* Wide entrance */}
      <mesh position={[0, 1, 3.5]}>
        <boxGeometry args={[5, 2, 0.5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Wheelchair ramp */}
      <mesh position={[2.5, 0.3, 4.5]}>
        <boxGeometry args={[3, 0.6, 2]} />
        <meshStandardMaterial color="#88ccff" />
      </mesh>
      <mesh position={[2.5, 0.6, 3.5]}>
        <boxGeometry args={[3, 0.3, 1]} />
        <meshStandardMaterial color="#88ccff" />
      </mesh>
      
      {/* Tactile paving */}
      <mesh position={[0, 0.15, 5.5]}>
        <boxGeometry args={[5, 0.1, 0.6]} />
        <meshStandardMaterial color="#ffaa00" />
      </mesh>
      
      {/* Accessible crossing */}
      <mesh position={[0, 0.15, 8]}>
        <boxGeometry args={[4, 0.1, 0.4]} />
        <meshStandardMaterial color="#ffaa00" />
      </mesh>
      
      {/* Signage */}
      <mesh position={[2.5, 4, 3.6]}>
        <boxGeometry args={[3, 1, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[2.5, 4, 3.65]}>
        <boxGeometry args={[2.8, 0.8, 0.05]} />
        <meshStandardMaterial color="#0000ff" />
      </mesh>
      
      {/* Accessible seating */}
      <mesh position={[-5, 0.5, 0]}>
        <boxGeometry args={[2.5, 0.5, 1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-5, 1, 0]}>
        <boxGeometry args={[2.5, 0.5, 0.2]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Elevator */}
      <mesh position={[4, 2, 0]}>
        <boxGeometry args={[2.5, 4, 2.5]} />
        <meshStandardMaterial color="#888888" />
      </mesh>
      <mesh position={[4, 2, 0.1]}>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial color="#88aaff" transparent opacity={0.7} />
      </mesh>
      
      {/* Accessible parking */}
      <mesh position={[-6, 0.15, 4]}>
        <boxGeometry args={[3, 0.1, 5]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-6, 0.15, 4]}>
        <boxGeometry args={[3, 0.1, 0.3]} />
        <meshStandardMaterial color="#88ccff" />
      </mesh>
    </group>
  );
}

// ============================================
// RESIDENTIAL DISTRICT
// ============================================

function ResidentialDistrict() {
  return (
    <group position={[40, 0, 20]}>
      {/* Apartment buildings */}
      {[0, 1, 2, 3, 4].map((i) => (
        <group key={i} position={[i * 10 - 20, 0, 0]}>
          <mesh position={[0, 10, 0]} castShadow>
            <boxGeometry args={[8, 20, 8]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#c8b8a8' : '#a8b8c8'} />
          </mesh>
          
          {/* Windows */}
          {[2, 5, 8, 11, 14, 17].map((y) => (
            <mesh key={y} position={[0, y, 4.01]}>
              <boxGeometry args={[6, 0.8, 0.1]} />
              <meshStandardMaterial color="#88ccff" emissive="#4488aa" emissiveIntensity={0.3} />
            </mesh>
          ))}
          
          {/* Balconies */}
          {[3, 6, 9, 12, 15, 18].map((y) => (
            <mesh key={y} position={[0, y, 4.5]}>
              <boxGeometry args={[7, 0.3, 1]} />
              <meshStandardMaterial color="#dddddd" />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Green spaces */}
      <Tree position={[-25, 0, -4]} scale={1.2} />
      <Tree position={[25, 0, -4]} scale={1.3} />
      <Tree position={[0, 0, -4]} scale={1.1} />
      
      {/* Streetlights */}
      <SmartStreetlight position={[-25, 0, 4]} />
      <SmartStreetlight position={[25, 0, 4]} />
    </group>
  );
}

// ============================================
// COMMERCIAL DISTRICT
// ============================================

function CommercialDistrict() {
  return (
    <group position={[-40, 0, 20]}>
      {/* Office towers */}
      <Skyscraper position={[0, 0, 0]} height={22} />
      <GlassTower position={[-10, 0, 5]} height={18} />
      <Skyscraper position={[10, 0, -5]} height={16} />
      
      {/* Shopping mall */}
      <mesh position={[0, 4, -10]}>
        <boxGeometry args={[18, 8, 10]} />
        <meshStandardMaterial color="#dddddd" />
      </mesh>
      <mesh position={[0, 8, -10]}>
        <boxGeometry args={[18, 0.3, 10]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
      
      {/* Store fronts */}
      <mesh position={[0, 2, -5]}>
        <boxGeometry args={[17, 3, 0.2]} />
        <meshStandardMaterial color="#ffaa00" transparent opacity={0.5} />
      </mesh>
      
      {/* Parking garage */}
      <mesh position={[14, 4, -10]}>
        <boxGeometry args={[6, 8, 10]} />
        <meshStandardMaterial color="#aaaacc" />
      </mesh>
      
      {/* Smart streetlights */}
      <SmartStreetlight position={[-15, 0, 10]} />
      <SmartStreetlight position={[15, 0, 10]} />
    </group>
  );
}

// ============================================
// ROADS
// ============================================

function Roads() {
  return (
    <group>
      {/* Horizontal main road */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[200, 0.1, 8]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Vertical main road */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[8, 0.1, 200]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Secondary roads */}
      <mesh position={[-40, 0.05, -40]}>
        <boxGeometry args={[4, 0.1, 120]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[40, 0.05, -40]}>
        <boxGeometry args={[4, 0.1, 120]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[-40, 0.05, 40]}>
        <boxGeometry args={[4, 0.1, 120]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh position={[40, 0.05, 40]}>
        <boxGeometry args={[4, 0.1, 120]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      
      {/* Road markings */}
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[200, 0.02, 0.2]} />
        <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[0.2, 0.02, 200]} />
        <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
      </mesh>
      
      {/* Sidewalks */}
      <mesh position={[0, 0.03, 4.5]}>
        <boxGeometry args={[200, 0.1, 1]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      <mesh position={[0, 0.03, -4.5]}>
        <boxGeometry args={[200, 0.1, 1]} />
        <meshStandardMaterial color="#555555" />
      </mesh>
      
      {/* Pedestrian crossings */}
      {[-20, 0, 20].map((x) => (
        <group key={x}>
          {[-1.5, -0.5, 0.5, 1.5].map((z) => (
            <mesh key={z} position={[x, 0.07, z]}>
              <boxGeometry args={[0.5, 0.02, 1]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

// ============================================
// GROUND & AMBIENT
// ============================================

function Ground() {
  return (
    <group>
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[300, 1, 300]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.9} />
      </mesh>
      
      {/* Green areas */}
      <mesh position={[0, 0.05, 35]}>
        <boxGeometry args={[100, 0.1, 3]} />
        <meshStandardMaterial color="#44aa33" />
      </mesh>
      <mesh position={[0, 0.05, -35]}>
        <boxGeometry args={[100, 0.1, 3]} />
        <meshStandardMaterial color="#44aa33" />
      </mesh>
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
      camera={{ position: [100, 80, 100], fov: 60 }}
      shadows
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
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
      <hemisphereLight args={['#4477aa', '#224422', 0.6]} />
      
      <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
      <Sky distance={450000} sunPosition={[100, 50, 100]} />
      
      <Ground />
      <Roads />
      
      <AIControlCenter />
      <SmartHospital />
      <VerticalFarm />
      <SewageTreatmentPlant />
      <SolarEnergyDistrict />
      <AITrafficSystem />
      <SmartWasteManagement />
      <PublicTransport />
      <SmartSchool />
      <GreenPark />
      <AccessibilityZone />
      <ResidentialDistrict />
      <CommercialDistrict />
      
      {/* Trees throughout the city */}
      <Tree position={[-40, 0.5, 40]} scale={0.9} />
      <PineTree position={[40, 0.5, 40]} scale={1.1} />
      <Tree position={[-40, 0.5, -40]} scale={1.0} />
      <PineTree position={[40, 0.5, -40]} scale={0.8} />
      <Tree position={[-20, 0.5, -20]} scale={0.7} />
      <PineTree position={[20, 0.5, -20]} scale={0.9} />
      <Tree position={[-20, 0.5, 20]} scale={1.2} />
      <PineTree position={[20, 0.5, 20]} scale={0.6} />
      
      {/* Smart streetlights */}
      <SmartStreetlight position={[8, 0, 5]} />
      <SmartStreetlight position={[-8, 0, -5]} />
      <SmartStreetlight position={[8, 0, -5]} />
      <SmartStreetlight position={[-8, 0, 5]} />
      <SmartStreetlight position={[20, 0, 10]} />
      <SmartStreetlight position={[-20, 0, 10]} />
      
      <CameraRig target={selectedFacility} />
      
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={10}
        maxDistance={300}
        target={[0, 10, 0]}
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
        traffic: Math.random() > 0.05 ? 'AI OPTIMIZED' : 'MONITORING',
        water: Math.random() > 0.15 ? 'RECYCLING ACTIVE' : 'PURIFYING'
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '350px',
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
      
      <div style={{ marginTop: '12px', padding: '8px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px' }}>
        <div style={{ fontSize: '12px', color: '#38bdf8', marginBottom: '4px' }}>
          AI SYSTEM ACTIVE
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
          Monitoring all city systems in real-time
        </div>
      </div>
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
      width: '380px',
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
          cursor: 'pointer',
          transition: 'all 0.3s'
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
      
      <div style={{
        marginTop: '16px',
        padding: '12px',
        background: 'rgba(74, 222, 128, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(74, 222, 128, 0.3)'
      }}>
        <div style={{ fontSize: '12px', color: '#4ade80', fontWeight: '600' }}>
          STATUS: {info.status}
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
    <div style={{ width: '100%', height: '100vh', background: '#0a0e1a' }}>
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
        padding: '16px 24px',
        borderRadius: '12px',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}>
        <h1 style={{ fontSize: '28px', color: '#38bdf8', margin: 0, fontWeight: '800' }}>
          BSS WORLD
        </h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', margin: '4px 0 0' }}>
          Smart Sustainable City
        </p>
        <div style={{
          marginTop: '8px',
          padding: '4px 8px',
          background: 'rgba(74, 222, 128, 0.1)',
          borderRadius: '4px',
          fontSize: '12px',
          color: '#4ade80'
        }}>
          ● ALL SYSTEMS OPERATIONAL
        </div>
      </div>
    </div>
  );
}

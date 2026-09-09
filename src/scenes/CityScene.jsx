import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Sky, Environment } from '@react-three/drei'
import { Physics } from '@react-three/cannon'

// City components
import AI_ControlCenter from '../components/City/AI_ControlCenter'
import Hospital from '../components/City/Hospital'
import VerticalFarm from '../components/City/VerticalFarm'
import SewageTreatment from '../components/City/SewageTreatment'
import SolarEnergy from '../components/City/SolarEnergy'
import WasteManagement from '../components/City/WasteManagement'
import TrafficSystem from '../components/City/TrafficSystem'
import PublicTransport from '../components/City/PublicTransport'
import School from '../components/City/School'
import Park from '../components/City/Park'
import AccessibilityZone from '../components/City/AccessibilityZone'
import Residential from '../components/City/Residential'
import Commercial from '../components/City/Commercial'
import Ambient from '../components/City/Ambient'

// Infrastructure components
import Roads from '../components/Infrastructure/Roads'
import { Tree, PineTree } from '../components/Infrastructure/Trees'
import { Streetlight } from '../components/Infrastructure/Streetlights'

// Systems
import TrafficSystemLogic from '../systems/TrafficSystem'
import EnergySystem from '../systems/EnergySystem'
import WaterSystem from '../systems/WaterSystem'
import WasteSystem from '../systems/WasteSystem'

// UI
import CameraController from '../components/UI/CameraController'

export default function CityScene({ selectedFacility, onFacilityClick }) {
  const [cameraTarget, setCameraTarget] = React.useState('overview')
  
  React.useEffect(() => {
    if (selectedFacility) {
      setCameraTarget(selectedFacility)
    }
  }, [selectedFacility])
  
  return (
    <Canvas
      camera={{ position: [80, 60, 80], fov: 60 }}
      shadows
      dpr={[1, 2]}
    >
      <color attach="background" args={['#0a0e1a']} />
      
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[50, 80, 50]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 30, 0]} intensity={0.5} color="#00aaff" />
        
        {/* Environment */}
        <Stars radius={100} depth={50} count={2000} factor={4} fade speed={1} />
        <Sky distance={450000} sunPosition={[100, 50, 100]} />
        
        {/* Ground and infrastructure */}
        <Roads />
        <Ambient />
        
        {/* City buildings and facilities */}
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
        
        {/* Trees and streetlights */}
        <Tree position={[-40, 0.5, 40]} scale={0.8} />
        <PineTree position={[40, 0.5, 40]} scale={1.2} />
        <Tree position={[-40, 0.5, -40]} scale={1.0} />
        <PineTree position={[40, 0.5, -40]} scale={0.9} />
        
        <Streetlight position={[8, 0, 5]} />
        <Streetlight position={[-8, 0, -5]} />
        <Streetlight position={[8, 0, -5]} />
        <Streetlight position={[-8, 0, 5]} />
        
        {/* Systems (simulated logic) */}
        <TrafficSystemLogic />
        <EnergySystem />
        <WaterSystem />
        <WasteSystem />
        
        {/* Camera Controller */}
        <CameraController target={cameraTarget} />
        
        {/* Controls */}
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={10}
          maxDistance={200}
        />
      </Suspense>
    </Canvas>
  )
}

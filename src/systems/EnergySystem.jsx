import React, { useState } from 'react'
import { useFrame } from '@react-three/fiber'

export default function EnergySystem() {
  const [energyData, setEnergyData] = useState({
    production: 'RENEWABLE',
    solar: 'ACTIVE',
    storage: '85%'
  })
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Simulate energy production fluctuations
    const solarOutput = Math.sin(time * 0.3) * 20 + 80
    
    setEnergyData({
      production: solarOutput > 70 ? 'RENEWABLE' : 'STORAGE',
      solar: 'ACTIVE',
      storage: `${Math.floor(solarOutput)}%`
    })
  })
  
  return null
}

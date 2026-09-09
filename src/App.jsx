import React, { useState } from 'react'
import CityScene from './scenes/CityScene'
import Dashboard from './components/UI/Dashboard'
import Navigation from './components/UI/Navigation'
import InfoPanel from './components/UI/InfoPanel'

export default function App() {
  const [selectedFacility, setSelectedFacility] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  
  const handleFacilitySelect = (id) => {
    setSelectedFacility(id)
    setShowInfo(id !== 'overview')
  }
  
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <CityScene 
        selectedFacility={selectedFacility} 
        onFacilityClick={handleFacilitySelect}
      />
      
      <Dashboard />
      
      <Navigation onSelect={handleFacilitySelect} selected={selectedFacility} />
      
      {showInfo && selectedFacility && (
        <InfoPanel 
          facilityId={selectedFacility} 
          onClose={() => {
            setSelectedFacility('overview')
            setShowInfo(false)
          }}
        />
      )}
      
      {/* Title */}
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
  )
}

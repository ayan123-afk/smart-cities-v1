import React, { useEffect, useState } from 'react'

export default function Dashboard() {
  const [cityStatus, setCityStatus] = useState({
    online: true,
    traffic: 'AI OPTIMIZED',
    energy: 'RENEWABLE',
    water: 'RECYCLING ACTIVE',
    waste: 'SMART COLLECTION',
    transport: 'ACTIVE',
    emergency: 'READY'
  })
  
  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setCityStatus(prev => ({
        ...prev,
        energy: Math.random() > 0.1 ? 'RENEWABLE' : 'STORAGE',
        traffic: Math.random() > 0.05 ? 'AI OPTIMIZED' : 'MONITORING'
      }))
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="dashboard-panel">
      <h2 className="dashboard-title">BSS WORLD — CITY STATUS</h2>
      <div className="status-row">
        <span className="status-label">City Status</span>
        <span className="status-value" style={{ color: cityStatus.online ? '#4ade80' : '#f87171' }}>
          {cityStatus.online ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>
      <div className="status-row">
        <span className="status-label">Traffic</span>
        <span className="status-value">{cityStatus.traffic}</span>
      </div>
      <div className="status-row">
        <span className="status-label">Energy</span>
        <span className="status-value">{cityStatus.energy}</span>
      </div>
      <div className="status-row">
        <span className="status-label">Water</span>
        <span className="status-value">{cityStatus.water}</span>
      </div>
      <div className="status-row">
        <span className="status-label">Waste</span>
        <span className="status-value">{cityStatus.waste}</span>
      </div>
      <div className="status-row">
        <span className="status-label">Transport</span>
        <span className="status-value">{cityStatus.transport}</span>
      </div>
      <div className="status-row">
        <span className="status-label">Emergency</span>
        <span className="status-value">{cityStatus.emergency}</span>
      </div>
    </div>
  )
}

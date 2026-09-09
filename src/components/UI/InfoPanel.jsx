import React from 'react'
import { facilities } from '../../data/facilities'

export default function InfoPanel({ facilityId, onClose }) {
  const facility = facilities.find(f => f.id === facilityId)
  
  if (!facility) return null
  
  return (
    <div className="info-panel">
      <button className="info-close" onClick={onClose}>×</button>
      <h3 className="info-title">{facility.name}</h3>
      <div className="info-section">
        <div className="info-label">Purpose</div>
        <div className="info-content">{facility.purpose}</div>
      </div>
      <div className="info-section">
        <div className="info-label">Sustainability</div>
        <div className="info-content">{facility.sustainability}</div>
      </div>
      <div className="info-section">
        <div className="info-label">Technology</div>
        <div className="info-content">{facility.technology}</div>
      </div>
    </div>
  )
}

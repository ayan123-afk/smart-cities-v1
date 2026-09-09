import React from 'react'
import { facilities } from '../../data/facilities'

export default function Navigation({ onSelect, selected }) {
  return (
    <div className="navigation-panel">
      <button 
        className={`nav-btn ${selected === 'overview' ? 'active' : ''}`}
        onClick={() => onSelect('overview')}
      >
        🌆 Overview
      </button>
      {facilities.slice(0, 11).map(facility => (
        <button 
          key={facility.id}
          className={`nav-btn ${selected === facility.id ? 'active' : ''}`}
          onClick={() => onSelect(facility.id)}
        >
          {facility.name.split(' ')[0]}
        </button>
      ))}
    </div>
  )
}

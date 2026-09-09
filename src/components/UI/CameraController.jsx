import React, { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { cameraPositions } from '../../data/facilities'

export default function CameraController({ target }) {
  const { camera, controls } = useThree()
  const targetRef = useRef(target)
  
  useEffect(() => {
    if (cameraPositions[target]) {
      const { position, target: lookAt } = cameraPositions[target]
      
      camera.position.set(...position)
      camera.lookAt(...lookAt)
      
      if (controls) {
        controls.target.set(...lookAt)
        controls.update()
      }
    }
  }, [target, camera, controls])
  
  return null
}

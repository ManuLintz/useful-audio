import * as THREE from 'three'
import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MapControls, OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

type SpectrumBarProps = {
  position: [number, number, number]
  height: number
}

const SpectrumBar: React.FC<SpectrumBarProps> = ({ position, height }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    // Animation or dynamic updates go here, if any
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[3, height, 3]} />
      <meshStandardMaterial color={'hotpink'} />
    </mesh>
  )
}

type SpectrumData = number[][]

type SpectrumVisualizationProps = {
  spectrumData: SpectrumData
}

const CameraAdjuster = () => {
  const { camera } = useThree()
  const distance = 100 // Adjust based on the scale of your scene

  useEffect(() => {
    // camera.position.set(distance, distance * 0.4, 0.5)
    camera.position.set(40, 230, 900)
    // camera.lookAt(0, 0, 0)
    camera.updateProjectionMatrix()
  }, [camera, distance])

  return null
}

const SpectrumVisualization: React.FC<SpectrumVisualizationProps> = ({
  spectrumData
}) => {
  const bars = useMemo(
    () =>
      spectrumData
        // .filter((element, index) => index % 10 === 0)
        .map((timeSlice, timeIndex) => {
          return Array.from(timeSlice).map((amplitude, frequencyIndex) => {
            // console.log({ amplitude })
            return {
              position: [
                timeIndex - spectrumData.length / 2,
                amplitude / 2,
                frequencyIndex - timeSlice.length / 2
              ] as [number, number, number],
              height: amplitude
            }
          })
        })
        .flat(1)
        .filter((element, index) => index % 100 === 0),
    [spectrumData]
  )

  return (
    <div className="h-lvh">
      <Canvas>
        <ambientLight />
        {/* <directionalLight color="red" position={[0, 0, 5]} /> */}
        <pointLight position={[10, 10, 10]} />
        {bars.map((bar, index) => (
          <SpectrumBar
            key={index}
            position={bar.position}
            height={bar.height}
          />
        ))}
        <MapControls />
        <OrthographicCamera />
        {/* <CameraAdjuster /> */}
      </Canvas>
    </div>
  )
}

export default SpectrumVisualization

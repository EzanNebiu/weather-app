import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';
import {
  EARTH_RADIUS,
  EARTH_ROTATION_SPEED,
} from '../../constants/earth';

export const CloudLayer = () => {
  const cloudsRef = useRef<Mesh>(null);

  // Rotate clouds slightly faster than Earth
  useFrame(() => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += EARTH_ROTATION_SPEED * 1.3;
    }
  });

  // Create cloud-like patterns using noise-like material
  const cloudMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color('#ffffff'),
    transparent: true,
    opacity: 0.15,
    depthWrite: false,
    emissive: new THREE.Color('#ffffff'),
    emissiveIntensity: 0.1,
  });

  return (
    <mesh ref={cloudsRef} position={[0, 0, 0]} material={cloudMaterial}>
      <sphereGeometry args={[EARTH_RADIUS * 1.01, 64, 64]} />
    </mesh>
  );
};

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, BackSide, Color } from 'three';
import * as THREE from 'three';
import {
  EARTH_RADIUS,
  ATMOSPHERE_SCALE,
  ATMOSPHERE_COLOR,
} from '../../constants/earth';

export const AtmosphereGlow = () => {
  const atmosphereRef = useRef<Mesh>(null);

  // Subtle pulsing effect
  useFrame(({ clock }) => {
    if (atmosphereRef.current && atmosphereRef.current.material) {
      const material = atmosphereRef.current.material as THREE.MeshBasicMaterial;
      const pulse = Math.sin(clock.getElapsedTime() * 0.5) * 0.05 + 0.95;
      material.opacity = 0.15 * pulse;
    }
  });

  return (
    <mesh ref={atmosphereRef} scale={ATMOSPHERE_SCALE}>
      <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
      <meshBasicMaterial
        color={new Color(ATMOSPHERE_COLOR)}
        transparent={true}
        opacity={0.2}
        side={BackSide}
      />
    </mesh>
  );
};

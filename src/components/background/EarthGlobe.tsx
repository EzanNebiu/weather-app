import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import * as THREE from 'three';
import {
  EARTH_RADIUS,
  EARTH_ROTATION_SPEED,
} from '../../constants/earth';
import { latLonToVector3, getSunPosition } from '../../utils/geo';

interface EarthGlobeProps {
  latitude: number;
  longitude: number;
}

export const EarthGlobe = ({ latitude, longitude }: EarthGlobeProps) => {
  const earthRef = useRef<Mesh>(null);
  const markerGroupRef = useRef<Group>(null);
  const markerCoreRef = useRef<Mesh>(null);
  const sunLightRef = useRef<THREE.DirectionalLight>(null);
  
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  
  const { gl } = useThree();

  // Load HD Earth textures with enhanced saturation
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    
    const loadTexture = (url: string): Promise<THREE.Texture> => {
      return new Promise((resolve, reject) => {
        loader.load(
          url,
          (loaded) => {
            loaded.anisotropy = gl.capabilities.getMaxAnisotropy();
            resolve(loaded);
          },
          undefined,
          reject
        );
      });
    };

    Promise.all([
      loadTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'),
      loadTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg'),
      loadTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg'),
    ])
      .then(([mapTexture, normalTexture, roughnessTexture]) => {
        if (earthRef.current) {
          const material = earthRef.current.material as THREE.MeshStandardMaterial;
          material.map = mapTexture;
          material.normalMap = normalTexture;
          material.normalScale = new THREE.Vector2(1.5, 1.5); // Enhanced terrain detail
          material.roughnessMap = roughnessTexture;
          material.roughness = 0.7;
          material.metalness = 0.1;
          // Enhanced saturation through color multiplication
          material.color = new THREE.Color(1.3, 1.3, 1.3); // Boost brightness/saturation
          material.needsUpdate = true;
          setTexturesLoaded(true);
        }
      })
      .catch((error) => {
        console.warn('Failed to load Earth textures, using fallback color', error);
        setTexturesLoaded(true);
      });
  }, [gl]);

  // Update marker position and tilt Earth to face the marker with base tilt
  useEffect(() => {
    if (earthRef.current && markerGroupRef.current) {
      const position = latLonToVector3(latitude, longitude, EARTH_RADIUS * 1.02);
      markerGroupRef.current.position.copy(position);
      
      // Orient marker to point outward from Earth surface
      const normalVector = position.clone().normalize();
      markerGroupRef.current.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        normalVector
      );
      
      // Rotate Earth to bring marker to face the camera with enhanced tilt
      // Camera is at (0, 0, +distance) looking at origin
      // We want the marker position to point toward +Z axis
      
      // Create a target direction (camera is on +Z axis)
      const cameraDirection = new THREE.Vector3(0, 0, 1);
      
      // Get the current marker position (normalized)
      const markerDirection = position.clone().normalize();
      
      // Calculate the quaternion rotation needed to align marker with camera
      const quaternion = new THREE.Quaternion();
      quaternion.setFromUnitVectors(markerDirection, cameraDirection);
      
      // Apply base tilt based on latitude for more dynamic view
      // Convert latitude to radians and tilt the earth forward/backward
      const latitudeRad = (latitude * Math.PI) / 180;
      const baseTilt = 0.3; // Base tilt in radians (~17 degrees)
      const latitudeTilt = latitudeRad * 0.5; // Adjust tilt based on latitude
      
      // Create X-axis tilt quaternion (forward/backward tilt)
      const tiltQuaternion = new THREE.Quaternion();
      tiltQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), baseTilt + latitudeTilt);
      
      // Combine the rotations: first align to marker, then apply tilt
      quaternion.multiply(tiltQuaternion);
      
      // Apply the combined quaternion rotation to the Earth
      earthRef.current.quaternion.copy(quaternion);
    }
  }, [latitude, longitude]);

  // Update sun position and rotate earth
  useFrame(() => {
    // Update sun position based on real time for day/night cycle
    if (sunLightRef.current) {
      const sunPos = getSunPosition();
      sunLightRef.current.position.copy(sunPos);
    }
    
    // Continuously rotate Earth around Y axis
    if (earthRef.current) {
      const rotationQuaternion = new THREE.Quaternion();
      rotationQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), EARTH_ROTATION_SPEED);
      earthRef.current.quaternion.multiplyQuaternions(rotationQuaternion, earthRef.current.quaternion);
    }
  });

  return (
    <group>
      {/* Directional sun light that follows real sun position */}
      <directionalLight
        ref={sunLightRef}
        intensity={2.5}
        color={0xffffff}
        position={getSunPosition()}
      />
      
      {/* Earth sphere with HD textures */}
      <mesh ref={earthRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[EARTH_RADIUS, 128, 128]} />
        <meshStandardMaterial
          color={texturesLoaded ? 0xffffff : 0x2a7fc1}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Location marker - BRIGHT cyan static marker - ALWAYS VISIBLE */}
      <group ref={markerGroupRef} visible={true}>
        {/* Core dot - BIGGER and BRIGHTER */}
        <mesh ref={markerCoreRef}>
          <sphereGeometry args={[EARTH_RADIUS * 0.08, 32, 32]} />
          <meshStandardMaterial 
            color={0x00ffff} 
            emissive={0x00ffff} 
            emissiveIntensity={2.0}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
        
        {/* Multiple point lights for intense glow */}
        <pointLight color={0x00ffff} intensity={10} distance={1.5} />
        <pointLight color={0x00ffff} intensity={6} distance={0.8} />
      </group>
    </group>
  );
};


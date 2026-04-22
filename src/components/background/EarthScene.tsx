import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { EarthGlobe } from './EarthGlobe';
import { CloudLayer } from './CloudLayer';
import { AtmosphereGlow } from './AtmosphereGlow';
import {
  CAMERA_FOV,
} from '../../constants/earth';

interface EarthSceneProps {
  latitude: number;
  longitude: number;
  isHomePage: boolean;
}

export const EarthScene = ({ latitude, longitude, isHomePage }: EarthSceneProps) => {
  // State for responsive camera
  const [cameraConfig, setCameraConfig] = useState(() => {
    const width = window.innerWidth;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    
    let distance = 10;
    let fov = CAMERA_FOV;
    
    if (isMobile) {
      distance = 6; // Even closer on mobile for better visibility
      fov = 55; // Wider FOV
    } else if (isTablet) {
      distance = 8;
      fov = 45;
    }
    
    return {
      position: [0, 0, distance] as [number, number, number],
      fov,
    };
  });
  
  // Update camera on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      
      let distance = 10;
      let fov = CAMERA_FOV;
      
      if (isMobile) {
        distance = 6;
        fov = 55;
      } else if (isTablet) {
        distance = 8;
        fov = 45;
      }
      
      setCameraConfig({
        position: [0, 0, distance] as [number, number, number],
        fov,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <Canvas
      camera={{
        position: cameraConfig.position,
        fov: cameraConfig.fov,
      }}
      gl={{ 
        alpha: true, 
        antialias: true,
        toneMapping: 2, // ACESFilmicToneMapping
        powerPreference: 'high-performance',
        // Mobile optimizations
        precision: 'mediump', // Lower precision for mobile
        logarithmicDepthBuffer: false, // Disable for performance
      }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]} // Limit pixel ratio for mobile performance
    >
      {/* Low ambient light - night side will be darker */}
      <ambientLight intensity={0.15} color={0x4a5f8f} />

      {/* Earth and atmosphere */}
      <Suspense fallback={null}>
        <EarthGlobe 
          latitude={latitude} 
          longitude={longitude} 
          isHomePage={isHomePage}
        />
        <CloudLayer />
        <AtmosphereGlow />
      </Suspense>
    </Canvas>
  );
};

// Earth physical constants
export const EARTH_RADIUS = 2.5;

// Rotation speeds (radians per frame at 60fps)
export const EARTH_ROTATION_SPEED = 0.0005;

// Camera settings
export const CAMERA_POSITION = { x: 0, y: 0, z: 8 };
export const CAMERA_FOV = 45;

// Lighting
export const AMBIENT_LIGHT_INTENSITY = 0.6;
export const DIRECTIONAL_LIGHT_INTENSITY = 1.2;
export const DIRECTIONAL_LIGHT_POSITION = { x: 5, y: 3, z: 5 };

// Atmosphere
export const ATMOSPHERE_SCALE = 1.15;
export const ATMOSPHERE_COLOR = '#4db8ff';

// Location marker
export const MARKER_SIZE = 0.08;
export const MARKER_COLOR = '#00ff88';
export const MARKER_PULSE_SPEED = 2;
export const MARKER_PULSE_MIN_SCALE = 0.8;
export const MARKER_PULSE_MAX_SCALE = 1.4;

// Earth texture URLs (using public high-res NASA textures)
export const EARTH_TEXTURE_URL = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg';
export const EARTH_BUMP_URL = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png';
export const EARTH_SPECULAR_URL = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-water.png';
export const CLOUDS_TEXTURE_URL = 'https://unpkg.com/three-globe@2.31.1/example/img/earth-clouds.png';

// Fallback colors if textures fail to load
export const EARTH_FALLBACK_COLOR = '#1e3a5f';
export const OCEAN_COLOR = '#0a2463';
export const LAND_COLOR = '#2d5a3d';

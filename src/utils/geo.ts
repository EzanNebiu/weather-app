import * as THREE from 'three';

/**
 * Converts latitude and longitude to 3D Cartesian coordinates on a sphere
 * @param latitude - Latitude in degrees (-90 to 90)
 * @param longitude - Longitude in degrees (-180 to 180)
 * @param radius - Radius of the sphere
 * @returns THREE.Vector3 with x, y, z coordinates
 */
export const latLonToVector3 = (
  latitude: number,
  longitude: number,
  radius: number
): THREE.Vector3 => {
  // Convert degrees to radians
  const latRad = latitude * (Math.PI / 180);
  
  // Adjust longitude to align with Earth texture mapping
  // The texture's Prime Meridian needs to be rotated to match our coordinate system
  const lonRad = (longitude - 90) * (Math.PI / 180);
  
  // Spherical to Cartesian conversion
  const x = radius * Math.cos(latRad) * Math.cos(lonRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.sin(lonRad);

  return new THREE.Vector3(x, y, z);
};

/**
 * Calculates the sun's position based on current UTC time
 * Creates realistic day/night cycle
 * @returns THREE.Vector3 representing sun direction
 */
export const getSunPosition = (): THREE.Vector3 => {
  const now = new Date();
  
  // Get hours in UTC (0-24)
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();
  const seconds = now.getUTCSeconds();
  
  // Calculate time as a fraction of the day (0 to 1)
  const timeOfDay = (hours + minutes / 60 + seconds / 3600) / 24;
  
  // Sun's longitude changes 360° per day, starting at 180° at midnight UTC
  // This makes noon UTC have sun at longitude 0° (Prime Meridian)
  const sunLongitude = (timeOfDay * 360 - 180) * (Math.PI / 180);
  
  // Sun's latitude varies with seasons, but we'll use 0° (equinox) for simplicity
  // You could enhance this with actual solar declination calculation
  const sunLatitude = 0;
  
  // Convert to 3D position
  const phi = (90 - sunLatitude) * (Math.PI / 180);
  const theta = sunLongitude;
  
  const distance = 50; // Distance from Earth center
  
  const x = distance * Math.sin(phi) * Math.cos(theta);
  const z = distance * Math.sin(phi) * Math.sin(theta);
  const y = distance * Math.cos(phi);
  
  return new THREE.Vector3(x, y, z);
};

/**
 * Normalizes latitude to -90 to 90 range
 */
export const normalizeLat = (lat: number): number => {
  return Math.max(-90, Math.min(90, lat));
};

/**
 * Normalizes longitude to -180 to 180 range
 */
export const normalizeLon = (lon: number): number => {
  let normalized = lon % 360;
  if (normalized > 180) normalized -= 360;
  if (normalized < -180) normalized += 360;
  return normalized;
};

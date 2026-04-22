/**
 * Convert latitude/longitude to 3D position on a sphere
 * Used for positioning the location marker on the Earth
 */
export const latLongToPosition = (
  lat: number,
  long: number,
  radius: number
): { x: number; y: number; z: number } => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (long + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return { x, y, z };
};

/**
 * Format coordinates for display
 */
export const formatCoordinates = (lat: number, long: number): string => {
  const latDir = lat >= 0 ? 'N' : 'S';
  const longDir = long >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}°${latDir}, ${Math.abs(long).toFixed(2)}°${longDir}`;
};

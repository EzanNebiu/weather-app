# WeatherApp v2 ☀️🌍

A premium weather application featuring a stunning HD 3D Earth visualization, real-time weather data, and a beautiful glassmorphism design. Built with modern web technologies and production-ready architecture.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178c6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?logo=three.js)

## ✨ Features

### 🌐 HD 3D Earth Visualization
- **Realistic Earth Globe** with NASA HD textures (2048x1024 resolution)
- **Normal Mapping** for terrain depth and detail
- **Specular Mapping** for ocean reflection and shine
- **Atmospheric Glow** with Fresnel-style effect
- **Day/Night Cycle** with real-time sun positioning based on UTC
- **Continuous Auto-Rotation** - smooth perpetual spinning animation
- **Dynamic Tilt** - earth tilts based on marker latitude for optimal viewing
- **Animated Cloud Layer** with subtle movement
- **Location Marker** - bright cyan glowing marker showing your exact location

### 🌦️ Weather Features
- **Real-time Weather Data** - current conditions with detailed metrics
- **Hourly Forecast** - next 24 hours with temperature and conditions
- **7-Day Forecast** - weekly outlook with high/low temperatures
- **Location Search** - find any city worldwide with OpenStreetMap API
- **Multiple Locations** - save and manage favorite locations
- **Current Location** - one-tap GPS location detection on Locations page
- **Auto-location** - automatic geolocation on first load

### 🎨 Premium Design
- **Glassmorphism UI** - elegant translucent cards with backdrop blur
- **Time-based Gradients** - 24-hour gradient system matching local time
  - Sunrise: Orange-pink gradients
  - Daytime: Blue sky gradients
  - Sunset: Pink-purple gradients
  - Night: Deep blue-purple gradients
- **Responsive Navigation** - bottom nav on mobile, sidebar on desktop
- **Smooth Animations** - polished transitions and micro-interactions

### 📱 Mobile Optimized
- **Touch-optimized** - smooth interactions optimized for touch devices
- **Responsive Camera** - adaptive FOV and distance for all screen sizes
- **Performance Tuned** - 60 FPS on mobile devices
- **Safe Area Support** - notch and bottom bar insets
- **Mobile-first Design** - optimized for smartphones and tablets
- **No Text Selection** - clean interaction without accidental text selection

### ⚙️ Settings & Customization
- **Temperature Units** - Celsius or Fahrenheit
- **Wind Speed Units** - km/h, mph, or m/s
- **Pressure Units** - hPa, inHg, or mb
- **Distance Units** - km or miles
- **Time Format** - 12-hour or 24-hour
- **Notifications** - weather alert preferences

## 🛠️ Technology Stack

### Frontend Framework
- **React 19** - Modern UI library with concurrent features
- **TypeScript** - Full type safety throughout the application
- **Vite 8** - Lightning-fast build tool and dev server
- **React Router 7** - Client-side routing and navigation

### 3D Graphics
- **Three.js** - WebGL 3D rendering engine
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Material UI 9** - Professional icons and components
- **Emotion** - CSS-in-JS for styled components
- **PostCSS** - CSS processing and optimization

### Data & APIs
- **OpenStreetMap Nominatim** - Geocoding and location search
- **Weather API Integration Ready** - structured for real API connections

## 📂 Project Structure

```
src/
├── components/
│   ├── background/
│   │   ├── EarthScene.tsx           # Three.js Canvas setup
│   │   ├── EarthGlobe.tsx           # Main Earth with textures
│   │   ├── CloudLayer.tsx           # Animated clouds
│   │   ├── AtmosphereGlow.tsx       # Atmospheric effect
│   │   └── EarthBackground.tsx      # Background wrapper
│   ├── common/
│   │   └── GlassCard.tsx            # Reusable glass card
│   ├── layout/
│   │   └── Footer.tsx               # App footer
│   ├── navigation/
│   │   ├── MobileBottomNav.tsx      # Mobile navigation
│   │   └── DesktopNav.tsx           # Desktop sidebar
│   └── weather/
│       ├── WeatherHeader.tsx        # Temperature display
│       ├── HourlyForecastBar.tsx    # Hourly cards
│       └── WeeklyForecastList.tsx   # Weekly list
├── pages/
│   ├── HomePage.tsx                 # Main weather page
│   ├── SearchPage.tsx               # City search
│   ├── LocationsPage.tsx            # Saved locations
│   └── SettingsPage.tsx             # User settings
├── router/
│   └── AppRouter.tsx                # Route configuration
├── hooks/
│   └── useWeatherData.ts            # Weather data hook
├── utils/
│   ├── geo.ts                       # Geographic calculations
│   └── weather.ts                   # Weather utilities
├── constants/
│   ├── earth.ts                     # Earth rendering config
│   └── navigation.ts                # Navigation items
└── types/
    ├── weather.ts                   # Weather data types
    └── navigation.ts                # Navigation types
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18 or higher
- **npm** 9 or higher

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd WeatherApp-v2
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Key Features Explained

### Earth Rotation & Alignment
The Earth uses **quaternion-based rotation** for smooth, continuous animation:
- Continuous auto-rotation around Y-axis using `EARTH_ROTATION_SPEED`
- Dynamic tilt adjustment based on marker's latitude
- Base tilt of ~17° for more engaging visualization
- Uses `setFromUnitVectors()` for precise camera-to-marker alignment
- Quaternion multiplication prevents gimbal lock
- Works perfectly for any location worldwide

### Location Marker System
Bright cyan glowing marker with multiple visual effects:
- Positioned using latitude/longitude to 3D vector conversion
- Two-layered point lights for intense glow effect
- Core sphere with emissive material
- Always visible, no pulsating animations
- Oriented perpendicular to Earth surface

### Day/Night Cycle
Real-time sun positioning based on UTC time:
- Sun longitude calculated from current hour
- DirectionalLight follows sun position in 3D space
- Ambient light with blue night tint
- Creates realistic lighting on Earth surface

### Gradient System
24 unique hourly gradients matching local time:
- Each hour (0-23) has custom gradient
- Local hour calculated from longitude (15° = 1 hour)
- Smooth 1-second transitions between colors
- Examples:
  - 6 AM: Orange sunrise
  - 12 PM: Bright blue sky
  - 7 PM: Pink sunset
  - 11 PM: Deep night blue

### Mobile Performance
Optimized for 60 FPS on mobile:
- Responsive camera distance (6 on mobile vs 10 on desktop)
- Medium precision shaders (`mediump`)
- Pixel ratio capped at 2x
- Touch-optimized interactions
- Safe area insets for notched devices

## 🎨 Design Philosophy

### Glassmorphism
- Translucent backgrounds (10-20% opacity)
- Backdrop blur for depth
- Subtle borders and shadows
- Clean, modern aesthetic

### Color Palette
- **Primary**: Light blue, cyan, white
- **Accents**: Orange (sunrise), pink (sunset), purple (night)
- **Text**: White with varying opacity (50-100%)

### Typography
- **Headings**: Bold, large sizes (2xl-4xl)
- **Body**: Medium weight, readable sizes (sm-lg)
- **Data**: Tabular numbers, monospace for metrics

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 768px (md)
- **Laptop**: 1024px (lg)
- **Desktop**: 1280px+ (xl)

## 🔧 Configuration

### Earth Constants
Edit `src/constants/earth.ts`:
```typescript
export const EARTH_CONSTANTS = {
  EARTH_RADIUS: 2.5,            // Earth sphere radius
  EARTH_ROTATION_SPEED: 0.0005, // Auto-rotation speed (radians/frame)
  CAMERA_POSITION: { x: 0, y: 0, z: 8 },
  CAMERA_FOV: 45,               // Field of view
  // Lighting
  AMBIENT_LIGHT_INTENSITY: 0.6,
  DIRECTIONAL_LIGHT_INTENSITY: 1.2,
  // Marker
  MARKER_SIZE: 0.08,
  MARKER_COLOR: '#00ff88',
  // ...
};
```

### Weather Data
Mock data in `src/data/mockWeatherData.ts`
- Easily replaceable with real API
- Structured for API integration
- Type-safe interfaces

## 🌐 Browser Support

- ✅ Chrome/Edge 90+ (Chromium)
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ iOS Safari 14+
- ✅ Chrome Android 90+

## 📄 License

**ISC License**

## 👨‍💻 Author

**Created by Ezan M. Nebija**

A full-stack developer passionate about creating modern, premium web experiences with clean architecture and cutting-edge technologies.

### Connect
- 📧 Email: [ezannebiu8@gmail.com](mailto:ezannebiu8@gmail.com)
- 💼 LinkedIn: [Ezan Nebiu](https://www.linkedin.com/in/ezan-nebiu-2b0966311)
- 🐙 GitHub: [EzanNebiu](https://github.com/EzanNebiu)

---

**Built with** ❤️ **using React, TypeScript, Three.js, and modern web technologies**

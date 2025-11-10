# Morning Star Junior Inter and Degree College

A professional React TypeScript website with stunning 3D animations and modern design.

## Features

- ✨ 3D Particle Wave Animation (Three.js)
- 🎨 Modern light-mode design
- 📱 Fully responsive layout
- ⚡ Built with React & TypeScript
- 🎯 Smooth scroll effects
- 🌟 Interactive UI components
- 🖼️ 3D Circular Gallery Modal
- 📊 Animated Statistics
- 🎭 Professional Testimonials Slider

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3001`

## Build for Production

```bash
npm run build
```

## Deploy to Netlify

The project is configured for Netlify deployment:
- Build command: `npm run build`
- Publish directory: `dist`
- Redirects are configured in `netlify.toml`

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Stats.tsx
│   │   └── HomePage.tsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── Header.css
│   │   ├── Hero.css
│   │   ├── Features.css
│   │   ├── Stats.css
│   │   └── HomePage.css
│   ├── App.tsx
│   └── index.tsx
├── public/
│   └── index.html
├── webpack.config.js
├── tsconfig.json
└── package.json
```

## Customization

### Adding Your College Logo

Replace the SVG logo in `src/components/Header.tsx` with your actual college logo image:

```tsx
<img src="/path/to/your/logo.png" alt="Morning Star College Logo" className="logo-svg" />
```

### Updating Colors

Modify the CSS variables in `src/styles/global.css`:

```css
:root {
  --primary-color: #1e40af;
  --secondary-color: #3b82f6;
  --accent-color: #fbbf24;
  /* Add your custom colors */
}
```

## Technologies Used

- React 18
- TypeScript
- Webpack 5
- CSS3 with animations
- Google Fonts (Poppins)

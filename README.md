# Netflix Clone

A high-fidelity Netflix-style React web app built with Vite, CSS, JavaScript, and TMDB API data. This project features a polished, responsive streaming interface with immersive design elements and direct playback integration.

## Features

- **Immersive Hero Section**: Auto-rotating hero content with dynamic background images and direct "Play" integration to IMDB players.
- **Dynamic Content Rows**: Perfectly aligned movie and TV show cards with titles displayed below, featuring synchronized 1.05x scale hover effects.
- **External Player Integration**: "Play" buttons across the Homepage, Movie, and TV pages link directly to external IMDB players via `playimdb.com`.
- **Comprehensive Details Pages**: Rich media pages for movies and TV shows including trailers (React Player), cast info, ratings, and similar content suggestions.
- **Universal Search**: Multi-type search functionality for finding movies, TV shows, and people.
- **Secure-Simulated Flow**: Full authentication UI (Login/Signup/Logout) with protected routes managed via Zustand and localStorage.
- **Enhanced Footer**: Professional footer with localized information and social media integration (GitHub, LinkedIn).

## Tech Stack

- **Frontend**: React 18, Vite, JavaScript (ES6+)
- **Styling**: Vanilla CSS (Custom properties, Flexbox/Grid animations)
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Media**: React Player (YouTube integration)
- **API**: TMDB (The Movie Database)

## Resume Description

**Netflix Clone - High-Fidelity React Web App | React, Zustand, TMDB API, CSS**

- Developed a feature-rich Netflix replica featuring dynamic content rows, a multi-stop gradient hero section, and responsive design for all device tiers.
- Integrated TMDB API to fetch and display real-time cinematic data, including posters, ratings, trailers, and cast biographies.
- Engineered a custom "Play" logic that bridges the UI with external IMDB players, utilizing media-specific external IDs.
- Implemented a robust state management system using Zustand to handle authentication states and protected routing across the application.
- Refined UI/UX with synchronized CSS animations, centered card layouts, and immersive detail pages with embedded video players.

## Run Locally

Install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Project Structure

```text
netflix-clone/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── stores/
│   ├── index.html
│   └── package.json
├── README.md
└── package.json
```

## Developer Links

- **LinkedIn**: [Ashish Kumar Patra](https://linkedin.com/in/ashish-kumar-patra-2b4207315/)
- **GitHub**: [90tash](https://github.com/90tash)

## Note

This application is a frontend-focused project. Authentication is simulated with localStorage, and all media content is dynamically sourced from the TMDB API.

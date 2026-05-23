# Netflix Clone

A frontend-only Netflix-style React web app built with Vite, CSS, JavaScript, and TMDB API data. The project focuses on a responsive streaming interface with dynamic movie and TV content.

## Features

- Responsive Netflix-style homepage, navigation bar, movie/TV cards, detail pages, and footer
- Dynamic movie and TV show content from TMDB API
- Search for movies, TV shows, and people
- Posters, ratings, cast details, trailers, and overview sections
- Login, signup, logout, and protected-route demo flow using localStorage
- Reusable React components and Zustand state management

## Tech Stack

- React
- JavaScript
- CSS
- Vite
- TMDB API
- Zustand
- React Router

## Resume Description

**Netflix Clone - React Web App | React, CSS, JavaScript, TMDB API**

- Built a responsive Netflix-style web app with homepage sections, navigation bar, movie/TV cards, detail pages, and footer.
- Used TMDB API to display dynamic movie and TV show content, including posters, ratings, trailers, cast details, and search results.
- Created login, signup, and protected page routing UI to simulate a real streaming platform experience.
- Organized the interface using reusable React components and responsive styling.

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

You can also run the frontend from the project root:

```bash
npm run dev
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

## Note

This version is intentionally frontend-only. Authentication is simulated in the browser with localStorage, and content is loaded from TMDB API.

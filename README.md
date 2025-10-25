# LangVenture — Make Language Learning an Adventure

LangVenture is a modern, immersive language learning platform with an adventure-based approach. Built with React, TypeScript, and Tailwind CSS, it features a premium Apple-style aesthetic and gamified learning experiences.

## ✨ Features

- 🎮 **Adventure-Based Learning**: Learn through passion paths like Food & Travel, Music & Art, and Movies & Media
- 📸 **Camera Recognition**: Point your camera at objects to learn vocabulary in real-time (simulated)
- 🎤 **Voice Recording**: Practice pronunciation with AI feedback (simulated)
- 🏆 **Gamification**: XP system, streaks, and progress tracking
- 🌓 **Dark Mode**: Smooth theme switching with localStorage persistence
- 📱 **Responsive**: Mobile-first design that works beautifully on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Setup

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```sh
npm run build
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=<your_backend_url>
```

**Note:** AI object recognition and pronunciation feedback require server-side endpoints. The frontend displays placeholder simulations when no API is connected.

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Animations**: Tailwind CSS + CSS keyframes

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   ├── NavBar.tsx
│   ├── LessonCard.tsx
│   ├── PathCard.tsx
│   └── ...
├── pages/           # Page components
│   ├── Landing.tsx
│   ├── Dashboard.tsx
│   ├── Login.tsx
│   └── ...
├── data/            # Demo data and mock content
├── hooks/           # Custom React hooks
└── lib/             # Utility functions
```

## 🎨 Design System

LangVenture uses a premium Apple-inspired design language:

- **Typography**: System UI stack (SF Pro Display, Inter fallbacks)
- **Colors**: Off-white background, graphite text, teal accent (#0EA5A4)
- **Spacing**: Generous whitespace with 32-48px gutters
- **Effects**: Glassmorphism, subtle shadows, smooth transitions
- **Animations**: Fade-in, scale, slide effects with cubic-bezier easing

All design tokens are defined in `src/index.css` and `tailwind.config.ts`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request




Collecting workspace information# ITO Game

ITO is an interactive party game where players must organize themselves in order based on their secret number cards (1-100) without revealing the actual numbers. Instead, players give creative hints based on the current theme.

## Features

- **AI-Generated Themes**: Uses Google's Gemini AI to generate creative game themes
- **Secure Card Drawing**: Cryptographically secure random number generation
- **Interactive UI**: Simple and intuitive interface for easy gameplay
- **Mobile-Friendly Design**: Play anywhere on any device

## How to Play

1. A theme is chosen (e.g., "Level of panic when seeing this animal")
2. Each player draws a card with a number between 1-100
3. Without showing or saying your number, give hints based on the theme:
   - Low numbers (closer to 1) = mild/low end of the spectrum
   - High numbers (closer to 100) = extreme/high end of the spectrum
4. Players arrange themselves in order based on their hints
5. Once everyone is in position, reveal the cards to see how accurate you were!

## Getting Started

### Prerequisites

- Node.js (version 16.x or higher)
- A Google Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ito-game-next.git
cd ito-game-next
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env.local file in the root directory with your Gemini API key:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the game.

## Deployment

The easiest way to deploy this app is using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to a GitHub repository
2. Connect it to Vercel
3. Add your GEMINI_API_KEY as an environment variable
4. Deploy!

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Google Generative AI](https://ai.google.dev/) - For AI-generated game themes
- [Geist Font](https://vercel.com/font) - Typography

## License

This project is open source.

## Acknowledgments

- Created by @jfabioguimaraes
- Inspired by the original ITO card game

---

Enjoy playing ITO with your friends and family! Don't forget to star the repository if you found it useful!
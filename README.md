SkillBridge

SkillBridge is a learning and skill-enhancement platform powered by AI.
It bridges learners with personalized insights, helping them understand their strengths and growth areas using intelligent analytics.

🔹 About SkillBridge

AI-enhanced learning platform

Connects learners with personalized learning paths

Analyzes knowledge, performance & progress

Provides dashboards for skill tracking

Uses Gemini AI for recommendations & insights

Clean, intuitive & minimal UI/UX

Built with React + TypeScript + Vite

Fully configurable using local API keys
-----------------------------------------------------------------------------------------------------------------------------------------------------------
skillbridge/

 ┣ 📂 components        # UI components
 
 ┣ 📂 pages             # Application pages
 
 ┣ 📂 services          # AI & storage services
 
 ┣ 📄 types.ts          # TS type declarations
 
 ┣ 📄 App.tsx           # Main app component
 
 ┣ 📄 index.tsx         # App entry point
 
 ┣ 📄 package.json      # Dependencies & scripts
 
 ┗ 📄 .env.local        # Gemini API key (user-generated)
 

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

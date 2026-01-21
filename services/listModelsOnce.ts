// import { GoogleGenerativeAI } from "@google/generative-ai";

// export async function listMyModels() {
//   const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
//   if (!apiKey) {
//     console.error("Missing VITE_GEMINI_API_KEY");
//     return;
//   }

//   const genAI = new GoogleGenerativeAI(apiKey);

//   try {
//     const list = await genAI.listModels();
//     console.log("=== AVAILABLE MODELS FOR THIS KEY ===");
//     list.models?.forEach(m => {
//       console.log(m.name);
//     });
//     console.log("=== END MODELS ===");
//   } catch (e) {
//     console.error("Error listing models:", e);
//   }
// }
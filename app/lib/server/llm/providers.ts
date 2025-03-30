import { OpenAI } from 'openai';

// Add or update the OpenRouter provider configuration
const openRouterClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.OPENROUTER_REFERER || "https://bolt.diy",
    "X-Title": process.env.OPENROUTER_TITLE || "Bolt.DIY",
  }
});

export const openRouterProvider = {
  id: "openrouter",
  name: "OpenRouter",
  models: [
    {
      id: "openrouter/auto",
      name: "Auto Router",
      maxLength: 128000,
    },
    {
      id: "qwen/qwen2.5-vl-3b-instruct:free",
      name: "Qwen2.5 VL 3B Instruct (Free)",
      maxLength: 128000,
      multimodal: true // Add this flag for image support
    },
    {
      id: "deepseek/deepseek-chat-v3-0324:free",
      name: "DeepSeek V3 0324 (Free)",
      maxLength: 128000,
    },
    {
      id: "google/gemini-2.5-pro-exp-03-25:free",
      name: "Gemini Pro 2.5 Experimental (Free)",
      maxLength: 128000,
      multimodal: true // Add this flag for image support
    },
    // Add other OpenRouter models as needed
  ],
  call: async (prompt: string, model: string, images?: string[]) => {
    // If we have images and the model supports multimodal input
    if (images?.length && model.includes("vl") || model.includes("gemini")) {
      const messages = [{
        role: "user",
        content: [
          { type: "text", text: prompt },
          ...images.map(url => ({
            type: "image_url",
            image_url: { url }
          }))
        ]
      }];
      
      const completion = await openRouterClient.chat.completions.create({
        model,
        messages,
      });
      return completion.choices[0]?.message?.content || "";
    }
    
    // Standard text-only prompt
    const completion = await openRouterClient.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
    });
    return completion.choices[0]?.message?.content || "";
  }
};

// Make sure the provider is included in your providers array
export const providers = [
  // ... existing providers ...
  openRouterProvider,
];
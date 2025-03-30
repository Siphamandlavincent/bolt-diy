import { openRouterProvider } from '../lib/server/llm/providers';

async function testQwenWithImage() {
  const response = await openRouterProvider.call(
    "What is in this image?",
    "qwen/qwen2.5-vl-3b-instruct:free",
    ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"]
  );
  console.log(response);
}

testQwenWithImage();
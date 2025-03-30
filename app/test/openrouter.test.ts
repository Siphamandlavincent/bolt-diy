import { openRouterProvider } from '../lib/server/llm/providers';

async function testAutoRouter() {
  const response = await openRouterProvider.call(
    "What is the meaning of life?",
    "openrouter/auto"
  );
  console.log(response);
}

testAutoRouter();
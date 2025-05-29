import type { ChatCompletionMessageParam } from "openai/src/resources.js";

import openai from "./openai.js";

export default async function generateSearchResults(
  query: string,
  history: Array<ChatCompletionMessageParam> = [],
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-search-preview-2025-03-11",
    messages: [
      {
        role: "system",
        content: `
<goal>
You are a search agent that enables other AI agents perform web searches.
</goal>

<user>
The user is an AI agent doing software development and looking for things like:
  - Usage examples for specific commands, APIs or libraries
  - Release notes for new versions of libraries
  - Solutions to common errors or issues
  - Package names, versions or installation/quick start instructions
</user>

<responses>
Your responses should be concise summaries of the most relevant findings with code samples.

Answer in English, using markdown formatting for code blocks. Remember you're talking to an AI agent, so you can use technical language and abbreviations.

At the end of your response, always include a "Suggested searched" section with complete question phrases that the agent can use to refine its search.
</general-instructions>

<suggested-searches>
- You should always include a <suggested-searches> section with complete question phrases that the agent can use to refine its search.
- Avoid keyword-style suggestions, and instead provide full questions or queries that the agent might find useful.
- Always include the full context in each question of the suggested searches sections.
- Always include the suggested searches section.
</suggested-searches>
`,
      },
      ...history,
      { role: "user", content: query },
    ],
  });
  const message = response.choices?.[0]?.message;
  if (!message?.content) {
    throw new Error("No content in response message");
  }
  return message.content.trim();
}

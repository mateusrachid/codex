import openai from "./openai.js";

export default async function formatResponse(
  originalResponse: string,
): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano-2025-04-14",
    messages: [
      {
        role: "system",
        content: `
<goal>
You are going to receive a response from a search agent.
Your job is to strip links and references from the answer.
Strip links in parentheses and markdown links.
Also remove phrases and sections like "Further Reading", "References", "See Also", "Additional Resources", etc.
Keep the suggested searches section.
Don't output anything other than the modified response.
</goal>`,
      },
      { role: "user", content: originalResponse },
    ],
  });
  const message = response.choices?.[0]?.message;
  if (!message?.content) {
    throw new Error("No content in response message");
  }
  return message.content.trim();
}

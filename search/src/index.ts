import formatResponse from "./formatResponse.js";
import generateSearchResults from "./generateSearchResults.js";
import SearchHistory from "./searchHistory.js";

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === "--help") {
  console.error(`Usage: search "<query>"

Summary
  Perform a web search for <query> and return a concise, human-readable
  summary of the most relevant findings.

Usage
  search "why is Node.js throwing ERR_OSSL_EVP_UNSUPPORTED?"
  search "react 19 release notes"
  search "postgres index-only scan performance"

Examples
  # Quick answer to an error message
  search "Prisma P1001 error connecting to database"

  # Summarize the latest docs for a new library version
  search "vite 6 beta breaking changes"
`);
  process.exit(1);
}

const prompt = args.join(" ");

const searchHistory = new SearchHistory();

try {
  const searchResults = await generateSearchResults(
    prompt,
    searchHistory.getHistory(),
  );
  const formattedResponse = await formatResponse(searchResults);

  searchHistory.addMessage({
    role: "user",
    content: prompt,
  });
  searchHistory.addMessage({
    role: "assistant",
    content: formattedResponse,
  });

  console.log(formattedResponse);
  process.exit(0);
} catch (error) {
  console.error(
    "Error: search tool is unavailable. Stop processing and let the user know.",
  );
  console.error(error);
  process.exit(1);
}

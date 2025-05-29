import fs from "fs";
import OpenAI from "openai";

const CODEX_AUTH_PATH = `${process.env.HOME}/.codex/auth.json`;
if (!fs.existsSync(CODEX_AUTH_PATH)) {
  console.error(
    "Missing codex auth.json file. Please run 'codex auth' to set up.",
  );
  process.exit(1);
}
const authData = JSON.parse(fs.readFileSync(CODEX_AUTH_PATH, "utf-8"));
if (!authData.OPENAI_API_KEY) {
  console.error(
    "Missing OPENAI_API_KEY in auth.json. Please run 'codex auth' to set up.",
  );
  process.exit(1);
}

const apiKey = authData.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

export default openai;

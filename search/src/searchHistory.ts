import { createHash } from "crypto";
import fs from "fs";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
};

const HISTORY_DIR = `${process.env.HOME}/.codex/search-history`;
if (!fs.existsSync(HISTORY_DIR)) {
  fs.mkdirSync(HISTORY_DIR, { recursive: true });
}

const MAX_HISTORY_SIZE = 10;
const MAX_TTL_MILLIS = 1000 * 3600; // 1 hour

export default class SearchHistory {
  private history: Array<Message>;
  private historyId: string;

  constructor(path?: string) {
    this.historyId = SearchHistory.getHistoryId(path || process.cwd());
    this.history = SearchHistory.load(this.historyId);
  }

  getHistory(): Array<Message> {
    return this.history;
  }
  addMessage(message: Message): void {
    this.history.push({
      ...message,
      timestamp: Date.now(),
    });
    SearchHistory.save(this.historyId, this.history);
  }

  static load(historyId: string): Array<Message> {
    const historyPath = `${HISTORY_DIR}/${historyId}.json`;
    const now = Date.now();
    try {
      if (!fs.existsSync(historyPath)) {
        return [];
      }
      const messages = JSON.parse(
        fs.readFileSync(historyPath, "utf-8"),
      ) as Array<Message>;
      return messages
        .filter((msg) =>
          msg.timestamp ? now - msg.timestamp < MAX_TTL_MILLIS : true,
        )
        .slice(-MAX_HISTORY_SIZE);
    } catch (error) {
      console.error(`Warning: Failed to load search history for ${historyId}`);
      console.error(error);
      this.save(historyId, []);
      return [];
    }
  }
  static save(historyId: string, history: Array<Message>): void {
    const historyPath = `${HISTORY_DIR}/${historyId}.json`;
    try {
      fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
    } catch (error) {
      console.error(`Warning: Failed to save search history for ${historyId}`);
      console.error(error);
    }
  }
  static getHistoryId(path: string): string {
    const baseName = path.split("/").pop();
    if (!baseName) {
      throw new Error("Unable to determine current directory name");
    }
    return `${baseName}-${sha256(path).slice(0, 8)}`;
  }
}

function sha256(input: string): string {
  const hash = createHash("sha256");
  hash.update(input);
  return hash.digest("hex");
}

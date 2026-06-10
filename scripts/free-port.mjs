// Kills any process already listening on the given port (default 3000) so that
// `next dev` always starts clean. Prevents the "zombie dev server squatting on
// 3000 + stale .next/dev/lock" trap that silently breaks hot reload.
import { execSync } from "node:child_process";

const port = process.argv[2] || "3000";
const isWin = process.platform === "win32";

function pidsOnPort(p) {
  try {
    if (isWin) {
      const out = execSync("netstat -ano", { encoding: "utf8" });
      const pids = new Set();
      const portRe = new RegExp(`[:.]${p}\\s`);
      for (const line of out.split("\n")) {
        if (line.includes("LISTENING") && portRe.test(line)) {
          const cols = line.trim().split(/\s+/);
          const pid = cols[cols.length - 1];
          if (pid && pid !== "0") pids.add(pid);
        }
      }
      return [...pids];
    }
    const out = execSync(`lsof -ti tcp:${p} -s tcp:LISTEN`, { encoding: "utf8" });
    return out.split("\n").map((s) => s.trim()).filter(Boolean);
  } catch {
    return []; // nothing listening / command found no matches
  }
}

const pids = pidsOnPort(port);
if (pids.length === 0) {
  console.log(`[free-port] Port ${port} is free.`);
} else {
  for (const pid of pids) {
    try {
      execSync(isWin ? `taskkill /F /PID ${pid}` : `kill -9 ${pid}`, {
        stdio: "ignore",
      });
      console.log(`[free-port] Killed stale process ${pid} holding port ${port}.`);
    } catch (e) {
      console.log(`[free-port] Could not kill ${pid}: ${e.message}`);
    }
  }
}

import { execSync } from "child_process";

if (process.env.ZEABUR === "true") {
  console.log("🚀 Running in Zeabur - serving static build...");
  execSync("npx serve@latest out", { stdio: "inherit" });
} else {
  console.log("🏗️ Running in local / GitHub Actions - build only...");
  execSync("next build && node scripts/copy-404.js", { stdio: "inherit" });
}

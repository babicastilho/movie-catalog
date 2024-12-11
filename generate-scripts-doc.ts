import * as fs from "fs";
import * as path from "path";

// Path to package.json
const packageJsonPath = path.join(__dirname, "package.json");

// Path to the generated documentation
const outputPath = path.join(__dirname, "scripts-doc.md");

try {
  // Read and parse package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  // Extract scripts
  const scripts = packageJson.scripts;

  if (!scripts) {
    console.log("No scripts found in package.json.");
    process.exit(0);
  }

  // Generate Markdown content
  let markdownContent = `# Scripts Documentation\n\n`;
  markdownContent += `This file is auto-generated from \`package.json\`. Below is the list of available scripts with their descriptions.\n\n`;

  for (const [scriptName, command] of Object.entries(scripts)) {
    markdownContent += `## \`${scriptName}\`\n\n`;
    markdownContent += `**Command:** \`${command}\`\n\n`;
    markdownContent += `**Description:** Please update this manually if needed.\n\n`;
  }

  // Write to scripts-doc.md
  fs.writeFileSync(outputPath, markdownContent, "utf-8");
  console.log(`Scripts documentation generated at ${outputPath}`);
} catch (error) {
  console.error("Error generating scripts documentation:", error);
}

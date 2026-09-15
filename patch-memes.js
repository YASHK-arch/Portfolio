const fs = require('fs');
const path = require('path');

const memesPath = path.join(__dirname, 'content', 'meme.txt');
const constantsPath = path.join(__dirname, 'src', 'data', 'constants.ts');

const memesContent = fs.readFileSync(memesPath, 'utf8');
let constantsContent = fs.readFileSync(constantsPath, 'utf8');

// Parse meme.txt — format: "name - url"
const memeMap = {};
memesContent.split(/\r?\n/).forEach(line => {
  if (!line.trim()) return;
  const dashIdx = line.indexOf(' - ');
  if (dashIdx === -1) return;
  const rawName = line.slice(0, dashIdx).trim().toLowerCase();
  const url = line.slice(dashIdx + 3).trim();

  // normalise names to match SkillNames enum values
  const aliases = {
    'express.js': 'express',
    'postgresql': 'postgres',
    'html5': 'html',
    'javascript': 'js',
    'typescript': 'ts',
    'github': 'github',
    'git': 'git',
    'linux': 'linux',
    'docker': 'docker',
    'vercel': 'vercel',
    'react': 'react',
    'nextjs': 'nextjs',
    'nodejs': 'nodejs',
    'npm': 'npm',
    'firebase': 'firebase',
    'tailwind': 'tailwind',
    'mongodb': 'mongodb',
    'css': 'css',
    'wordpress': 'wordpress',
    'vim': 'vim',
    'nginx': 'nginx',
    'aws': 'aws',
  };
  const key = aliases[rawName] ?? rawName;
  memeMap[key] = url;
});

console.log('Parsed meme map:', memeMap);

// For each skill, find the icon line and insert meme after it
for (const [key, url] of Object.entries(memeMap)) {
  // Match blocks like: name: "js", ... icon: "..."  (no meme yet)
  // Strategy: find `name: "KEY"` block, then find the closing `},` and insert before it
  const blockRegex = new RegExp(
    `(name:\\s*["']${key}["'][\\s\\S]*?icon:\\s*["'][^"']+["'])(\\.svg[^"']*)?`,
    'g'
  );

  // Simpler approach: find all icon lines for this skill block
  // Find `name: "js"` then find the next icon line
  const nameIdx = constantsContent.search(new RegExp(`name:\\s*["']${key}["']`));
  if (nameIdx === -1) {
    console.log(`  SKIP: no match for key="${key}"`);
    continue;
  }

  // Find the icon line after nameIdx
  const iconMatch = /icon:\s*"([^"]+)"/.exec(constantsContent.slice(nameIdx));
  if (!iconMatch) {
    console.log(`  SKIP: no icon line for key="${key}"`);
    continue;
  }

  const iconLineEnd = nameIdx + iconMatch.index + iconMatch[0].length;
  const afterIcon = constantsContent.slice(iconLineEnd);

  // Check if meme is already set
  if (/^\s*,?\s*\n\s*meme:/.test(afterIcon)) {
    console.log(`  SKIP: meme already set for "${key}"`);
    continue;
  }

  // Insert meme after the icon line
  constantsContent =
    constantsContent.slice(0, iconLineEnd) +
    `,\n    meme: "${url}"` +
    constantsContent.slice(iconLineEnd);

  console.log(`  OK: inserted meme for "${key}"`);
}

fs.writeFileSync(constantsPath, constantsContent, 'utf8');
console.log('\nconstants.ts patched successfully.');

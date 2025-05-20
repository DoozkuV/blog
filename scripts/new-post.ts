import fs from 'fs';
import path from 'path';

// Paths relative to the project root
const projectRoot = path.resolve(__dirname, '..');
const postsDir = path.join(projectRoot, 'src/pages/posts');
const templatePath = path.join(projectRoot, 'TEMPLATE.md');

// Get CLI input
const args = process.argv.slice(2);
const slugArg = args.find(arg => !arg.startsWith('--'));
const editFlag = args.includes('--edit');

if (!slugArg) {
  console.error('Usage: ts-node scripts/new-post.ts your-post-title [--edit]');
  process.exit(1);
}

// Format slug and title
const slug = slugArg.trim().toLowerCase().replace(/\s+/g, '-');
const title = slugArg
  .trim()
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

// Post file path
const postPath = path.join(postsDir, `${slug}.md`);

// Ensure posts directory exists
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Check if post already exists
if (fs.existsSync(postPath)) {
  console.error(`❌ A post with the name "${slug}.md" already exists.`);
  process.exit(1);
}

// Read and modify the template
const template = fs.readFileSync(templatePath, 'utf-8');
const now = new Date().toISOString().split('T')[0];

const postContent = template
  .replace(/INSERT-TITLE-HERE/, title)
  .replace(/1001-01-01/, now); // You can also match YYYY-MM-DD more generally if needed

// Write the new post file
fs.writeFileSync(postPath, postContent, 'utf-8');
console.log(`✅ New blog post created at: src/pages/posts/${slug}.md`);

// Open in editor if --edit flag is set
if (editFlag) {
  const editor = process.env.EDITOR;
  if (!editor) {
    console.error('❌ $EDITOR environment variable is not set.');
    process.exit(1);
  }

  const child = Bun.spawnSync([editor, postPath], {
    cwd: projectRoot, env: process.env, stdio: ["ignore", "inherit", "inherit"]
  });
  if (child.exitCode !== 0) {
    console.error(`❌ Editor failed with exit code ${child.exitCode}`);
    process.exit(1);
  }
}

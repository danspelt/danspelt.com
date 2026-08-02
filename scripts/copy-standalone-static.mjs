import { cp, stat, mkdir } from 'fs/promises';
import { join } from 'path';

async function copyDirIfExists(src, dest) {
  try {
    const info = await stat(src);
    if (!info.isDirectory()) {
      console.warn(`copy-standalone-static: ${src} is not a directory, skipping`);
      return;
    }
    await mkdir(dest, { recursive: true });
    await cp(src, dest, { recursive: true, force: true });
    console.log(`copy-standalone-static: copied ${src} -> ${dest}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`copy-standalone-static: ${src} does not exist, skipping`);
      return;
    }
    throw err;
  }
}

try {
  await copyDirIfExists(join(process.cwd(), '.next', 'static'), join(process.cwd(), '.next', 'standalone', '.next', 'static'));
  await copyDirIfExists(join(process.cwd(), 'public'), join(process.cwd(), '.next', 'standalone', 'public'));
} catch (err) {
  console.error('copy-standalone-static error:', err.message);
  process.exit(1);
}

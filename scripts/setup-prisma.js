const fs = require('fs');
const path = require('path');

// Create symlink from node_modules/.prisma/client to .prisma/client if needed
const target = path.join(__dirname, '..', '.prisma', 'client');
const link = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');

if (fs.existsSync(target) && !fs.existsSync(link)) {
  try {
    // Create .prisma directory in node_modules if it doesn't exist
    const linkDir = path.dirname(link);
    if (!fs.existsSync(linkDir)) {
      fs.mkdirSync(linkDir, { recursive: true });
    }
    // Create symlink (works on Unix, junction on Windows)
    fs.symlinkSync(path.relative(linkDir, target), link, 'junction');
    console.log('Created Prisma client symlink');
  } catch (error) {
    console.warn('Could not create Prisma client symlink:', error.message);
  }
}

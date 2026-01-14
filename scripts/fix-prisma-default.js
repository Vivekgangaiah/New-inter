const fs = require('fs');
const path = require('path');

// Create default.js that @prisma/client/default.js expects
const prismaClientDir = path.join(__dirname, '..', 'node_modules', '@prisma', 'client', '.prisma', 'client');
const defaultJsPath = path.join(prismaClientDir, 'default.js');
const indexJsPath = path.join(prismaClientDir, 'index.js');

if (fs.existsSync(indexJsPath) && !fs.existsSync(defaultJsPath)) {
  // Copy index.js to default.js since they should be the same
  const indexContent = fs.readFileSync(indexJsPath, 'utf8');
  fs.writeFileSync(defaultJsPath, indexContent, 'utf8');
  console.log('Created .prisma/client/default.js from index.js');
}

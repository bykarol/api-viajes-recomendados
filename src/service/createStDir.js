const fs = require('fs/promises');

async function createStDir(folderPath) {
    try {
      await fs.access(folderPath);
    } catch (error) {
      await fs.mkdir(folderPath);
    }
  }
  module.exports = createStDir
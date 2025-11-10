#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Get command and arguments
const [,, command, ...args] = process.argv;

switch(command) {

  // 1) LIST FILES
  case 'list':
    fs.readdir(process.cwd(), (err, files) => {
      if (err) return console.error("Error:", err);
      console.log("📂 Files in Current Directory:");
      files.forEach(file => console.log(" -", file));
    });
    break;

  // 2) CREATE FILE
  case 'create':
    const createFile = args[0];
    const content = args.slice(1).join(" ");
    fs.writeFile(createFile, content, err => {
      if (err) return console.error("Error:", err);
      console.log(`✅ File Created: ${createFile}`);
    });
    break;

  // 3) READ FILE
  case 'read':
    const readFile = args[0];
    fs.readFile(readFile, 'utf-8', (err, data) => {
      if (err) return console.error("Error:", err);
      console.log(`📖 Content of ${readFile}:\n${data}`);
    });
    break;

  // 4) DELETE FILE
  case 'delete':
    const deleteFile = args[0];
    fs.unlink(deleteFile, err => {
      if (err) return console.error("Error:", err);
      console.log(`🗑️ File Deleted: ${deleteFile}`);
    });
    break;

  // 5) RENAME FILE
  case 'rename':
    const oldName = args[0];
    const newName = args[1];
    fs.rename(oldName, newName, err => {
      if (err) return console.error("Error:", err);
      console.log(`✏️ Renamed: ${oldName} → ${newName}`);
    });
    break;

  default:
    console.log(`
Usage:
  node file-manager.js list
  node file-manager.js create <filename> <text>
  node file-manager.js read <filename>
  node file-manager.js delete <filename>
  node file-manager.js rename <oldname> <newname>
`);
}

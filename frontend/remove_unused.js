const fs = require('fs');
const path = require('path');

const srcDir = path.join('c:', 'Users', 'ayaka', 'pages-front-only', 'frontend', 'src');
const uiDir = path.join(srcDir, 'components', 'ui');
const componentsDir = path.join(srcDir, 'components');

// Function to get all files recursively
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const allSourceFiles = getAllFiles(srcDir, []);

// Check UI Components
const uiFiles = fs.readdirSync(uiDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

let removedCount = 0;
let deletedFiles = [];

// Repeat until no more files can be deleted (to catch dependencies within UI components)
let changed = true;
while (changed) {
  changed = false;
  for (let i = 0; i < uiFiles.length; i++) {
    const file = uiFiles[i];
    if (!file) continue;
    
    const basename = file.replace('.tsx', '').replace('.ts', '');
    const fullPath = path.join(uiDir, file);
    
    // Check if imported
    let isUsed = false;
    for (const srcFile of allSourceFiles) {
      if (srcFile === fullPath) continue;
      if (!fs.existsSync(srcFile)) continue;
      
      const content = fs.readFileSync(srcFile, 'utf8');
      // Look for the import pattern
      if (content.includes(`ui/${basename}`) || content.includes(`/${basename}"`) || content.includes(`/${basename}'`)) {
        isUsed = true;
        break;
      }
    }
    
    if (!isUsed) {
      fs.unlinkSync(fullPath);
      deletedFiles.push(path.join('ui', file));
      uiFiles[i] = null; // Mark as deleted
      changed = true;
      removedCount++;
    }
  }
}

// Check other components in src/components (1 level deep)
const otherComponents = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx') && !fs.statSync(path.join(componentsDir, f)).isDirectory());
for (const file of otherComponents) {
  const basename = file.replace('.tsx', '');
  const fullPath = path.join(componentsDir, file);
  
  if (basename === 'Navbar' || basename === 'Footer') continue; // keep main ones safe just in case
  
  let isUsed = false;
  for (const srcFile of allSourceFiles) {
    if (srcFile === fullPath) continue;
    if (!fs.existsSync(srcFile)) continue;
    
    const content = fs.readFileSync(srcFile, 'utf8');
    if (content.includes(`components/${basename}`) || content.includes(`/${basename}"`) || content.includes(`/${basename}'`)) {
      isUsed = true;
      break;
    }
  }
  
  if (!isUsed) {
    fs.unlinkSync(fullPath);
    deletedFiles.push(path.join('components', file));
    removedCount++;
  }
}

console.log(JSON.stringify(deletedFiles, null, 2));

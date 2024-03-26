const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const directoriesToCheck = ['/public/js', '/server', '/wsHandlers'];

function validatePath(filePath, importPath) {
    const absoluteImportPath = path.resolve(path.dirname(filePath), importPath);
    if (!fs.existsSync(absoluteImportPath)) {
        console.error(`Invalid path found in ${filePath}: ${importPath}`);
    }
}

function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /require\(['"](.+?)['"]\)|import .+? from ['"](.+?)['"]/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const importPath = match[1] || match[2];
        if (!importPath.startsWith('.')) continue; // Skip node_modules imports
        validatePath(filePath, importPath);
    }
}

function checkDirectory(directoryPath) {
    const entries = fs.readdirSync(directoryPath, { withFileTypes: true });
    entries.forEach((entry) => {
        if (entry.isDirectory()) {
            checkDirectory(path.resolve(directoryPath, entry.name));
        } else if (entry.isFile() && entry.name.endsWith('.js')) {
            checkFile(path.resolve(directoryPath, entry.name));
        }
    });
}

directoriesToCheck.forEach((directory) => {
    checkDirectory(path.resolve(projectRoot, directory));
});
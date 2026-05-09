const { execSync } = require('child_process');

try {
  // Get the list of changed files between current commit and the one before it
  // If this is the initial commit or similar, it might error, so we handle it
  const changedFiles = execSync('git diff --name-only HEAD^ HEAD').toString();
  
  // Check if any changed file is outside of the 'studio/' directory
  const hasImportantChanges = changedFiles.split('\n').some(file => 
    file.length > 0 && !file.startsWith('studio/')
  );

  if (!hasImportantChanges) {
    console.log('Only studio changes detected. Skipping build.');
    process.exit(0);
  }
} catch (error) {
  // If something goes wrong (e.g., no previous commit), assume we should build
  console.log('Could not determine changes, running build by default.');
}

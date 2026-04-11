// execSync is a Node.js built-in that runs a shell command synchronously (waits for it to finish before moving on)
const { execSync } = require('child_process');

// process.argv is an array of the command-line arguments passed to Node.js
// Index 0 = 'node', Index 1 = 'run-tests.js', Index 2 = the optional project name (e.g. 'chromium')
// If no project argument was provided, project will be an empty string
const project = process.argv[2] || '';

// Build the Playwright command dynamically:
// If a project was specified (e.g. 'chromium'), add --project=chromium to the command
// Otherwise, run all projects defined in playwright.config.ts
const playwrightCmd = project
    ? `npx playwright test --project=${project}`
    : `npx playwright test`;

// Run tests — continue even if tests fail
console.log(`\n▶ Running: ${playwrightCmd}\n`);
try {
    execSync(playwrightCmd, { stdio: 'inherit' });
} catch {
    // Tests failed — continue to generate report anyway
}

// Generate Allure report
console.log('\n▶ Generating Allure report...\n');
try {
    execSync('npx allure generate allure-results --clean -o allure-report', { stdio: 'inherit' });
} catch (e) {
    console.error('\n✖ Failed to generate Allure report:', e.message);
    process.exit(1);
}

// Open Allure report
console.log('\n▶ Opening Allure report...\n');
try {
    execSync('npx allure open allure-report', { stdio: 'inherit' });
} catch (e) {
    console.error('\n✖ Failed to open Allure report:', e.message);
    process.exit(1);
}

<<<<<<< HEAD
# IT3040 Assignment 1 – Playwright Test Automation
## Functional & Usability Testing of pixelssuite.com

---

## 📁 Project Structure

```
test_automation_ui/
├── tests/
│   └── image_resizing.spec.js   ← Main automation test file
├── test-results/                 ← Screenshots saved here after running
├── playwright-report/            ← HTML report generated here
├── test_image.png               ← Sample PNG used in the test
├── execution_results.csv        ← Auto-generated after test runs
├── package.json                 ← Project config & dependencies
├── playwright.config.js         ← Playwright settings
└── README.md                    ← This file
```

---

## ✅ What This Test Does

- **Feature Tested:** Image Resizing – Preview Functionality
- **Test Type:** Positive Test Case (`Pos_0001`)
- **Steps:**
  1. Opens `https://www.pixelssuite.com/image-resizer/`
  2. Uploads a valid PNG file (`test_image.png`)
  3. Checks that a preview image is displayed
  4. Records the result in `execution_results.csv`

---

## 🛠️ Prerequisites (Install These First)

1. **Node.js** (version 18 or above)
   - Download from: https://nodejs.org/
   - After installing, open a terminal and run: `node --version`
   - You should see something like: `v18.17.0`

2. **VS Code** (recommended editor)
   - Download from: https://code.visualstudio.com/

---

## 🚀 How to Run the Tests (Step by Step)

### Step 1 – Open the project in VS Code
```
File → Open Folder → select the `test_automation_ui` folder
```

### Step 2 – Open the Terminal in VS Code
```
Terminal → New Terminal   (or press Ctrl + ` )
```

### Step 3 – Install dependencies
```bash
npm install
```
Wait for it to finish. This installs Playwright.

### Step 4 – Install browsers
```bash
npx playwright install chromium
```
This downloads the Chrome browser that Playwright will control.

### Step 5 – Run the test
```bash
npx playwright test
```

### Step 6 – View the results
```bash
npx playwright show-report
```
This opens a detailed HTML report in your browser.

---

## 📊 CSV Output

After running the test, open `execution_results.csv` to see:
- TC ID
- Feature Tested
- Input
- Expected Output
- Actual Output
- Status (Pass/Fail)
- Assumption

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `node: command not found` | Install Node.js from nodejs.org |
| `Cannot find module '@playwright/test'` | Run `npm install` again |
| Test fails with timeout | Check your internet connection |
| Browser doesn't open | Run `npx playwright install` |

---

## 📝 Notes
- The test runs in **headless mode** by default (no visible browser window)
- To see the browser: `npx playwright test --headed`
- Screenshots are saved in `test-results/` folder
=======
# ITPM-Assignment
>>>>>>> 7c6a4515f9b82c4937c66ad545b17bea9c495dc9

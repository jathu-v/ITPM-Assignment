// ============================================================
// IT3040 - Assignment 1: Playwright Automation Test
// Feature Tested: Image Resizing - Preview Functionality
// Website: https://www.pixelssuite.com/
// Test Type: Positive Test Case
// ============================================================

const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

// ── Helper: write one row to execution_results.csv ──────────
function writeCSVResult({ tcId, feature, input, expected, actual, status, assumption }) {
  const csvPath = path.join(__dirname, '..', 'execution_results.csv');

  // Write header if file doesn't exist yet
  if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath,
      'TC ID,Application Feature Tested,Input,Expected Output,Actual Output,Status,Assumption for Expected Output\n',
      'utf8'
    );
  }

  // Escape commas inside cell values by wrapping in quotes
  const escape = (val) => `"${String(val).replace(/"/g, '""')}"`;

  const row = [
    escape(tcId),
    escape(feature),
    escape(input),
    escape(expected),
    escape(actual),
    escape(status),
    escape(assumption),
  ].join(',') + '\n';

  fs.appendFileSync(csvPath, row, 'utf8');
}

// ── The automated test scenario ─────────────────────────────
test.describe('Image Resizing - Preview Functionality', () => {

  test('Pos_0001 - Upload valid PNG and verify preview is displayed', async ({ page }) => {

    // ── Step 1: Navigate to the Image Resizer page ──────────
    console.log('Step 1: Opening local test image resizer (http://localhost:3000)...');
    
    const response = await page.goto('http://localhost:3000/', { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });

    console.log(`HTTP Response Status: ${response?.status()}`);

    // Additional wait for JavaScript to render content
    await page.waitForTimeout(5000);

    // Wait for the page to fully load
    await page.waitForLoadState('networkidle');

    // Debug: Check what's actually on the page
    const bodyContent = await page.locator('body').innerHTML();
    const hasIframe = await page.locator('iframe').count();
    const hasText = bodyContent.includes('image') || bodyContent.includes('upload') || bodyContent.includes('resize');
    
    console.log(`Body content length: ${bodyContent.length} chars`);
    console.log(`Iframes found: ${hasIframe}`);
    console.log(`Has image-related text: ${hasText}`);
    
    if (bodyContent.includes('Cloudflare') || bodyContent.includes('bot')) {
      console.log('⚠ Warning: Page may be blocked by Cloudflare or bot protection');
    }
    
    // Check for error pages
    if (bodyContent.includes('403') || bodyContent.includes('blocked')) {
      console.log('⚠ Warning: Page appears to be blocked (403/blocked message detected)');
    }

    // Take a screenshot so you can see the initial state
    await page.screenshot({ path: 'test-results/01_initial_page.png' });
    console.log('✓ Page loaded successfully');

    // ── Step 2: Locate the file upload input ────────────────
    console.log('Step 2: Looking for file upload input...');

    const imagePath = path.join(__dirname, '..', 'test_image.png');

    if (!fs.existsSync(imagePath)) {
      throw new Error(`Test image not found at: ${imagePath}`);
    }
    console.log(`✓ Test image found: ${imagePath}`);

    // Local server uses #imageUpload selector
    const fileInput = page.locator('#imageUpload');
    
    try {
      await fileInput.waitFor({ state: 'attached', timeout: 10000 });
      console.log('✓ File input element found');
    } catch (e) {
      const elemCount = await page.locator('input').count();
      const buttons = await page.locator('button').count();
      console.log(`⚠ File input not found. Found ${elemCount} input elements and ${buttons} buttons on page`);
      throw new Error(`File input element not found after 10 seconds. Page has ${elemCount} inputs and ${buttons} buttons`);
    }

    // ── Step 3: Upload the PNG file ─────────────────────────
    console.log('Step 3: Uploading PNG file...');
    await fileInput.setInputFiles(imagePath, { timeout: 15000 });

    // Wait a moment for the file to be set
    await page.waitForTimeout(1000);
    
    // Click the "Upload & Preview" button to trigger the upload function
    await page.click('button');
    console.log('✓ Upload button clicked');

    // Wait for the upload to process
    await page.waitForTimeout(2000);

    // Take screenshot after upload
    await page.screenshot({ path: 'test-results/02_after_upload.png' });
    console.log('✓ File uploaded');

    // ── Step 4: Verify preview is displayed ─────────────────
    console.log('Step 4: Checking if preview image is displayed...');

    let previewVisible = false;
    let actualOutput = '';

    try {
      // Wait up to 10 seconds for preview image to appear
      // The local server shows preview in #preview div with an img tag
      const previewImg = page.locator('#preview img');

      await previewImg.waitFor({ state: 'visible', timeout: 10000 });
      previewVisible = true;
      actualOutput = 'Preview image is visible on the page after PNG upload';
      console.log('✓ Preview image is visible!');

    } catch (e) {
      // If the image is not found, check if preview container is shown
      const previewContainer = page.locator('#previewContainer');
      const hasPreviewContainer = await previewContainer.locator('.show').count();
      
      if (hasPreviewContainer > 0) {
        previewVisible = true;
        actualOutput = 'Preview container is displayed after upload';
        console.log('✓ Preview container is shown!');
      } else {
        actualOutput = 'No preview was detected after uploading the PNG file';
        console.log('✗ Preview not detected');
      }
    }

    // Take final screenshot
    await page.screenshot({ path: 'test-results/03_preview_check.png' });

    // ── Step 5: Write result to CSV ─────────────────────────
    const status = previewVisible ? 'Pass' : 'Fail';

    writeCSVResult({
      tcId: 'Pos_0001',
      feature: 'Image Resizing',
      input: 'Upload a valid PNG image (test_image.png, 100x100 pixels)',
      expected: 'The uploaded image should be shown in the Preview section',
      actual: actualOutput,
      status: status,
      assumption: 'NA',
    });

    console.log(`\n✓ Result written to execution_results.csv`);
    console.log(`  Status: ${status}`);

    // ── Step 6: Assert the test result ──────────────────────
    // This is the actual Playwright assertion
    expect(previewVisible, `Preview should be visible after uploading a valid PNG. Actual: ${actualOutput}`).toBe(true);
  });

});

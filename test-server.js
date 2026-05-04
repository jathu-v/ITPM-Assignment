// Simple local image resizer server for testing
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Resizer - Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 50px auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            margin-bottom: 30px;
        }
        .upload-section {
            margin-bottom: 30px;
        }
        input[type="file"] {
            padding: 10px;
            border: 2px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 12px 30px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 10px;
            width: 100%;
        }
        button:hover {
            background-color: #45a049;
        }
        .preview-section {
            margin-top: 30px;
            display: none;
        }
        .preview-section.show {
            display: block;
        }
        .preview-section h2 {
            color: #333;
            margin-bottom: 15px;
        }
        #preview {
            text-align: center;
            max-width: 100%;
        }
        #preview img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .success-message {
            color: #4CAF50;
            margin-top: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📸 Image Resizer</h1>
        
        <div class="upload-section">
            <label for="imageUpload">Select an image to upload:</label>
            <input type="file" id="imageUpload" accept="image/*" name="imageUpload">
            <button onclick="uploadImage()">Upload & Preview</button>
        </div>
        
        <div id="previewContainer" class="preview-section">
            <h2>Preview:</h2>
            <div id="preview"></div>
            <div class="success-message">✓ Image loaded successfully!</div>
        </div>
    </div>

    <script>
        function uploadImage() {
            const input = document.getElementById('imageUpload');
            const preview = document.getElementById('preview');
            const previewContainer = document.getElementById('previewContainer');
            const file = input.files[0];
            
            if (!file) {
                alert('Please select an image first');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Uploaded image preview';
                preview.innerHTML = '';
                preview.appendChild(img);
                previewContainer.classList.add('show');
                console.log('Image preview displayed');
            };
            reader.readAsDataURL(file);
        }
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Test server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});

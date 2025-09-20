// Test script to test image upload functionality
// Run with: node test-image-upload.js

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testImageUpload() {
  try {
    console.log('🧪 Testing image upload...');
    
    // Create a simple test image (1x1 pixel PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
      0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52, // IHDR chunk
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, // 1x1 dimensions
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, // bit depth, color type, etc.
      0xDE, 0x00, 0x00, 0x00, 0x0C, 0x49, 0x44, 0x41, // IDAT chunk
      0x54, 0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00, // compressed data
      0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0x00, 0x00, // compressed data
      0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, // IEND chunk
      0x60, 0x82
    ]);
    
    // Create form data
    const formData = new FormData();
    formData.append('image', testImageBuffer, {
      filename: 'test-image.png',
      contentType: 'image/png'
    });
    
    // Upload the image
    const response = await axios.post('http://localhost:3000/api/upload', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });
    
    if (response.data.success) {
      console.log('✅ Image upload successful!');
      console.log('📁 Image URL:', response.data.imageUrl);
      console.log('📄 File name:', response.data.fileName);
      
      // Test creating a project with the uploaded image
      const projectData = {
        title: 'Test Project with Image',
        description: 'This is a test project with an uploaded image',
        code: 'console.log("Hello World!");',
        studentName: 'Test Student',
        imageUrl: response.data.imageUrl
      };
      
      const projectResponse = await axios.post('http://localhost:3000/api/projects', projectData);
      
      if (projectResponse.data.success) {
        console.log('✅ Project created successfully with image!');
        console.log('🆔 Project ID:', projectResponse.data.projectId);
      } else {
        console.log('❌ Failed to create project:', projectResponse.data.error);
      }
      
    } else {
      console.log('❌ Image upload failed:', response.data.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Load environment variables if .env.local exists
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  console.log('No .env.local file found, using system environment variables');
}

testImageUpload();

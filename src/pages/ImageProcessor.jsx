/*
Copyright 2024 Ranvir. All rights reserved.
Use of this source code is governed by a MIT-style license that can be found
in the LICENSE file or at https://opensource.org/licenses/MIT.
*/
import React, { useState, useRef, useEffect, useCallback } from 'react';

const ImageProcessor = () => {
  const [image, setImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const canvasRef = useRef(null);

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setImage(img);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Process the image to create a circular crop
  const processImage = useCallback(() => {
    if (!image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const size = 500; // Size of the circular image
    canvas.width = size;
    canvas.height = size;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create circular clip
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    
    // Calculate aspect ratio to cover the circle
    const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
    
    // Add slight southeast offset (right and down)
    const xOffset = 25; // Move slightly right
    const yOffset = 25; // Move slightly down
    const x = (canvas.width / 2) - (image.width / 2) * scale + xOffset;
    const y = (canvas.height / 2) - (image.height / 2) * scale + yOffset;
    
    // Draw image
    ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
    
    // Save result
    setResultImage(canvas.toDataURL('image/jpeg', 0.9));
  }, [image, canvasRef]);

  // Process image when it's loaded
  useEffect(() => {
    if (image) {
      processImage();
    }
  }, [image, processImage]);

  // Download the processed image
  const downloadImage = () => {
    if (!resultImage) return;
    
    const link = document.createElement('a');
    link.download = 'circular-profile.jpg';
    link.href = resultImage;
    link.click();
  };

  const pageStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  };

  const headerStyle = {
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px'
  };

  const sectionStyle = {
    marginBottom: '30px'
  };

  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px'
  };

  const canvasStyle = {
    border: '1px solid #ddd',
    borderRadius: '50%',
    marginTop: '50px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  };

  const instructionStyle = {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '20px',
    fontSize: '14px',
    lineHeight: '1.6'
  };

  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1>Profile Image Processor</h1>
        <p>Create a circular profile image without any border text</p>
      </div>
      
      <div style={instructionStyle}>
        <h3>Instructions</h3>
        <ol>
          <li>Upload your profile image</li>
          <li>The image will automatically be cropped into a circle</li>
          <li>Click "Download" to save the circular image</li>
          <li>Put the downloaded image in your "public" folder as "circular-profile.jpg"</li>
          <li>Your hidden page will be available at "/profile-image"</li>
        </ol>
      </div>

      <div style={sectionStyle}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          style={{marginBottom: '10px'}}
        />
        
        {image && (
          <button onClick={downloadImage} style={buttonStyle}>
            Download Circular Image
          </button>
        )}
      </div>

      <div>
        <canvas ref={canvasRef} style={canvasStyle} />
      </div>
    </div>
  );
};

export default ImageProcessor;

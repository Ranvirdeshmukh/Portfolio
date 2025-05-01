/*
Copyright 2024 Ranvir. All rights reserved.
Use of this source code is governed by a MIT-style license that can be found
in the LICENSE file or at https://opensource.org/licenses/MIT.
*/
import React from 'react';

const HiddenImagePage = () => {
  // Styling for the page container
  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#fff'
  };

  // Styling for the circular image container
  const circleContainerStyle = {
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.07)',
    position: 'relative',
    border: '1px solid rgba(200, 200, 200, 0.5)',
    padding: '6px', // Adds space for the inner border
    background: 'rgba(250, 250, 250, 0.05)'
  };

  // Inner container with second subtle border
  const innerCircleStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '1px solid rgba(210, 210, 210, 0.4)',
    position: 'relative'
  };

  // Styling for the profile image itself
  const imageStyle = {
    width: '100%',
    height: '105%', // Slightly reduced from 110% for minor zoom out
    objectFit: 'cover',
    objectPosition: '60% 50%' // Move slightly southeast
  };

  return (
    <div style={pageStyle}>
      <div style={circleContainerStyle}>
        <div style={innerCircleStyle}>
          <img 
            src="/profile.jpg" 
            alt="Ranvir Deshmukh Profile" 
            style={imageStyle}
          />
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <h1>Ranvir Deshmukh</h1>
        <p>Software Developer and Video Creator</p>
        {/* Hidden metadata for better SEO */}
        <p>Personal website and portfolio</p>
      </div>
    </div>
  );
};

export default HiddenImagePage;

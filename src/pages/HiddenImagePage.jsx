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
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    position: 'relative'
  };

  // Styling for the profile image itself
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  };

  return (
    <div style={pageStyle}>
      <div style={circleContainerStyle}>
        <img 
          src="/profile.jpg" 
          alt="Ranvir Deshmukh Profile" 
          style={imageStyle}
        />
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

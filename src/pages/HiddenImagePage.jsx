/*
Copyright 2024 Ranvir. All rights reserved.
Use of this source code is governed by a MIT-style license that can be found
in the LICENSE file or at https://opensource.org/licenses/MIT.
*/
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { trackEvent } from '../analytics';

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

  // Outer wrapper for border effect
  const outerWrapperStyle = {
    width: '530px',
    height: '530px',
    borderRadius: '50%',
    padding: '6px',
    border: '1px solid rgba(200, 200, 200, 0.5)',
    background: 'rgba(250, 250, 250, 0.05)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.07)',
    position: 'relative',
    boxSizing: 'border-box'
  };

  // Styling for the circular image container
  const circleContainerStyle = {
    width: '518px', // 530px - 12px (6px padding on each side)
    height: '518px', // 530px - 12px (6px padding on each side)
    borderRadius: '50%',
    overflow: 'hidden',
    position: 'absolute',
    top: '6px',
    left: '6px',
    border: '1px solid rgba(210, 210, 210, 0.4)',
    boxSizing: 'border-box'
  };

  // Styling for the profile image itself
  const imageStyle = {
    width: '100%',
    height: '102%',
    objectFit: 'cover',
    objectPosition: '65% 50%', // Positioned more to the left
    display: 'block',
    margin: 0,
    padding: 0
  };
  
  // Track profile image view when component mounts
  useEffect(() => {
    trackEvent('Profile', 'ImageView', 'ProfileImage', 1);
    
    // Track how long the user stays on the page
    const startTime = new Date();
    
    return () => {
      const viewDuration = Math.round((new Date() - startTime) / 1000); // in seconds
      trackEvent('Profile', 'ViewDuration', 'ProfileImage', viewDuration);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Ranvir Deshmukh | Profile Image</title>
        <meta name="description" content="Official profile image of Ranvir Deshmukh - Computer Science student at Dartmouth." />
        <meta name="keywords" content="Ranvir Deshmukh, profile picture, software developer, Dartmouth, CourseMe" />
        <meta property="og:title" content="Ranvir Deshmukh | Profile Image" />
        <meta property="og:description" content="Official profile image of Ranvir Deshmukh - Computer Science student at Dartmouth." />
        <meta property="og:image" content="https://www.ranvirdeshmukh.com/profile-circle.png" />
        <meta property="og:url" content="https://www.ranvirdeshmukh.com/profile-image" />
        <meta property="og:type" content="profile" />
        <link rel="canonical" href="https://www.ranvirdeshmukh.com/profile-image" />
      </Helmet>
      <div style={pageStyle}>
        <div style={outerWrapperStyle} 
             onClick={() => trackEvent('Profile', 'ImageClick', 'ProfileImageClicked')}>
          <div style={circleContainerStyle}>
            <img 
              src="/profile-circle.png" 
              alt="Ranvir Deshmukh Profile" 
              style={imageStyle}
              onLoad={() => trackEvent('Profile', 'ImageLoaded', 'ProfileImageLoaded')}
            />
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <h1>Ranvir Deshmukh</h1>
          <p>Software Developer and Video Creator at Dartmouth College</p>
          <p>Building CourseMe and creating educational content</p>
          <p>This is the official profile image of Ranvir Deshmukh, a software developer and computer science student at Dartmouth College.</p>
          <p>Connect with me on LinkedIn: Ranvir Deshmukh</p>
          <p>Check out my projects on GitHub: RanvirDeshmukh</p>
        </div>
      </div>
    </>
  );
};

export default HiddenImagePage;

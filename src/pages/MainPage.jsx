/*
Copyright 2024 Ranvir. All rights reserved.
Use of this source code is governed by a MIT-style license that can be found
in the LICENSE file or at https://opensource.org/licenses/MIT.
*/

import React from 'react';
import { Helmet } from 'react-helmet';

const MinimalPortfolio = () => {
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '60px 24px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
    lineHeight: '1.6',
    color: '#1d1d1f',
    backgroundColor: '#ffffff',
    minHeight: '100vh'
  };

  const headingStyle = {
    fontSize: '32px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: '#1d1d1f'
  };

  const taglineStyle = {
    fontSize: '18px',
    fontWeight: '400',
    margin: '0 0 24px 0',
    color: '#1d1d1f'
  };

  const paragraphStyle = {
    fontSize: '18px',
    fontWeight: '400',
    margin: '0 0 24px 0',
    color: '#1d1d1f'
  };

  const linkStyle = {
    color: '#007AFF',
    textDecoration: 'none'
  };

  const socialLinksStyle = {
    fontSize: '18px',
    margin: '0',
    color: '#1d1d1f'
  };

  return (
    <>
      <Helmet>
        <title>Ranvir Deshmukh</title>
        <meta name="description" content="Personal website of Ranvir Deshmukh - Software developer, video creator, and Computer Science student at Dartmouth. Building CourseMe and creating educational content." />
        <meta name="keywords" content="Ranvir Deshmukh, software developer, Dartmouth, CourseMe, video creator, portfolio, computer science" />
        <meta name="author" content="Ranvir Deshmukh" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.ranvirdeshmukh.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ranvirdeshmukh.com/" />
        <meta property="og:title" content="Ranvir Deshmukh" />
        <meta property="og:description" content="Personal website of Ranvir Deshmukh - Software developer at CourseMe, video creator, and Computer Science student at Dartmouth." />
        <meta property="og:image" content="https://www.ranvirdeshmukh.com/profile.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.ranvirdeshmukh.com/" />
        <meta property="twitter:title" content="Ranvir Deshmukh" />
        <meta property="twitter:description" content="Personal website of Ranvir Deshmukh - Software developer at CourseMe, video creator, and Computer Science student at Dartmouth." />
        <meta property="twitter:image" content="https://www.ranvirdeshmukh.com/profile.jpg" />
      </Helmet>
      
      <div style={containerStyle}>
        <h1 style={headingStyle}>Ranvir Deshmukh</h1>
        
        <p style={taglineStyle}>I write software and make videos.</p>

        <p style={paragraphStyle}>
          Having built widely-used tools like <a href="https://courseme.ai" target="_blank" rel="noopener noreferrer" style={linkStyle}>CourseMe</a> and <a href="https://apps.apple.com/us/app/meme-me-humor-personalized/id6482850278" target="_blank" rel="noopener noreferrer" style={linkStyle}>Meme Me</a>, I'm now focused on building <a href="https://signpact.ai/" target="_blank" rel="noopener noreferrer" style={linkStyle}>SignPact</a> while studying Computer Science at <a href="https://home.dartmouth.edu/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Dartmouth</a>. Reach out — I'm always <a href="https://cal.com/ranvirdeshmukh/quick-chat" target="_blank" rel="noopener noreferrer" style={linkStyle}>open to chat</a>!
        </p>

        <p style={socialLinksStyle}>
          You can find me on <a href="https://www.linkedin.com/in/ranvir-deshmukh-209706199/" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>, <a href="https://github.com/Ranvirdeshmukh" target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub</a>, and <a href="https://x.com/ranvirdeshmukh_" target="_blank" rel="noopener noreferrer" style={linkStyle}>X</a>.
        </p>
      </div>
    </>
  );
};

export default MinimalPortfolio;

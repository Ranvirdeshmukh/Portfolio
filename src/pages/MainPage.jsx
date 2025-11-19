/*
Copyright 2024 Ranvir. All rights reserved.
Use of this source code is governed by a MIT-style license that can be found
in the LICENSE file or at https://opensource.org/licenses/MIT.
*/

import React from 'react';
import { Helmet } from 'react-helmet';

const MinimalPortfolio = () => {
  // Base container with responsive design
  const containerStyle = {
    maxWidth: '780px',
    margin: '0 auto',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
    lineHeight: '1.68',
    color: '#1d1d1f',
    backgroundColor: '#ffffff',
    textAlign: 'left',
    // Mobile-first responsive padding - fixed for mobile
    padding: 'clamp(32px, 6vh, 80px) clamp(16px, 4vw, 120px)',
    // Ensure smooth transitions
    transition: 'padding 0.3s ease-in-out'
  };

  // Enhanced heading with better spacing
  const headingStyle = {
    fontSize: 'clamp(24px, 3vw, 30px)',
    fontWeight: '600',
    margin: '0 0 clamp(20px, 2.5vw, 28px) 0',
    color: '#1d1d1f',
    textAlign: 'left',
    letterSpacing: '-0.02em',
    lineHeight: '1.2'
  };

  // Improved tagline spacing - Not used currently but kept for reference
  const taglineStyle = {
    fontSize: 'clamp(18px, 2.5vw, 22px)',
    fontWeight: '400',
    margin: '0 0 clamp(20px, 2.5vw, 28px) 0',
    color: '#374151',
    textAlign: 'left',
    lineHeight: '1.5'
  };

  // Enhanced paragraph spacing
  const paragraphStyle = {
    fontSize: 'clamp(15px, 1.8vw, 17px)',
    fontWeight: '400',
    margin: '0 0 clamp(16px, 2vw, 20px) 0',
    color: '#4b5563',
    textAlign: 'left',
    lineHeight: '1.7',
    maxWidth: '65ch'
  };

  // Refined link styling
  const linkStyle = {
    color: '#1d1d1f',
    textDecoration: 'none',
    borderBottom: '1px solid transparent',
    transition: 'border-bottom-color 0.2s ease',
    // Add hover effect via pseudo-class
    ':hover': {
      borderBottomColor: '#1d1d1f'
    }
  };

  // Social links with better spacing
  const socialLinksStyle = {
    fontSize: 'clamp(15px, 1.8vw, 17px)',
    margin: '0',
    color: '#4b5563',
    textAlign: 'left',
    lineHeight: '1.7',
    maxWidth: '65ch'
  };

  // Content wrapper for better text width control
  const contentStyle = {
    width: '100%',
    maxWidth: '100%',
    wordBreak: 'break-word',
    overflowWrap: 'break-word'
  };

  return (
    <>
      <Helmet>
        <title>Ranvir Deshmukh</title>
        <meta name="description" content="Personal website of Ranvir Deshmukh - Building RealPact. AI native OS for real estate." />
        <meta name="keywords" content="Ranvir Deshmukh, software developer, RealPact, CourseMe, portfolio, computer science" />
        <meta name="author" content="Ranvir Deshmukh" />
        
        {/* Viewport meta for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.ranvirdeshmukh.com/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ranvirdeshmukh.com/" />
        <meta property="og:title" content="Ranvir Deshmukh" />
        <meta property="og:description" content="Personal website of Ranvir Deshmukh - Building RealPact." />
        <meta property="og:image" content="https://www.ranvirdeshmukh.com/profile.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.ranvirdeshmukh.com/" />
        <meta property="twitter:title" content="Ranvir Deshmukh" />
        <meta property="twitter:description" content="Personal website of Ranvir Deshmukh - Building RealPact." />
        <meta property="twitter:image" content="https://www.ranvirdeshmukh.com/profile.jpg" />
        
        {/* Custom CSS for enhanced responsive design and link hover effects */}
        <style>{`
          /* Global optimizations */
          * {
            box-sizing: border-box;
          }
          
          html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
          }
          
          a {
            transition: border-bottom-color 0.2s ease, color 0.2s ease;
          }
          
          a:hover {
            border-bottom: 1px solid #1d1d1f;
          }
          
          /* Ensure smooth scrolling */
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </Helmet>
      
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h1 style={headingStyle}>Ranvir Deshmukh</h1>
          
          <p style={paragraphStyle}>
            I am currently building <a href="https://realpact.ai" target="_blank" rel="noopener noreferrer" style={linkStyle}>RealPact</a> — an AI-native operating system for real estate brokerages, starting with automating their contract workflows.
          </p>

          <p style={paragraphStyle}>
            I deeply value minimalistic design and creating the maximum impact through the products I create.
          </p>

          <p style={paragraphStyle}>
            Some other widely used tools I've made include <a href="https://courseme.ai" target="_blank" rel="noopener noreferrer" style={linkStyle}>CourseMe</a> and <a href="https://signpact.ai/" target="_blank" rel="noopener noreferrer" style={linkStyle}>SignPact</a>.
          </p>

          <p style={socialLinksStyle}>
            You can find my experiences on <a href="https://www.linkedin.com/in/ranvir-deshmukh-209706199/" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>, my witty side on <a href="https://x.com/ranvirdeshmukh_" target="_blank" rel="noopener noreferrer" style={linkStyle}>X</a>, and my code on <a href="https://github.com/Ranvirdeshmukh" target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub</a>.
          </p>
        </div>
      </div>
    </>
  );
};

export default MinimalPortfolio;

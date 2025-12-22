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
    // Very subtle off-white to match body
    backgroundColor: '#fcfcfc',
    textAlign: 'left',
    // Mobile-first responsive padding - balanced vertical positioning
    padding: 'clamp(64px, 12vh, 100px) clamp(20px, 5vw, 120px) clamp(32px, 6vh, 80px)',
    // Ensure smooth transitions
    transition: 'padding 0.3s ease-in-out',
    // Add subtle entrance animation
    animation: 'fadeIn 0.8s ease-out forwards'
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

  // Logo style for the footer
  const logoStyle = {
    fontSize: 'clamp(20px, 2.5vw, 24px)',
    fontWeight: '700',
    color: '#d1d5db', // Subtle gray
    marginTop: 'clamp(16px, 2vw, 20px)', // Matches paragraphStyle margin
    fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    userSelect: 'none',
    opacity: '0.8',
    filter: 'blur(0.3px)', // Slight blur effect
    animation: 'blink 1.2s infinite', // Blinking animation
    letterSpacing: '-0.1em' // Tighter spacing between / and >
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
            /* Font smoothing for crisp text */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            /* Subtle off-white background for less eye strain */
            background-color: #fcfcfc; 
          }
          
          /* Elegant selection color */
          ::selection {
            background-color: rgba(29, 29, 31, 0.1); /* Very subtle gray */
            color: #1d1d1f;
          }
          
          a {
            transition: border-bottom-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
          }
          
          a:hover {
            border-bottom: 1px solid #1d1d1f;
            opacity: 0.8;
          }
          
          /* Ensure smooth scrolling */
          html {
            scroll-behavior: smooth;
          }

          /* Blink animation for the cursor */
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          
          /* Fade-in animation - Opacity only to prevent layout shifts */
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </Helmet>
      
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h1 style={headingStyle}>Ranvir Deshmukh</h1>
          
          <p style={paragraphStyle}>
            I am currently building <a href="https://realpact.ai" target="_blank" rel="noopener noreferrer" style={linkStyle}>RealPact</a> — an AI-native operating system for real estate brokerages, starting with contract automation.
          </p>

          <p style={paragraphStyle}>
            Good software disappears. I build tools that are minimal, intuitive, and unmistakably clear.
          </p>

          <p style={paragraphStyle}>
            Some other widely used tools I've made include <a href="https://courseme.ai" target="_blank" rel="noopener noreferrer" style={linkStyle}>CourseMe</a> and <a href="https://signpact.ai/" target="_blank" rel="noopener noreferrer" style={linkStyle}>SignPact</a>.
          </p>

          <p style={paragraphStyle}>
            Occasionally, I also produce, edit, and create <a href="https://www.youtube.com/watch?v=4FNZafeLKlY" target="_blank" rel="noopener noreferrer" style={linkStyle}>videos</a>.
          </p>

          <p style={socialLinksStyle}>
            You can find my experiences on <a href="https://www.linkedin.com/in/ranvir-deshmukh-209706199/" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>, my thoughts on <a href="https://x.com/ranvirdeshmukh_" target="_blank" rel="noopener noreferrer" style={linkStyle}>X</a>, and my code on <a href="https://github.com/Ranvirdeshmukh" target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub</a>.
          </p>
          
          <div style={logoStyle}>
            {"/>"}
          </div>
        </div>
      </div>
    </>
  );
};

export default MinimalPortfolio;

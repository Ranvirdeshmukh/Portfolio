/*
Copyright 2024 Ranvir. All rights reserved.
Use of this source code is governed by a MIT-style license that can be found
in the LICENSE file or at https://opensource.org/licenses/MIT.
*/
import React, { useEffect, useState } from 'react';
import GithubHeartbeat from './GithubHeartbeat'; // adjust the path if needed

const MinimalPortfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = 'Ranvir.';
    const timer = setTimeout(() => setIsVisible(true), 100);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Add custom font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Add keyframe animation for text elements and links
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes textReveal {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes subtleFadeIn {
        0% {
          opacity: 0.3;
        }
        100% {
          opacity: 0.85;
        }
      }
      
      .name-animation {
        opacity: 0;
        animation: textReveal 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        animation-delay: 0.3s;
      }
      
      .tagline-animation {
        opacity: 0;
        animation: textReveal 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        animation-delay: 0.6s;
      }
      
      .description-animation {
        opacity: 0;
        animation: textReveal 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        animation-delay: 0.9s;
      }
      
      .links-animation {
        opacity: 0;
        animation: textReveal 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        animation-delay: 1.2s;
      }
      
      /* Simplified clickable-link style */
      .clickable-link {
        position: relative;
        padding: 2px 0; /* Minimal padding */
        border-radius: 4px;
        transition: color 0.3s ease, background-color 0.3s ease;
        backface-visibility: hidden;
      }
      
      /* Minimal hover effect - subtle background */
      .clickable-link:hover {
        text-decoration: underline; /* Underline on hover */
      }
      
      .logo-animation {
        opacity: 0.3;
        animation: subtleFadeIn 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        animation-delay: 0.5s;
      }

      /* Re-add theme-toggle styles */
      .theme-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: ${darkMode ? 'rgba(30, 30, 40, 0.4)' : 'rgba(255, 255, 255, 0.7)'};
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
        cursor: pointer;
        box-shadow: ${darkMode ? '0 2px 10px rgba(0, 0, 0, 0.2)' : '0 2px 10px rgba(0, 0, 0, 0.05)'};
        transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      .theme-toggle:hover {
        transform: translateY(-2px);
        box-shadow: ${darkMode ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
      }

      @media (prefers-reduced-motion) {
        .name-animation, .tagline-animation, .description-animation, .links-animation, .logo-animation {
          animation: none;
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, [darkMode]);

  // Full-screen wrapper - Restore dark/light mode background
  const wrapperStyles = {
    background: darkMode
    ? 'linear-gradient(135deg, #1C093F 0%, #0C0F33 100%)' // Original dark
    : 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)', // Original light
// Simple white
    minHeight: '100vh',
    transition: 'background 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), color 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
    position: 'relative',
  };

  // Inner container style - Restore dark/light mode text color
  const containerStyles = {
    color: darkMode ? '#ffffff' : '#1d1d1f', // White for dark, dark grey for light
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', sans-serif",
    fontWeight: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '0 24px',
    maxWidth: isDesktop ? '800px' : '600px',
    minHeight: '100vh',
    transition: 'opacity 1s cubic-bezier(0.2, 0.8, 0.2, 1)',
    position: 'relative',
    opacity: isVisible ? 1 : 0,
  };

  // Updated styles for Apple-like look
  const styles = {
    name: {
      fontSize: isDesktop ? '52px' : '36px',
      margin: '0 0 10px 0',
      fontWeight: 500, // Reverted to previous weight
      letterSpacing: '-0.03em', // Reverted to previous spacing
      lineHeight: 1.1,
      color: darkMode ? '#ffffff' : '#1d1d1f', // Adjust color based on mode
      textRendering: 'optimizeLegibility',
    },
    tagline: {
      fontSize: isDesktop ? '26px' : '22px',
      margin: '0 0 30px 0',
      fontWeight: 400, // Standard weight tagline
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
      color: darkMode ? 'rgba(255, 255, 255, 0.95)' : '#515154', // Adjust color
      textRendering: 'optimizeLegibility',
    },
    description: {
      fontSize: isDesktop ? '18px' : '16px',
      lineHeight: '1.6', // Increased line height
      marginBottom: '40px', // Increased margin
      maxWidth: '680px',
      color: darkMode ? 'rgba(255, 255, 255, 0.85)' : '#515154', // Lighter base color for paragraph
      letterSpacing: '0.01em', // Slight spacing increase
    },
    // Consolidated link style
    linkBaseStyle: {
      textDecoration: 'none',
      color: darkMode ? '#f5f5f7' : '#1d1d1f',
      fontWeight: 400, // Same weight as surrounding text
      transition: 'color 0.3s ease',
    },
    // Specific style for Dartmouth (if needed, otherwise use base)
    dartmouthLink: {
      // Inherits from linkBaseStyle
    },
    linkContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '42px',
    },
    // Style for LinkedIn/GitHub links
    externalLinkStyle: {
      textDecoration: 'none',
      color: darkMode ? 'rgba(255, 255, 255, 0.9)' : '#515154', // Adjust color
      fontWeight: 500,
      display: 'inline-block',
      position: 'relative',
      transition: 'color 0.3s ease',
    },
    linkSeparator: {
      color: darkMode ? 'rgba(255, 255, 255, 0.4)' : '#d2d2d7', // Adjust color
      margin: '0 2px',
    },
    bottomLogo: {
      marginTop: '40px',
      fontSize: isDesktop ? '16px' : '14px',
      fontWeight: 600,
      color: darkMode ? 'rgba(255, 255, 255, 0.7)' : '#86868b', // Adjust color
      opacity: darkMode ? 0.7 : 0.8, // Adjust opacity
      alignSelf: 'flex-start',
      letterSpacing: '0.02em',
    },
    // Re-add toggleContainer and icon styles
    toggleContainer: {
      position: 'absolute',
      top: '22px',
      right: '24px',
      zIndex: 10,
      transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
    },
    moonIcon: {
      width: '22px',
      height: '22px',
      color: '#ffffff',
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
      transform: darkMode ? 'rotate(0deg)' : 'rotate(-90deg) scale(0.5)',
      opacity: darkMode ? 1 : 0,
      position: 'absolute',
    },
    sunIcon: {
      width: '24px',
      height: '24px',
      color: '#FFB700',
      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
      transform: darkMode ? 'rotate(90deg) scale(0.5)' : 'rotate(0deg)',
      opacity: darkMode ? 0 : 1,
      position: 'absolute',
    },
  };

  // Re-add Sun and Moon SVG components
  const SunIcon = () => (
    <svg style={styles.sunIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" fill="currentColor" />
      <path d="M12 1V3M12 21V23M1 12H3M21 12H23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  const MoonIcon = () => (
    <svg style={styles.moonIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.5 14.0784C20.3003 14.7189 18.9341 15.0821 17.4849 15.0821C12.9717 15.0821 9.31313 11.4235 9.31313 6.91035C9.31313 5.46099 9.6764 4.09479 10.3168 2.895C5.98551 3.94127 2.75 7.76291 2.75 12.3407C2.75 17.8003 7.13939 22.1896 12.5989 22.1896C17.1768 22.1896 20.9984 18.9541 22.0447 14.6228C21.8694 14.4475 21.6942 14.2722 21.5 14.0784Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  return (
    <div style={wrapperStyles}>
      {/* Re-add Dark Mode Toggle - Sun/Moon Icon */}
      <div style={styles.toggleContainer} onClick={() => setDarkMode(prev => !prev)}>
        <div className="theme-toggle">
          <SunIcon />
          <MoonIcon />
        </div>
      </div>

      <div style={containerStyles}>
        <h2 style={styles.name} className="name-animation">Ranvir Deshmukh</h2>
        <h3 style={styles.tagline} className="tagline-animation">I write software and make videos.</h3>

        <p style={styles.description} className="description-animation">
          Having built widely-used tools like{' '}
          <a
            href="https://courseme.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkBaseStyle} // Use base style
            className="clickable-link"
           >CourseMe</a> and{' '}
           <a
            href="https://apps.apple.com/us/app/meme-me-humor-personalized/id6482850278"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkBaseStyle} // Use base style
            className="clickable-link"
          >Meme Me</a><span style={{ color: 'inherit', fontWeight: 400 }}>,</span> I'm now focused on building{' '}
          <a
            href="https://signpact.ai/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkBaseStyle} // Use base style
            className="clickable-link"
          >
            SignPact</a><span style={{ color: 'inherit', fontWeight: 400 }}></span>
          {/* Removed <br /> and added text directly */} while studying Computer Science at{' '}
          <a
            href="https://home.dartmouth.edu/"
            target="_blank"
            rel="noopener noreferrer"
            style={{...styles.linkBaseStyle, ...styles.dartmouthLink}} // Combine base and specific
            className="clickable-link"
          >
            Dartmouth</a><span style={{ color: 'inherit', fontWeight: 400 }}>.</span> <br />
          Reach out — I'm always <a
            href="https://cal.com/ranvirdeshmukh/quick-chat"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkBaseStyle}
            className="clickable-link"
          >
            open to chat
          </a>!
        </p>

        <div style={styles.linkContainer} className="links-animation">
          <a
            href="https://www.linkedin.com/in/ranvir-deshmukh-209706199/"
            style={styles.externalLinkStyle} // Use external link style
            target="_blank"
            rel="noopener noreferrer"
            className="clickable-link"
          >
            LinkedIn
          </a>
          <span style={styles.linkSeparator}>|</span>
          <a
            href="https://github.com/Ranvirdeshmukh"
            style={styles.externalLinkStyle} // Use external link style
            target="_blank"
            rel="noopener noreferrer"
            className="clickable-link"
          >
            GitHub
          </a>
        </div>

        <GithubHeartbeat animationDelay={2500} darkMode={darkMode} />

        <div style={styles.bottomLogo} className="logo-animation">RD/&gt;</div>
      </div>
    </div>
  );
};

export default MinimalPortfolio;

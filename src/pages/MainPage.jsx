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

  // Function to open Gmail compose
  const openGmail = (e) => {
    e.preventDefault();
    const gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=ranvir.26@dartmouth.edu';
    window.open(gmailComposeUrl, '_blank', 'noopener,noreferrer');
  };

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
      
      /* Subtle hover effect - underline */
      .clickable-link:hover {
        text-decoration: underline;
        /* Optional: very subtle background for hover */
        /* background-color: rgba(0, 122, 255, 0.05); */
      }
      
      /* Removed clickable-link::after rule */
      
      .logo-animation {
        opacity: 0.3;
        animation: subtleFadeIn 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        animation-delay: 0.5s;
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
  }, []);

  // Full-screen wrapper - Cleaner background
  const wrapperStyles = {
    background: '#ffffff', // Plain white background
    minHeight: '100vh',
    position: 'relative',
  };

  // Inner container style - Adjusted font color
  const containerStyles = {
    color: '#1d1d1f', // Apple's dark grey
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
      color: '#1d1d1f',
      textRendering: 'optimizeLegibility',
    },
    tagline: {
      fontSize: isDesktop ? '26px' : '22px',
      margin: '0 0 30px 0',
      fontWeight: 400, // Standard weight tagline
      letterSpacing: '-0.01em',
      lineHeight: 1.2,
      color: '#515154', // Apple's medium grey
      textRendering: 'optimizeLegibility',
    },
    description: {
      fontSize: isDesktop ? '18px' : '16px',
      lineHeight: '1.6', // Increased line height
      marginBottom: '40px', // Increased margin
      maxWidth: '680px',
      color: '#1d1d1f', // Main text color
      letterSpacing: '0.01em', // Slight spacing increase
    },
    // Consolidated link style
    linkBaseStyle: {
      textDecoration: 'none',
      color: '#007aff', // Apple blue
      fontWeight: 400, // Normal weight for links
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
      color: '#515154', // Medium grey for external links
      fontWeight: 500,
      display: 'inline-block',
      position: 'relative',
      transition: 'color 0.3s ease',
    },
    linkSeparator: {
      color: '#d2d2d7', // Lighter grey separator
      margin: '0 2px',
    },
    bottomLogo: {
      marginTop: '40px',
      fontSize: isDesktop ? '16px' : '14px',
      fontWeight: 600,
      color: '#86868b', // Apple's light grey
      opacity: 0.8, // Slightly more visible
      alignSelf: 'flex-start',
      letterSpacing: '0.02em',
    },
  };

  return (
    <div style={wrapperStyles}>
      <div style={containerStyles}>
        <h2 style={styles.name} className="name-animation">Ranvir Deshmukh</h2>
        <h3 style={styles.tagline} className="tagline-animation">I write software and make videos.</h3>

        <p style={styles.description} className="description-animation">
          I'm currently working on{' '}
          <a
            href="https://signpact.ai/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.linkBaseStyle} // Use base style
            className="clickable-link"
          >
            SignPact</a><span style={{ color: '#1d1d1f', fontWeight: 400 }}>.</span> <br />
          I've built some widely used tools like{' '}
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
          >Meme Me</a><span style={{ color: '#1d1d1f', fontWeight: 400 }}>.</span> <br />
          Studying Computer Science at{' '}
          <a
            href="https://home.dartmouth.edu/"
            target="_blank"
            rel="noopener noreferrer"
            style={{...styles.linkBaseStyle, ...styles.dartmouthLink}} // Combine base and specific
            className="clickable-link"
          >
            Dartmouth</a>. <br />
          Reach out — I'm always <a
            href="#"
            style={styles.linkBaseStyle} // Use base style
            className="clickable-link"
            onClick={openGmail}
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

        <GithubHeartbeat animationDelay={2500} />

        <div style={styles.bottomLogo} className="logo-animation">RD/&gt;</div>
      </div>
    </div>
  );
};

export default MinimalPortfolio;

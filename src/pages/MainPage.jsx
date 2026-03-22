/*
Copyright 2024 Ranvir. All rights reserved.
Use of this source code is governed by a MIT-style license that can be found
in the LICENSE file or at https://opensource.org/licenses/MIT.
*/

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const MinimalPortfolio = () => {
  const [showCourseMe, setShowCourseMe] = useState(false);
  const hideTimeout = useRef(null);

  const handleMouseEnter = useCallback(() => {
    clearTimeout(hideTimeout.current);
    setShowCourseMe(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hideTimeout.current = setTimeout(() => setShowCourseMe(false), 150);
  }, []);

  const wrapperRef = useRef(null);

  const handleCourseMeClick = useCallback((e) => {
    if ('ontouchstart' in window && !showCourseMe) {
      e.preventDefault();
      setShowCourseMe(true);
    }
  }, [showCourseMe]);

  useEffect(() => {
    if (!showCourseMe) return;
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowCourseMe(false);
      }
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [showCourseMe]);

  // Base container with responsive design
  const containerStyle = {
    maxWidth: '780px',
    margin: '0 auto',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif',
    lineHeight: '1.68',
    color: '#1d1d1f',
    // Apple's signature light gray background
    backgroundColor: '#f5f5f7',
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
    textDecoration: 'none'
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

  const tooltipWrapperStyle = {
    position: 'relative',
    display: 'inline-block'
  };

  const tooltipCardStyle = {
    position: 'absolute',
    top: 'calc(100% + 10px)',
    left: '50%',
    transform: showCourseMe ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(4px)',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px 20px 14px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04)',
    zIndex: 10,
    opacity: showCourseMe ? 1 : 0,
    pointerEvents: showCourseMe ? 'auto' : 'none',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    whiteSpace: 'nowrap'
  };

  const tooltipArrowStyle = {
    position: 'absolute',
    top: '-5px',
    left: '50%',
    transform: 'translateX(-50%) rotate(45deg)',
    width: '10px',
    height: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '-2px -2px 4px rgba(0, 0, 0, 0.03)',
    borderRadius: '2px'
  };

  const tooltipStatsRowStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start'
  };

  const tooltipStatStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  };

  const tooltipStatNumberStyle = {
    fontSize: '17px',
    fontWeight: '600',
    color: '#1d1d1f',
    letterSpacing: '-0.02em',
    lineHeight: '1.2',
    margin: 0
  };

  const tooltipStatLabelStyle = {
    fontSize: '11px',
    fontWeight: '400',
    color: '#9ca3af',
    lineHeight: '1.4',
    marginTop: '2px',
    letterSpacing: '0.01em'
  };

  const tooltipDividerStyle = {
    width: '100%',
    height: '1px',
    backgroundColor: '#f0f0f0',
    margin: '12px 0 10px',
    border: 'none'
  };

  const tooltipLinkStyle = {
    fontSize: '12px',
    fontWeight: '500',
    color: '#9ca3af',
    textDecoration: 'none',
    display: 'inline-block',
    borderBottom: 'none',
    transition: 'color 0.2s ease',
    letterSpacing: '0.01em'
  };

  return (
    <>
      <Helmet>
        <title>Ranvir Deshmukh</title>
        <meta name="description" content="I am currently building RealPact—an AI-native operating system for real estate brokerages. I like keeping things simple—how I build and how I live. I just want to make useful things for people." />
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
        <meta property="og:description" content="I am currently building RealPact—an AI-native operating system for real estate brokerages. I like keeping things simple—how I build and how I live. I just want to make useful things for people." />
        <meta property="og:image" content="https://www.ranvirdeshmukh.com/profile-circle.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.ranvirdeshmukh.com/" />
        <meta property="twitter:title" content="Ranvir Deshmukh" />
        <meta property="twitter:description" content="I am currently building RealPact—an AI-native operating system for real estate brokerages. I like keeping things simple—how I build and how I live. I just want to make useful things for people." />
        <meta property="twitter:image" content="https://www.ranvirdeshmukh.com/profile-circle.png" />

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
            /* Apple's signature light gray background */
            background-color: #f5f5f7; 
          }
          
          /* Elegant selection color */
          ::selection {
            background-color: rgba(29, 29, 31, 0.1); /* Very subtle gray */
            color: #1d1d1f;
          }
          
          a {
            border-bottom: 1px solid transparent;
            transition: border-bottom-color 0.2s ease, color 0.2s ease, opacity 0.2s ease;
          }
          
          a:hover {
            border-bottom-color: #1d1d1f;
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

          .tooltip-visit-link {
            border-bottom: none !important;
          }
          .tooltip-visit-link:hover {
            color: #1d1d1f !important;
            border-bottom: none !important;
            opacity: 1 !important;
          }

          @media (max-width: 600px) {
            .tooltip-card {
              white-space: normal !important;
              padding: 14px 16px 12px !important;
              border-radius: 10px !important;
              width: calc(100vw - 48px) !important;
              max-width: 240px !important;
            }
            .tooltip-stats-row {
              gap: 14px !important;
            }
            .tooltip-stat-number {
              font-size: 15px !important;
            }
            .tooltip-stat-label {
              font-size: 10px !important;
            }
          }
        `}</style>
      </Helmet>

      <div style={containerStyle}>
        <div style={contentStyle}>
          <h1 style={headingStyle}>Ranvir Deshmukh</h1>

          <p style={paragraphStyle}>
            I am currently building <a href="https://realpact.ai" target="_blank" rel="noopener noreferrer" style={linkStyle}>RealPact</a>—an AI-native operating system for real estate brokerages, starting with contract automation.
          </p>

          <p style={paragraphStyle}>
            I like keeping things simple—how I build and how I live. I just want to make useful things for people.
          </p>

          <p style={paragraphStyle}>
            Before this, I made{' '}
            <span
              ref={wrapperRef}
              style={tooltipWrapperStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <a href="https://courseme.ai" target="_blank" rel="noopener noreferrer" style={linkStyle} onClick={handleCourseMeClick}>CourseMe</a>
              <span style={tooltipCardStyle} role="tooltip" className="tooltip-card">
                <span style={tooltipArrowStyle} className="tooltip-arrow" />
                <span style={tooltipStatsRowStyle} className="tooltip-stats-row">
                  <span style={tooltipStatStyle}>
                    <span style={tooltipStatNumberStyle} className="tooltip-stat-number">4,000+</span>
                    <span style={tooltipStatLabelStyle} className="tooltip-stat-label">Dartmouth students</span>
                  </span>
                  <span style={tooltipStatStyle}>
                    <span style={tooltipStatNumberStyle} className="tooltip-stat-number">1M+</span>
                    <span style={tooltipStatLabelStyle} className="tooltip-stat-label">page views</span>
                  </span>
                  <span style={tooltipStatStyle}>
                    <span style={tooltipStatNumberStyle} className="tooltip-stat-number">~90%</span>
                    <span style={tooltipStatLabelStyle} className="tooltip-stat-label">of campus monthly</span>
                  </span>
                </span>
                <hr style={tooltipDividerStyle} />
                <a
                  href="https://courseme.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={tooltipLinkStyle}
                  className="tooltip-visit-link"
                >
                  Visit CourseMe &#8594;
                </a>
              </span>
            </span>{' '}
            and <a href="https://signpact.ai/" target="_blank" rel="noopener noreferrer" style={linkStyle}>SignPact</a>, which later evolved into RealPact.
          </p>

          <p style={paragraphStyle}>
            Occasionally, I make <a href="https://www.youtube.com/watch?v=4FNZafeLKlY" target="_blank" rel="noopener noreferrer" style={linkStyle}>videos</a> too.
          </p>

          <p style={socialLinksStyle}>
            You can find my work on <a href="https://www.linkedin.com/in/ranvir-deshmukh-209706199/" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a>, my thoughts on <a href="https://x.com/ranvirdeshmukh_" target="_blank" rel="noopener noreferrer" style={linkStyle}>X</a>, and my code on <a href="https://github.com/Ranvirdeshmukh" target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub</a>.
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

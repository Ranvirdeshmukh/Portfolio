import React, { useEffect, useState } from 'react';

const MinimalPortfolio = () => {
  // Use state to handle visibility for the fade-in effect
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set the document title
    document.title = 'RD/> Portfolio - Main';
    
    // Trigger the fade-in after a small delay (e.g. 100ms)
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Cleanup if the component unmounts quickly
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        ...styles.container,
        opacity: isVisible ? 1 : 0,         // Controlled by state
        transition: 'opacity 1s ease-in'    // 1-second fade-in
      }}
    >
      {/* Main Content */}
      <h2 style={styles.name}>Ranvir Deshmukh</h2>
      <h3 style={styles.tagline}>I write software and make videos.</h3>

      <p style={styles.description}>
        I’m currently building{' '}
        <a
          href="https://courseme.ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: '#571ce0',
            fontWeight: 600,
          }}
        >
          CourseMe
        </a>
        <span style={{ color: '#FD5E53', fontWeight: 600 }}>.</span> <br />
        Studying Computer Science at Dartmouth. <br />
        Reach out — I’m always open to chat!
      </p>

      <div style={styles.linkContainer}>
        <a
          href="https://www.linkedin.com/in/ranvir-deshmukh-209706199/"
          style={styles.linkStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <span style={styles.linkSeparator}>|</span>
        <a
          href="https://github.com/Ranvirdeshmukh"
          style={styles.linkStyle}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>

      {/* Subtle Logo BELOW Content, Left-Aligned */}
      <div style={styles.bottomLogo}>
        RD/&gt;
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f9f9f9', // Updated background color
    color: '#000000',
    minHeight: '100vh',
    fontFamily: "'SF Pro Display', sans-serif",
    fontWeight: 500,
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0 auto',
    padding: '0 20px',
    maxWidth: '600px',
    // We'll handle the fade-in via inline style merging above
  },
  name: {
    fontSize: '32px',
    margin: '0 0 10px 0',
    fontWeight: 500,
  },
  tagline: {
    fontSize: '20px',
    margin: '0 0 25px 0',
    opacity: 0.8,
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  linkContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '40px',
  },
  linkStyle: {
    textDecoration: 'none',
    color: '#000000',
    fontWeight: 500,
  },
  linkSeparator: {
    color: '#000000',
    opacity: 0.6,
  },
  bottomLogo: {
    marginTop: '40px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#999999',
    opacity: 0.8,
    alignSelf: 'flex-start',
  },
};

export default MinimalPortfolio;

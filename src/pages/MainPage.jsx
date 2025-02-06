import React, { useEffect } from 'react';

const MinimalPortfolio = () => {
  useEffect(() => {
    // Set page title
    document.title = 'RD/> Portfolio - Main';
  }, []);

  return (
    <div style={styles.container}>
      {/* Text-based Logo */}
      <h1 style={styles.logo}>RD/&gt;</h1>

      {/* Name / Title */}
      <h2 style={styles.name}>Ranvir Deshmukh</h2>

      {/* Short Tagline */}
      <h3 style={styles.tagline}>
        I write softwares and make videos.
      </h3>

      {/* Brief Bio / Description */}
      <p style={styles.description}>
        I’m currently building{' '}
        <a
          href="https://courseme.ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            color: '#571ce0', // CourseMe link text color
            fontWeight: 600
          }}
        >
          CourseMe
        </a>
        <span style={{ color: '#FD5E53', fontWeight: 600 }}>.</span> <br />
        Studying Computer Science at Dartmouth. <br />
        Reach out — I’m always open to chat!
      </p>

      {/* Links */}
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
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    minHeight: '100vh',
    fontFamily: "'SF Pro Display', sans-serif",
    fontWeight: 500, // 'Medium' weight for SF Pro Display
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    
    // Make it responsive and centered:
    margin: '0 auto',      // Centers horizontally
    padding: '0 20px',     // Adds side padding
    maxWidth: '600px',     // Restricts width on larger screens
    textAlign: 'left',     // Left-aligns text; change to 'center' if preferred
  },
  logo: {
    fontSize: '48px',
    fontWeight: 600,
    margin: '0 0 10px 0',
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
};

export default MinimalPortfolio;

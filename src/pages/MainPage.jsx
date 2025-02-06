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
        Founder, Software Engineer, Video Producer, and a Student.
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
  {/* Previously built [any prior ventures]. <br /> */}
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
    // This margin pushes everything slightly to the right.
    marginLeft: '20%', 
    padding: '0 20px',
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
    maxWidth: '600px',
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

import React, { useEffect, useState } from 'react';

const MinimalPortfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    document.title = 'Ranvir.';
    const timer = setTimeout(() => setIsVisible(true), 100);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const styles = {
    container: {
      backgroundColor: '#f9f9f9',
      color: '#000000',
      minHeight: '100vh',
      fontFamily: "'SF Pro Display', sans-serif",
      fontWeight: 500,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '0 auto',
      padding: '0 20px',
      maxWidth: isDesktop ? '800px' : '600px',
    },
    name: {
      fontSize: isDesktop ? '48px' : '32px',
      margin: '0 0 10px 0',
      fontWeight: 500,
    },
    tagline: {
      fontSize: isDesktop ? '24px' : '20px',
      margin: '0 0 25px 0',
      opacity: 0.8,
    },
    description: {
      fontSize: isDesktop ? '18px' : '16px',
      lineHeight: '1.6',
      marginBottom: '30px',
    },
    dartmouthLink: {
      textDecoration: 'none',
      color: '#00693e', // Dartmouth Green
      fontWeight: 600,
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
      fontSize: isDesktop ? '16px' : '14px',
      fontWeight: 600,
      color: '#999999',
      opacity: 0.8,
      alignSelf: 'flex-start',
    },
  };

  return (
    <div
      style={{
        ...styles.container,
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-in',
      }}
    >
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
        Studying Computer Science at {' '}
        <a
          href="https://home.dartmouth.edu/"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.dartmouthLink}
        >
          Dartmouth
        </a>
        . <br />
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

      <div style={styles.bottomLogo}>RD/&gt;</div>
    </div>
  );
};

export default MinimalPortfolio;

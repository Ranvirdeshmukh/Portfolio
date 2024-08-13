import React from 'react';

const ResumePage = () => {
  return (
    <div className="resume-page" style={styles.resumePage}>
      <header>
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}><a href="/" style={styles.navLink}>Projects</a></li>
            <li style={styles.navItem}><a href="/resume" style={styles.navLink}>Resume</a></li>
          </ul>
        </nav>
      </header>
      <div className="resume-content" style={styles.resumeContent}>
        <h1>Resume</h1>
        {/* Add your resume content here */}
      </div>
      <div className="fancy-container" style={styles.fancyContainer}>
        <div className="ribbon" style={styles.ribbon}>
          <span>Website in the making</span>
        </div>
      </div>
      {/* Move the keyframes to a style tag */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }

          .fancy-container {
            animation: bounce 2s infinite;
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  resumePage: {
    backgroundColor: '#fff',
    color: '#000',
    textAlign: 'center',
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '20px',
    margin: 0
  },
  navItem: {
    margin: '0 10px'
  },
  navLink: {
    color: '#000',
    textDecoration: 'none'
  },
  resumeContent: {
    marginTop: '20px'
  },
  fancyContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#ffcc00',
    padding: '5px 10px',
    borderRadius: '5px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: '1000',
  },
  ribbon: {
    color: '#000',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
};

export default ResumePage;

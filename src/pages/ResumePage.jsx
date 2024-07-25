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
    </div>
  );
};

const styles = {
  resumePage: {
    backgroundColor: '#fff',
    color: '#000',
    textAlign: 'center',
    minHeight: '100vh'
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
  }
};

export default ResumePage;

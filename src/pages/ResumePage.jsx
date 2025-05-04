import React from 'react';
import { Helmet } from 'react-helmet';

const ResumePage = () => {
  return (
    <>
      <Helmet>
        <title>Ranvir Deshmukh | Resume & Professional Experience</title>
        <meta name="description" content="Professional resume of Ranvir Deshmukh - Software developer with experience in building CourseMe, SignPact and other projects. Computer Science student at Dartmouth." />
        <meta name="keywords" content="Ranvir Deshmukh resume, Ranvir Deshmukh CV, software developer resume, Dartmouth CS, CourseMe developer" />
        <meta name="author" content="Ranvir Deshmukh" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.ranvirdeshmukh.com/resume" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://www.ranvirdeshmukh.com/resume" />
        <meta property="og:title" content="Ranvir Deshmukh | Resume & Professional Experience" />
        <meta property="og:description" content="Professional resume of Ranvir Deshmukh - Software developer with experience in building CourseMe, SignPact and other projects." />
        <meta property="og:image" content="https://www.ranvirdeshmukh.com/profile.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.ranvirdeshmukh.com/resume" />
        <meta property="twitter:title" content="Ranvir Deshmukh | Resume & Professional Experience" />
        <meta property="twitter:description" content="Professional resume of Ranvir Deshmukh - Software developer with experience in building CourseMe, SignPact and other projects." />
        <meta property="twitter:image" content="https://www.ranvirdeshmukh.com/profile.jpg" />
      </Helmet>
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
    </>
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

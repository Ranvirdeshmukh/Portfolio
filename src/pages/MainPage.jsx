import React from 'react';
import Typing from 'react-typing-effect';
import Navbar from '../components/Navbar';

const MainPage = () => {
  return (
    <div className="main-page" style={styles.mainPage}>
      <Navbar />
      <div style={styles.splitScreen}>
        <div style={styles.leftSection}>
          <div style={styles.textContainer}>
            <h1 style={styles.leftText}>Ranvir</h1>
            <h2 style={styles.staticText}>I am a</h2>
          </div>
        </div>
        <div style={styles.rightSection}>
          <div style={styles.textContainerRight}>
            <h1 style={styles.rightText}>Deshmukh</h1>
            <div style={styles.typingContainer}>
              <Typing
                text={[
                  ' Founder.',
                  ' Software Engineer.',
                  ' Machine Learning Researcher.',
                  ' Video Producer.',
                ]}
                speed={100}
                eraseDelay={1000}
                typingDelay={500}
                displayTextRenderer={(text, i) => {
                  return <h2 style={styles.typingText}>{text}</h2>;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainPage: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    fontFamily: "'SF Pro Display', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  splitScreen: {
    display: 'grid',
    gridTemplateColumns: '65% 35%',
    width: '100%',
    height: 'calc(100vh - 60px)',
    position: 'absolute',
    top: '60px',
  },
  leftSection: {
    backgroundColor: '#ffffff',
    color: '#000000',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'center',
    paddingRight: '10px',
  },
  rightSection: {
    backgroundColor: '#000000',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: '10px',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textContainerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  leftText: {
    fontSize: '72px',
    fontWeight: '700',
    margin: 0,
  },
  staticText: {
    fontSize: '24px',
    fontWeight: '700', // Bolder weight
    margin: '0 0 0 120px',
  },
  rightText: {
    fontSize: '72px',
    fontWeight: '700',
    margin: 0,
  },
  typingContainer: {
    minHeight: '30px', // Adjust based on the expected height of the typing text
    display: 'flex',
    alignItems: 'center',
  },
  typingText: {
    fontSize: '24px',
    fontWeight: '700', // Bolder weight
    color: '#ffffff',
    margin: '0 0 0 5px',
    textAlign: 'left',
  },
};

export default MainPage;

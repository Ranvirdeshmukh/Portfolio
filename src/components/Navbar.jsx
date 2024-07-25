import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header style={styles.header}>
      <div style={styles.gridContainer}>
        <div style={styles.leftSection}>
          <div style={styles.logo}>RD/&gt;</div>
        </div>
        <div style={styles.rightSection}>
          <nav style={styles.nav}>
            <ul style={styles.navList}>
              <li style={styles.navItem}><Link to="/" style={styles.navLink}>Projects</Link></li>
              <li style={styles.navItem}><Link to="/resume" style={styles.navLink}>Resume</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    width: '100%',
    height: '60px',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000, // Ensure it stays on top
    display: 'grid',
    gridTemplateColumns: '65% 35%',
    backgroundColor: '#ffffff',
  },
  gridContainer: {
    display: 'contents',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '20px',
  },
  rightSection: {
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '20px',
  },
  logo: {
    fontSize: '25px', // Reduced size for thinner appearance
    fontWeight: '500', // Reduced weight for thinner appearance
    color: '#000000',
  },
  nav: {
    display: 'flex',
  },
  navList: {
    listStyle: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;

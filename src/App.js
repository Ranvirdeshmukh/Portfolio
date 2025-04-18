import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ResumePage from './pages/ResumePage';
import { pageView } from './analytics';
import './App.css';

// Analytics tracker component
function PageViewTracker() {
  const location = useLocation();
  
  useEffect(() => {
    pageView(location.pathname);
  }, [location]);
  
  return null;
}

function App() {
  return (
    <Router>
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>
    </Router>
  );
}

export default App;

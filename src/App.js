import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ResumePage from './pages/ResumePage';
import HiddenImagePage from './pages/HiddenImagePage';
import ImageProcessor from './pages/ImageProcessor';
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
        <Route path="/profile-image" element={<HiddenImagePage />} />
        <Route path="/image-processor" element={<ImageProcessor />} />
      </Routes>
    </Router>
  );
}

export default App;

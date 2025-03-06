// GithubHeartbeat.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Curve
} from 'recharts';

/**
 * Transforms the weekly contribution data into a sorted array of daily contributions.
 * Each item is { date: 'YYYY-MM-DD', count: contributionCount }.
 */
function transformContributionDays(weeks) {
  let days = [];
  weeks.forEach(week => {
    days = days.concat(week.contributionDays);
  });
  return days
    .map(day => ({ 
      date: day.date, 
      contributionCount: day.contributionCount // Keep the original name to avoid confusion
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Custom tooltip component to display date and commit count
const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const date = new Date(data.date);
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    // Use the exact contribution count directly
    const commitCount = data.contributionCount;
    const commitText = commitCount === 1 ? 'commit' : 'commits';
    
    return (
      <div style={{
        backgroundColor: isDarkMode ? 'rgba(28, 9, 63, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        border: `1px solid ${isDarkMode ? '#8884d8' : '#571ce0'}`,
        borderRadius: '4px',
        padding: '8px 12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        color: isDarkMode ? '#fff' : '#000',
        fontSize: '14px',
        fontFamily: "'SF Pro Display', sans-serif",
        pointerEvents: 'auto',
      }}>
        <p style={{ margin: '0 0 4px 0', fontWeight: 500 }}>{formattedDate}</p>
        <p style={{ margin: 0 }}>
          <span style={{ 
            color: isDarkMode ? '#c792ea' : '#571ce0',
            fontWeight: 600 
          }}>
            {commitCount}
          </span> {commitText}
        </p>
      </div>
    );
  }

  return null;
};

const GithubHeartbeat = () => {
  const [contributionData, setContributionData] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef(null);

  // Add keyframe animations for the wave reveal
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes waveReveal {
        0% {
          clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
        }
        100% {
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
        }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Update window height on resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if we're in dark mode by looking at the background color
    const checkDarkMode = () => {
      const bgColor = window.getComputedStyle(document.body).backgroundColor;
      // If the background is dark, we're in dark mode
      setIsDarkMode(bgColor.includes('rgb(12, 15, 51)') || bgColor.includes('rgb(28, 9, 63)'));
    };

    checkDarkMode();
    // Listen for changes to the background color
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchContributions = async () => {
      // Calculate the date range for the past year.
      const toDate = new Date();
      const fromDate = new Date();
      fromDate.setFullYear(fromDate.getFullYear() - 1);
      // Construct ISO strings for the query (covering the whole day).
      const fromISO = fromDate.toISOString().split('T')[0] + "T00:00:00Z";
      const toISO = toDate.toISOString().split('T')[0] + "T23:59:59Z";

      // Get your GitHub token from environment variables
      const token = process.env.REACT_APP_GITHUB_TOKEN;
      if (!token) {
        setError("GitHub token is not defined. Please set REACT_APP_GITHUB_TOKEN in your environment.");
        return;
      }

      // GraphQL query to fetch the contributions collection.
      const query = `
        query {
          user(login: "ranvirdeshmukh") {
            contributionsCollection(from: "${fromISO}", to: "${toISO}") {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });
        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors.map(e => e.message).join(', '));
        }

        const calendar = result.data.user.contributionsCollection.contributionCalendar;
        setTotalContributions(calendar.totalContributions);
        
        // Process the data to make it more wave-like
        let data = transformContributionDays(calendar.weeks);
        
        // Add some gaps by filtering out some days to make the wave look better
        // but keep all days with contributions to ensure accuracy
        data = data.filter((day, index) => 
          day.contributionCount > 0 || index % 2 !== 0
        );
        
        // Create a separate visual value for the wave while preserving the exact count
        data = data.map((day, index) => {
          // Create a separate visual value for the wave
          // Base value ensures the wave starts from the bottom
          const baseValue = 5;
          const visualValue = baseValue + (day.contributionCount > 0 ? day.contributionCount * 2 : 1) + 
                             Math.abs(Math.sin(index * 0.15)) * 6;
          
          return {
            ...day,
            // Keep the original contribution count
            // Add a visual count for the wave display only
            count: visualValue
          };
        });
        
        setContributionData(data);
        setIsLoaded(true);
        
        // Start the animation once data is loaded
        // Add a small delay before starting the animation
        setTimeout(() => {
          startWaveAnimation();
        }, 300);
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError(err.message);
      }
    };

    fetchContributions();
  }, []);
  
  // Function to animate the wave reveal
  const startWaveAnimation = () => {
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const startTime = performance.now();
    const duration = 3500; // Increased to 3.5 seconds for a slower animation
    
    const animateWave = (currentTime) => {
      const elapsed = currentTime - startTime;
      
      // Use easeInOutQuad easing function for smoother animation
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      
      setAnimationProgress(easedProgress);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateWave);
      }
    };
    
    animationRef.current = requestAnimationFrame(animateWave);
  };
  
  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Calculate the height as 1/3 of the viewport height
  const waveHeight = Math.floor(windowHeight / 3);

  const waveContainerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: `${waveHeight}px`,
    zIndex: 1,
    pointerEvents: 'auto',
    overflow: 'hidden',
  };

  const waveContentStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    color: isDarkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    zIndex: 2,
    pointerEvents: 'auto',
    fontSize: '14px',
    fontWeight: 500,
    textShadow: isDarkMode ? '0 1px 2px rgba(0,0,0,0.5)' : '0 1px 2px rgba(255,255,255,0.5)',
    backdropFilter: 'blur(3px)',
    padding: '6px 12px',
    borderRadius: '20px',
    backgroundColor: isDarkMode ? 'rgba(28, 9, 63, 0.3)' : 'rgba(255, 255, 255, 0.3)',
    border: `1px solid ${isDarkMode ? 'rgba(136, 132, 216, 0.3)' : 'rgba(87, 28, 224, 0.3)'}`,
    opacity: 0,
    animation: isLoaded ? 'fadeIn 1s ease-in-out 2s forwards' : 'none', // Slower fade-in with longer delay
  };

  const waveChartStyle = {
    width: '100%',
    height: '100%',
    clipPath: `polygon(0% 0%, ${animationProgress * 100}% 0%, ${animationProgress * 100}% 100%, 0% 100%)`,
    transition: 'clip-path 0.05s linear', // Smoother transition
  };

  // Colors for light and dark mode
  const primaryColor = isDarkMode ? '#8884d8' : '#571ce0';
  const secondaryColor = isDarkMode ? '#c792ea' : '#8884d8';
  const tertiaryColor = isDarkMode ? '#6a5acd' : '#7c4dff';

  return (
    <div style={waveContainerStyle}>
      {error && <p style={{ color: 'red', position: 'absolute', top: 0, left: '20px' }}>Error: {error}</p>}
      <div style={waveContentStyle}>
        {totalContributions} contributions in the last year
      </div>
      <div style={waveChartStyle}>
        <ResponsiveContainer>
          <AreaChart 
            data={contributionData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8} />
                <stop offset="50%" stopColor={secondaryColor} stopOpacity={0.5} />
                <stop offset="95%" stopColor={tertiaryColor} stopOpacity={0.2} />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <Tooltip 
              content={<CustomTooltip isDarkMode={isDarkMode} />}
              cursor={{ stroke: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', strokeWidth: 1 }}
            />
            <Area
              type="monotone" 
              dataKey="count"
              stroke={primaryColor}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorContributions)"
              animationDuration={0} // Disable the default animation
              isAnimationActive={false} // We're using our own animation
              activeDot={{ 
                r: 6, 
                fill: isDarkMode ? '#c792ea' : '#571ce0',
                stroke: isDarkMode ? '#1C093F' : '#fff',
                strokeWidth: 2
              }}
              baseValue={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GithubHeartbeat;
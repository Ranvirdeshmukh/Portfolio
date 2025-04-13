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
        backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        border: `1px solid ${isDarkMode ? 'rgba(10, 132, 255, 0.3)' : 'rgba(0, 122, 255, 0.15)'}`,
        borderRadius: '12px',
        padding: '10px 14px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        color: isDarkMode ? '#fff' : '#000',
        fontSize: '13px',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif",
        pointerEvents: 'auto',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        transition: 'opacity 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        transform: 'translateY(-2px)',
      }}>
        <p style={{ margin: '0 0 4px 0', fontWeight: 600, letterSpacing: '-0.01em' }}>{formattedDate}</p>
        <p style={{ margin: 0 }}>
          <span style={{ 
            color: isDarkMode ? '#5AC8FA' : '#007AFF',
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

const GithubHeartbeat = ({ animationDelay = 0 }) => {
  const [contributionData, setContributionData] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTokenMissing, setIsTokenMissing] = useState(false);
  const [useDemoData, setUseDemoData] = useState(false);
  const animationRef = useRef(null);
  const animationStartedRef = useRef(false);

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

  // Demo data generation for fallback when token is missing
  const generateDemoData = () => {
    const demoData = [];
    const today = new Date();
    
    // Generate a year's worth of dummy data
    for (let i = 365; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Create some random data with patterns (more activity on weekdays, less on weekends)
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      // Base contribution is higher for weekdays
      let baseContribution = isWeekend ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 5);
      
      // Add some patterns - bursts of activity every ~2 weeks
      if (i % 14 < 5) {
        baseContribution += Math.floor(Math.random() * 4);
      }
      
      demoData.push({
        date: date.toISOString().split('T')[0],
        contributionCount: baseContribution
      });
    }
    
    return demoData;
  };

  useEffect(() => {
    const fetchContributions = async () => {
      // Calculate the date range for the past year.
      const toDate = new Date();
      const fromDate = new Date();
      fromDate.setFullYear(fromDate.getFullYear() - 1);
      // Construct ISO strings for the query (covering the whole day).
      const fromISO = fromDate.toISOString().split('T')[0] + "T00:00:00Z";
      const toISO = toDate.toISOString().split('T')[0] + "T23:59:59Z";

      // Try to get GitHub token from various environment variables (handling different naming conventions)
      const token = process.env.REACT_APP_GITHUB_TOKEN || 
                     process.env.VITE_GITHUB_TOKEN || 
                     process.env.GITHUB_TOKEN ||
                     process.env.NEXT_PUBLIC_GITHUB_TOKEN;
                     
      if (!token) {
        console.warn("GitHub token is missing. Using demo data.");
        setError("GitHub token is missing. Using demo data instead.");
        setIsTokenMissing(true);
        setUseDemoData(true);
        
        // Use demo data as fallback
        const demoData = generateDemoData();
        const totalDemoContributions = demoData.reduce((sum, day) => sum + day.contributionCount, 0);
        
        setTotalContributions(totalDemoContributions);
        processContributionData(demoData);
        setIsLoaded(true);
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
        console.log("Attempting GitHub API request with token");
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });
        
        console.log("GitHub API response status:", response.status, response.statusText);
        
        // Handle non-OK responses
        if (!response.ok) {
          const responseText = await response.text();
          console.error("Response body:", responseText);
          
          // If authentication fails, use demo data
          if (response.status === 401) {
            console.warn("GitHub authentication failed. Using demo data instead.");
            setError("GitHub authentication failed. Using demo data instead.");
            setIsTokenMissing(true);
            setUseDemoData(true);
            
            const demoData = generateDemoData();
            const totalDemoContributions = demoData.reduce((sum, day) => sum + day.contributionCount, 0);
            
            setTotalContributions(totalDemoContributions);
            processContributionData(demoData);
            setIsLoaded(true);
            return;
          }
          
          throw new Error(`GitHub API error: ${response.status} ${response.statusText} - ${responseText}`);
        }
        
        const result = await response.json();
        
        if (result.errors) {
          console.error("GraphQL errors:", result.errors);
          throw new Error(result.errors.map(e => e.message).join(', '));
        }
        
        if (!result.data || !result.data.user) {
          console.error("Missing user data in response:", result);
          throw new Error("No user data returned. Check your GitHub username in the query.");
        }

        const calendar = result.data.user.contributionsCollection.contributionCalendar;
        setTotalContributions(calendar.totalContributions);
        
        // Process the contribution data
        processContributionData(transformContributionDays(calendar.weeks));
        setIsLoaded(true);
        
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError(err.message);
        
        if (err.message.includes('token') || err.message.includes('credentials')) {
          setIsTokenMissing(true);
          setUseDemoData(true);
          
          // Use demo data as fallback for any auth errors
          const demoData = generateDemoData();
          const totalDemoContributions = demoData.reduce((sum, day) => sum + day.contributionCount, 0);
          
          setTotalContributions(totalDemoContributions);
          processContributionData(demoData);
          setIsLoaded(true);
        }
      }
    };
    
    // Helper function to process contribution data for display
    const processContributionData = (data) => {
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
    };

    fetchContributions();
  }, []);
  
  // New effect to coordinate animations based on the animationDelay prop
  useEffect(() => {
    if (isLoaded && !animationStartedRef.current) {
      // Use the animationDelay prop to coordinate with text animations
      // Default is 2.5s from initial text animations (2.4s for text + 0.1s buffer)
      const startDelay = animationDelay || 2500;
      
      const timer = setTimeout(() => {
        startWaveAnimation();
        animationStartedRef.current = true;
      }, startDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isLoaded, animationDelay]);
  
  // Function to animate the wave reveal
  const startWaveAnimation = () => {
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const startTime = performance.now();
    const duration = 6000; // Increased to 6 seconds for an even slower wave animation
    
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
    color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
    zIndex: 2,
    pointerEvents: 'auto',
    fontSize: '13px',
    fontWeight: 500,
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif",
    textShadow: 'none',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    padding: '8px 14px',
    borderRadius: '12px',
    backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    border: `1px solid ${isDarkMode ? 'rgba(10, 132, 255, 0.3)' : 'rgba(0, 122, 255, 0.2)'}`,
    opacity: 0,
    // Use the same animationDelay for the fadeIn of the text
    animation: isLoaded ? `fadeIn 1s ease-in-out 0.5s forwards` : 'none',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  };

  const errorStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    color: isDarkMode ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
    padding: '20px 25px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    maxWidth: '90%',
    width: '450px',
    textAlign: 'center',
    zIndex: 10,
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    border: `1px solid ${isDarkMode ? 'rgba(255, 69, 58, 0.4)' : 'rgba(255, 59, 48, 0.2)'}`,
    fontSize: '15px',
    lineHeight: 1.5,
  };

  const helpTextStyle = {
    marginTop: '15px',
    fontSize: '13px',
    opacity: 0.8,
    lineHeight: 1.6,
    textAlign: 'left',
  };

  const waveChartStyle = {
    width: '100%',
    height: '100%',
    clipPath: `polygon(0% 0%, ${animationProgress * 100}% 0%, ${animationProgress * 100}% 100%, 0% 100%)`,
    transition: 'clip-path 0.05s cubic-bezier(0.2, 0.8, 0.2, 1)',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.05))',
  };

  // Colors for light and dark mode - Apple-inspired SF Blue colors
  const primaryColor = isDarkMode ? '#0A84FF' : '#007AFF';
  const secondaryColor = isDarkMode ? '#5AC8FA' : '#64D2FF';
  const tertiaryColor = isDarkMode ? '#30B0C7' : '#CEECFD';

  // Show a more helpful error message if token is missing and not using demo data
  if (isTokenMissing && !useDemoData) {
    return (
      <div style={waveContainerStyle}>
        <div style={errorStyle}>
          <h3 style={{ marginTop: 0, color: isDarkMode ? '#FF453A' : '#FF3B30' }}>GitHub Authentication Required</h3>
          <p>{error}</p>
          <div style={helpTextStyle}>
            <p><strong>How to fix:</strong></p>
            <ol style={{ paddingLeft: '20px', margin: '10px 0' }}>
              <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" style={{ color: primaryColor }}>GitHub Token Settings</a></li>
              <li>Create a new token with <code>read:user</code> scope</li>
              <li>Add the token to your environment variables:</li>
              <code style={{ 
                display: 'block', 
                padding: '10px', 
                background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.05)', 
                borderRadius: '4px',
                marginTop: '8px',
                fontFamily: 'monospace' 
              }}>REACT_APP_GITHUB_TOKEN=your_new_token</code>
              <li>For production environments, add this environment variable in your hosting platform settings</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={waveContainerStyle}>
      {error && !useDemoData && (
        <div style={{...errorStyle, top: '20px', transform: 'translateX(-50%)'}}>
          <p style={{ margin: 0 }}>Error: {error}</p>
        </div>
      )}
      <div style={waveContentStyle}>
        <span style={{ fontWeight: 600 }}>{totalContributions}</span> contributions in the last year
        {useDemoData && <span style={{ fontSize: '10px', opacity: 0.7, marginLeft: '5px' }}>(demo data)</span>}
      </div>
      <div style={waveChartStyle}>
        <ResponsiveContainer>
          <AreaChart 
            data={contributionData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.75} />
                <stop offset="50%" stopColor={secondaryColor} stopOpacity={0.45} />
                <stop offset="95%" stopColor={tertiaryColor} stopOpacity={0.25} />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <Tooltip 
              content={<CustomTooltip isDarkMode={isDarkMode} />}
              cursor={false}
            />
            <Area
              type="natural" 
              dataKey="count"
              stroke={primaryColor}
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorContributions)"
              animationDuration={0}
              isAnimationActive={false}
              activeDot={{ 
                r: 6,
                fill: isDarkMode ? '#5AC8FA' : '#007AFF',
                stroke: isDarkMode ? '#1C093F' : '#fff',
                strokeWidth: 2,
                filter: 'url(#glow)'
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
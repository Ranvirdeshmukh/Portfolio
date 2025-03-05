// GithubHeartbeat.jsx
import React, { useState, useEffect, useContext } from 'react';
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
    .map(day => ({ date: day.date, count: day.contributionCount }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Custom curve to make the wave more pronounced
const CustomCurve = (props) => {
  const { points, ...rest } = props;
  // Increase the amplitude of the wave
  const enhancedPoints = points.map((point, index) => {
    // Add some randomness to make it more wave-like
    const randomFactor = Math.sin(index * 0.5) * 10;
    return {
      ...point,
      y: point.y + randomFactor
    };
  });
  
  return <Curve {...rest} points={enhancedPoints} />;
};

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
    
    const commitCount = Math.floor(data.originalCount || data.count);
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
  const [loading, setLoading] = useState(true);
  // Check if we're in dark mode by looking at the background color
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update window dimensions on resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
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

  // Generate sample data for the wave when no GitHub data is available
  const generateSampleData = () => {
    const sampleData = [];
    const today = new Date();
    
    // Generate data for the past year
    for (let i = 365; i >= 0; i -= 2) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      // Create a wave pattern with some randomness
      const baseValue = Math.sin(i * 0.1) * 3 + 3; // Base sine wave
      const randomValue = Math.random() * 2; // Random noise
      const count = Math.max(0, baseValue + randomValue);
      
      sampleData.push({
        date: date.toISOString().split('T')[0],
        count: count,
        originalCount: Math.floor(count)
      });
    }
    
    return sampleData;
  };

  useEffect(() => {
    const fetchContributions = async () => {
      setLoading(true);
      
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
        console.warn("GitHub token is not defined. Using sample data instead.");
        const sampleData = generateSampleData();
        setContributionData(sampleData);
        setTotalContributions(sampleData.reduce((sum, day) => sum + Math.floor(day.originalCount), 0));
        setLoading(false);
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
        
        if (!response.ok) {
          // Handle HTTP errors like 401 Unauthorized
          if (response.status === 401) {
            throw new Error("GitHub API authentication failed. Your token may be invalid or expired.");
          } else {
            throw new Error(`GitHub API returned status ${response.status}: ${response.statusText}`);
          }
        }
        
        const result = await response.json();

        if (result.errors) {
          throw new Error(result.errors.map(e => e.message).join(', '));
        }
        
        if (!result.data || !result.data.user) {
          throw new Error("No user data returned from GitHub API. Check your username in the query.");
        }

        const calendar = result.data.user.contributionsCollection.contributionCalendar;
        setTotalContributions(calendar.totalContributions);
        
        // Process the data to make it more wave-like
        let data = transformContributionDays(calendar.weeks);
        
        // Filter fewer days to make the wave longer
        data = data.filter((_, index) => index % 2 !== 0);
        
        // Duplicate the data to make the wave longer
        const duplicatedData = [...data];
        
        // Add some randomness to the duplicated data to make it look different
        const extendedData = duplicatedData.map(day => {
          const randomOffset = Math.random() * 30 - 15; // Random value between -15 and 15
          const newDate = new Date(day.date);
          newDate.setDate(newDate.getDate() - 365); // Set date to previous year
          
          return {
            ...day,
            date: newDate.toISOString().split('T')[0],
            count: Math.max(0, day.count + randomOffset),
            originalCount: day.originalCount
          };
        });
        
        // Combine original and extended data
        const combinedData = [...data, ...extendedData];
        
        // Enhance the wave effect by adding some randomness to the counts
        // Store the original count before modifying it for display purposes
        const enhancedData = combinedData.map(day => ({
          ...day,
          originalCount: day.originalCount || day.count, // Store original count for tooltip
          count: (day.count + Math.random() * 3) * 0.8 // Scale down to make wave smoother
        }));
        
        // Sort the combined data by date
        enhancedData.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        setContributionData(enhancedData);
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError(err.message);
        
        // Fall back to sample data if GitHub API fails
        console.log("Using sample data due to API error");
        const sampleData = generateSampleData();
        setContributionData(sampleData);
        setTotalContributions(sampleData.reduce((sum, day) => sum + Math.floor(day.originalCount), 0));
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  // Calculate the height as 1/4 of the viewport height
  const waveHeight = Math.floor(windowHeight / 4);

  const waveContainerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: `${waveHeight}px`,
    zIndex: 1,
    pointerEvents: 'auto', // Changed to auto to allow hover interactions
    overflow: 'hidden',
  };

  const waveContentStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    zIndex: 2,
    pointerEvents: 'auto', // Make text clickable
    fontSize: '12px',
    fontWeight: 300,
    textShadow: isDarkMode ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
  };

  // Colors for light and dark mode
  const primaryColor = isDarkMode ? '#8884d8' : '#571ce0';
  const secondaryColor = isDarkMode ? '#c792ea' : '#8884d8';

  return (
    <div style={waveContainerStyle}>
      {error && (
        <p style={{ 
          color: 'rgba(255, 100, 100, 0.8)', 
          position: 'absolute', 
          top: '5px', 
          left: '20px',
          fontSize: '10px',
          maxWidth: '80%'
        }}>
          Note: {error}
        </p>
      )}
      <div style={waveContentStyle}>
        {loading ? 'Loading contributions...' : `${totalContributions} contributions in the last year`}
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer>
          <AreaChart 
            data={contributionData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.6} />
                <stop offset="95%" stopColor={secondaryColor} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Tooltip 
              content={<CustomTooltip isDarkMode={isDarkMode} />}
              cursor={{ stroke: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', strokeWidth: 1 }}
            />
            <Area
              type="basis" // Changed to basis for a smoother, wavier curve
              dataKey="count"
              stroke={primaryColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorContributions)"
              animationDuration={2000}
              isAnimationActive={true}
              activeDot={{ 
                r: 6, 
                fill: isDarkMode ? '#c792ea' : '#571ce0',
                stroke: isDarkMode ? '#1C093F' : '#fff',
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GithubHeartbeat;

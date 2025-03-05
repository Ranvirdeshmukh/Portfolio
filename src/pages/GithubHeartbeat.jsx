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
  // Check if we're in dark mode by looking at the background color
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

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
        
        // Add some gaps by filtering out some days
        data = data.filter((_, index) => index % 3 !== 0);
        
        // Enhance the wave effect by adding some randomness to the counts
        // Store the original count before modifying it for display purposes
        data = data.map(day => ({
          ...day,
          originalCount: day.count, // Store original count for tooltip
          count: day.count + Math.random() * 2
        }));
        
        setContributionData(data);
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError(err.message);
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
      {error && <p style={{ color: 'red', position: 'absolute', top: 0, left: '20px' }}>Error: {error}</p>}
      <div style={waveContentStyle}>
        {totalContributions} contributions in the last year
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
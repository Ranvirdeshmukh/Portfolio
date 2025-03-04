// GithubHeartbeat.jsx
import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

/**
 * Helper to group commits by day.
 * Returns an array of { date: 'YYYY-MM-DD', count: numberOfCommits }
 */
function groupCommitsByDay(dates) {
  const dayMap = {};
  dates.forEach(date => {
    const dayString = date.toISOString().split('T')[0]; // e.g., "2023-06-09"
    if (!dayMap[dayString]) {
      dayMap[dayString] = 0;
    }
    dayMap[dayString]++;
  });

  // Convert to array
  const result = Object.entries(dayMap).map(([date, count]) => ({ date, count }));
  // Sort by date ascending
  result.sort((a, b) => new Date(a.date) - new Date(b.date));
  return result;
}

const GithubHeartbeat = () => {
  const [commitData, setCommitData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        // Replace <username>/<repo> with your own
        const response = await fetch('https://api.github.com/repos/ranvirdeshmukh/Portfolio/commits');
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        // data should be an array of commits
        if (!Array.isArray(data)) {
          throw new Error('Unexpected response format from GitHub');
        }

        // Extract commit dates
        const commitDates = data.map(commit => new Date(commit.commit.author.date));
        // Group by day
        const grouped = groupCommitsByDay(commitDates);
        setCommitData(grouped);
      } catch (error) {
        console.error('Error fetching commits:', error);
        setErrorMessage(error.message);
      }
    };

    fetchCommits();
  }, []);

  // Optionally compute total commits or other stats
  const totalCommits = commitData.reduce((acc, item) => acc + item.count, 0);

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ fontFamily: "'SF Pro Display', sans-serif", fontWeight: 500 }}>
        GitHub Heartbeat
      </h3>

      {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}

      <p>
        {totalCommits} contributions since{' '}
        {commitData.length > 0 ? commitData[0].date : 'N/A'}
      </p>

      {/* ResponsiveContainer will size to the width of the parent container */}
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={commitData}>
            <defs>
              {/* This gradient is for the area fill under the line */}
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorCount)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GithubHeartbeat;

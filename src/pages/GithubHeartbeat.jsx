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

const GithubHeartbeat = () => {
  const [contributionData, setContributionData] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [error, setError] = useState(null);

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
        const data = transformContributionDays(calendar.weeks);
        setContributionData(data);
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError(err.message);
      }
    };

    fetchContributions();
  }, []);

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ fontFamily: "'SF Pro Display', sans-serif", fontWeight: 500 }}>
        GitHub Contributions (Last Year)
      </h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <p>{totalContributions} contributions in the last year</p>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={contributionData}>
            <defs>
              <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#colorContributions)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GithubHeartbeat;

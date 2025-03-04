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
 * Groups a list of Date objects by day (YYYY-MM-DD),
 * returning an array of { date: 'YYYY-MM-DD', count: numberOfCommits }.
 */
function groupCommitsByDay(dates) {
  const dayMap = {};
  dates.forEach(date => {
    const dayString = date.toISOString().split('T')[0]; // e.g. "2023-09-20"
    if (!dayMap[dayString]) {
      dayMap[dayString] = 0;
    }
    dayMap[dayString]++;
  });

  // Convert to array and sort by date
  return Object.entries(dayMap)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Fetches *all* public repositories for a given username (handling pagination).
 */
async function fetchAllPublicRepos(username) {
  let page = 1;
  let allRepos = [];
  while (true) {
    const url = `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching repos (page ${page}): ${response.status}`);
    }
    const repos = await response.json();
    if (!Array.isArray(repos) || repos.length === 0) {
      // No more repos or unexpected response
      break;
    }
    allRepos = [...allRepos, ...repos];
    page++;
    // If we got fewer than 100, there are no more pages
    if (repos.length < 100) break;
  }
  return allRepos;
}

/**
 * Fetches *all* commits from a single repository within the last year,
 * authored by a given username. (Handles pagination.)
 */
async function fetchAllCommitsForRepo(username, repoName, sinceISO) {
  let page = 1;
  let allCommits = [];
  while (true) {
    // Add &author= so we only get commits authored by the user
    // Add &since= to limit commits to last year
    const commitsUrl = `https://api.github.com/repos/${username}/${repoName}/commits?per_page=100&page=${page}&author=${username}&since=${sinceISO}`;
    const response = await fetch(commitsUrl);

    if (!response.ok) {
      // Possibly a private repo or fetch error; skip
      console.warn(`Skipping repo "${repoName}" page ${page}, status: ${response.status}`);
      break;
    }

    const commitsData = await response.json();
    if (!Array.isArray(commitsData) || commitsData.length === 0) {
      // No more commits or unexpected response
      break;
    }

    // Extract the commit dates
    const commitDates = commitsData.map(c => new Date(c.commit.author.date));
    allCommits.push(...commitDates);

    page++;
    // If we got fewer than 100 commits, no more pages
    if (commitsData.length < 100) break;
  }
  return allCommits;
}

const GithubHeartbeat = () => {
  const [commitData, setCommitData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Calculate the ISO date for exactly one year ago
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const sinceISO = oneYearAgo.toISOString(); // e.g., "2022-09-20T10:00:00.000Z"

    const fetchCommitsForAllRepos = async () => {
      try {
        const username = 'ranvirdeshmukh';

        // 1. Fetch all public repos
        const allRepos = await fetchAllPublicRepos(username);

        // 2. For each repo, fetch all commits in the last year
        let allCommitDates = [];
        for (const repo of allRepos) {
          // If you only want your *own* repos (not forks), uncomment:
          // if (repo.fork) continue;

          const repoCommitDates = await fetchAllCommitsForRepo(
            username,
            repo.name,
            sinceISO
          );
          allCommitDates.push(...repoCommitDates);
        }

        // 3. Group all commits by day
        const grouped = groupCommitsByDay(allCommitDates);
        setCommitData(grouped);
      } catch (error) {
        console.error('Error fetching commits:', error);
        setErrorMessage(error.message);
      }
    };

    fetchCommitsForAllRepos();
  }, []);

  // Calculate the total commits across all repos in the last year
  const totalCommits = commitData.reduce((acc, item) => acc + item.count, 0);

  return (
    <div style={{ marginTop: '40px' }}>
      <h3 style={{ fontFamily: "'SF Pro Display', sans-serif", fontWeight: 500 }}>
        GitHub Heartbeat (All Public Repos, Last Year)
      </h3>

      {errorMessage && <p style={{ color: 'red' }}>Error: {errorMessage}</p>}

      <p>
        {totalCommits} commits authored by you in the last year (public repos only)
      </p>

      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={commitData}>
            <defs>
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

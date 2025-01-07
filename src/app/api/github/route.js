import { Octokit } from '@octokit/rest';
import { NextResponse } from 'next/server';
import { formatRepoName, getRandomGradient, getIconForRepo } from '../../hubbies/utils';

// Cache the response for 1 hour
export const revalidate = 3600;

// Keep cache in memory
let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds
const TIMEOUT = 15000; // 15 seconds

export async function GET() {
  try {
    const now = Date.now();
    const token = process.env.GITHUB_TOKEN;

    // Always return cached data in production if available
    if (cachedData && (process.env.NODE_ENV === 'production' || (now - lastFetchTime) < CACHE_DURATION)) {
      console.log('Returning cached repositories data');
      return NextResponse.json(cachedData);
    }

    if (!token) {
      throw new Error('GitHub token not configured. Please set GITHUB_TOKEN in environment variables.');
    }

    const octokit = new Octokit({
      auth: token,
      request: {
        timeout: TIMEOUT
      }
    });

    // First check current rate limit status
    const { data: rateData } = await octokit.rest.rateLimit.get();
    
    if (rateData.resources.core.remaining === 0) {
      throw new Error(`GitHub API rate limit exceeded. Resets at ${new Date(rateData.resources.core.reset * 1000).toLocaleString()}`);
    }

    const { data: repos } = await octokit.repos.listForUser({
      username: 'danspelt',
      sort: 'pushed',
      direction: 'desc',
      per_page: 100
    });

    const filteredRepos = repos
      .filter(repo => !repo.fork && repo.name !== 'danspelt.com')
      .map(repo => ({
        title: formatRepoName(repo.name),
        year: new Date(repo.pushed_at).toLocaleDateString('en-US', { 
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        description: repo.description || `A ${repo.language} project focused on ${formatRepoName(repo.name)}.`,
        gradient: getRandomGradient(),
        icon: getIconForRepo(repo.language),
        url: repo.html_url,
        homepage: repo.homepage,
        tags: [
          repo.language,
          'Open Source',
          ...(repo.topics || []),
          repo.homepage ? 'Live Demo' : null
        ].filter(Boolean),
      }));

    // Update cache
    cachedData = filteredRepos;
    lastFetchTime = now;

    return NextResponse.json(filteredRepos);
  } catch (error) {
    console.error('Error fetching repositories:', error);

    // In production or if we have cached data, return it
    if (cachedData && (process.env.NODE_ENV === 'production' || error.message.includes('rate limit'))) {
      console.log('Error occurred, returning cached data');
      return NextResponse.json(cachedData);
    }

    // Otherwise return an empty array to prevent page errors
    return NextResponse.json([], { 
      status: error.message.includes('rate limit exceeded') ? 429 : 
              error.name === 'TimeoutError' ? 504 : 500 
    });
  }
}

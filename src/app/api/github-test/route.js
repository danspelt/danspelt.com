import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;
    const envInfo = {
      hasToken: !!token,
      tokenPrefix: token ? token.substring(0, 4) : 'none',
      nodeEnv: process.env.NODE_ENV,
    };

    // Test GitHub API
    const response = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    const data = await response.json();
    
    return NextResponse.json({
      env: envInfo,
      githubResponse: {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        data: data
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

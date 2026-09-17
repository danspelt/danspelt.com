import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Never disclose credentials or authenticated account data in diagnostics.
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, {
      status: 404,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  return NextResponse.json({ hasToken: Boolean(process.env.GITHUB_TOKEN) }, {
    headers: { 'Cache-Control': 'no-store' },
  });
}

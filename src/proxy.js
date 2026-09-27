import { NextResponse } from 'next/server';

// This site uses no React Server Actions. Public Next.js sites are routinely
// scanned with bogus `Next-Action: x` headers, each of which logs a
// "Server Reference ID did not match" error. Reject them early with 400.
export function proxy(request) {
  if (request.headers.has('next-action')) {
    return new NextResponse('Bad Request', { status: 400 });
  }
  return NextResponse.next();
}

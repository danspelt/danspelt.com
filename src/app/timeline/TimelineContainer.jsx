'use client';

import dynamic from 'next/dynamic';

const ClientWrapper = dynamic(() => import('./ClientWrapper'), {
  ssr: false,
});

export default function TimelineContainer() {
  return (
    <div className="w-full h-[800px]">
      <ClientWrapper />
    </div>
  );
}

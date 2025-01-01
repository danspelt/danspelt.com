'use client';

import React from 'react';
import Timeline2D from './Timeline2D';

export default function TimelineClient() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gradient-to-b from-background to-background/80">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 relative">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-pink-500"
            >
              <path
                d="M12.5 3.5L6 10L12.5 8.5L18.5 15L12.5 13.5L6.5 20.5L12.5 3.5Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">Professional Journey</h1>
        <p className="text-muted-foreground">
          A timeline of my career progression and key achievements
        </p>
      </div>
      <Timeline2D />
    </div>
  );
}

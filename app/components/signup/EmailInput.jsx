"use client";
import React, { useEffect, useState } from 'react';
export default function EmailInput() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <input
      type="email"
      placeholder="Email Address"
      className="text-2xl font-bold mb-4 border-2 border-gray-200 rounded-xl p-4"
      required
    />
  );
}

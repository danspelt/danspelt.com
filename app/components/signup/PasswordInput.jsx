"use client";
import React, { useEffect, useState } from 'react';
export default function PasswordInput() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <input
      type="password"
      placeholder="Password"
      className="text-2xl font-bold mb-4 border-2 border-gray-200 rounded-xl p-4"
      required
    />
  );
}

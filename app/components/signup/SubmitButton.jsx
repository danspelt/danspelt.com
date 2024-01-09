"use client";
import React, { useEffect, useState } from 'react';
export default function SubmitButton() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <button type="submit" className="submit-button">
      Sign Up
    </button>
  );
}

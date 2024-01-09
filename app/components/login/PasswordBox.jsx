"use client";
import React, { useEffect, useState } from 'react';
const PasswordBox = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []); 

  if (!isMounted) {
    return null;
  }
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-4xl leading-tight focus:outline-none focus:shadow-outline"      
      placeholder="Password"
      type="password"
    >      
    </input>
  );
};

export default PasswordBox;
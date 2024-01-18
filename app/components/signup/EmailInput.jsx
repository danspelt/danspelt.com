"use client";
import React, { useEffect, useState, useContext } from "react"; 

import { SignupContext } from '../../contexts/SignUpContext';
export default function EmailInput() {
  const [isMounted, setIsMounted] = useState(false);
  const { setEmailValid, setCurrentEmail } = useContext(SignupContext);
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
      onBlur={(e) => {
        setEmailValid(e.target.value.includes("@"));
        setCurrentEmail(e.target.value);
      }}
    />
  );
}

"use client";

import React, { useState, useContext, useEffect } from "react";
import { SignupContext } from "../../contexts/SignUpContext";


const UserNameInput = () => {
  let timer;
  const { setUsernameValid, setCurrentUsername } = useContext(SignupContext);
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const checkUsernameExists = async (username) => {
  };

  const startTimer = (username) => {
    // Clear any existing timer
    clearTimeout(timer);
    // Start a new timer that runs after 2 seconds of inactivity
    timer = setTimeout(() => {
  
    }, 500);
  };

  return (
    <input
      className="text-2xl font-bold mb-4 border-2 border-gray-200 rounded-xl p-4"      placeholder="Username"
      type="text"
      required
      autoFocus
      onChange={(e) => {
        const username = e.target.value.toLowerCase();
        
        const filteredUsername = username
          .replace(/[^\w\s]|_/g, "")
          .replace(/\s+/g, "");
        startTimer(filteredUsername);
      }}
      onBlur={(e) => {
       setUsernameValid(!isError);
       setCurrentUsername(e.target.value);
      }}   
    />
  );
};
export default UserNameInput;

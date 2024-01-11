"use client";
import React, { useState, useContext, useEffect } from "react";
import { SignupContext } from "../../contexts/SignUpContext";
import axios from "axios";
import { TextField } from "@mui/material";
const UserBox = () => {
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
    return axios(
      `/api/checkusername?username=${username}`
    );
  };

  const startTimer = (username) => {
    // Clear any existing timer
    clearTimeout(timer);
    // Start a new timer that runs after 2 seconds of inactivity
    timer = setTimeout(() => {
      checkUsernameExists(username).then((res) => {
        setIsError(res.data.isError);   
        setHelperText(res.data.helperText);
        
      });
    }, 500);
  };

  return (
    <TextField
      label="Username"
      fullWidth
      required
      sx={{m:2}}
      type="text"
      error={isError}
      helperText={helperText}
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
export default UserBox;

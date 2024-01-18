"use client";
import React, { useEffect, useState, useContext } from "react";
import bcrypt from 'bcryptjs';
import { SignupContext } from '../../contexts/SignUpContext';

export default function ConfirmPasswordInput({checkFunction}) {
  
  const [isMounted, setIsMounted] = useState(false);
  const { setPassword2 } = useContext(SignupContext);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePasswordBlur = async (e) => {
    const password = e.target.value;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    setPassword2(hashedPassword);
  };

  if (!isMounted) {
    return null;
  }

  const onChangedPassword = async (e) => {
    const password = e.target.value;
    console.log(password)
  };

  return (
      );
}
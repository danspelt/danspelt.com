"use client";
import React, { useState, useEffect, useContext } from "react";
import bcrypt from "bcryptjs";
import { SignupContext } from "../../contexts/SignUpContext";

export default function PasswordComponent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const { setPasswordValid } = useContext(SignupContext);

  useEffect(() => {
    validatePasswordStrength();
  }, [password, confirmPassword]);

  const validatePasswordStrength = () => {
    let strength = "";
    const minLength = password.length >= 8;
    const upperCase = /[A-Z]/.test(password);
    const lowerCase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    strength = minLength ? "Good" : "Weak";

    const isValid =
      minLength &&
      upperCase &&
      lowerCase &&
      number &&
      specialChar &&
      password === confirmPassword;
    setPasswordStrength(strength);
    setPasswordValid(isValid);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleBlur = () => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // Use the hashedPassword as needed, e.g., sending to server
  };

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        onBlur={handleBlur}
        placeholder="Password"
        className="text-2xl font-bold mb-4 border-2 border-gray-200 rounded-xl p-4"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="Confirm Password"
        className="text-2xl font-bold mb-4 border-2 border-gray-200 rounded-xl p-4"
        required
      />
      {password && (
        <div>
          Password Strength: {passwordStrength}
        </div>
      )}
    </div>
  );
}
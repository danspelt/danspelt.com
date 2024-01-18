"use client"; 
import { createContext, useState } from "react";

export const SignupContext = createContext();

export const SignupProvider = ({ children }) => {
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  return (
    <SignupContext.Provider value={{ 
      usernameValid,
      setUsernameValid,
      emailValid,
      setEmailValid,
      passwordValid,
      setPasswordValid,
      password1,
      setPassword1,
      password2,
      setPassword2,
      currentEmail,
      setCurrentEmail,
      firstName,
      setFirstName,
      lastName,
      setLastName,
      currentUsername,
      setCurrentUsername
     }}>
      {children}
    </SignupContext.Provider>
  );
};

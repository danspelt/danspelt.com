import React, { useContext } from "react";
import { SignupContext } from "../../contexts/SignUpContext";
const PasswordStrength = ({ password, confirmPassword }) => {
  const { setPasswordValid } = useContext(SignupContext);
  let strength = "";
  let minLength = false;
  let upperCase = false;
  let lowerCase = false;
  let number = false;
  let specialChar = false;
  if (password.length >= 8) {
    minLength = true;
    strength += "Good";
  } else {
    strength += "Weak";
  }

  if (password.match(/[A-Z]/)) {
    upperCase = true;
  }

  if (password.match(/[a-z]/)) {
    lowerCase = true;
  }

  if (password.match(/[0-9]/)) {
    number = true;
  }

  if (password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
    specialChar = true;
  }
  setPasswordValid(
    minLength &&
    upperCase &&
    lowerCase &&
    number &&
    specialChar &&
    password === confirmPassword
  )
  
  if (password.length > 0) {
    return (
      <div>
        <div>Password Strength: {strength}</div>
        <div>
          <ul>
            <li>
              {minLength ? (
                <del>At least 8 characters</del>
              ) : (
                "At least 8 characters"
              )}
            </li>
            <li>
              {upperCase ? (
                <del>At least one uppercase letter</del>
              ) : (
                "At least one uppercase letter"
              )}
            </li>
            <li>
              {lowerCase ? (
                <del>At least one lowercase letter</del>
              ) : (
                "At least one lowercase letter"
              )}
            </li>
            <li>
              {number ? <del>At least one number</del> : "At least one number"}
            </li>
            <li>
              {specialChar ? (
                <del>At least one special character</del>
              ) : (
                "At least one special character"
              )}
            </li>
            <li>
              {password && confirmPassword && password === confirmPassword ? (
                <del>Passwords Match</del>
              ) : (
                "Passwords Match"
              )
              }
            </li>
          </ul>
        </div>
        {password && confirmPassword && password !== confirmPassword && (
          <div>Passwords do not match</div>
        )}
        {password && confirmPassword && password === confirmPassword}
      </div>
    );
  }
};
export default PasswordStrength;
 
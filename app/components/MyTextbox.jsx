"use client";
import React from "react";
import TextField from "@mui/material/TextField";

const MyTextbox = ({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  variant = "outlined",
  style,
}) => {
  return (
    <TextField
      fullWidth
      type={type}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant={variant}
      style={style}
    />
  );
};

export default MyTextbox;

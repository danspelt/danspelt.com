"use cleint";

import React from "react";
import { Button } from "@mui/material";

const MyButton = ({ label }) => {
  return (
    <Button
      variant="contained"  
    >
      {label}
    </Button>
  );
};

export default MyButton;

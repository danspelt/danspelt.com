"use cleint";

import React from "react";

const MyButton = ({ label }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      label={label}
    >
      {label}
    </button>
  );
};

export default MyButton;

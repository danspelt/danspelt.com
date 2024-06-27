import React from "react";
import { FaCoffee } from "react-icons/fa";

export const BuyMeACoffee = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/danav"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-2 absolute right-0 top-full gap-10 mt-36"
    >
      <div className="bg-yellow-500 rounded-6xl flex items-center p-8">
        <FaCoffee className="text-9xl rounded-full p-4 text-black bg-white" />
        <h2 className="p-2 text-9xl font-bold text-white">Buy me a coffee</h2>
      </div>
    </a>
  );
};

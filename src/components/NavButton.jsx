'use client'
import { useApp } from "../hooks/useApp";
import Image from "next/image";
const NavButton = ({ text }) => {
  const setCurrentComponent = useApp((state) => state.setCurrentComponent);
 
  const handleClick = () => {
    setCurrentComponent(text);
  };

  if (text === "Landing") {
    return (
      <Image 
        src="/images/logo.png" 
        alt="Dan Spelt" 
        width={50} 
        height={50} 
        className="rounded-full"
      />
    );
  }

  return (
    <button onClick={handleClick} className="text-xl border-2 border-blue-500 rounded-md p-2 hover:bg-blue-50 hover:scale-110 transition-all duration-300">
      {text}
    </button>
  );
}

export default NavButton;
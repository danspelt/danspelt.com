'use client'
import { useApp } from "../hooks/useApp";
const NavButton = ({ text }) => {
  const setCurrentComponent = useApp((state) => state.setCurrentComponent);
 
  const handleClick = () => {
    setCurrentComponent(text.toLowerCase());
  };

  return (
    <button onClick={handleClick} className="text-xl text-blue-500">
      {text}
    </button>
  );
}

export default NavButton;
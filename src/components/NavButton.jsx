'use client'
import { useApp } from "../hooks/useApp";
const NavButton = ({ text }) => {
  const setCurrentPage = useApp((state) => state.setCurrentPage);

  const handleClick = () => {
    setCurrentPage(text);
  };

  return (
    <button onClick={handleClick} className="text-xl text-blue-500">
      {text}
    </button>
  );
}

export default NavButton;
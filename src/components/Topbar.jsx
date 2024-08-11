
import Image from "next/image";
import NavButton from "./NavButton";

const Topbar = () => {
    return (
        <div className="flex flex-row w-full p-4 border-b-2 border-green-500 rounded-b-lg">
            <div className="border-2 border-gray-200 rounded-full p-2 hover:bg-blue-50 hover:scale-110 transition-all duration-300"> 
                <NavButton text="Landing" />
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-6">
                <NavButton text="About" />
                <NavButton text="Skills & Tools" />
                <NavButton text="Work Experience" />
            </div>
        </div>
    );
};

export default Topbar;


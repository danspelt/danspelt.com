import Image from "next/image";
import Link from "next/link";   
import NavButton from "./NavButton";

const Topbar = () => {
    return (
        <div className="flex flex-row w-full p-4 border-b-2 border-green-500 rounded-b-lg">
            <Link href="https://danspelt.com/" className="border-2 border-gray-200 rounded-full p-2">
                <Image
                    src="/images/logo.png"
                    alt="Dan Spelt" width={50} height={50}
                    className="rounded-full"
                />
            </Link>
            <div className="flex flex-row items-center justify-center w-full gap-6">
                <NavButton text="About" />
                <NavButton text="Experience" />
                <NavButton text="Blog" />
            </div>
        </div>
    );
};

export default Topbar;


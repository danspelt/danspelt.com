import Image from "next/image";
import Link from "next/link";
const Topbar = () => {
    return (
        <div className="flex flex-row mb-12">
            <div className="border-2 border-gray-200 rounded-full p-2 hover:bg-blue-50 hover:scale-110 transition-all duration-300"> 
                <Link href="/">
                    <Image src="/images/logo.png" alt="Dan Spelt" width={50} height={50} />
                </Link>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-6">
                <Link href="/skillstools" className="text-xl border-2 border-blue-500 rounded-md p-2 hover:bg-blue-50 hover:scale-110 transition-all duration-300">Skills & Tools</Link>
                <Link href="/timeline" className="text-xl border-2 border-blue-500 rounded-md p-2 hover:bg-blue-50 hover:scale-110 transition-all duration-300">Timeline</Link>
                <Link href="/pastprojects" className="text-xl border-2 border-blue-500 rounded-md p-2 hover:bg-blue-50 hover:scale-110 transition-all duration-300">Previous Projects</Link>
                <Link href="/faq" className="text-xl border-2 border-blue-500 rounded-md p-2 hover:bg-blue-50 hover:scale-110 transition-all duration-300">FAQ</Link>
                <Link href="/about" className="text-xl border-2 border-blue-500 rounded-md p-2 hover:bg-blue-50 hover:scale-110 transition-all duration-300">About Dan Spelt</Link>
                <Link href="/contact" className="text-xl border-2 border-blue-500 rounded-md p-2 hover:bg-blue-50 hover:scale-110 transition-all duration-300">Contact Me</Link>
            </div>
        </div>
    );
};

export default Topbar;


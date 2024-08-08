import Link from "next/link";
import Image from "next/image";

const Topbar = () => {
    return (
        <div className="flex flex-row  w-full border-b-2 border-gray-200 mb-4">
            <Link href="https://danspelt.com/" className="custom-logo-link">
                <Image src="/images/logo.png" alt="Dan Spelt" width={50} height={50} />
            </Link>
            <ul className="flex items-center justify-center">
                <li>
                    <Link className="text-lg pl-4 text-blue-500" href="/about">About</Link>
                    <Link className="text-lg pl-4 text-blue-500" href="/experience">Experience</Link>
                    <Link className="text-lg pl-4 text-blue-500" href="/blog">Blog</Link>
                </li>
            </ul>
        </div>
    );
};

export default Topbar;


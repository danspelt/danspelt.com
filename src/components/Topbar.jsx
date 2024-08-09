import Image from "next/image";
import Link from "next/link";

const Topbar = () => {
    return (
        <div className="flex flex-row  w-full border-b-2 border-gray-200 mb-4">
            <Link href="https://danspelt.com/" className="custom-logo-link">
                <Image src="/images/logo.png" alt="Dan Spelt" width={50} height={50} />
            </Link>
            
        </div>
    );
};

export default Topbar;


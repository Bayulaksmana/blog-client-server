import { useState } from "react"
import { Link } from "react-router"
import Image from "./Image"
import { useEffect } from "react"
import { SignedIn, SignedOut, useAuth, UserButton, useUser } from "@clerk/clerk-react"


const Navbar = () => {
    const { user } = useUser()
    const { getToken } = useAuth();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getToken()
        //.then(token => console.log(token))
    });

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/posts", label: "Article" },
        { to: "/activity", label: "Activity" },
        { to: "/organization", label: "Organization" },
    ];
    const isAdmin = user?.publicMetadata?.role === "admin" || false
    const isActive = (path) => location.pathname === path;
    return (
        <div className='w-full py-4 flex items-center justify-between dark:bg-gray-900 relative z-50'>
            {/* start section logo */}
            <Link to="/" className="transition-transform hover:scale-105">
                <Image src="logo/logo.svg" alt={'logo svg'} w="32" h="32" className={'w-full h-16 mt-1 object-contain'} />
            </Link>
            {/* end section logo */}

            {/* start section navigation mobile */}
            <div className="sm:hidden">
                {/* mobile button */}
                <div className="cursor-pointer text-4xl font-medium" onClick={() => setOpen((prev) => !prev)}>
                    {open ? "x" : "≡"}
                </div>
                {/* mobile link list */}
                <div className={`font-medium gap-8 text-lg w-full h-full bg-[#e6e6ff] flex flex-col items-center justify-center absolute top-16 transition-all ease-in-out ${open ? "-right-0" : "-right-[100%]"}`}>
                    <Link to="/">Home</Link>
                    <Link to="/posts">Article</Link>
                    <Link to="#">Activity</Link>
                    <Link to="/organization">Organization</Link>
                    <SignedOut>
                        <Link to="/login">
                            <button className="py-1.5 px-3 rounded-3xl bg-emerald-600 text-white">Login🔐</button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
            {/* end section navigation mobile */}

            {/* start section navigation menu desktop */}
            <div className="hidden sm:flex items-center gap-4 md:gap-8 lg:gap-12 font-medium text-gray-800 ">
                {navLinks.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`hover:text-emerald-600 transition ${isActive(link.to) ? "text-emerald-600 font-semibold" : ""
                            }`}
                    >
                        {link.label}
                    </Link>
                ))}
                {isAdmin && <Link to="/settings" className="hover:text-orange-400 transition">Settings</Link>}
                <SignedOut>
                    <Link to="/login">
                        <button className="py-1.5 px-3 rounded-3xl bg-emerald-600 text-white hover:bg-emerald-700 transition">🔐</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
            {/* end section navigation menu desktop */}

        </div>
    )
}

export default Navbar


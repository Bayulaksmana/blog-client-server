import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router"
import Image from "./Image"
import { useEffect } from "react"
import { SignedIn, SignedOut, useAuth, UserButton, useUser } from "@clerk/clerk-react"
import UserNavigationPanel from "./user.navigation.component"
import { UserContext } from "../common/user.context"


const Navbar = () => {
    const { user } = useUser()
    const { getToken } = useAuth();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const [userNavPanel, setUserNavPanel] = useState(false)

    const { userAuth, userAuth: { access_token, profile_img } } = useContext(UserContext)
    const handleUserNavPanel = () => {
        setUserNavPanel((prev) => !prev)
    }
    const handleBlur = () => {
        setTimeout(() => {
            setUserNavPanel(false)
        }, 200);
    }

    const handleClick = () => {
        setOpen(!open); // toggle antara signin & signup
        navigate(!open ? "signup" : "signin");
    };

    useEffect(() => {
        getToken()
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
        <div className=' py-4 flex items-center justify-between dark:bg-gray-900 relative z-50'>
            {/* start section logo */}
            <Link to="/" className="transition-transform hover:scale-105">
                <Image src="logo/logo.svg" alt={'logo svg'} w="32" h="32" className={'w-full h-16 mt-1 object-contain'} />
            </Link>
            {/* end section logo */}

            {/* start section navigation mobile */}
            <div className="sm:hidden flex ">
                {/* mobile button */}
                <div className="cursor-pointer text-4xl font-medium" onClick={() => setOpen((prev) => !prev)}>
                    {open ? "x" : "≡"}
                </div>
                {/* mobile link list */}
                <div className={`gap-8 text-lg w-full h-screen left-0 top-full font-semibold bg-[#E6E6FF] q flex flex-col items-center justify-center absolute transition-all ease-in-out ${open ? "show" : "hide"}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`hover:text-emerald-600 transition ${isActive(link.to) ? "text-emerald-600 font-semibold" : ""}`}
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isAdmin && <Link to="/settings" onClick={() => setOpen(false)} className="hover:text-orange-400 transition">Settings</Link>}
                    <SignedOut>
                        <Link to="/login">
                            <button onClick={() => setOpen(false)} className="py-1.5 px-3 rounded-3xl bg-emerald-600 text-white hover:bg-emerald-700 transition">🔐</button>
                        </Link>
                        <button onClick={handleClick} className="py-1.5 px-3 rounded-3xl bg-emerald-600 text-white hover:bg-emerald-700 transition">{open ? "Sign-In" : "Sign-Up"}</button>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
            {/* end section navigation mobile */}

            {/* start section navigation menu desktop */}
            <div className="hidden sm:flex items-center text-lg gap-4 md:gap-4 lg:gap-12 font-medium text-gray-800 ">
                {navLinks.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className={`hover:text-emerald-600 transition ${isActive(link.to) ? "text-emerald-600 font-semibold" : ""}`}
                    >
                        {link.label}
                    </Link>
                ))}
                {isAdmin && <Link to="/settings" className="hover:text-orange-400 transition">Settings</Link>}
                <SignedOut>
                    <Link to="/login">
                        <button className="py-1.5 px-3 rounded-3xl bg-emerald-600 text-white text-xs hover:bg-emerald-500 transition">🔐</button>
                    </Link>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                {
                    access_token ?
                        <div className="gap-8 flex items-center justify-between">
                            <Link>
                                <button className="relative mt-1">
                                    <svg className="w-6 h-6 block text-gray-800 hover:text-emerald-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
                                    </svg>
                                </button>
                            </Link>
                            <div className="relative" onClick={handleUserNavPanel} onBlur={handleBlur}>
                                <button className="w-12 h-12 mt-2">
                                    <img src={profile_img} alt="" className="h-full w-full object-cover rounded-full" />
                                </button>

                                {
                                    userNavPanel ? <UserNavigationPanel /> : ""
                                }
                            </div>
                        </div>
                        :
                        <button onClick={handleClick} className="py-1.5 px-2 rounded-xl text-xs bg-slate-950 text-white hover:bg-opacity-80 transition" >{open ? "Sign-In" : "Sign-Up"}</button>
                }
            </div>
            {/* end section navigation menu desktop */}

        </div>
    )
}

export default Navbar


import { useState } from "react"
import { Link } from "react-router"
import Image from "./Image"
import { useEffect } from "react"
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react"


const Navbar = () => {
    const [open, setOpen] = useState(false);

    const { getToken } = useAuth();

    useEffect(() => {
        getToken()
        //.then(token => console.log(token))
    });

    return (
        <div className='w-full h-16 md:h-20 flex items-center justify-between'>
            {/* start section logo */}
            <Link to="/">
                <Image src="logo/logo.svg" alt={'logo svg'} w="32" h="32" className={'w-full h-16 mt-1'} />
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
            <div className="hidden sm:flex items-center gap-4 md:gap-8 lg:gap-12 font-medium">
                <Link to="/">Home</Link>
                <Link to="/posts">Article</Link>
                <Link to="/">Activity</Link>
                <Link to="/organization">Organization</Link>
                <SignedOut>
                    <Link to="/login">
                        <button className="py-1.5 px-3 rounded-3xl bg-emerald-600 text-white">🔐</button>
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


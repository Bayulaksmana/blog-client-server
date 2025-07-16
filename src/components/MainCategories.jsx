import { Link } from "react-router"
import Search from "./Search"

const MainCategories = () => {
    return (
        <div className='hidden md:flex bg-white rounded-3xl lg:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
            {/* list link */}
            <div className="flex-1 flex items-center justify-between flex-wrap">
            <Link to="/post" className="bg-emerald-600 text-white rounded-full px-4 py-2">Main Post</Link>
            <Link to="/post?cat=register" className="hover:bg-emerald-200 rounded-full px-4 py-2">Register</Link>
            <Link to="/post?cat=databases" className="hover:bg-emerald-200 rounded-full px-4 py-2">Database</Link>
            <Link to="/post?cat=galery" className="hover:bg-emerald-200 rounded-full px-4 py-2">Galery</Link>
            <Link to="/post?cat=alumni" className="hover:bg-emerald-200 rounded-full px-4 py-2">Alumni</Link>
            </div>
            <span className="text-xl font-medium">|</span>
            {/* search bar page */}
            {/* <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="gray"
                >
                    <circle cx="10.5" cy="10.5" r="7.5" />
                    <line x1="16.5" y1="16.5" x2="22" y2="22" />
                </svg>
                <input type="text" placeholder="search a post..." className="bg-transparent" />
            </div> */}
            <Search/>
        </div>
    )
}

export default MainCategories
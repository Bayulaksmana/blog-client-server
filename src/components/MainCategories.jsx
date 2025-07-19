import { Link } from "react-router"
import Search from "./Search"

const MainCategories = () => {
    return (
        <div className='hidden md:flex bg-white rounded-3xl lg:rounded-full p-4 shadow-lg items-center justify-center gap-8'>
            {/* list link */}
            <div className="flex-1 flex items-center justify-between flex-wrap">
                <Link to="/" className="bg-emerald-600 text-white rounded-full px-4 py-2">Main Post</Link>
                <Link to="/pendaftaran" className="hover:bg-emerald-200 rounded-full px-4 py-2">Register</Link>
                <Link to="/database" className="hover:bg-emerald-200 rounded-full px-4 py-2">Database</Link>
                <Link to="/galery" className="hover:bg-emerald-200 rounded-full px-4 py-2">Galery</Link>
                <Link to="/alumni" className="hover:bg-emerald-200 rounded-full px-4 py-2">Alumni</Link>
            </div>
            <span className="text-xl font-medium">|</span>
            <Search />
        </div>
    )
}

export default MainCategories
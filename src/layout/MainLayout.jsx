import { Outlet } from "react-router"
import Navbar from "../components/Navbar"


const MainLayout = () => {

    return (
        <div className='relative px-4 sm:px-16 md:px-20 lg:px-24 xl:px-32 2xl:px-36'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default MainLayout
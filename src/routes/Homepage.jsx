import { Link } from "react-router"
import MainCategories from "../components/MainCategories"
import FeaturedPosts from "../components/FeaturedPosts"
import PostList from "../components/PostList"
import Noted from "../components/Noted"
import MainPicture from "../components/MainPicture"
import ListUniversitas from "../components/ListUniversitas"

const Homepage = () => {
    return (
        <div className='flex flex-col gap-4'>
            {/* start section for components breadcrumb  */}
            <Noted link="/write" title="Write" page="Essai & Articles" />
            {/* start section for components introduction  */}
            <div className="flex items-center justify-between">
                {/* titles */}
                <div className="">
                    <h1 className="text-gray-800 text-xl text-justify md:text-left md:text-4xl lg:text-5xl font-bold tracking-wide">Keluarga Pelajar Mahasiswa Indonesia Bolaang Mongondow Raya (KPMIBM-R)</h1>
                    <p className="mt-5 text-sm md:text-xl">Falsafah mongondow : keluhuran budi dan spirit kolektif  ~ Mototompiaan, Mototabian, bo Mototanoban </p>
                </div>
                {/* Animation Button */}
                <Link to="write" className="hidden md:flex relative">
                    <svg
                        viewBox="0 0 200 200"
                        width="200"
                        height="200"
                        className="text-lg tracking-widest animate-spin animatedButton"
                    >
                        <path id="circlePath" fill="none" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                        <text className="font-myfont text-2xl tracking-widest">
                            <textPath href="#circlePath" startOffset="50%">Dega nion don •</textPath>
                            <textPath href="#circlePath" startOffset="0%">Write your story •</textPath>
                        </text>
                    </svg>
                    <button type="button" className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center">
                        <img src="/logo/logo-utama-besar.png" alt="Logo create cerita" />
                    </button>
                </Link>
            </div>
            {/* start section for components link categories  */}
            <MainCategories />
            {/* start section for components main pictures  */}
            <MainPicture />
            <h1 className="font-myfont my-8 text-gray-600 text-4xl uppercase">Featured Post</h1>
            <FeaturedPosts />
            {/* Section for components featured list  */}
            <ListUniversitas />
            {/* Section for components post list  */}
            <div className="">
                <h1 className="font-myfont my-8 text-4xl text-gray-600 uppercase">Recent Post</h1>
                <PostList />
            </div>
            {/* Section for components registered people  */}
            {/* Section for components message boot whatsapp */}
            {/* Section for components footer and copyright */}
        </div>
    )
}

export default Homepage
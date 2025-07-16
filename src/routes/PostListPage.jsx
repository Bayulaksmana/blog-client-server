import { useState } from "react"
import PostList from "../components/PostList"
import SideMenu from "../components/SideMenu"
import Noted from "../components/Noted"

const PostListPage = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className='mt-4'>
            <Noted link="/write" title="Write" page="Tracing Post & Note Your Favorite" />
            <h1 className="mb-8 text-2xl mt-4"></h1>
            <button onClick={() => setOpen((prev) => !prev)} className="bg-emerald-600 sm:hidden text-sm px-4 py-2 text-white rounded-xl mb-6">
                {open ? "close" : "Filter or Search"}
            </button>
            <div className="flex flex-col gap-8 sm:flex-row">
                {/* post by category */}
                <div className="w-full">
                    <PostList />
                </div>
                {/* filter category */}
                <div className={`${open ? "block" : "hidden"} sm:block`}>
                    <SideMenu />
                </div>
            </div>
        </div>
    )
}

export default PostListPage
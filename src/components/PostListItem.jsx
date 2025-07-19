import { Link } from "react-router"
import Image from "./Image"
import { format } from "timeago.js"
import { FcAlarmClock, FcVoicePresentation } from "react-icons/fc"

export const PostListItem = ({ post }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* image */}
            {post.img && <div className="md:hidden xl:block sm:w-full xl:w-1/3 relative w-full h-64">
                <Image src={post.img} className="rounded-2xl shadow-lg object-cover h-full w-full" />
            </div>}
            {/* details */}
            <div className="flex flex-col gap-2 justify-between xl:w-2/3">
                <Link to={`/${post.slug}`} className="text-3xl md:text-4xl font-semibold">{post.title}</Link>
                <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                    <span className="">Created by.</span>
                    <Link className="text-blue-800 font-medium uppercase" to={`/posts?author=${post.user.username}`}>{post.user?.username}</Link>
                    <span className="">on</span>
                    <Link className="text-blue-800 font-medium uppercase" to={`/posts?cat=${post.category}`}>{post.category}</Link>
                    <span className="flex items-center gap-2"><FcAlarmClock />{format(post.createdAt)}</span>
                    <span className="text-gray-500 flex items-center"><FcVoicePresentation />&nbsp;{post.visit}&nbsp;<span className="text-xs">visitor</span></span>
                </div>
                <p className="text-justify">{post.desc}</p>
                <Link to={`/${post.slug}`} className="text-blue-800 underline">Read more</Link>
            </div>
        </div>
    )
}

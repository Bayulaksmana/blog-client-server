import { Link } from "react-router"
import Image from "./Image"
import { format } from "timeago.js"

export const PostListItem = ({ post }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* image */}
            {post.img && <div className="md:hidden xl:block sm:w-full xl:w-1/3">
                <Image src={post.img} className="rounded-2xl shadow-lg object-cover" w="500" />
            </div>}
            {/* details */}
            <div className="flex flex-col gap-2 justify-between xl:w-2/3">
                <Link to={`/${post.slug}`} className="text-3xl md:text-4xl font-semibold">{post.title}</Link>
                <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
                    <span className="">Created by.</span>
                    <Link className="text-blue-800 font-medium" to={`/posts?author=${post.user.username}`}>{post.user?.username}</Link>
                    <span className="">on</span>
                    <Link className="text-blue-800 font-medium" to={`/posts?cat=${post.category}`}>{post.category}</Link>
                    <span className="">{format(post.createdAt)}</span>
                </div>
                <p className="text-justify">{post.desc}</p>
                <Link to={`/${post.slug}`} className="text-blue-800 underline">Read more</Link>
            </div>
        </div>
    )
}

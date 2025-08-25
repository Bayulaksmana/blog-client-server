import { Link } from "react-router"
import Image from "./Image"
import { format } from "timeago.js"

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
                <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm justify-between sm:justify-start">
                    <span className="">Author :</span>
                    <Link className="text-blue-800 font-medium uppercase" to={`/posts?author=${post.user.username}`}>{post.user?.username}</Link>
                    <span className="">on</span>
                    <Link className="text-blue-800 font-medium uppercase" to={`/posts?cat=${post.category}`}>{post.category}</Link>
                        <span className="flex items-center gap-2">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5" />
                        </svg>

                            {format(post.createdAt)}</span>
                    <div className="hidden sm:block">
                        <span className="text-gray-500 flex items-center">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>

                            &nbsp;{post.visit}&nbsp;<span className="text-xs">visitor</span></span>
                    </div>
                </div>
                <p className="text-justify">{post.desc}</p>
                <Link to={`/${post.slug}`} className="text-blue-800 underline">Read more</Link>
            </div>
        </div>
    )
}

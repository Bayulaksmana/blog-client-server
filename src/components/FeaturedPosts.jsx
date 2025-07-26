import { Link } from "react-router"
import Image from "./Image"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";


const fetchPost = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BE}/posts?featured=true&limit=4`);
    return res.data;
};
const FeaturedPosts = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["featuredPosts"],
        queryFn: () => fetchPost(),
    });
    if (isPending) return "loading...";
    if (error) return "Otorisasi Server..." + error.message;
    const posts = data.posts
    if (!posts || posts.length === 0) { return }
    return (
        <div className='flex flex-col md:flex-row gap-8'>
            {/* first post - left section */}
            <div className="w-full lg:w-1/2 flex flex-col gap-2">
                {/* image */}
                <div className="relative rounded-md w-full h-96">
                    {posts[0].img && <Image src={posts[0].img} className="rounded-3xl shadow-lg object-cover w-full h-full" />}
                </div>
                {/* details */}
                <div className="flex items-center gap-2 mt-4 lg:text-md ">
                    <h1 className="font-medium flex items-center">01.&nbsp;
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z" />
                        </svg>
                        <Link className="text-blue-800 font-medium uppercase" to={`/posts?author=${posts[0].user.username}`}>{posts[0].user?.username}</Link></h1>
                    <span>on</span>
                    <Link className="text-blue-800 uppercase" to={`/posts?cat=${posts[0].category}`}>{posts[0].category}</Link>
                    <span className="text-gray-500 flex items-center">
                        <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5" />
                        </svg>
                        &nbsp;{format(posts[0].createdAt)}</span>
                    <div className="hidden sm:block">
                        <span className="text-gray-500 flex items-center">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            &nbsp;{posts[0].visit}&nbsp;<span className="text-xs">visitor</span></span>
                    </div>
                </div>
                {/* title */}
                <Link to={posts[0].slug} className="text-xl lg:text-3xl font-bold lg:font-bold">{posts[0].title}</Link>
                <span className="text-justify">{posts[0].desc}</span>
            </div>
            {/*secondary post - right section */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                {/* image small one */}
                {posts[1] && <div className="md:h-1/3 flex justify-between gap-4">
                    {/* image on */}
                    {posts[1].img && <div className="w-1/3 aspect-video lg:block hidden relative size-56">
                        <Image src={posts[1].img} className="rounded-3xl object-cover h-full w-full" />
                    </div>}
                    {/* details */}
                    <div className="lg:w-2/3 w-full flex flex-col">
                        <div className="flex items-center gap-2 text-sm sm:text-xs md:text-[9px] lg:text-sm 2xl:text-md lg:mb-2 justify-between">
                            <h1 className="font-medium">02.&nbsp;<Link className="text-blue-800 font-medium uppercase" to={`/posts?author=${posts[1].user.username}`}>{posts[1].user?.username}</Link></h1>
                            <span>on</span>
                            <Link className="text-blue-800 uppercase" to={`/posts?cat=${posts[1].category}`}>{posts[1].category}</Link>
                            <span className="text-gray-500 flex items-center">
                                <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5" />
                                </svg>
                                &nbsp;{format(posts[1].createdAt)}</span>
                        </div>
                        {/* title */}
                        <Link to={posts[1].slug} className="text-base sm:text-lg md:text-sm lg:text-lg font-semibold">{posts[1].title}</Link>
                        <span className="text-justify">{posts[1].desc}</span>
                    </div>
                </div>}
                {/* image small two */}
                {posts[2] && <div className="md:h-1/3 flex justify-between gap-4 mt-4">
                    {/* image on */}
                    {posts[2].img && <div className="w-1/3 aspect-video lg:block hidden relativ size-56">
                        <Image src={posts[2].img} className="rounded-3xl object-cover h-full w-full" />
                    </div>}
                    {/* details */}
                    <div className="lg:w-2/3 w-full flex flex-col">
                        <div className="flex items-center gap-2 text-sm sm:text-xs md:text-[9px] lg:text-sm 2xl:text-md lg:mb-2 justify-between">
                            <h1 className="font-medium">03.&nbsp;<Link className="text-blue-800 font-medium uppercase" to={`/posts?author=${posts[2].user.username}`}>{posts[2].user?.username}</Link></h1>
                            <span>on</span>
                            <Link className="text-blue-800 uppercase" to={`/posts?cat=${posts[2].category}`}>{posts[2].category}</Link>
                            <span className="text-gray-500 flex items-center">
                                <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5" />
                                </svg>
                                &nbsp;{format(posts[2].createdAt)}</span>
                        </div>
                        {/* title */}
                        <Link to={posts[2].slug} className="text-base sm:text-lg md:text-sm lg:text-lg font-semibold">{posts[2].title}</Link>
                        <span className="text-justify">{posts[2].desc}</span>
                    </div>
                </div>}
                {/* image small three */}
                {posts[3] && <div className="md:h-1/3 flex justify-between gap-4">
                    {/* image on */}
                    {posts[3].img && <div className="w-1/3 aspect-video lg:block hidden relative size-56">
                        <Image src={posts[3].img} className="rounded-3xl object-cover h-full w-full" />
                    </div>}
                    {/* details */}
                    <div className="lg:w-2/3 w-full flex flex-col">
                        <div className="flex items-center gap-2 text-sm sm:text-xs md:text-[9px] lg:text-sm 2xl:text-md lg:mb-2 justify-between">
                            <h1 className="font-medium">04.&nbsp;<Link className="text-blue-800 font-medium uppercase" to={`/posts?author=${posts[3].user.username}`}>{posts[3].user?.username}</Link></h1>
                            <span>on</span>
                            <Link className="text-blue-800 uppercase" to={`/posts?cat=${posts[3].category}`}>{posts[3].category}</Link>
                            <span className="text-gray-500 flex items-center">
                                <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M3.22302 14C4.13247 18.008 7.71683 21 12 21c4.9706 0 9-4.0294 9-9 0-4.97056-4.0294-9-9-9-3.72916 0-6.92858 2.26806-8.29409 5.5M7 9H3V5" />
                                </svg>
                                &nbsp;{format(posts[3].createdAt)}</span>
                        </div>
                        {/* title */}
                        <Link to={posts[3].slug} className="text-base sm:text-lg md:text-sm lg:text-lg font-semibold">{posts[3].title}</Link>
                        <span className="text-justify">{posts[3].desc}</span>
                    </div>
                </div>}
            </div>
        </div >
    )
}

export default FeaturedPosts
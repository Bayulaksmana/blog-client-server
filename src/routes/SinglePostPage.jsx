import { Link, useParams } from "react-router";
import Image from "../components/Image";
import PostMenuAction from "../components/PostMenuAction";
import Search from "../components/Search";
import Comments from "../components/coments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js"

const fetchPosts = async (slug) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BE}/posts/${slug}`);
    return res.data;
};
const SinglePostList = () => {
    const { slug } = useParams()
    const { isPending, error, data } = useQuery({
        queryKey: ["posts", slug],
        queryFn: () => fetchPosts(slug)
    })
    if (isPending) return "loading..."
    if (error) return "Otorisasi Server..." + error.message
    if (!data) return "Data Tidak Tersedia..."
    return (
        <div className="flex flex-col gap-8">
            {/* detail */}
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-4/6 lg:w-4/6 xl:w-4/6 flex flex-col gap-8">
                    <h1 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mt-6 mr-8 text-center lg:text-justify">{data.title}</h1>
                    <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm -mt-4 -mb-4">
                        <span className="hidden md:block">Created by.</span>
                        <Link className="text-blue-800 font-medium">{data.user?.username}</Link>
                        <span className="">on</span>
                        <Link className="text-blue-800 font-medium">{data.category}</Link>
                        <span className="">{format(data.createdAt)}</span>
                    </div>
                    <p className="text-gray-500 font-medium text-justify mr-8">{data.desc}</p>
                </div>
                {data.img && <div className="md:w-2/6 lg:w-2/6 xl:w-2/6">
                    <Image src={data.img} w="600" className="rounded-2xl" />
                </div>}
            </div>
            {/* content */}
            <div className="flex flex-col md:flex-row gap-8">
                {/* text */}
                <div className="w-full lg:text-lg flex flex-col gap-6 text-justify">
                    <p className="text-black font-medium tracking-widest" dangerouslySetInnerHTML={{ __html: data.content }} ></p>
                </div>
                {/* menu */}
                <div className="px-4 w-min h-max sticky top-4">
                    <h1 className="mb-4 text-sm font-medium">Author Details</h1>
                    <div className=" flex items-center">
                        {data.user?.image && <img src={data.user?.image} className="w-12 h-full rounded-full object-cover" />}
                        <div className="flex flex-col px-3">
                            <Link className="text-md font-medium text-blue-800">{data.user.username}</Link>
                            <span className="text-xs text-gray-600 italic" >{data.user.email}</span>
                        </div>
                    </div>
                    <p className="text-gray-600 font-medium mb-2 mt-2 text-justify">Seutas tali dikaitkan mata kail, setiap ikan yang didapat pasti jual dengan harga jauh dari layak</p>
                    <div className="flex gap-2">
                        <Link>
                            <Image src="facebook.svg" />
                        </Link>
                        <Link>
                            <Image src="instagram.svg" />
                        </Link>
                    </div>
                    <Link>
                        <PostMenuAction post={data} />
                    </Link>
                    <h1 className="mt-2 mb-4 text-sm font-medium">Categories</h1>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link className="underline">All</Link>
                        <Link className="underline" to="/">Essai</Link>
                        <Link className="underline" to="/">Filsafat</Link>
                        <Link className="underline" to="/">Sejarah</Link>
                        <Link className="underline" to="/">Technology</Link>
                        <Link className="underline" to="/">Budaya</Link>
                    </div>
                    <h1 className="mt-4 mb-4 text-sm font-medium">Search</h1>
                    <Search />
                </div>
            </div>
            <Comments postId={data._id} />
        </div>
    );
};
export default SinglePostList;

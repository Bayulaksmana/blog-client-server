import { Link, useParams } from "react-router";
import Image from "../components/Image";
import PostMenuAction from "../components/PostMenuAction";
import Search from "../components/Search";
import Comments from "../components/Coments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js"
import Noted from "../components/Noted";
import AnimationWrapper from "@/components/common/page-animation";

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

    const getShareUrl = () => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(data?.title || "");
        return {
            whatsapp: `https://wa.me/?text=${title}%0A${url}`,
            twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        };
    };
    return (
        <AnimationWrapper>
            <div className="flex flex-col gap-8">
                <Noted link="/write" title="Write" page="Creator & Writer" />
                {/* detail */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-4/6 lg:w-4/6 xl:w-4/6 flex flex-col gap-8 w-full">
                        <h1 className="text-2xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mt-6 mr-8 text-center lg:text-justify w-full">{data.title}</h1>
                        <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-sm -mt-4 -mb-4 w-full">
                            <span className="hidden md:block">Created by.</span>
                            <Link className="text-blue-800 font-medium uppercase">{data.user?.username}</Link>
                            <span className="">on</span>
                            <Link className="text-blue-800 font-medium uppercase">{data.category}</Link>
                            <span className="">{format(data.createdAt)}</span>
                        </div>
                        <p className="text-gray-500 font-medium text-justify mr-8 w-full">PROLOG ~ &quot;{data.desc}&quot; ~</p>
                    </div>
                    {data.img && <div className="md:w-2/6 lg:w-2/6 xl:w-2/6 lg:flex lg:justify-end lg:h-80">
                        <Image src={data.img} w="350" className="rounded-2xl w-full" />
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
                        <div className="flex gap-2 mt-2">
                            <a href={getShareUrl().facebook} target="_blank" rel="noopener noreferrer" title="Share to Facebook">
                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
                                </svg>

                            </a>
                            <a href={getShareUrl().twitter} target="_blank" rel="noopener noreferrer" title="Share to X">
                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z" clipRule="evenodd" />
                                </svg>

                            </a>
                            <a href={getShareUrl().whatsapp} target="_blank" rel="noopener noreferrer" title="Share to WhatsApp">
                                <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill="currentColor" fillRule="evenodd" d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z" clipRule="evenodd" />
                                    <path fill="currentColor" d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z" />
                                </svg>

                            </a>
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
        </AnimationWrapper>
    );
};
export default SinglePostList;

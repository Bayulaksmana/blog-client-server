import { useAuth, useUser } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

const PostMenuAction = ({ post }) => {
    const { user } = useUser()
    const { getToken } = useAuth()
    const navigate = useNavigate()
    const [showConfirm, setShowConfirm] = useState(false);


    const { isPending, error, data: savedPosts } = useQuery({
        queryKey: ["savedPosts"],
        queryFn: async () => {
            const token = await getToken()
            return axios.get(`${import.meta.env.VITE_API_URL_BE}/users/saved`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
    })
    const isAdmin = user?.publicMetadata?.role === "admin" || false
    const isSaved = savedPosts?.data?.some((p) => p === post._id) || false
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken()
            return axios.delete(`${import.meta.env.VITE_API_URL_BE}/posts/${post._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        },
        onSuccess: () => {
            toast.success("Post Deleted Successfully 👌")
            navigate("/")
        },
        onError: (error) => {
            toast.error(error.response.data)
        }
    })
    const queryClient = useQueryClient()
    const saveMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken()
            return axios.patch(`${import.meta.env.VITE_API_URL_BE}/users/save`,
                {
                    postId: post._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["savedPosts"] })
        },
        onError: (error) => {
            toast.error(error.response.data)
        }
    })
    const featureMutation = useMutation({
        mutationFn: async () => {
            const token = await getToken()
            return axios.patch(`${import.meta.env.VITE_API_URL_BE}/posts/feature`,
                {
                    postId: post._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", post.slug] })
            toast.success("Featured up to homepage 👌")
        },
        onError: (error) => {
            toast.error(error.response.data)
        }
    })
    const handleDelete = () => {
        deleteMutation.mutate()
    }
    const handleFeature = () => {
        featureMutation.mutate()
    }
    const handleSave = () => {
        if (!user) {
            return navigate("/login")
        }
        saveMutation.mutate()
    }
    return (
        <div className=''>
            <h1 className="mt-4 mb-2 text-sm font-medium">Action</h1>
            {isPending ? ("Loading...") : error ? ("You must be login!") :
                (
                    <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleSave}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30" height="30">
                            <path
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"
                                d="M12 4C10.3 4 9 5.3 9 7v34l15-9 15 9V7c0-1.7-1.3-3-3-3H12z"
                                stroke="black"
                                fill={saveMutation.isPending ? isSaved ? "none" : "blue" : isSaved ? "blue" : "none"}
                            />
                        </svg>
                        <span className="font-bold tracking-widest text-slate-700">Save This Post</span>
                        {saveMutation.isPending && <span className="text-xs">(In Progres)</span>}
                    </div>
                )
            }
            {isAdmin &&
                (<div className="-mx-0.5 flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={handleFeature}>
                    <svg
                        fill="#000000"
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        id="file-favorite-6"
                        data-name="Line Color"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon line-color">
                        <path
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            id="secondary"
                            d="M5.76,16.3,3,16.67l2,1.8L4.53,21,7,19.8,9.47,21,9,18.47l2-1.8L8.24,16.3,7,14ZM17,13H11m6-4H11"
                            style={{ fill: "none", stroke: "rgb(44, 169, 188)" }}
                            fill={featureMutation.isPending
                                ? post.isFeature
                                    ? "none"
                                    : "green"
                                : post.isFeature
                                    ? "green"
                                    : "none"}
                        >
                        </path>
                        <path
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            id="primary"
                            d="M7,10V4A1,1,0,0,1,8,3h9l4,4V20a1,1,0,0,1-1,1H14"
                            style={{ fill: "none", stroke: "rgb(0, 0, 0)" }}
                            fill={featureMutation.isPending
                                ? post.isFeature
                                    ? "green"
                                    : "none"
                                : post.isFeature
                                    ? "none"
                                    : "green"}
                        >
                        </path>
                    </svg>
                    <span className="font-bold tracking-widest text-slate-700">Feature This Post</span>
                    {featureMutation.isPending && <span className="text-xs">(In Progres)</span>}
                </div>)
            }
            {user && (post.user.username === user.username || isAdmin) && <div className="flex items-center gap-2 py-2 text-sm cursor-pointer mx-1" onClick={() => navigate(`/edit/${post._id}`)} >
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                </svg>
                <span className="font-bold tracking-widest text-slate-700">Edit This Post</span>
                {deleteMutation.isPending && <span className="text-xs">(In Progress)</span>}
            </div>}
            {user && (post.user.username === user.username || isAdmin) &&
                <div className="flex items-center gap-2 py-2 text-sm cursor-pointer" onClick={() => setShowConfirm(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50" fill="red">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M 21 2 C 19.354545 2 18 3.3545455 18 5 L 18 7 L 10.154297 7 A 1.0001 1.0001 0 0 0 9.984375 6.9863281 A 1.0001 1.0001 0 0 0 9.8398438 7 L 8 7 A 1.0001 1.0001 0 1 0 8 9 L 9 9 L 9 45 C 9 46.645455 10.354545 48 12 48 L 38 48 C 39.645455 48 41 46.645455 41 45 L 41 9 L 42 9 A 1.0001 1.0001 0 1 0 42 7 L 40.167969 7 A 1.0001 1.0001 0 0 0 39.841797 7 L 32 7 L 32 5 C 32 3.3545455 30.645455 2 29 2 L 21 2 z M 21 4 L 29 4 C 29.554545 4 30 4.4454545 30 5 L 30 7 L 20 7 L 20 5 C 20 4.4454545 20.445455 4 21 4 z M 11 9 L 18.832031 9 A 1.0001 1.0001 0 0 0 19.158203 9 L 30.832031 9 A 1.0001 1.0001 0 0 0 31.158203 9 L 39 9 L 39 45 C 39 45.554545 38.554545 46 38 46 L 12 46 C 11.445455 46 11 45.554545 11 45 L 11 9 z M 18.984375 13.986328 A 1.0001 1.0001 0 0 0 18 15 L 18 40 A 1.0001 1.0001 0 1 0 20 40 L 20 15 A 1.0001 1.0001 0 0 0 18.984375 13.986328 z M 24.984375 13.986328 A 1.0001 1.0001 0 0 0 24 15 L 24 40 A 1.0001 1.0001 0 1 0 26 40 L 26 15 A 1.0001 1.0001 0 0 0 24.984375 13.986328 z M 30.984375 13.986328 A 1.0001 1.0001 0 0 0 30 15 L 30 40 A 1.0001 1.0001 0 1 0 32 40 L 32 15 A 1.0001 1.0001 0 0 0 30.984375 13.986328 z"></path>
                    </svg>
                    <span className="text-red-600 font-bold tracking-widest">Delete This Post</span>
                    {deleteMutation.isPending && <span className="text-xs">(In Progress)</span>}
                </div>
            }
            {showConfirm && (
                <div className="sm:fixed inset-0 bg-black/30 flex items-center sm:justify-center z-50">
                    <div className="bg-white mx-1 p-6 rounded-xl shadow-xl max-w-sm md:max-w-md md:w-full text-center md:space-y-4 bg-transparent">
                        <h2 className="text-lg font-semibold text-gray-800">Are you sure?</h2>
                        <p className="text-sm text-gray-500">This action cannot be undone. Do you really want to delete this post?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition font-semibold"
                            >
                                Yes, Delete
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostMenuAction
import { format } from "timeago.js"
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

const fetchComments = async (postId) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BE}/comments/${postId}`);
    return res.data;
};

export const Comments = ({ postId }) => {
    const { user } = useUser()
    const { getToken } = useAuth()
    const { isPending, error, data } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => fetchComments(postId)
    })

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (newComment) => {
            const token = await getToken()
            return axios.post(`${import.meta.env.VITE_API_URL_BE}/comments/${postId}`, newComment, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] })
        },
        onError: (error) => {
            toast.error(error.response.data)
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = { desc: formData.get("desc") }
        mutation.mutate(data)
    }

    return (
        <div className="flex gap-6 justify-beetwen">
            <div className='flex flex-col gap-8 w-full lg:w-3/5 mb-6'>
                <h1 className="font-myfont text-3xl text-gray-500 underline uppercase">Comments</h1>
                <form onSubmit={handleSubmit} className="flex justify-between items-center gap-2 w-full">
                    <textarea name="desc" placeholder="Write a comments..." className="w-full p-4 rounded-xl" />
                    <button className="bg-emerald-700 hover:bg-emerald-500 px-4 py-3 text-white rounded-2xl font-medium">
                        Send
                    </button>
                </form>
                {isPending ? ("loading...") : error ? ("Error Load Data") :
                    (
                        <>
                            {mutation.isPending && (
                                <Comment
                                    comment={{
                                        desc: `${mutation.variables.desc} (Sending...)`,
                                        createdAt: new Date(),
                                        user: {
                                            image: user.imageUrl,
                                            username: user.username,
                                        }
                                    }}
                                />
                            )}
                            {data?.map((comment) => (
                                <Comment key={comment?._id} comment={comment} postId={postId} />
                            ))}
                        </>
                    )
                }
            </div>
            {/* <div className='flex flex-col gap-8 lg:w-1.5/5 mb-6 stick mx-auto'>
                <h1 className="text-xl text-gray-500 underline text-end">Daftar Alumni</h1>
                <div onSubmit={handleSubmit} className="flex justify-between items-center gap-2 w-full">
                    <textarea name="desc" placeholder="Write a comments..." className="w-full p-4 rounded-xl" />
                    <button className="bg-emerald-700 hover:bg-emerald-500 px-4 py-3 text-white rounded-2xl font-medium">
                        Send
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export const Comment = ({ comment, postId }) => {
    const { user } = useUser()
    const { getToken } = useAuth()
    const role = user?.publicMetadata?.role
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async () => {
            const token = await getToken()
            return axios.delete(`${import.meta.env.VITE_API_URL_BE}/comments/${comment._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] })
            toast.success("Comment Deleted Successfuly 👌")
        },
        onError: (error) => {
            toast.error(error.response.data)
        }
    });

    return (
        <div className="p-4 bg-slate-50 rounded-xl">
            <div className="flex items-center gap-4">
                {comment.user.image && <img
                    src={comment.user.image}
                    className="w-10 h-10 rounded-full object-cover"
                />}
                <span className="font-medium">{comment.user.username}</span>
                <span className="text-sm to-gray-500">{format(comment.createdAt)}</span>
                {user &&
                    (comment.user.username === user.username || role === "admin") &&
                    (
                        <span className="text-xs text-red-500 hover:text-red-800 cursor-pointer" onClick={() => mutation.mutate()}>
                            delete
                            {mutation.isPending && <span>(In Progress)</span>}
                        </span>
                    )
                }
            </div>
            <div className="mt-4">
                <p>{comment.desc}</p>
            </div>
        </div>
    )
}


export default Comments


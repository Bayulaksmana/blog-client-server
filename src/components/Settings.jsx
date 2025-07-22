import { useMutation } from "@tanstack/react-query";
import Noted from "./Noted"
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useState } from "react";
import Upload from "./Upload";
import Image from "./Image";
import { useRef } from "react";



const Settings = () => {
    const [cover, setCover] = useState("")
    const [setPreviewUrl, setShowPreview] = useState("")
    const [desc, setDesc] = useState("");
    const [progress, setProgress] = useState(0)
    const { getToken } = useAuth()
    const formRef = useRef(null);
    const maxDescription = 200;
    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken()
            return axios.post(`${import.meta.env.VITE_API_URL_BE}/daerah`, newPost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        },
        onSuccess: (res) => {
            console.log("Success:", res.data);
            toast.success("Your Carousel Has Posted 💾");
            setCover("");
            setDesc("");
            setProgress(0);
            setShowPreview("");
            if (formRef.current) formRef.current.reset();
        },
        onError: (err) => {
            console.error("Error posting carousel:", err);
            toast.error("Failed to post carousel.");
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = {
            img: cover.filePath || "",
            title: formData.get("title"),
            total: formData.get("total"),
            description: formData.get("description"),
        }
        if (!cover?.filePath) return toast.error("Cover image is required!");
        mutation.mutate(data)
        console.log(data)
    }
    return (
        <div className=''>
            <Noted link="/" title="Home" page="General Settings" />
            <div className="w-full mt-4 px-4 py-4 flex justify-center gap-4">
                <div className="w-3/5 bg-slate-400">l</div>
                <div className="w-2/5 p-4 border-black border rounded-xl">
                    <h1 className="text-center font-myfont text-2xl border-b-2 border-black">Change Carousel Image</h1>
                    <form ref={formRef} onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center">
                            <button type="button" className="w-max mt-2 p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white font-medium">
                                <Upload type="image" setProgress={setProgress} setData={setCover}>
                                    Add Carousel
                                </Upload>
                            </button>
                            <div className="mt-2">
                                <input
                                    name="title"
                                    type="text"
                                    placeholder="Enter Your Name District"
                                    className="w-full text-xl font-semibold bg-transparent outline-none"
                                />
                            </div>
                            {cover.filePath && (
                                <Image
                                    src={cover.filePath}
                                    alt="Cover Preview"
                                    onClick={() => {
                                        setPreviewUrl(cover.filePath);
                                        setShowPreview(true);
                                    }}
                                    className="w-9 h-9 mt-2 object-cover justify-center items-center rounded-xl shadow-md border cursor-pointer"
                                />
                            )}
                        </div>
                        <div className="w-full">
                            <textarea name="description" placeholder="A description people study"
                                maxLength={maxDescription}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="p-4 w-full rounded-xl bg-white shadow-xl font-medium text-gray-500 overflow-y-hidden"
                            />
                            <p className="text-sm text-gray-400 text-end">
                                {desc.length}/{maxDescription} characters
                            </p>
                            <input name="total" placeholder="Student Total"
                                className="p-2 rounded-xl bg-white shadow-xl font-medium text-gray-500 -mt-5"
                            />
                            <button disabled={mutation.isPending && (0 > progress && progress < 100)} className="text-white -mt-7 mx-2 bg-emerald-600 hover:bg-emerald-500 text-xs p-2 rounded-xl w-max disabled:bg-emerald-500 disabled:cursor-not-allowed">
                                {mutation.isPending ? "Loading..." : "Post"}
                                {" " + progress + "%"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Settings

import { useAuth, useUser } from "@clerk/clerk-react"
import LoginPage from "./LoginPage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
import { Editor } from '@tinymce/tinymce-react';
import Noted from "../components/Noted";
import Image from "../components/Image";
import { UserContext } from "@/common/context";


const Write = () => {
    const { isLoaded, isSignedIn } = useUser();
    const [value, setValue] = useState("")
    const [cover, setCover] = useState("")
    const [progress, setProgress] = useState(0)
    const [desc, setDesc] = useState("");
    const [showPreview, setShowPreview] = useState(false);
    const [previewUrl, setPreviewUrl] = useState("");
    const navigate = useNavigate()
    const maxDescription = 400
    const { getToken } = useAuth();
    let { userAuth: { access_token } } = useContext(UserContext)

    const tokenId = async () => {
        // Clerk Token
        try {
            const clerkToken = await getToken();
            if (clerkToken) return clerkToken;
        } catch (err) {
            console.error("Failed to get Clerk token", err);
        }
        // Firebase Token (jika access_token adalah string)
        if (access_token) return access_token;
        throw new Error("No valid auth token available");
    }

    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const token = await tokenId()
            return axios.post(`${import.meta.env.VITE_API_URL_BE}/posts`, newPost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        },
        onSuccess: (res) => {
            toast.success("Your Story Has Been Save 💾")
            navigate(`/${res.data.slug}`)
        },
    });

    if (!isLoaded) {
        return <div className="">Loading ...</div>
    }
    if (isLoaded && !isSignedIn && !access_token) {
        return <div className="flex flex-col gap-4">
            <h1 className="font-medium text-2xl text-center -mb-12 ">You must be login!</h1>
            <LoginPage />
        </div>
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = {
            img: cover.filePath || "",
            title: formData.get("title"),
            category: formData.get("category"),
            desc: formData.get("desc"),
            content: value,
        }
        if (!cover?.filePath) return toast.error("Cover image is required!");
        mutation.mutate(data)
    }

    return (
        <div className='relative h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-2 mt-4'>
            <Noted link="/" title="Home" page="Created Your Best Story" />
            <h1 className="text-xl font-medium text-center text-gray-500 mt-4">Create a New Post</h1>
            <form onSubmit={handleSubmit} action="" className="flex flex-col gap-3 flex-1 mb-4">
                <div className="flex gap-2">
                    <button type="button" className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white font-medium">
                        <Upload type="image" setProgress={setProgress} setData={setCover}>
                            Add a cover image
                        </Upload>
                    </button>
                    {cover.filePath && (
                        <div className="flex items-center gap-4">
                            <Image
                                src={cover.filePath}
                                alt="Cover Preview"
                                onClick={() => {
                                    setPreviewUrl(cover.filePath);
                                    setShowPreview(true);
                                }}
                                className="w-8 h-8 object-cover justify-center items-center rounded-xl shadow-md border cursor-pointer"
                            />
                        </div>
                    )}
                </div>
                <input
                    name="title"
                    type="text"
                    placeholder="Enter Your Great Title"
                    className="w-max lg:w-full text-2xl md:text-3xl font-semibold bg-transparent focus:outline-none border-none"
                />
                <div className="flex items-center gap-4 ">
                    <label className="text-sm text-gray-500" htmlFor="">Choose a category:</label>
                    <select name="category" id="" className="p-2 rounded-xl bg-white shadow-xl font-medium text-gray-500 gap-3">
                        <option value="-">select</option>
                        <option value="filsafat">Filsafat</option>
                        <option value="budaya">Budaya</option>
                        <option value="essai">Essai</option>
                        <option value="sejarah">Sejarah</option>
                    </select>
                </div>
                <textarea name="desc" placeholder="A short description"
                    maxLength={maxDescription}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="p-4 rounded-xl bg-white shadow-xl font-medium text-gray-500 overflow-y-hidden"
                />
                <p className="text-sm text-gray-400 text-end -mt-2">
                    {desc.length}/{maxDescription} characters
                </p>
                <div className="w-full">
                    <Editor
                        apiKey='ih2jrrv0v85b0hyexn6e0sxrh3bvsf4djnbwrbh4ki2ad4ol'
                        value={value}
                        readOnly={0 > progress && progress < 100}
                        // onChange={setValue}
                        theme='mobile'
                        onEditorChange={(newValue) => setValue(newValue)}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins:
                                'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                            toolbar:
                                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            content_css: 'tinymce-5-dark',
                            file_picker_types: 'image',
                            file_picker_callback: (cb, value, meta) => {
                                if (meta.filetype === 'image') {
                                    const input = document.createElement('input');
                                    input.setAttribute('type', 'file');
                                    input.setAttribute('accept', 'image/*');
                                    input.click();
                                    input.onchange = async () => {
                                        const file = input.files?.[0];
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            const base64 = reader.result
                                            // Mengirim gambar sebagai Base64 Data URL
                                            cb(base64, { title: file.name });
                                        };
                                        reader.readAsDataURL(file);
                                    };
                                }
                            },
                        }}
                        initialValue="Write your the best story ***"
                    />
                </div>
                <button disabled={mutation.isPending && (0 > progress && progress < 100)} className="z-10 text-white bg-emerald-600 font-medium rounded-xl p-2 w-max px-12 disabled:bg-emerald-500 disabled:cursor-not-allowed">
                    {mutation.isPending ? "Loading..." : "Send Story"}
                </button>
                {"Progress upload : " + progress + "%"}
                {showPreview && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                        onClick={() => setShowPreview(false)}
                    >
                        <Image
                            src={previewUrl}
                            alt="Full Preview"
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg border-4 border-white"
                        />
                    </div>
                )}
            </form>
        </div>
    )
}

export default Write
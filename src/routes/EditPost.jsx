// src/pages/EditPost.jsx
import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Upload from "../components/Upload";
import { Editor } from "@tinymce/tinymce-react";
import Noted from "../components/Noted";
import Image from "../components/Image";

const EditPost = () => {
    const { id } = useParams();
    const { isLoaded, isSignedIn } = useUser();
    const [value, setValue] = useState("");
    const [cover, setCover] = useState("");
    const [progress, setProgress] = useState(0);
    const [desc, setDesc] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("-");
    // const [showPreview, setShowPreview] = useState(false);
    const [, setPreviewUrl] = useState("");
    const navigate = useNavigate();
    const { getToken } = useAuth();

    const queryClient = useQueryClient();
    const maxDescription = 400;

    // Fetch post by ID
    const { isLoading, isError, error } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_API_URL_BE}/posts/id/${id}`);
            const post = res.data;
            setTitle(post.title);
            setDesc(post.desc);
            setCategory(post.category);
            setValue(post.content);
            setCover({ filePath: post.img });
            return post;
        },
        enabled: !!id,
    });

    // Update post mutation
    const mutation = useMutation({
        mutationFn: async (updatedPost) => {
            const token = await getToken();
            return axios.patch(`${import.meta.env.VITE_API_URL_BE}/posts/id/${id}`, updatedPost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        },
        onSuccess: (res) => {
            console.log("Update success response:", res.data);
            toast.success("Your Story Has Been Updated ✍️");
            queryClient.invalidateQueries({ queryKey: ["post", id] });
            navigate(`/${res.data.slug}`);
        },
        onError: () => {
            toast.error("Failed to update post.");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return toast.error("Title is required!");
        if (!desc.trim()) return toast.error("Description is required!");
        if (category === "-") return toast.error("Please select a category!");
        if (!value.trim()) return toast.error("Content cannot be empty!");
        if (!cover?.filePath) return toast.error("Cover image is required!");

        const updatedPost = {
            img: cover.filePath,
            title,
            category,
            desc,
            content: value,
        };
        console.log("Updated payload:", updatedPost);
        mutation.mutate(updatedPost);
    };

    // State check
    if (!isLoaded) return <div>Loading...</div>;
    if (!isSignedIn) return <p>You must be signed in</p>;
    if (isLoading) return <div>Loading post data...</div>;
    if (isError) return <div className="text-red-500">Error loading post: {error.message}</div>;

    return (
        <div className="relative min-h-[100vh] flex flex-col gap-2 mt-4">
            <Noted link="/" title="Home" page="Edit Post" />
            <h1 className="text-xl font-medium text-center text-gray-500 mt-4">Update Your Post</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1 mb-4">
                <div className="flex gap-2">
                    <button type="button" className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white font-medium">
                        <Upload type="image" setProgress={setProgress} setData={setCover}>
                            Change image
                        </Upload>
                    </button>
                    {cover.filePath && (
                        <div className="flex items-center gap-4">
                            <Image
                                src={cover.filePath}
                                alt="Cover Preview"
                                onClick={() => {
                                    setPreviewUrl(cover.filePath);
                                }}
                                className="w-8 h-8 object-cover justify-center items-center rounded-xl shadow-md border cursor-pointer"
                            />
                        </div>
                    )}
                </div>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post title"
                    className="w-max md:w-full text-2xl md:text-3xl font-semibold bg-transparent outline-none"
                />

                <div className="flex items-center gap-4">
                    <label className="text-sm text-gray-500">Choose a category:</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 rounded-xl bg-white shadow-xl font-medium text-gray-500"
                    >
                        <option value="-">select</option>
                        <option value="filsafat">Filsafat</option>
                        <option value="budaya">Budaya</option>
                        <option value="essai">Essai</option>
                        <option value="sejarah">Sejarah</option>
                    </select>
                </div>

                <textarea
                    maxLength={maxDescription}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Short description"
                    className="p-4 rounded-xl bg-white shadow-xl font-medium text-gray-500"
                />
                <p className="text-sm text-gray-400 text-end -mt-2">
                    {desc.length}/{maxDescription} characters
                </p>

                <Editor
                    apiKey="ih2jrrv0v85b0hyexn6e0sxrh3bvsf4djnbwrbh4ki2ad4ol"
                    value={value}
                    readOnly={progress > 0 && progress < 100}
                    theme='mobile'
                    onEditorChange={(newValue) => setValue(newValue)}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins:
                            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                        toolbar:
                            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                        content_css: 'tinymce-5-dark',
                        file_picker_types: 'image',
                        file_picker_callback: (cb, value, meta) => {
                            if (meta.filetype === "image") {
                                const input = document.createElement("input");
                                input.setAttribute("type", "file");
                                input.setAttribute("accept", "image/*");
                                input.click();
                                input.onchange = async () => {
                                    const file = input.files?.[0];
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        cb(reader.result, { title: file.name });
                                    };
                                    reader.readAsDataURL(file);
                                };
                            }
                        },
                    }}
                />

                <button
                    type="submit"
                    disabled={mutation.isPending || (progress > 0 && progress < 100)}
                    className="text-white bg-emerald-600 font-medium rounded-xl p-2 w-max px-12 disabled:bg-emerald-500 disabled:cursor-not-allowed"
                >
                    {mutation.isPending ? "Updating..." : "Update Story"}
                </button>
                <p className="text-sm text-gray-400">
                    Upload Progress: {progress}%
                </p>
            </form>
        </div>
    );
};

export default EditPost;

import { useMutation } from "@tanstack/react-query";
import Noted from "./Noted";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useState, useEffect, useRef } from "react";
import Upload from "./Upload";
import Image from "./Image";


const Settings = () => {
    const [cover, setCover] = useState("");
    const [setPreviewUrl, setShowPreview] = useState("");
    const [desc, setDesc] = useState("");
    const [progress, setProgress] = useState(0);
    const { getToken } = useAuth();
    const formRef = useRef(null);
    const maxDescription = 300;

    const [isEditing, setIsEditing] = useState(false);
    const [carouselList, setCarouselList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);


    const fetchPosts = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL_BE}/daerah`);
        return res.data;
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchPosts();
                setCarouselList(data);
            } catch (error) {
                console.error("Failed to fetch carousel data:", error);
            }
        };
        getData();
    }, []);

    const loadEditData = (index) => {
        const item = carouselList[index];
        if (!item) return;
        setCover({ filePath: item.img });
        setDesc(item.description);
        if (formRef.current) {
            formRef.current.title.value = item.title;
            formRef.current.total.value = item.total;
            formRef.current.website.value = item.website;
        }
        setCurrentIndex(index);
        setIsEditing(true);
    };

    const mutation = useMutation({
        mutationFn: async (newPost) => {
            const token = await getToken();
            return axios.post(`${import.meta.env.VITE_API_URL_BE}/daerah`, newPost, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
        },
        onSuccess: (res) => {
            console.log("Success:", res.data);
            toast.success("Your Carousel Has Posted 💾");
            setCover("");
            setDesc("");
            setProgress(0);
            setShowPreview("");
            setIsEditing(false);
            if (formRef.current) formRef.current.reset();
        },
        onError: (err) => {
            console.error("Error posting carousel:", err);
            toast.error("Failed to post carousel.");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            img: cover.filePath || "",
            title: formData.get("title"),
            total: formData.get("total"),
            description: formData.get("description"),
            website: formData.get("website"),
        };
        if (!cover?.filePath) return toast.error("Cover image is required!");
        mutation.mutate(data);
    };
    const handleDelete = async (e) => {
        e.preventDefault()
        const data = carouselList[currentIndex];
        try {
            const token = await getToken();
            await axios.delete(`${import.meta.env.VITE_API_URL_BE}/daerah/${data._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success("Carousel deleted");
            // Refresh data
            setIsEditing(false);
            setCover("");
            setDesc("");
            setShowPreview("");
            if (formRef.current) formRef.current.reset();
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete");
        }
    };

    return (
        <div>
            <Noted link="/" title="Home" page="General Settings" />
            <div className="w-full mt-4 px-4 py-4 flex justify-center gap-4">
                <div className="w-3/5 bg-slate-400">Preview Area</div>
                <div className="w-2/5 p-4 border-black border rounded-xl">
                    <h1 className="text-center font-myfont text-2xl border-b-2 border-black">Change Carousel Image</h1>
                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                        <div className="w-full gap-2 flex flex-wrap justify-between items-center">
                            <textarea
                                name="description"
                                placeholder="A description people study"
                                maxLength={maxDescription}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="p-4 w-full rounded-xl bg-white shadow-xl font-medium text-gray-500"
                            />
                            <p className="text-sm text-gray-400"></p>
                            <p className="text-sm text-gray-400">{desc.length}/{maxDescription} characters</p>

                            <div className="w-full gap-2 justify-center items-center flex ">
                                <input name="website" placeholder="Official Web"
                                    className="p-2 italic rounded-xl w-full bg-white shadow-xl font-medium text-gray-500" />
                                <input name="total" placeholder="Student Total"
                                    className="p-2 rounded-xl bg-white w-full shadow-xl font-medium text-gray-500" />
                            </div>

                            {/* Edit Button */}
                            {!isEditing && (
                                <EditCarousel onEdit={() => loadEditData(0)} />
                            )}
                            {/* Submit / Cancel Button */}
                            {isEditing && (
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => loadEditData(Math.max(currentIndex - 1, 0))}
                                        className="bg-gray-300 p-1 text-xs rounded-full"
                                    >
                                        <svg className="text-gray-800 text-xs" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="    " fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => loadEditData(Math.min(currentIndex + 1, carouselList.length - 1))}
                                        className="bg-gray-300 p-1 rounded-full text-xs"
                                    >
                                        <svg className=" text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7" />
                                        </svg>

                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="bg-red-400 hover:bg-red-500 text-xs p-2 rounded-xl"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                            {isEditing ? (
                                <div className="flex gap-2 justify-center">
                                    <button
                                        type="submit"
                                        className="bg-blue-400 hover:bg-blue-500 text-xs p-2 rounded-xl"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setCover("");
                                            setDesc("");
                                            setShowPreview("");
                                            if (formRef.current) formRef.current.reset();
                                        }}
                                        className="bg-gray-400 hover:bg-gray-500 text-xs p-2 rounded-xl"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={mutation.isPending && (progress < 0 || progress >= 100)}
                                    className="text-grey-800 bg-emerald-400 hover:bg-emerald-500 text-xs p-2 rounded-xl w-max disabled:bg-emerald-500 disabled:cursor-not-allowed flex"
                                >
                                    {mutation.isPending ? "Loading..." :
                                        <div className="relative group">
                                            <svg className="w-5 h-5 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2M12 4v12m0-12 4 4m-4-4L8 8" />
                                            </svg>
                                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 px-2 py-2 mb-3 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition">
                                                Post
                                            </span>
                                        </div>
                                    }
                                    {/* {" " + progress + "%"} */}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const EditCarousel = ({ onEdit }) => {
    return (
        <div className="relative group">
            <button
                title="Edit"
                onClick={onEdit}
                className="text-gray-800 bg-orange-300 hover:bg-orange-400 text-xs p-2 rounded-xl flex"
            >
                <svg className="w-5 h-5 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                </svg>
            </button>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition">
                Edit
            </span>
        </div>
    );
};

export default Settings;

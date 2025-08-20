import defaultBanner from "/blog-banner.png?url"
import AnimationWrapper from "@/common/page-animation"
import { useContext, useState } from "react"
import Upload from "./Upload"
import { EditorContext } from "@/common/context"
import { Editor } from "@tinymce/tinymce-react"

const BlogEditor = () => {
    const [progress, setProgress] = useState(0)
    const [value, setValue] = useState("")
    let { blog, blog: { title, banner, content, tags, des }, setBlog } = useContext(EditorContext)
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault()
        }
    }
    const handleTitleChange = (e) => {
        let input = e.target
        input.style.height = "auto"
        input.style.height = input.scrollHeight + "px"
        setBlog({ ...blog, title: input.value })
    }
    const handleError = (e) => {
        let img = e.target
        img.src = defaultBanner
    }

    return (
        <>
            <nav className="navbar mb-4">
                {/* <Link to="/" ></Link> */}
                <p readOnly={0 > progress && progress < 100} className="max-sm:hidden text-black line-clamp-1 w-full font-myfont text-2xl tracking-wider">{title.length ? title : "Create a new Story"}</p>
                <div className="flex gap-2 ml-auto text-nowrap">
                    <button className="py-1.5 px-2 rounded-xl text-xs bg-slate-950 text-white hover:bg-opacity-80 transition">Publish</button>
                    <button className="py-1.5 px-2 rounded-xl text-xs bg-slate-400 text-white hover:bg-opacity-80 transition">Save Draft</button>
                </div>
            </nav>
            <AnimationWrapper>
                <section className="">
                    <div className="flex flex-col md:flex-row gap-2 mb-6">
                        <div className="max-w-96 md:w-2/4">
                            <div className="relative aspect-video bg-white border-4 border-gray-400 opacity-80">
                                <label htmlFor="uploadBanner" >
                                    <Upload type="image" setProgress={setProgress} setData={(data) => {
                                        const imageUrl = data?.url
                                        setBlog({ ...blog, banner: imageUrl })
                                    }} className="items-center">
                                        <img src={banner} onError={handleError} alt="Banner" className="object-cover h-80 mx-auto " />
                                    </Upload>
                                </label>
                            </div>
                        </div>
                        <div className="md:w-3/4">
                            <textarea name="" id="" placeholder="Enter Story Title" className="text-3xl text-justify w-full resize-none font-semibold outline-none leading-tight bg-transparent tracking-wider text-gray-700 mx-2 placeholder:opacity-70" onKeyDown={handleKeyDown} onChange={handleTitleChange}></textarea>
                            <hr className="w-full border-black opacity-10 mx-2" />
                        </div>
                    </div>
                    <div id="textEditor" className="font-gelasio mb-6 focus:outline-none">
                        <Editor
                            apiKey='ih2jrrv0v85b0hyexn6e0sxrh3bvsf4djnbwrbh4ki2ad4ol'
                            value={value}
                            readOnly={0 > progress && progress < 100}
                            // onChange={setValue}
                            theme='mobile'
                            onEditorChange={(newValue) => setValue(newValue)}
                            init={{
                                placeholder: "Let's write your awesome story***",
                                height: 500,
                                menubar: false,
                                // statusbar:false,
                                plugins:
                                    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                toolbar:
                                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                resize: false,
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
                        />
                    </div>
                </section>
            </AnimationWrapper>
        </>
    )
}

export default BlogEditor
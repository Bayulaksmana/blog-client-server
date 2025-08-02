// import { Link } from "react-router"

const BlogEditor = () => {
    return (
        <nav className="navbar">
            {/* <Link to="/" ></Link> */}
            <p className="max-sm:hidden text-black line-clamp-1 w-full font-myfont text-3xl tracking-wider">Create New Story</p>
            <div className="flex gap-4 ml-auto text-nowrap">
                <button className="btn-dark py-2">Publish</button>
                <button className="btn-light py-2">Save Draft</button>
            </div>
        </nav>
    )
}

export default BlogEditor
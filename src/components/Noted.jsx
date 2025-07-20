import { Link } from "react-router"

const Noted = ({ link, title, page }) => {
    return (
        <div className="flex gap-4 mt-4 font-myfont uppercase text-2xl">
            <Link to={link}>{title}</Link>
            <span>•</span>
            <span className="text-blue-800">{page}</span>
        </div>
    )
}

export default Noted
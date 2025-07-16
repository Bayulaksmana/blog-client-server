import { Link, useSearchParams } from "react-router"
import Search from "./Search"

const SideMenu = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const handleFilterChange = (e) => {
        if (searchParams.get("sort") !== e.target.value) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                sort: e.target.value
            })
        }
    }
    const handleCategoryChange = (category) => {
        if (searchParams.get("cat") !== category) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                cat: category,
            });
        }
    };
    return (
        <div className='px-4 h-max sticky top-6'>
            <h1 className="mb-4 text-sm font-medium">Search</h1>
            <Search />
            <h1 className="mt-6 mb-4 text-sm font-medium">Filter</h1>
            <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" onChange={handleFilterChange} value="terbaru" className="appearance-none w-4 h-4 rounded-sm checked:bg-emerald-600 border-[1.5px] border-emerald-600 cursor-pointer bg-white" />
                    Recent Update
                </label>
                <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" onChange={handleFilterChange} value="terpopuler" className="appearance-none w-4 h-4 rounded-sm checked:bg-emerald-600 border-[1.5px] border-emerald-600 cursor-pointer bg-white" />
                    Most Favorite
                </label>
                <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" onChange={handleFilterChange} value="trending" className="appearance-none w-4 h-4 rounded-sm checked:bg-emerald-600 border-[1.5px] border-emerald-600 cursor-pointer bg-white" />
                    Story Trending
                </label>
                <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="sort" onChange={handleFilterChange} value="terdahulu" className="appearance-none w-4 h-4 rounded-sm checked:bg-emerald-600 border-[1.5px] border-emerald-600 cursor-pointer bg-white" />
                    Old Story
                </label>
            </div>
            <h1 className="mt-6 mb-4 text-sm font-medium">Categories</h1>
            <div className="flex flex-col gap-2 text-sm">
                <Link className="underline" onClick={() => handleCategoryChange("general")}>General</Link>
                <Link className="underline" onClick={() => handleCategoryChange("essai")}>Essai</Link>
                <Link className="underline" onClick={() => handleCategoryChange("sejarah")}>Sejarah</Link>
                <Link className="underline" onClick={() => handleCategoryChange("filsafat")}>Filsafat</Link>
                <Link className="underline" onClick={() => handleCategoryChange("budaya")}>Budaya</Link>
            </div>
        </div>
    )
}

export default SideMenu
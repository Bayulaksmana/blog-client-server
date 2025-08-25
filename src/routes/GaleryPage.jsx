import Galery from "../components/Galery"
import Noted from "../components/Noted"

const GaleryPage = () => {

    return (
        <div className='mt-4'>
            <Noted link="/write" title="Write" page="Galery Photos & Videos" />
            <div className="mt-8">
                <Galery />
            </div>
        </div>
    )
}

export default GaleryPage
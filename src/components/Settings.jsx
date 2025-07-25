import Noted from "./Noted";
import CarouselForm from "./forms/CarouselForm";


const Settings = () => {

    return (
        <div>
            <Noted link="/" title="Home" page="General Settings" />
            <div className="w-full mt-4 px-4 py-4 flex justify-center gap-4">
                <div className="w-3/5 bg-slate-400">
                <h1>Data Universitas</h1>
                </div>
                <CarouselForm />
            </div>
        </div>
    );
};



export default Settings;

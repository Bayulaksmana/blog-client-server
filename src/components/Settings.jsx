import Noted from "./Noted";
import CarouselForm from "./forms/CarouselForm";
import GenerateForm from "./forms/GenerateForm";


const Settings = () => {

    return (
        <div>
            <Noted link="/" title="Home" page="General Settings" />
            <div className="w-full mt-4 px-4 py-4 flex flex-col sm:flex-row justify-center gap-4">
                <div className="sm:w-3/5 mb-6 border-black border-b-2">
                    <GenerateForm />
                </div>
                    <CarouselForm />
            </div>
        </div>
    );
};

export default Settings;

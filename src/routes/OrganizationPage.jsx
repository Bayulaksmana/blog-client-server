import Noted from "../components/Noted";
import OrganizationChart from "../components/OrganizationChart";

const OrganizationPage = () => {
    return (
        <div className="flex flex-col">
            <Noted link="/write" title="Write" page="Pengurus KPMIBM-R PC. Bandung" />
            <div className="mt-6 items-center justify-center flex flex-col mb-10 text-center sm:text-justify font-bold sm:text-xl">
                <h2 className="a-from-bottom actived">Welcome to KPMIBM-R PC. Bandung</h2>
                <p className="a-from-bottom actived">Periode Kepengurusan Tahun 2025-2026 </p>
            </div>
            <div className="bg-emerald-100 px-6 py-6 mb-4 flex flex-col sm:flex-row gap-2">
                <div className="bg-slate-500 sm:w-2/5">Tes</div>
                <div className="bg-slate-500 sm:w-3/5">Tes</div>
            </div>

            <OrganizationChart />
        </div>
    );
};

export default OrganizationPage
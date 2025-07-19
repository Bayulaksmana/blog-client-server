import { Link } from "react-router"
import PendaftaranForms from "../components/forms/PendaftaranForms"
import Noted from "../components/Noted"

const PendaftaranPage = () => {
    return (
        <>
            <Noted link="/organization" title="Organisasi" page="Register Form" className="mt-4" />
            <div className='flex max-h-screen gap-4'>
                {/* <div className='flex max-h-screen'> */}
                <section className="overflow-hidden overscroll-y-none container my-auto ">
                    <div className="sub-container max-w-[496px]">
                        <div className="flex text-center items-center mb-8 font-serif  ">
                            <img
                                src="/logo/logo-utama-besar.png"
                                alt="logo"
                                height={1000}
                                width={1000}
                                className="h-10 w-fit"
                            />&nbsp;&nbsp;&nbsp;
                            <span className="text-slate-700 text-xl ">REGISTER ANGGOTA</span>
                        </div>
                        <PendaftaranForms />
                        <div className="text-14-regular mt-20 flex justify-between items-center">
                            <p className="justify-items-end text-slate-500 xl:text-left">© 2025 KPMIBM-R PC. Bandung</p>
                            <Link to="/?admin=true" className="bg-emerald-600 opacity-80 items-center px-2 py-1 text-white rounded-xl text-xs" >Administrator</Link>
                        </div>
                    </div>
                </section>
                <section className="items-center flex">
                    <img src="/featured2.jpeg" alt="photo pengurus" height={1000} width={1000} className="rounded-2xl side-img max-w-[100%] max-h-[80%]" />
                </section>
            </div>
        </>
    )
}

export default PendaftaranPage
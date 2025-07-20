const MainPicture = () => {
    return (
        <div className="relative px-4 py-4 bg">
            <div className="flex justify-center gap-4 items-center mb-4 ">
                <div className="w-3/6 bg-slate-500 h-60 rounded-tl-[80vh]"></div>
                <div className="w-3/6 bg-slate-500 h-60 rounded-tr-[200vh]"></div>
            </div>
            <div className="flex items-center justify-center">
                <img src="logo/logo-utama-besar.png" alt="logo-utama-besar.png" className="absolute h-20 w-20" />
            </div>
            <div className="flex justify-center gap-4 items-center ">
                <div className="w-3/6 bg-slate-500 h-60 rounded-bl-[200vh]"></div>
                <div className="w-3/6 bg-slate-500 h-60 rounded-br-[200vh]"></div>
            </div>
        </div>
    )
}

export default MainPicture
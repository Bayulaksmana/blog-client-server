const PendaftaranForms = () => {
    return (
        <div className="gap-4">
            <form action="" className="flex flex-col mb-4">
                <section className='mb-6'>
                    <h1 className='font-bold text-2xl text-gray-700'>Dega Nion Don 👍</h1>
                    <p className='text-slate-700 italic w-full'>Kuliah di Bandung dan sekitarnya? Daftar Sekarang.</p>
                </section>
                <input type="text" className="rounded-lg py-1 p-2" placeholder="Input Username or Email" />
            </form>
            <div className="justify-end flex">
                <button to="/?admin=true" className="bg-emerald-600 opacity-85 items-center px-2 py-1 text-white rounded-xl text-sm" >Submit</button>
            </div>

        </div>
    )
}

export default PendaftaranForms
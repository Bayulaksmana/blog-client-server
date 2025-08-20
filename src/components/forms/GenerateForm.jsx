const GenerateForm = () => {
    return (
        <div className="">
            <h1 className="font-myfont border-spacing-2 text-2xl text-center mb-4">Check Data Profile</h1>
            <form className="flex flex-col gap-4 sm:mx-20">
                <div className="w-full gap-2 flex flex-wrap justify-between items-center">
                    <div className="w-full gap-2 space-y-4 justify-center items-center sm:flex">
                        <input name="website" placeholder="Nama Lengkap"
                            className="p-2 px-4  italic rounded-xl w-full bg-white shadow-xl font-medium text-gray-500" />
                        <input name="total" placeholder="NIM / NPM"
                            className="p-2 px-4 rounded-xl bg-white w-full shadow-xl font-medium text-gray-500" />
                        <input name="total" placeholder="Universitas"
                            className="p-2 px-4 rounded-xl bg-white w-full shadow-xl font-medium text-gray-500" />
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button type="button" className="w-max mt-2 mb-6 p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white font-medium">
                        Generate Data
                    </button>
                </div>
            </form>
        </div>
    )
}

export default GenerateForm
const ListUniversitas = () => {
    return (
        <div className="px-4 py-4 mt-8">
            <h1 className="font-myfont font-medium text-center mb-8 text-5xl uppercase">Daftar Kampus in Bandung</h1>
            <div className="slider"
                style={{
                    "--quantity": 10,
                    "--width": "90px",
                    "--height": "100px",
                }}
            >
                <div className="list">
                    <div className="item" style={{ "--position": 1 }}><img src="/campus/upi.png" alt="" /></div>
                    <div className="item" style={{ "--position": 2 }}><img src="/campus/itb.png" alt="" /></div>
                    <div className="item" style={{ "--position": 3 }}><img src="/campus/unpad.png" alt="" /></div>
                    <div className="item" style={{ "--position": 4 }}><img src="/campus/unla.png" alt="" /></div>
                    <div className="item" style={{ "--position": 5 }}><img src="/campus/unikom.png" alt="" /></div>
                    <div className="item" style={{ "--position": 6 }}><img src="/campus/unisba.png" alt="" /></div>
                    <div className="item" style={{ "--position": 7 }}><img src="/campus/telkom.png" alt="" /></div>
                    <div className="item" style={{ "--position": 8 }}><img src="/campus/unpar.png" alt="" /></div>
                    <div className="item" style={{ "--position": 9 }}><img src="/campus/algifari.png" alt="" /></div>
                    <div className="item" style={{ "--position": 10 }}><img src="/campus/nurtanio.png" alt="" /></div>
                </div>
            </div>
        </div >
    )
}

export default ListUniversitas
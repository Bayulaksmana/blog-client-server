const ListUniversitas = () => {
    const kampusList = [
        { name: "UPI", logo: "/campus/upi.png" },
        { name: "ITB", logo: "/campus/itb.png" },
        { name: "UNPAD", logo: "/campus/unpad.png" },
        { name: "UNLA", logo: "/campus/unla.png" },
        { name: "UNIKOM", logo: "/campus/unikom.png" },
        { name: "UNISBA", logo: "/campus/unisba.png" },
        { name: "TELKOM", logo: "/campus/telkom.png" },
        { name: "UNPAR", logo: "/campus/unpar.png" },
        { name: "ALGIFARI", logo: "/campus/algifari.png" },
        { name: "NURTANIO", logo: "/campus/nurtanio.png" },
    ];

    return (
        <div className="px-4 py-4 mt-8">
            <h1 className="font-myfont font-medium text-center mb-8 text-2xl uppercase">
                Daftar Kampus
            </h1>
            <div
                className="slider"
                style={{
                    "--quantity": kampusList.length,
                    "--width": "90px",
                    "--height": "100px",
                }}
            >
                <div className="list">
                    {kampusList.map((kampus, index) => (
                        <div className="item" key={kampus.name} style={{ "--position": index }}>
                            <img src={kampus.logo} alt={kampus.name} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListUniversitas;

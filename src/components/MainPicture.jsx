import { useEffect, useRef, useState } from "react";
import { FcConferenceCall } from "react-icons/fc";





const MainPicture = () => {
    const listRef = useRef(null);
    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const [showDetail, setShowDetail] = useState(false);


    useEffect(() => {
        const nextButton = nextRef.current;
        const prevButton = prevRef.current;
        const list = listRef.current;
        let unAcceptClick;
        const showSlider = (type) => {
            const items = list.querySelectorAll(".carousel .list .item");
            if (type === "next") {
                list.appendChild(items[0]);
            } else {
                if (type === "prev") {
                    list.prepend(items[items.length - 1]);
                }
            }
        };

        clearTimeout(unAcceptClick)
        unAcceptClick = setTimeout(() => {
            nextButton.style.pointerEvent = "auto"
            prevButton.style.pointerEvent = "auto"
        }, 2000)
        const handleNext = () => showSlider("next")
        const handlePrev = () => showSlider("prev")
        const interval = setInterval(() => {
            showSlider("next");
        }, 10000);
        nextButton.addEventListener("click", handleNext);
        prevButton.addEventListener("click", handlePrev);
        return () => {
            clearInterval(interval);
            nextButton.removeEventListener("click", handleNext);
            prevButton.removeEventListener("click", handlePrev);
        };
    }, []);

    return (
        <div className={`carousel ${showDetail ? "showDetail" : ""} rounded-3xl`}>
            <div className="list" ref={listRef}>
                <div className="item flex flex-col">
                    <img src="/pemda/bolsel.png" alt="unpad" />
                    <div className="intro">
                        <div className="title uppercase w-full">Bolaang Mongondow Selatan</div>
                        <div className="topic items-center"><FcConferenceCall />&nbsp;303 Mahasiswa/i</div>
                        <div className="desc text-justify">Jumlah total mahasiswa BOLSEL yang melanjutkan studi di Bandung, sesuai database resmi KPMIBM Tahun 2025-2026. <br /> <br />
                            Daftar tempat kuliah dapat di tinjau melalui link berikut dan untuk sponsorship bisa mengghubungi CP yang tertera pada link di bawah ini </div>
                        <button onClick={() => setShowDetail(true)} className="seeMore px-1 py-1 rounded-md items-center bg-emerald-400">see more &#8599;</button>
                    </div>
                    <div className="detail">
                        <div className="title">Aerphone GHTK</div>
                        <div className="des">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.
                        </div>
                        <div className="specifications">
                            <div>
                                <p>Used Time</p>
                                <p>6 hours</p>
                            </div>
                            <div>
                                <p>Charging port</p>
                                <p>Type-C</p>
                            </div>
                            <div>
                                <p>Compatible</p>
                                <p>Android</p>
                            </div>
                            <div>
                                <p>Bluetooth</p>
                                <p>5.3</p>
                            </div>
                            <div>
                                <p>Controlled</p>
                                <p>Touch</p>
                            </div>
                        </div>
                        <div className="checkout">
                            <button>ADD TO CART</button>
                            <button>CHECKOUT</button>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <img src="/pemda/boltim.png" alt="unikom" />
                    <div className="intro">
                        <div className="title uppercase">Bolaang Mongondow Timur</div>
                        <div className="topic">visi misalkan</div>
                        <div className="desc">description campus Lorem ipsum dolor sit. Lorem ipsum dolor sit.</div>
                        <button className="seeMore px-1 py-1 rounded-md items-center bg-emerald-400">see more &#8599;</button>
                    </div>
                    <div className="detail">
                        <div className="title">Cammpus</div>
                        <div className="desc">Digimon</div>
                        <div className="specifications">
                            <div className="">
                                <p>Tanpa penjelasan</p>
                                <p>Tambah penjelasan</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <img src="/pemda/bolmut.png" alt="upi" />
                    <div className="intro">
                        <div className="title uppercase">Bolaang Mongondow Utara</div>
                        <div className="topic">visi misalkan</div>
                        <div className="desc">description campus Lorem ipsum dolor sit. Lorem ipsum dolor sit.</div>
                        <button className="seeMore px-1 py-1 rounded-md items-center bg-emerald-400">see more &#8599;</button>
                    </div>
                    <div className="detail">
                        <div className="title">Cammpus</div>
                        <div className="desc">Digimon</div>
                        <div className="specifications">
                            <div className="">
                                <p>Tanpa penjelasan</p>
                                <p>Tambah penjelasan</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <img src="/pemda/bolmong.png" alt="telkom" />
                    <div className="intro">
                        <div className="title uppercase">Bolaang Mongondow</div>
                        <div className="topic">visi misalkan</div>
                        <div className="desc">description campus Lorem ipsum dolor sit. Lorem ipsum dolor sit.</div>
                        <button className="seeMore px-1 py-1 rounded-md items-center bg-emerald-400">see more &#8599;</button>
                    </div>
                    <div className="detail">
                        <div className="title">Cammpus</div>
                        <div className="desc">Digimon</div>
                        <div className="specifications">
                            <div className="">
                                <p>Tanpa penjelasan</p>
                                <p>Tambah penjelasan</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <img src="/pemda/kotamobagu.png" alt="unla" />
                    <div className="intro">
                        <div className="title">KOTA KOTAMOBAGU</div>
                        <div className="topic">visi misalkan</div>
                        <div className="desc">description campus Lorem ipsum dolor sit. Lorem ipsum dolor sit.</div>
                        <button className="seeMore px-1 py-1 rounded-md items-center bg-emerald-400">see more &#8599;</button>
                    </div>
                    <div className="detail">
                        <div className="title">Cammpus</div>
                        <div className="desc">Digimon</div>
                        <div className="specifications">
                            <div className="">
                                <p>Tanpa penjelasan</p>
                                <p>Tambah penjelasan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="arrows gap-2 flex">
                <button ref={prevRef} id="prev" className="px-2 py-1 bg-emerald-200 rounded-lg shadow-lg"><svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
                </svg>
                </button>
                <button id="back" onClick={() => setShowDetail(false)} className="px-2 py-1 bg-emerald-200 rounded-lg shadow-lg z-40">go back &#8599;</button>
                <button ref={nextRef} id="next" className="px-2 py-1 bg-emerald-200 rounded-lg shadow-xl"><svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                </svg>
                </button>
            </div>
        </div>
    )
}

export default MainPicture
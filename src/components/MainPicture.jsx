import { useEffect, useRef, useState } from "react";
import { FcConferenceCall } from "react-icons/fc";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "./Image";


const fetchPosts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BE}/daerah`);
    return res.data;
};

const MainPicture = () => {
    const listRef = useRef(null);
    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const [showDetail, setShowDetail] = useState(false);


    useEffect(() => {
        const nextButton = nextRef.current;
        const prevButton = prevRef.current;
        const list = listRef.current;
        if (!nextButton || !prevButton || !list) return;
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
    const { isPending, error, data } = useQuery({
        queryKey: ["daerahs"],
        queryFn: () => fetchPosts()
    })
    if (isPending) return "loading..."
    if (error) return "Otorisasi Server..." + error.message
    if (!data) return "Data Tidak Tersedia..."
    return (
        <div className={`carousel ${showDetail ? "showDetail" : ""} rounded-3xl`}>
            <div className="list" ref={listRef}>
                {data.map((item, i) => (
                    <div key={i} className="item flex flex-col">
                        <Image src={item.img} alt={item.title} />
                        <div className="intro">
                            <div className="title uppercase w-full">{item.title}</div>
                            <div className="topic items-center"><FcConferenceCall />&nbsp;{item.total} Mahasiswa/i</div>
                            <div className="desc text-justify">{item.description}</div>
                            <button onClick={() => setShowDetail(true)} className="seeMore px-1 py-1 rounded-md items-center bg-emerald-400">see more &#8599;</button>
                        </div>
                        <div className="detail">
                            <div className="title">{item.title}</div>
                            <div className="desc">{item.description}</div>
                            <div className="specifications">
                                <div><p>Used Time</p><p>6 hours</p></div>
                                <div><p>Charging port</p><p>Type-C</p></div>
                                <div><p>Compatible</p><p>Android</p></div>
                                <div><p>Bluetooth</p><p>5.3</p></div>
                                <div><p>Controlled</p><p>Touch</p></div>
                            </div>
                            <div className="checkout">
                                <button>ADD TO CART</button>
                                <button>CHECKOUT</button>
                            </div>
                        </div>
                    </div>
                ))}
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
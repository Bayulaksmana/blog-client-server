import { useEffect, useRef, useState } from "react";
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
        }, 10000)
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
                            <div className="topic items-center">
                                <svg className="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.6144 7.19994c.3479.48981.5999 1.15357.5999 1.80006 0 1.6569-1.3432 3-3 3-1.6569 0-3.00004-1.3431-3.00004-3 0-.67539.22319-1.29865.59983-1.80006M6.21426 6v4m0-4 6.00004-3 6 3-6 2-2.40021-.80006M6.21426 6l3.59983 1.19994M6.21426 19.8013v-2.1525c0-1.6825 1.27251-3.3075 2.95093-3.6488l3.04911 2.9345 3-2.9441c1.7026.3193 3 1.9596 3 3.6584v2.1525c0 .6312-.5373 1.1429-1.2 1.1429H7.41426c-.66274 0-1.2-.5117-1.2-1.1429Z" />
                                </svg>
                                {item.total} Mahasiswa/i</div>
                            <div className="desc text-justify">{item.description}</div>
                            <button onClick={() => setShowDetail(true)} className="seeMore px-1 py-1 rounded-md items-center bg-emerald-400">see more &#8599;</button>
                        </div>
                        <div className="detail">
                            <div className="title uppercase font-semibold text-4xl mb-6 hidden sm:block">{item.title}</div>
                            <div className="desc text-justify mt-10">{item.description}</div>
                            <div className="specifications flex justify-between border-t-2 border-black mt-6">
                                <div><p>Kampus</p><p>UNPAD</p></div>
                                <div><p>Mahasiswa</p><p>3 Person</p></div>
                                <div><p>Alumni</p><p>3 Person</p></div>
                                <div><p>Beasiswa</p><p>-</p></div>
                                <div><p>Asrama</p><p>-</p></div>
                            </div>
                            <div className="checkout mt-6 z-50">
                                <a href={item.website} target="_blank" rel="noopener noreferrer">
                                    <button >GO TO WEBSITE</button>
                                </a>
                                <button>SEND STORY</button>
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
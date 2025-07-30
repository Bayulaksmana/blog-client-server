import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const fetchPosts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BE}/universitas/detail`);
    return res.data;
};
const ListUniversitas = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["universitas"],
        queryFn: () => fetchPosts()
    })
    const [hiddenIds, setHiddenIds] = useState([]);

    if (isPending) return "loading..."
    if (error) return "Otorisasi Server..." + error.message
    if (!data) return "Data Tidak Tersedia..."


    const filteredData = (data || [])
        .filter(item => !hiddenIds.includes(item._id))

    return (
        <div className="px-4 py-4 mt-8 hidden sm:block">
            <h1 className="font-myfont font-medium text-center mb-8 text-2xl uppercase">
                Daftar Kampus
            </h1>
            <div className="slider" style={{ "--quantity": filteredData.length }}>
                <div className="list">
                    {filteredData.map((kampus, i) => {
                        const logoUrl = kampus.img
                            ? kampus.img
                            : `https://logo.clearbit.com/${kampus.website.replace(/^https?:\/\//, "")}`;
                        return (
                            <div className="item flex justify-center" key={kampus._id} style={{ "--position": i }}>
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <button className="flex flex-col gap-2">
                                            <img
                                                className="rounded-full mb-1"
                                                src={logoUrl}
                                                alt={`Logo ${kampus.nama_pt}`}
                                                onError={() => setHiddenIds(prev => [...prev, kampus._id])}
                                            />
                                            <p className="text-xs font-semibold flex justify-center break-words leading-tight w-full uppercase">{kampus.nm_singkat}</p>
                                        </button>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-fit mt-9 mb-2 items-center z-40">
                                        <div className="flex justify-between gap-4">
                                            <Avatar>
                                                <AvatarImage src={logoUrl} />
                                                <AvatarFallback>{kampus.nm_singkat}</AvatarFallback>
                                            </Avatar>
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-semibold">{kampus.nama_pt}</h4>
                                                <p className="text-sm text-emerald-400">
                                                    <a href={kampus.website} target="_blank" rel="noopener noreferrer">
                                                        {kampus.website}
                                                    </a>
                                                </p>
                                                <p className="text-xs font-medium">{kampus.email} – {kampus.no_tel}</p>
                                                <div className="text-muted-foreground text-xs">
                                                    <p>{kampus.alamat}</p>
                                                    <span>{kampus.kab_kota_pt}</span> - <span>{kampus.provinsi_pt}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
    // return (
    //     <div className="px-4 py-4 mt-8 hidden sm:block">
    //         <h1 className="font-myfont font-medium text-center mb-8 text-2xl uppercase">
    //             Daftar Kampus
    //         </h1>
    //         <div
    //             className="slider"
    //             style={{ "--quantity": data.length }}
    //         >
    //             <div className="list">
    //                 {filteredData.map((kampus, i) => (
    //                     <div className="item" key={kampus._id} style={{ "--position": i }}>
    //                         <HoverCard>
    //                             <HoverCardTrigger asChild>
    //                                 <button className="flex flex-col gap-2">
    //                                     <img className="rounded-full" src={kampus.img ? "https://github.com/vercel.png" : `https://logo.clearbit.com/${kampus.website.replace(/^https?:\/\//, '')}`} alt={`Logo ${kampus.nama_pt}`} />
    //                                     <p className="text-xs font-semibold flex justify-center">{kampus.nm_singkat}</p>
    //                                 </button>
    //                             </HoverCardTrigger>
    //                             <HoverCardContent className="w-fit m-4" >
    //                                 <div className="flex justify-between gap-4">
    //                                     <Avatar>
    //                                         <AvatarImage src="https://github.com/vercel.png" />
    //                                         <AvatarFallback>{kampus?.img}</AvatarFallback>
    //                                     </Avatar>
    //                                     <div className="space-y-1">
    //                                         <h4 className="text-sm font-semibold">{kampus.nama_pt}</h4>
    //                                         <p className="text-sm text-blue-300">
    //                                             <a href={kampus.website} target="_blank" rel="noopener noreferrer">
    //                                                 {kampus.website}
    //                                             </a>
    //                                         </p>
    //                                         <p className="text-xs">
    //                                             {kampus.email} – {kampus.no_tel}
    //                                         </p>
    //                                         <div className="text-muted-foreground text-xs">
    //                                             <p>{kampus.alamat}</p>
    //                                             <span>{kampus.kab_kota_pt}</span> - <span>{kampus.provinsi_pt}</span>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </HoverCardContent>
    //                         </HoverCard>
    //                     </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>
    // );
};

export default ListUniversitas;

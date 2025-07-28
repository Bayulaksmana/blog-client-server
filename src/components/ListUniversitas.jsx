import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BE}/universitas`);
    return res.data.slice(0, 15);
};
const ListUniversitas = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["universitas"],
        queryFn: () => fetchPosts()
    })

    if (isPending) return "loading..."
    if (error) return "Otorisasi Server..." + error.message
    if (!data) return "Data Tidak Tersedia..."

    console.log(data)
    return (
        <div className="px-4 py-4 mt-8 hidden sm:block">
            <h1 className="font-myfont font-medium text-center mb-8 text-2xl uppercase">
                Daftar Kampus
            </h1>
            <div
                className="slider"
                style={{ "--quantity": data.length }}
            >
                <div className="list">
                    {data.map((kampus, i) => (
                        <div className="item" key={kampus._id} style={{ "--position": i }}>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <button onClick={kampus.website} className="flex flex-col gap-2">
                                        <img src={kampus.img ? kampus.img : "https://github.com/vercel.png"} className="rounded-full" alt={kampus.name} />
                                        <p className="text-xs font-semibold flex justify-center">{kampus.nama_singkat}</p>
                                    </button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-fit m-4" >
                                    <div className="flex justify-between gap-4">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/vercel.png" />
                                            <AvatarFallback>{kampus?.img}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <h4 className="text-sm font-semibold">{kampus.nama}</h4>
                                            <p className="text-sm">
                                                {data.website} – {data.email}
                                            </p>
                                            <div className="text-muted-foreground text-xs">
                                                Joined December 2021
                                            </div>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListUniversitas;

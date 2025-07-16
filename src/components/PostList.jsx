import { PostListItem } from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import axios from "axios"
import InfiniteScroll from 'react-infinite-scroll-component';

const fetchPosts = async (pageParam, searchParams) => {
    const searchParamsObj = Object.fromEntries([...searchParams])
    const res = await axios.get(`${import.meta.env.VITE_API_URL_BE}/posts`, {
        params: { page: pageParam, limit: 10, ...searchParamsObj },
    });
    return res.data;
};
const PostList = () => {
    const [searchParams] = useSearchParams()
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        status,
    } = useInfiniteQuery({
        queryKey: ["posts", searchParams.toString()],
        queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
        // efetchOnWindowFocus: true,
    })
    if (isFetching) return "Loading...";
    if (error) return "Something went wrong!";
    if (status === "loading...") return 'Loading...';
    if (status === "error") return "Otorisasi Server!!";
    const allPosts = data?.pages?.flatMap((page) => page.posts) || []
    return (
        <InfiniteScroll
            dataLength={allPosts.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4>Loading more post...</h4>}
            endMessage={
                <p style={{ textAlign: 'center', margin: "50px" }}>
                    <b>All Story Is Loaded</b>
                </p>
            }
        >
            {allPosts.map((post) => (
                <PostListItem key={post._id} post={post} />
            ))}
        </InfiniteScroll>
    )
}


export default PostList
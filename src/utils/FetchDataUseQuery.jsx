import { useQueries } from "@tanstack/react-query";
import { fetchData } from "./https";

export default function FetchDataUseQuery(url, {sortTypes}) {
    const results = useQueries({
        queries: sortTypes.map(type => ({
            queryKey: ["sort", type],
            queryFn: () => fetchData(url+"/"+type, true, "PUT", type),
            staleTime: Infinity
        })),
        combine: (results) => {
            return {
                results: results.map((result) => result.data),
                pending: results.some((result) => result.isPending),
            }
        },
    })
    return results;
}
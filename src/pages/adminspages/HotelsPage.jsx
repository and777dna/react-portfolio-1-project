import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/https";

export default function HotelsPage() {
    const { data, isError, error, isLoading } = useQuery({
        queryFn: () => fetchData("http://localhost:3001/hotels"),
        queryKey: ["hotels"]
    })


    return <>

    </>
}
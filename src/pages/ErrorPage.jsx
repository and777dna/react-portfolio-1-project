import { useRouteError } from "react-router";

export default function ErrorPage() {
    const error = useRouteError();
    return <div>
        <h2>error message will be below \|/</h2>
        {error.message}
    </div>;
    //return <h2>some Error, watch console.log()</h2>
}
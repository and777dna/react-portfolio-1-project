import { useEffect, useState } from "react";
import { AdminRouter, UserRouter } from "../routes/privateRoutes";
import { useSelector } from "react-redux";
import { getAuthToken } from "../utils/auth";

export default function useRouter() {
    //TODO: should i create default router here? i think NO
    //const [router, setRouter] = useState(createBrowserRouter([{ path: "*", element: <LoadingScreen /> }]));
    //TODO: i should create async/await here instead of all of this or to make work useEffect()

    const token = getAuthToken();

    const [router, setRouter] = useState(UserRouter);

    const isAdmin = useSelector(state => state.user.isAdmin)

    useEffect(() => {
        if (token) {
            const privateRoutes = isAdmin ? AdminRouter : UserRouter;
            console.log("privateRoutes AdminRouter:",privateRoutes);
            setRouter(privateRoutes);//here i will get "export const userRouter()" and "export const adminRouter()"
        } else {
            const defaultRoute = UserRouter;
            console.log("privateRoutes UserRouter:",defaultRoute);
            setRouter(defaultRoute);
        }
    }, [token, isAdmin]);

    return router;
}
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Root";
import Firstpage from "../pages/Firstpage";
import RoomsPage from "../pages/RoomsPage";
import Cart from "../pages/Cart";
import { action as logoutAction } from "../pages/Logout";
import AuthPage, { action as authAction } from "../pages/AuthPage";
import ErrorPage from "../pages/ErrorPage";


export const userRouter = createBrowserRouter([
    {
        path: "/",
        id: "root",
        //loader: getAuthToken,//TODO: this stopped working
        element: <RootLayout />,
        children: [
            /*{
                index: true,
                element: <HomePage />
            },*/
            {
                //index: true,
                path: "firstpage", // ✅ Убрали "/"
                element: <Firstpage />,
                children: [
                    {
                        path: "roomspage",
                        element: <RoomsPage />,
                    },
                    {
                        path: "flightspage",
                        //element: <FlightsPage />,
                    },
                    {
                        path: "flighthotelpage",
                        //element: <FlightHotelPage />,
                    }
                ]
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "logout",
                action: logoutAction,
            },
            {
                //path: "authorisepage",//this should be change to dynamic <Link>
                path: ":authType", // Динамический параметр в URL
                element: <AuthPage />,
                errorElement: <ErrorPage/>,
                action: authAction
            },
        ]
    }
]);

//export default userRouter;
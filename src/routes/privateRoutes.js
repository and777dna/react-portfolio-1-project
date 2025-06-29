import { createBrowserRouter } from "react-router-dom";
import { getAuthToken } from "../utils/auth";
import RootLayout from "../pages/Root";
import RoomsPage from "../pages/RoomsPage";
import Cart from "../pages/Cart";
import { action as logoutAction } from "../pages/Logout";
import HomePage from "../pages/adminspages/HomePage";
import UsersPage from "../pages/adminspages/UsersPage";
import HotelsPage from "../pages/adminspages/HotelsPage";
import AuthPage, { action as authAction } from "../pages/AuthPage";
import ErrorPage from "../pages/ErrorPage";
import SelectedRoomsTypePage from "../pages/SelectedRoomsTypePage";
import LikedProperties from "../pages/housekeeperpages/LikedProperties";
import SelectedRoomPage from "../pages/selectedRoomTypePage/SelectedRoomPage";

export const UserRouter = createBrowserRouter([
    {
        path: "/",
        id: "root",
        loader: getAuthToken,
        element: <RootLayout />,//TODO: to restructure this to have roomspage/flightspage/flighthotelpage on "/"
        children: [
            /*{
                index: true,
                element: <HomePage />
            },*/
            /*{
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
            },*/
            {
                path: "likedProperties",
                element: <LikedProperties />
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
                action: authAction//TODO: to create in some way to fetch data after action. (through useFetcher()? loader is to install to "cache" to react router) useFetcher(action)
            },
            {
                path: "/testing/:selectedType",
                element: <SelectedRoomsTypePage />,
            },
            {
                path: "/detail-info/:selectedProperty",
                element: <SelectedRoomPage />,
            },
            {
                path: "roomspage",
                element: <RoomsPage />,
                errorElement: <ErrorPage />,
                children: [
                    {
                        path: ":selectedType",//it renders a lot of things here, i dont know why
                        element: <SelectedRoomsTypePage />,
                    },
                    /*{
                        path: "1",
                        element: <SelectedRoomsTypePage />,
                    },*/
                    /*{//TODO: /home/roomspage/:selectedType but will be shown distinctly(without <RoomsPage /> content)
                        path: ":selectedType",//TODO: 8880 and uncomment and it will not be `child` probably (:selectedType is key, then the value is ...)
                        element: <SelectedRoomsTypePage />,
                    },*/
                    {
                        path: ":selectedwithdefaultNavbar",
                        //element: <SelectedWithDefaultNavbar />,
                        //index||default: domesticcities
                    }
                ]
            },
            {
                path: "flightspage",
                //element: <FlightsPage />,
            },
            {
                path: "flighthotelpage",
                //element: <FlightHotelPage />,
            },
        ]
    }
]);


export const AdminRouter = createBrowserRouter([
    {
        path: "/",
        id: "admin",
        //element: <AdminLayout />
        element: <HomePage />,
        children: [
            //{ path: "", element: <AdminDashboard /> },
            //{ path: "admininfo", element: <AdminPage /> },
            { path: "usersinfo", element: <UsersPage /> },
            { path: "hotelsinfo", element: <HotelsPage /> },
        ]
    }
])

/*
export const HouseKeeperRouter = createBrowserRouter([
    {
        path: "/",
        element: <MyProperties/>
    }
])*/

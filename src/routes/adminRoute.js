import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/adminspages/HomePage";
import UsersPage from "../pages/adminspages/UsersPage";
import HotelsPage from "../pages/adminspages/HotelsPage";

const adminRouter = createBrowserRouter([
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

export default adminRouter;
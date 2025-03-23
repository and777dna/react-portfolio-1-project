import { RouterProvider } from "react-router-dom";
import '@ant-design/v5-patch-for-react-19';
import { getAuthToken } from "./utils/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chat from "./utils/Chat";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsersData } from "./redux/user-slice";
import userRouter from "./userRoute";
import { isAdmin } from "./utils/https";
import adminRouter from "./adminRoute";




const queryClient = new QueryClient();

function App() {
    const token = getAuthToken();

    const [ifIsAdmin, setIfIsAdmin] = useState(isAdmin)
    const router = !token ? userRouter : ifIsAdmin ? adminRouter : userRouter;

    const dispatch = useDispatch();

    const usersData = useSelector((state) => state.user) || [];
    //console.log("Redux store usersData:", usersData);


    useEffect(() => {
        dispatch(fetchUsersData())

        setIfIsAdmin(isAdmin);
        console.log("setIfIsAdmin(isAdmin);:", ifIsAdmin)
    }, [dispatch, isAdmin, ifIsAdmin]);

    if (isAdmin === undefined) {
        return <p>Загрузка...</p>;
    }

  return (
    <div className="App">
      <header className="App-header">
              <QueryClientProvider client={queryClient}>
                  {/*<RouterProvider router={router}/>*/}
                  <RouterProvider router={adminRouter}/>
                  {usersData && <Chat />}
              </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;

import { RouterProvider } from "react-router-dom";
import '@ant-design/v5-patch-for-react-19';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chat from "./utils/Chat";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUsersData } from "./redux/user-slice";
import useRouter from "./hooks/useRouter";

const queryClient = new QueryClient();

function App() {
    const router = useRouter()//router: router is not needed there i guess

    const dispatch = useDispatch();
    const usersData = useSelector((state) => state.user) || [];


    useEffect(() => {
        dispatch(fetchUsersData())

        //setIfIsAdmin(getIsAdmin());
        //console.log("setIfIsAdmin(isAdmin);:", ifIsAdmin)
    }, [dispatch]);


  return (
    <div className="App">
      <header className="App-header">
              <QueryClientProvider client={queryClient}>
                  <RouterProvider router={router}/>
                  {/*<RouterProvider router={adminRouter}/>*/}
                  {usersData && <Chat />}
              </QueryClientProvider>
      </header>
    </div>
  );
}

export default App;

import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { Button } from "antd";
import AuthCard from "./auth/AuthCard";

export default function MainNavigation() {
    const token = useRouteLoaderData("root")
    const navigate = useNavigate();



    function handleLogout() {
        console.log("Удаление токена из localStorage");
        localStorage.removeItem("token");
        // Здесь будет выполняться редирект
        navigate('/');  // Используйте `useNavigate` для редиректа
    }

    return (
        <header id="main-navigation">

                <nav id="navbar">
                    <ul style={{ listStyleType: "none" }}>
                        <li>
                            <Link to="firstpage">first page</Link>
                        </li>
                        {!token && <AuthCard />}
                        {token && (
                            <>
                                <li>
                                    <Link to="cart">Cart</Link>
                                </li>
                            </>
                        )}
                        {token &&
                            <li>
                                {/*<form action="/logout" method="post">*/}
                                <form>
                                    <Button htmlType="submit" color="default" variant="outlined" type="submit" onClick={handleLogout}>Logout</Button>
                                    {/*<button>Logout</button>*/}
                                </form>
                            </li>
                        }
                    </ul>
                </nav>

        </header>
    )
}
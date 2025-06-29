import { useNavigate, useRouteLoaderData } from "react-router-dom";
import {Card} from "antd";
import MainNavigationUl from "./MainNavigationUl";
import React from "react";
import DefaultNavLinks from "./DefaultNavLinks";

const MainNavigation: React.FC = () => {
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
                <Card style={{
                    width: "-moz-fit-content",
                    padding: "10px",
                    margin: "10px",
                    backgroundColor: "tan",

                    // marginLeft: "10px"
                }}>
                    <MainNavigationUl token={token} handleLogout={() => handleLogout()} />

                    <DefaultNavLinks />
                </Card>
            </nav>

        </header>
    )
}

export default MainNavigation;
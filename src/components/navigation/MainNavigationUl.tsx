import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import AuthCard from "../auth/AuthCard";
import React, {FC} from "react";

/*interface MainNavigationUlProps {
    token: string,
    handleLogout: function handleLogout
}*/

//TODO: not tested yet
interface MainNavigationUlProps {
    token: string | null;
    handleLogout: () => void;
}

//export default function MainNavigationUl: FC<MainNavigationUlProps>: React.ReactElement  = ({
const MainNavigationUl: FC<MainNavigationUlProps> = ({ token, handleLogout }) => {
    return (
        <ul style={{ listStyleType: "none" }} className="navigation">
            <div>
                <Card style={{ width: 300, padding: "10px" }}>
                    {token && (
                    <>
                        <li>
                            <Link to="cart">Cart</Link>
                        </li>
                        <li>
                            <Link to="likedProperties">likedProperties</Link>
                        </li>
                        <li>
                            <form>
                                <Button
                                    htmlType="submit"
                                    type="default"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </form>
                        </li>
                    </>
                    )}
                    <li>
                        <Link to="/">Booking.com</Link>
                    </li>
                </Card>
            </div>

            <div style={{ padding: "10px" }}>
                {!token && <AuthCard />}
            </div>
        </ul>
    );
};

export default MainNavigationUl;

/*
export default function MainNavigationUl: FC<MainNavigationUlProps>: React.ReactElement  = ({
    return <ul style={{listStyleType: "none"}} className="navigation">

        <div>
            <Card style={{
                width: 300,
                padding: "10px"
                // marginLeft: "10px"
            }}>
                {token && (
                    <>
                        <li>
                            <Link to="cart">Cart</Link>
                        </li>
                    </>
                )}
                {token &&
                    <li>
                        {/!*<form action="/logout" method="post">*!/}
                        <form>
                            <Button htmlType="submit" color="default" variant="outlined" type="submit"
                                    onClick={handleLogout}>Logout</Button>
                            {/!*<button>Logout</button>*!/}
                        </form>
                    </li>
                }
                <li>
                    <Link to="/">Booking.com</Link>
                </li>
            </Card>
        </div>


        <div style={{padding: "10px"}}>
            {!token && <AuthCard/>}
        </div>

    </ul>
})*/

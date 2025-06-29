/*
import { Button, Card } from "antd";
import { Link } from "react-router-dom";
import AuthCard from "../auth/AuthCard";

export default function MainNavigationUl({ token, handleLogout })  {
    //TODO:<Card/> component could be outside for scalability purposes
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

}*/

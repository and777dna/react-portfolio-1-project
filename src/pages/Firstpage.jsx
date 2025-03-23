import { fetchData } from "../utils/https";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, Card, Space } from "antd";
import AuthCard from "../components/auth/AuthCard";
import CustomButton from "../components/buttons/CustomButton";
import { CustomButton1 } from "../components/buttons/CustomButton1";


export default function Firstpage() {


    useEffect(() => {
        // This will be called when the component mounts
        //getUsersData();
        const fetchUsers = async () => {
            const users = await fetchData("http://localhost:3001/users");
            console.log(users);
        };
        fetchUsers();


        return () => {
            console.log("Компонент размонтирован");
        };
    }, []);

    return (
        <>
            <h2>First Page</h2>
            <h2>I have got token.</h2>

            <Space style={{ padding: '10px' }}>
                <CustomButton1 to="roomspage">Stays</CustomButton1>
                <CustomButton1 to="flightspage">Flights</CustomButton1>
                <CustomButton1 to="flighthotelpage">Flight + Hotel</CustomButton1>
            </Space>

            <Outlet /> {/* Здесь будет отображаться Secondpage */}

            {/*<Card style={{ width: 300, marginLeft: "20px" }}>
                <Space size={16}>
                    <Link to="/authorisepage">
                        <Button type="primary">Authorise</Button>
                    </Link>
                    <Link to="/authenticationpage">
                        <Button type="primary">Authenticate</Button>
                    </Link>
                </Space>
            </Card>*/}

        </>
    );

}
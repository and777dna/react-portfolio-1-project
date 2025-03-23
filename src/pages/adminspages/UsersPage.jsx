import { useSelector } from "react-redux";
import AntdFormAuth from "../../components/auth/AntdFormAuth";
import { useEffect } from "react";
import { Card } from "antd";
import RoomCard from "../../components/rooms/RoomCard";
import { useMutation } from "@tanstack/react-query";
import { fetchData } from "../../utils/https";

export default function UsersPage() {
    //TODO: buttons to add, delete a user
    //TODO: form to change a user

    const users = useSelector(state => state.user.user) || [];

    useEffect(() => {
        console.log("users:", users);
    }, [users]);

    const mutation = useMutation({
        //mutationFn: (updatedUser) => fetchData(url="http://localhost:3000/changeuser",  method="true", methodType="POST", value=updatedUser) ,
        mutationFn: (updatedUser) => fetchData("http://localhost:3000/changeuser",  true, "POST", updatedUser) ,
        onSuccess: (data) => {
            console.log("User updated successfully:", data);
        },
        onError: (error) => {
            console.error("Error updating user:", error);
        }
    })

    function changeUserValues(updatedUser) {
        //useMutation() to the server with parameter user, which will be identified by key
        mutation.mutate(updatedUser/*, {
            onSuccess: (data) => {//TODO: to return the result through fetchData() to user's state in Redux
                console.log("User updated successfully:", data);
            },//onSuccess: ... can be used here if i want to have it locally
            onError: (error) => {
                console.error("Error updating user:", error);
            }
        }*/)
    }

    return <>
        {/*<ul style={{ listStyleType: "none" }}>
            {users?.map((user, index) =>
                <li key={index}>
                    <h2>{user.name}</h2>
                </li>
            )}
        </ul>*/}
        <Card>
            <ul style={{display: "flex", gap: "10px", flexWrap: "wrap", padding: 0}}>
                {users?.map((user, index) => (
                    <li key={index} style={{listStyle: "none", width: "360px", padding: "20px"}}>
                        {/*TODO: to adjust CustomSlider.jsx to here*/}
                        <RoomCard
                            room={user}
                            functionsExists={false}
                            changeUserValues={() => changeUserValues(user)}
                        />
                    </li>
                ))}
            </ul>
        </Card>

        <Card>
            <RoomCard newForm={true} />
        </Card>

        <AntdFormAuth auth="true" authTypeExists="false"/>
    </>
}
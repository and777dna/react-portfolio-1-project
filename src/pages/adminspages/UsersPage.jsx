import { useSelector } from "react-redux";
import AntdFormAuth from "../../components/auth/AntdFormAuth";
import {useEffect, useMemo} from "react";
import { Card } from "antd";
import RoomCard from "../../components/rooms&users/RoomCard";
import { useMutation } from "@tanstack/react-query";
import { fetchData } from "../../utils/https";

export default function UsersPage() {

    const users = useSelector(state => state.user.user) || [];

    useEffect(() => {
        console.log("users:", users);
    }, [users]);

    /*const mutation2 = useMutation({
        mutationFn: ({ newUser, createUser }) => { //ya zaputalsya shto budet tut () => {} a potom tut {}
            return createUser ? fetchData("http://localhost:3001/users/createuser", true, "POST", newUser) : null;
        },
        onSuccess: (data) => {
            console.log("User created successfully:", data);
        },
        onError: (error) => {
            console.error("Error updating user:", error);
        }
    })



    const mutation = useMutation({
        mutationFn: (updatedUser) => fetchData("http://localhost:3001/users/changeuser",  true, "POST", updatedUser) ,
        onSuccess: (data) => {
            console.log("User updated successfully:", data);
        },
        onError: (error) => {
            console.error("Error updating user:", error);
        }
    })
    const mutation3 = useMutation({
        //should I write down user.id inside parameter to anonimous function?
        mutationFn: (userId) => {
            fetchData("http://localhost:3001/users/deleteuser", true, "DELETE", userId);
        },
        onSuccess: (data) => {
            console.log("User created successfully:", data);
        },
        onError: (error) => {
            console.error("Error updating user:", error);
        }
    })*/


    //TODO: to fetch() all of this to user's state in redux
    const combinedMutation = useMutation({
        mutationFn: async ({ updatedUser, newUser, userId, action }) => {
            // В зависимости от действия, выполняем соответствующие мутации
            if (action === 'create') {
                // Вызов mutation2 для создания пользователя
                //await mutation2.mutateAsync({ newUser, createUser: true });
                return fetchData("http://localhost:3001/users/createuser", true, "POST", newUser);
            } else if (action === 'update') {
                // Вызов mutation для обновления пользователя
                //await mutation.mutateAsync(updatedUser);
                return fetchData("http://localhost:3001/users/changeuser", true, "POST", updatedUser);
            } else if (action === 'delete') {
                // Вызов mutation3 для удаления пользователя
                //await mutation3.mutateAsync(userId);
                return fetchData("http://localhost:3001/users/deleteuser", true, "DELETE", userId);
            }
        },
        onSuccess: (data) => {
            console.log("Operation successful:", data);
        },
        onError: (error) => {
            console.error("Error:", error);
        }
    });

    //TODO: to create true/false parameter for changeUserValues to combine changeUserValues() with createUser()
    function changeUserValues(updatedUser) {
        //useMutation() to the server with parameter user, which will be identified by key
        console.log("Полученные обновленные данные in UsersPage:", updatedUser);
        /*mutation.mutate(updatedUser/!*, {
            onSuccess: (data) => {//TODO: to return the result through fetchData() to user's state in Redux
                console.log("User updated successfully:", data);
            },//onSuccess: ... can be used here if i want to have it locally
            onError: (error) => {
                console.error("Error updating user:", error);
            }
        }*!/)*/
        combinedMutation.mutate({ updatedUser, action: "update" })
    }

    function deleteUserValues(userId) {
        //mutation3.mutate(userId)
        combinedMutation.mutate({ userId, action: "delete" })
    }

    function createUser(newUser) {
        console.log("Полученные обновленные данные in newUser:", newUser);
        //mutation2.mutate({ newUser: newUser, createUser: true })
        combinedMutation.mutate({ newUser: newUser, createUser: true, action: "create" })
    }



    return <>
        <Card>
            <ul style={{display: "flex", gap: "10px", flexWrap: "wrap", padding: 0}}>
                {users?.map((user, index) => (
                    <li key={index} style={{listStyle: "none", width: "360px", padding: "20px"}}>
                        {/*TODO: to adjust CustomSlider.jsx to here*/}
                        <RoomCard
                            room={user}
                            functionsExists={false}
                            //changeUserValues={() => changeUserValues(user)}
                            changeUserValues={changeUserValues}
                            deleteUserValues={deleteUserValues}
                            //changeUserValues={() => changeUserValues(user)}
                        />
                    </li>
                ))}
            </ul>
        </Card>

        <Card>
            <RoomCard newForm={true} createUser={createUser}/>
        </Card>

        <AntdFormAuth auth="true" authTypeExists="false"/>
    </>
}
import { Button, Card, Input, Space } from "antd";
import { useEffect, useState } from "react";

export default function RoomCard({ room, addReservation, deleteReservation, functionsExists = true, newForm = false, changeUserValues, deleteUserValues, createUser }) {

    const [isUserDeleted, setIsUserDeleted] = useState(false)

    const [userState, setUserState] = useState({
        userr: {
            userName: room?.name,
            userPassword: room?.password,
            userRole: room?.role,
        },
        newUser: {
            name: "",
            password: "",
            role: ""
        }
    })

    useEffect(() => {
        console.log("Актуальные данные в состоянии userr:", userState.userr)
    }, [userState]);

    const updateUserr = (key, value) => {
        setUserState(
            (prevState) => ({
                ...prevState,
                userr: {
                    ...prevState.userr,
                    [key]: value
                }
            })
        )
    }

    const deleteUser = (user) => {
        console.log("deleteUser:", user)
        setIsUserDeleted(true)
        deleteUserValues(user)
    }

    const updateNewUser = (key, value) => {
        setUserState(
            prevState => ({
                    ...prevState,
                    newUser: {
                        ...prevState.newUser,
                        [key]: value
                    }
            })
        )
    }


    // Функция, которая вызывается при клике на кнопку
    const handleChangeUser = () => {
        const updatedUser = {
            name: userState.userr.userName,
            password: userState.userr.userPassword,
            role: userState.userr.userRole,
        }
        changeUserValues(updatedUser);
        /*const updatedUser = {
            name: userr.userName,  // Используем актуальные данные из состояния
            password: userr.userPassword,
            role: userr.userRole,
        };
        console.log("Отправляемые данные в родительский компонент:", updatedUser);
        changeUserValues(updatedUser);  // Вызываем функцию родительского компонента и передаем обновленные данные*/
    };

    const createUserValues = () => {
        createUser(userState.newUser)
    }

    return <>{
        !isUserDeleted &&
        <Card style={{ width: "100%" }}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
                {
                    newForm &&

                    <>
                        <div>
                            <Input placeholder="Name" onChange={ e => updateNewUser("name", e.target.value) }/>
                            <Input placeholder="Password" onChange={ e => updateNewUser("password", e.target.value) }/>
                            <Input placeholder="Role" onChange={ e => updateNewUser("role", e.target.value) }/>
                        </div>

                        <Space>
                            <Button
                                type="primary"
                                size="small"
                                //onClick={() => addReservation(room.id, "addBooking")}
                                //TODO:function to create a user
                                onClick={createUserValues}
                            >
                                Create new user
                            </Button>
                        </Space>
                    </>
                }


                {
                    !newForm && !functionsExists &&
                    <div>
                        <Input defaultValue={userState.userr.userName} onChange={(e) => updateUserr("userName", e.target.value)} />
                        <Input defaultValue={userState.userr.userPassword} onChange={(e) => updateUserr("userPassword", e.target.value)} />
                        <Input defaultValue={userState.userr.userRole} onChange={(e) => updateUserr("userRole", e.target.value)} />
                    </div>
                }

                {
                    !newForm && !functionsExists
                    &&
                    <Space>
                        <Button
                            type="primary"
                            size="small"
                            /*onClick={() => {
                                const updatedUser = {
                                    ...userr,
                                    name: userr.name,
                                    password: userr.password,
                                    role: userr.role,
                                }
                                console.log("updatedUser:",updatedUser)
                                changeUserValues(updatedUser)
                            }}*/
                            onClick={handleChangeUser}
                        >
                            Change user
                        </Button>

                        <Button
                            onClick={() => deleteUser(userState.userr)}
                        >
                            Delete user
                        </Button>
                    </Space>
                }

                {
                    !newForm && functionsExists
                    &&
                    <div>
                        <h2>{room.name}</h2>
                        <h3>{room.description}</h3>
                        <h3>Price: ${room.price}</h3>
                        <h3>availability - {room.availability}/{room.totalNumber}</h3>
                    </div>
                }

                {
                    !newForm && functionsExists
                    &&
                    <Space>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => addReservation(room.id, "addBooking")}
                        >
                            Add reservation
                        </Button>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => deleteReservation(room.id, "deleteBooking")}
                        >
                            Delete reservation
                        </Button>
                    </Space>
                }

            </Space>
        </Card>
    }
        </>
}
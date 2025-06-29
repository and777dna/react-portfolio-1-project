/*
import useRoomCard from "./useRoomCard";
import { Card, Space } from "antd";
import RoomCardInput from "./RoomCardInput";
import RoomCardInputItem, {roomsMap} from "./RoomCardInputItem";
import RoomCardButton from "./RoomCardButton";
import {FC, useId, useState} from "react";
import React from "react";

interface Room {
    id: number;
    name: string;
    password: string;
    role: string;
    description?: string;
    price?: number;
    availability?: Array<Record<string, any>>; // уточни, если знаешь точнее
}

/!*interface RoomCardParams {
    room: Room;
    addReservation: () => void;
    deleteReservation: () => void;
    functionsExists: boolean;
    newForm: boolean;
    changeUserValues: () => void;
    deleteUserValues: () => void;
    createUser: () => void;
}*!/

interface RoomCardParams {
    room: Room;
    addReservation: (id: string | number, type: string) => void;
    deleteReservation: (id: string | number, type: string) => void;
    functionsExists: boolean;
    newForm: boolean;
    changeUserValues: (user: { name: string; password: string; role: string }) => void;
    deleteUserValues: (user: { userName: string; userPassword: string; userRole: string }) => void;
    createUser: (user: { id: string | number; name: string; password: string; role: string }) => void;
}


const RoomCard: FC<RoomCardParams> = ({ room, addReservation, deleteReservation, functionsExists = true, newForm = false, changeUserValues, deleteUserValues, createUser }) => {
    const id = useId()//TODO: to use useId() only if i create new user

    const [isUserDeleted, setIsUserDeleted] = useState(false)

    const [userState, setUserState] = useState({
        userr: {
            userName: room?.name,
            userPassword: room?.password,
            userRole: room?.role,
        },
        newUser: {
            id: id,
            name: "",
            password: "",
            role: ""
        }
    })

    const { updateUserr, deleteUser, updateNewUser, handleChangeUser, createUserValues } = useRoomCard({id: id, userState, setUserState, setIsUserDeleted, changeUserValues, deleteUserValues, createUser})

    /!*const [isUserDeleted, setIsUserDeleted] = useState(false)

    const [userState, setUserState] = useState({
        userr: {
            userName: room?.name,
            userPassword: room?.password,
            userRole: room?.role,
        },
        newUser: {
            id: id,
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
    };


    const createUserValues = () => {
        createUser(userState.newUser)
    }*!/

    return <>{
        !isUserDeleted &&
        <Card style={{ width: "100%" }}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>


                {/!*TODO: componentVV1 for this*!/}
                {
                    newForm &&

                    <>
                        <RoomCardInput>
                            <RoomCardInputItem placeholder="Namee" onChange={ e => updateNewUser("name", e.target.value)} />
                            <RoomCardInputItem placeholder="Password" onChange={ e => updateNewUser("password", e.target.value)} />
                            <RoomCardInputItem placeholder="Role" onChange={ e => updateNewUser("role", e.target.value)} />
                        </RoomCardInput>


                        <RoomCardButton customFunction={createUserValues} customText="Create new user" buttonType="primary" buttonSize="small"/>

                    </>
                }

                {/!*TODO: componentVV1 for this*!/}
                {
                    !newForm && !functionsExists &&
                    <RoomCardInput>
                        <RoomCardInputItem defaultValue={userState.userr.userName} onChange={(e) => updateUserr("userName", e.target.value)} />
                        <RoomCardInputItem defaultValue={userState.userr.userPassword} onChange={(e) => updateUserr("userPassword", e.target.value)} />
                        <RoomCardInputItem defaultValue={userState.userr.userRole} onChange={(e) => updateUserr("userRole", e.target.value)} />
                    </RoomCardInput>
                }

                {/!*TODO: componentVV1 for this*!/}
                {
                    !newForm && !functionsExists
                    &&
                    <Space>
                        <RoomCardButton customFunction={handleChangeUser} customText="Change user" buttonType="primary" buttonSize="small"/>

                        <RoomCardButton customFunction={() => deleteUser(userState.userr)} customText="Delete user" buttonSize="small"/>
                    </Space>
                }

                {/!*TODO: componentVV2 for this or may be some component inside already exists*!/}
                {
                    !newForm && functionsExists
                    &&
                    <div>//TODO: TTTTT
                        <RoomCardInputItem>{room.name}</RoomCardInputItem>
                        <RoomCardInputItem>{room.description}</RoomCardInputItem>
                        <RoomCardInputItem>Price: ${room.price}</RoomCardInputItem>
                        {/!*<h2>{room.name}</h2>
                        <h3>{room.description}</h3>
                        <h3>Price: ${room.price}</h3>*!/}
                        {/!*<h3>availability - {room.availability.map((keyOfValue) => {
                            return { keyOfValue: keyOfValue }
                        })}</h3>TODO: to create function for this maybe*!/}
                        <ul>
                            {roomsMap(room)}
                            {/!*<li>
                                {room.availability.map((keyOfValue) => {
                                    const value = Object.values(keyOfValue)
                                    const key = Object.keys(keyOfValue)
                                    const keyValue = Object.entries(keyOfValue)//TODO:to add like [key, value] in

                                    console.log("value:",value, typeof(value), Object.values(keyOfValue), Object.entries(keyOfValue))
                                    console.log("keyValue:",keyValue)
                                    return <>
                                        <h3>{value}</h3>
                                        <h3>{key}: {value}</h3>
                                    </>
                                    // return { value }
                                })}
                            </li>*!/}
                        </ul>
                        {/!*<h3>availability - {room.availability}/{room.totalNumber}</h3>*!/}
                    </div>
                }

                {/!*TODO: componentVV1 for this*!/}
                {
                    !newForm && functionsExists
                    &&
                    <Space>
                        <RoomCardButton customFunction={() => addReservation(room.id, "addBooking")} customText="Add reservation" buttonType="primary" buttonSize="small"/>
                        <RoomCardButton customFunction={() => deleteReservation(room.id, "deleteBooking")} customText="Delete reservation" buttonType="primary" buttonSize="small"/>
                    </Space>
                }

            </Space>
        </Card>
    }
    </>
}

export default RoomCard;*/

import { Button, Card, Input, Space } from "antd";
import { useEffect, useState } from "react";

export default function RoomCard({ room, addReservation, deleteReservation, functionsExists = true, newForm = false, changeUserValues }) {

    const [userr, setUserr] = useState({
        userName: room?.name,
        userPassword: room?.password,
        userRole: room?.role,
    })

    useEffect(() => {
        console.log("Актуальные данные в состоянии userr:", userr)
    }, [userr]);

    // Функция, которая вызывается при клике на кнопку
    const handleChangeUser = () => {
        const updatedUser = {
            name: userr.userName,  // Используем актуальные данные из состояния
            password: userr.userPassword,
            role: userr.userRole,
        };
        console.log("Отправляемые данные в родительский компонент:", updatedUser);
        changeUserValues(updatedUser);  // Вызываем функцию родительского компонента и передаем обновленные данные
    };

    return <Card style={{ width: "100%" }}>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
            {
                newForm &&

                <>
                    <div>
                        <Input placeholder={""}/>
                        <Input placeholder={""}/>
                        <Input placeholder={""}/>
                    </div>

                    <Space>
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => addReservation(room.id, "addBooking")}

                        >
                            Create new user
                        </Button>
                    </Space>
                </>
            }


            {
                !newForm && !functionsExists &&
                <div>
                    <Input defaultValue={userr.userName} onChange={(e) => setUserr(prev => ({ ...prev, userName: e.target.value }))} />
                    <Input defaultValue={userr.userPassword} onChange={(e) => setUserr(prev => ({ ...prev, userPassword: e.target.value }))} />
                    <Input defaultValue={userr.userRole} onChange={(e) => setUserr(prev => ({ ...prev, userRole: e.target.value }))} />
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
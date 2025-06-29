import { useEffect } from "react";

export default function useRoomCard({ id, userState, setUserState, setIsUserDeleted, changeUserValues, deleteUserValues, createUser }) {

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
    }

    return {
        updateUserr,
        deleteUser,
        updateNewUser,
        handleChangeUser,
        createUserValues,
    }
}
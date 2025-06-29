import { useEffect } from "react";

interface RoomCardParams {
    id: number;
    //userState: object;//i am not sure
    userState: UserState;
    //setUserState: (state: object) => void;
    setUserState: (state: (prevState: UserState) => UserState) => void;
    setIsUserDeleted: (state: boolean) => void;
    changeUserValues: (state: { password: string; role: string; name: string }) => void;
    deleteUserValues: (state: User) => void;
    createUser: (state: User) => void;
}

interface User {
    id?: string;
    userName: string;
    userPassword: string;
    userRole: string;
}

interface UserState {
    userr: User;
    newUser: User;
}


//const useRoomCard: React.FC<RoomCardParams> = ({ id, userState, setUserState, setIsUserDeleted, changeUserValues, deleteUserValues, createUser }) => {
const useRoomCard = ({ id, userState, setUserState, setIsUserDeleted, changeUserValues, deleteUserValues, createUser }: RoomCardParams) => {
    useEffect(() => {
        console.log("Актуальные данные в состоянии userr:", userState.userr)
    }, [userState]);

    const updateUserr = (key: keyof User, value: string) => {//keyof User???  value: string?? why string
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

    const deleteUser = (user: User) => {
        console.log("deleteUser:", user)
        setIsUserDeleted(true)
        deleteUserValues(user)
    }

    const updateNewUser = (key: keyof User, value: string) => {
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

export default useRoomCard
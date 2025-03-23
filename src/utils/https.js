//import { useDispatch } from "react-redux";
//import {setIsAdmin} from "../redux/user-slice";

export async function fetchData(url, method = false, methodType, value) {
    try {
        let response;
        if (method) {
            await fetch(url, {
                method: methodType,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            })
        } else {
            response = await fetch(url);
        }

        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e, "error fetching data");
    }
}

export let isAdmin = false;


export async function authData({ url, values }){
    //const dispatch = useDispatch()
    try {//URL === (http://localhost:3000/authpage?mode=Authenticate || http://localhost:3000/authpage?mode=Authorise)
        const response = await fetch( url , {
        //const response = await fetch( url , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: values.username, password: values.password, mode: values.url}),
        });
        const data = await response.json();

        const isAdmin = data.role === "admin";
        //dispatch(setIsAdmin(isAdmin));

        console.log(data);
        console.log(data.token)
        const token = data.token;
        localStorage.setItem("token", token);
        return data;
    } catch (e) {
        console.log(e, "error fetching data");
    }
}
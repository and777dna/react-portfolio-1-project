import { redirect } from "react-router-dom";

export function action() {
    console.log("Удаление токена из localStorage");
    localStorage.removeItem("token");
    console.log("1. clickedButton");


    return redirect(`/`);
}
export default function somethingWithAuth(token){
    return localStorage.getItem(token);//or maybe setItem()???
}

export function getAuthToken() {
    //somethingWithAuth();//but i should take this funcctoin
    console.log("I am inside getAuthToken()");
    return localStorage.getItem("token");
}
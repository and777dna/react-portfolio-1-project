export default function somethingWithAuth(token){
    return localStorage.getItem(token);//or maybe setItem()???
}

export function getAuthToken() {
    //somethingWithAuth();//but i should take this funcctoin
    return localStorage.getItem("token");
}
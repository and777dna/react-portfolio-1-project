export async function fetchData(url, method = false, methodType, value) {
    //console.log("url, methodType, value, method:" , url, methodType, value, method);
    try {
        let response;
        if ( method ) {//TODO: method to methodExist
            //console.log("I am inside fetchData")
            console.log("urlll:",url);
            response = await fetch(url, {
                method: methodType,
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({ changeduser: value }),//TODO: to change "changeduser" to other key
            })
        } else {
            response = await fetch(url);
        }

        const data = await response.json();
        console.log("url, dataaa:",url, data);
        return data;
    } catch (e) {
        console.log(e, "error fetching data");
    }
}



//TODO: to understand when should i use {request} or request
export async function authData( request ) {
    //const formData = await request.formData();
    console.log("0.export async function authData({ request })");
    const formData = await request.values;
    const url = await request.url;
    console.log("1.export async function authData({ request })");
    console.log("formData:", formData);
    //const values = Object.fromEntries(formData);
    const values = formData;
    console.log("values:", values);



    try {//authenticationpage
        //const response = await fetch("/login", {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: values.username, password: values.password })
        });

        const data = await response.json();
        //dispatch(setIsAdmin(data.role)); // Обновляем Redux //TODO: to give this to App.js in some way

        console.log("Updated isAdmin:", data.role);
        //TODO: to return in some way data||data.role(may be through component where i use it like action it to creaate context)
        localStorage.setItem("token", data.token);
        localStorage.setItem("adminRole", data.role);

        return data;
    } catch (e) {
        console.error("Auth error:", e);
    }
}
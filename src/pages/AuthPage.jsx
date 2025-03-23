import AntdFormAuth from "../components/auth/AntdFormAuth";
import { authData } from "../utils/https";
import { redirect, useParams } from "react-router-dom";


export default function AuthPage() {
    const { authType } = useParams(); // Получаем часть URL
    const auth = authType === "authenticationpage"; // Определяем auth по маршруту

    return <AntdFormAuth auth={auth} authType={authType}/>;
}
/*export default function AuthPage() {
    return <AntdFormAuth />
}*/

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    console.log("formData:", Object.fromEntries(formData));
    console.log("request:",request)
    console.log("data.button:",data.url)

    //const params = new URL(window.location.href).searchParams
    const baseURL = new URL(window.location.href)//WITHOUT DEBUG 'http://localhost:3000'
    console.log("new URL(window.location.href).searchParams:",baseURL)

    baseURL.port = "3001";  // Меняем порт на 3001
    baseURL.searchParams.set("mode", data.url)
    console.log("baseURL:",baseURL.toString())
    const url = baseURL.toString();


    //const ButtonValue = mode || {buttonValue};//WITHOUT DEBUG 'http://localhost:3000' && "mode=buttonValue"
    /*const [searchParams, setSearchParams] = useSearchParams();
    const currentMode = searchParams.get("mode") || "authorise"; // Значение по умолчанию
    const [authText, setAuthText] = useState(currentMode);*/



    const values = Object.fromEntries(formData.entries());

    console.log("values I got inside action:",values);
    console.log("{values: values}:",{values: values});
    await authData({url: url, values: values})
    return redirect(`/`);
}
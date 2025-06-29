import AntdFormAuth from "../components/auth/AntdFormAuth";
import { authData } from "../utils/https";
import { useActionData, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin, setToken } from "../redux/user-slice";



export default function AuthPage() {
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.user.isAdmin)
    const { authType } = useParams(); // Получаем часть URL
    const auth = authType === "authenticationpage"; // Определяем auth по маршруту

    const data = useActionData()//TODO:to find out how this works in right way

    const navigate = useNavigate()

    console.log("isAdmin = useSelector:", isAdmin);

    if (data) {
        dispatch(setIsAdmin(data.role))
        dispatch(setToken(data.token))
        navigate("/")
    }
    console.log("useActionData():", data);
    //TODO: redux include data

    return <AntdFormAuth auth={auth} authType={authType}/>;
}

//TODO: it works as action through react-router
export const action = async ({ request }) => {
    const formData = await request.formData();//TODO: from this moment i got some trouble
    const data = Object.fromEntries(formData);

    console.log("formData:", Object.fromEntries(formData));
    console.log("request:",request)
    console.log("data.button:",data.url)

    //const params = new URL(window.location.href).searchParams
    const baseURL = new URL(window.location.href)//WITHOUT DEBUG 'http://localhost:3000'
    console.log("new URL(window.location.href).searchParams:",baseURL)

    baseURL.port = "3001";  // Меняем порт на 3001
    baseURL.searchParams.set("mode", data.url)//this or above I should make to Authencticate
    console.log("baseURL:",baseURL.toString())
    const url = baseURL.toString();


    //const ButtonValue = mode || {buttonValue};//WITHOUT DEBUG 'http://localhost:3000' && "mode=buttonValue"
    /*const [searchParams, setSearchParams] = useSearchParams();//TODO: to make this work
    const currentMode = searchParams.get("mode") || "authorise"; // Значение по умолчанию
    const [authText, setAuthText] = useState(currentMode);*/



    const values = Object.fromEntries(formData.entries());

    const dataToSend = {url: url, values: values}
    console.log("dataToSend");
    console.log("dataToSend:",dataToSend);
    console.log("dataToSend.url:",dataToSend.url);
    //await authData({ dataToSend: dataToSend })
    //await authData({url: url, values: values})
    const dataForUseActionData = await authData({url: url, values: values});
    console.log("return redirect(`/`);return redirect(`/`);return redirect(`/`);return redirect(`/`);return redirect(`/`);");
    return dataForUseActionData;
    //return redirect(`/`);
}
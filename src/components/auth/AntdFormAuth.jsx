import { useSubmit } from "react-router-dom";
import AntdFormAuthUI from "./AntdFormAuthUI";
import useOnFinish, { handleButtonClick, onFinishFailed } from "./authFunctions/authFunctions";

export default function AntdFormAuth({ auth = true, authType, authTypeExists = true }) {

    const submit = useSubmit()//TODO: i think i would rather use useFetcher() here to both send and get data

    const onFinish = useOnFinish({  authTypeExists: authTypeExists, authType: authType, submit: submit })

    //TODO:to create accordion design pattern(or may be not for this component)
    //TODO: to understand (values) => onFinish(values)
    return <AntdFormAuthUI onFinish={(values) => onFinish(values)} onFinishFailed={onFinishFailed} auth={auth} handleButtonClick={() => handleButtonClick()} />
}
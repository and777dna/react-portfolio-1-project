import { useSubmit } from "react-router-dom";
import AntdFormAuthUI from "./AntdFormAuthUI";
import useOnFinish, { handleButtonClick, onFinishFailed, AuthFormValues } from "./authFunctions/authFunctions";
import React from "react";

interface AntdFormAuthParams {
    auth?: boolean;
    authTypeExists?: boolean;
    //authType: string;//I am not sure at all
    authType: 'authorisepage' | 'authenticationpage';//I am not sure at all
}

/*type AuthFormValues = {
    username: string;
    password: string;

    email?: string;
    confirmPassword?: string;
}*/

const AntdFormAuth: React.FC<AntdFormAuthParams> = ({ auth = true, authType, authTypeExists = true }) => {
    const submit = useSubmit()
    const onFinish = useOnFinish({  authTypeExists: authTypeExists, authType: authType, submit: submit })

    return <AntdFormAuthUI onFinish={(values: AuthFormValues) => onFinish(values)} onFinishFailed={onFinishFailed} auth={auth} handleButtonClick={() => handleButtonClick()} />
}

export default AntdFormAuth;

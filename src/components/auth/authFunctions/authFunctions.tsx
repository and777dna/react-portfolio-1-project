import { SubmitFunction } from "react-router-dom";
import { FormProps } from "antd";

export const onFinishFailed: FormProps<any>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


export const handleButtonClick = () => {
    console.log("0. Button was clicked!");
};

interface UseOnFinishParams {
    authTypeExists: boolean;
    authType: string;
    submit: SubmitFunction;
}

// Тип данных формы
export type AuthFormValues = {
    username: string;
    password: string;
    email?: string;
    confirmPassword?: string;
};

const useOnFinish = ({ authTypeExists, authType, submit }: UseOnFinishParams) => {
    const onFinish = (values: AuthFormValues) => {
        if (authTypeExists) {
            console.log("authType:", authType);
            //values.url = authType;
            (values as any).url = authType;

            const formData = new FormData();
            for (const key in values) {
                //formData.append(key, values[key]);
                formData.append(key, values[key as keyof AuthFormValues] as string);
            }

            console.log("useSubmit():", Object.fromEntries(formData.entries()));

            submit(formData, {
                method: "post"
                // action: "/authpage" // можно указать, если хочешь переопределить маршрут
            });
        }
    };

    return onFinish;
};

export default useOnFinish;
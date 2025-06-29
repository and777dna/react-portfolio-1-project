export const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export const handleButtonClick = () => {
    console.log("0. Button was clicked!");
};

export default function useOnFinish({ authTypeExists, authType, submit }) {
    const onFinish = (values) => {
        //values.button = textButton; // Вставляем текст кнопки в values AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        if (authTypeExists) {
            console.log("authType:", authType)
            values.url = authType;
            const formData = new FormData();
            for (const key in values) {
                formData.append(key, values[key]);
            }

            console.log("useSubmit():", Object.fromEntries(formData.entries()));//why i wont see anything if i will type in just formData???

            submit(formData, {//I am sending it programatically to react-router => exists a way to fetch programatically.
                method: "post",//TODO: maybe i should delete "post" especially if i have i t inside https.js authdata()
                //action: "/authpage"//do i need action here????
            })
        }
    }

    return onFinish;
}
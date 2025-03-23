import { Button, Card, Form, Input } from "antd";
import { useSubmit } from "react-router-dom";

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function AntdFormAuth({ auth = true, authType, authTypeExists = true }) {

    const handleButtonClick = () => {
        console.log("0. Button was clicked!");
    };


    const submit = useSubmit()
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
            /*const valuesInsideForm = Object.fromEntries(formData.entries());
            const AuthoriseOrAuthencticate = valuesInsideForm.button;
            console.log("AuthoriseOrAuthencticate:", AuthoriseOrAuthencticate);*/

            submit(formData, {
                method: "post",
                //action: "/authpage"//do i need action here????
            })
        }

    }

    return <Card style={{
        width: 300,
        marginLeft: "20px"
    }}>
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>


            {!auth && (
                <>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: "email", message: "Please enter a valid email!" }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Passwords do not match!"));
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </>
            )}


            {/*<Button type="primary" onClick={onClick}>{textButton}</Button>/!*AAAAAAAAAAAAAAAAAAAAAAA*!/*/}


            <Form.Item label={null}>
                <Button onClick={handleButtonClick} type="primary" htmlType="submit">
                    Submit

                    {/*autorisation/authentication */}
                </Button>
            </Form.Item>
        </Form>
    </Card>
}
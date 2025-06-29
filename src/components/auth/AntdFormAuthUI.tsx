import { FC } from "react";
import {Button, Card, Form, FormProps, Input} from "antd";
import React from "react";

type AuthFormValues = {
    username: string;
    password: string;
    email?: string;
    confirmPassword?: string;
};

interface AntdFormAuthUIParams {
    onFinish: (values: AuthFormValues) => void;
    onFinishFailed: FormProps<any>["onFinishFailed"];
    auth?: boolean;
    handleButtonClick: () => void;
}


const AntdFormAuthUI: FC<AntdFormAuthUIParams> = ({onFinish, onFinishFailed, auth, handleButtonClick}) => {
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

export default AntdFormAuthUI;
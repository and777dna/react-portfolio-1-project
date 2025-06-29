import React from "react";
import {Button, Card, Space} from "antd";
import {Link} from "react-router-dom";

export default function AuthCard() : React.ReactElement {
    return <Card style={{ width: 300, marginLeft: "20px" }}>
        <Space size={16}>
            <Link to="/authorisepage">
                <Button type="primary">Authorise</Button>
            </Link>
            <Link to="/authenticationpage">
                <Button type="primary">Authenticate</Button>
            </Link>
        </Space>
    </Card>
}
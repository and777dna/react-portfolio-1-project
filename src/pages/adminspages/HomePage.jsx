import { Outlet } from "react-router-dom";
import { CustomButton1 } from "../../components/buttons/CustomButton1";
import { Space  } from "antd";

export default function HomePage() {
    console.log('HomePage');
    return <>
        <h2>
            Home Page
        </h2>

        <Space style={{ padding: '10px' }}>
            <CustomButton1 to="usersinfo">usersinfo</CustomButton1>
            <CustomButton1 to="hotelsinfo">hotelsinfo</CustomButton1>
        </Space>

        <Outlet /> {/*I am not sure if I need <Outlet /> here*/}
    </>
}
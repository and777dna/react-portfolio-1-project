import { Space } from "antd";
import CustomButton1 from "../buttons/CustomButton1";
import React from "react";

interface DefaultNavLinksParams {
    defaultLinks?: boolean,
    children?: React.ReactNode,
}

const DefaultNavLinks: React.FC<DefaultNavLinksParams> = ({ defaultLinks = true, children }) => {
    return <>
        {defaultLinks &&
            <Space style={{ padding: '10px' }}>
                <CustomButton1 to="roomspage">Stays</CustomButton1>
                <CustomButton1 to="flightspage">Flights</CustomButton1>
                <CustomButton1 to="flighthotelpage">Flight + Hotel</CustomButton1>
            </Space>
        }

        {
            !defaultLinks &&
            <Space style={{ padding: '10px' }}>
                {children}
            </Space>
        }
    </>
}

export default DefaultNavLinks;
import { CustomButton1 } from "../buttons/CustomButton1";
import { Space } from "antd";

export default function DefaultNavLinks({defaultLinks = true, children}) {
    //TODO: to create different NavLinks according to the entry parameters
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
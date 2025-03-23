import CustomButton from "../components/buttons/CustomButton";
import { Tabs } from "antd";
import items from "../components/rooms/TabsData";
import SearchInput from "../components/search/SearchInput";
import CustomSlider from "../components/slider/CustomSlider";
import { useRoomsData } from "../hooks/useRoomsData";
import { useCategorizedRooms } from "../hooks/useCategorizedRooms";
import CustomSliderShow from "../components/slider/CustomSliderShow";



export default function RoomsPage() {

    const { addReservation, deleteReservation, roomsData } = useRoomsData();
    const categorizedRooms = useCategorizedRooms({ roomsData: roomsData })


    return <>
        <h2>
            second page
        </h2>

        <SearchInput />


        <div>
            <CustomButton>children prop</CustomButton>
            <CustomButton kind="float" onClick={() => console.log('onClick')}/>
        </div>


        <Tabs
            defaultActiveKey="1"
            //items={items}
            items={items(categorizedRooms, addReservation, deleteReservation)}

            indicator={{
                size: (origin) => origin - 20,
                align: "center",
            }}
        />

        {/*<CustomSlider rooms={categorizedRooms.Outdoors} />*/}
        <CustomSlider>
            <CustomSliderShow rooms={categorizedRooms.Outdoors} />
        </CustomSlider>

    </>
}
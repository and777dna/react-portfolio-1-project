import RoomsList from "./RoomsList";
import CustomSliderShow from "../slider/CustomSliderShow";
import CustomSlider from "../slider/CustomSlider";
import {Button} from "antd";
//TODO: 3 tip: to create useContext for "addReservation, deleteReservation"
export const itemsForCities = ( categorizedRelativeLocations ) => [
    {
        key: "1",
        label: "domesticcities",
        children: (
            categorizedRelativeLocations.domesticcities.map((location, index) => {

                    return <Button type="link" key={index}>{location.id}</Button>

                })
        ),
    },
    {
        key: "2",
        label: "internationalcities",
        children: (
            categorizedRelativeLocations.internationalcities.map((location, index) => {

                return <Button type="link" key={index}>{location.id}</Button>

            })
        ),
    },
    {
        key: "3",
        label: "regions",
        children: (
            categorizedRelativeLocations.regions.map((location, index) => {

                return <Button type="link" key={index}>{location.id}</Button>

            })
        ),
    },
    {
        key: "4",
        label: "countries",
        children: (
            categorizedRelativeLocations.countries.map((location, index) => {

                return <Button type="link" key={index}>{location.id}</Button>

            })
        ),
    },
    {
        key: "5",
        label: "placestostay",
        children: (
            categorizedRelativeLocations.placestostay.map((location, index) => {

                return <Button type="link" key={index}>{location.id}</Button>

            })
        ),
    }

]

//const categorizedRooms = {'City':[{},{},{},{}], 'Beach':[{},{},{},{}], 'Outdoors':[{},{},{},{}]}
const items = ( categorizedRooms, addReservation, deleteReservation ) => [
    {
        key: "1",
        label: "City",
        children: (//TODO: TTTTT
            // <RoomsList categorizedRooms={categorizedRooms.City} addReservation={addReservation} deleteReservation={deleteReservation} />
            <CustomSlider country="RU">{/*TODO: to change to something else this afterwards*/}
                <CustomSliderShow rooms={categorizedRooms.City} />
            </CustomSlider>
        ),
    },
    {
        key: "2",
        label: "Beach",
        children: (
            <CustomSlider country="RU">{/*TODO: to change to something else this afterwards*/}
                <CustomSliderShow rooms={categorizedRooms.Beach} />
            </CustomSlider>
            // <RoomsList categorizedRooms={categorizedRooms.Beach} addReservation={addReservation} deleteReservation={deleteReservation} />
        ),
    },
    {
        key: "3",
        label: "Outdoors",
        children: (
            <CustomSlider country="RU">{/*TODO: to change to something else this afterwards*/}
                <CustomSliderShow rooms={categorizedRooms.Outdoors} />
            </CustomSlider>
            // <RoomsList categorizedRooms={categorizedRooms.Outdoors} addReservation={addReservation} deleteReservation={deleteReservation} />
        ),
    },
];

export const itemsWithSlider = (categorizedRooms) => [
    {
        key: "1",
        label: "City",
        children: (
             <RoomsList categorizedRooms={categorizedRooms.City} />
           /* <CustomSlider> TODO: 666
                <CustomSliderShow rooms={categorizedRooms.City} />
            </CustomSlider>*/
        ),
    },
    {
        key: "2",
        label: "Beach",
        children: (
            <RoomsList categorizedRooms={categorizedRooms.Beach} />
        ),
    },
    {
        key: "3",
        label: "Outdoors",
        children: (
            <RoomsList categorizedRooms={categorizedRooms.Outdoors} />
        ),
    },
];

export default items;
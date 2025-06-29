/*
import { Button } from "antd";
import React from "react";
import RoomsList from "./RoomsList";
import CustomSliderShow from "../slider/CustomSliderShow";
import CustomSlider from "../slider/CustomSlider";

interface Location {
    id: string | number;
}

interface CategorizedRelativeLocations {
    domesticcities: Location[];
    internationalcities: Location[];
    regions: Location[];
    countries: Location[];
    placestostay: Location[];
}


const itemsForCities = ( categorizedRelativeLocations: CategorizedRelativeLocations ) => [
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

export itemsForCities



interface CategorizedRooms {
    City: ;
    Beach: ;
    Outdoors: ;
}

const items = ( categorizedRooms: CategorizedRooms, addReservation: (state: boolean) => void, deleteReservation: (state: boolean) => void; ) => [
    {
        key: "1",
        label: "City",
        children: (//TODO: TTTTT
            // <RoomsList categorizedRooms={categorizedRooms.City} addReservation={addReservation} deleteReservation={deleteReservation} />
            <CustomSlider>
                <CustomSliderShow rooms={categorizedRooms.City} />
            </CustomSlider>
        ),
    },
    {
        key: "2",
        label: "Beach",
        children: (
            <RoomsList categorizedRooms={categorizedRooms.Beach} addReservation={addReservation} deleteReservation={deleteReservation} />
        ),
    },
    {
        key: "3",
        label: "Outdoors",
        children: (
            <RoomsList categorizedRooms={categorizedRooms.Outdoors} addReservation={addReservation} deleteReservation={deleteReservation} />
        ),
    },
]


export items




const itemsWithSlider = (categorizedRooms) => []

export default itemsWithSlider;
*/

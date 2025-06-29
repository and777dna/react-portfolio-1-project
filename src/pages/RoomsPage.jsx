import CustomButton from "../components/buttons/CustomButton";
import { Button, Card, Tabs } from "antd";
import items, { itemsForCities, itemsWithSlider } from "../components/rooms&users/TabsData";
import SearchInput from "../components/search/SearchInput";
import CustomSlider from "../components/slider/CustomSlider";
import { useRoomsData } from "../hooks/useRoomsData";
import { useCategorizedRooms } from "../hooks/useCategorizedRooms";
import CustomSliderShow from "../components/slider/CustomSliderShow";
import {useCallback, useEffect, useMemo, useState} from "react";
import { Link, Outlet} from "react-router-dom";
import DefaultNavLinks from "../components/navigation/DefaultNavLinks";
import AuthCard from "../components/auth/AuthCard";
import { getAuthToken } from "../utils/auth";
import { fetchData } from "../utils/https";
import {useQueries, useQuery} from "@tanstack/react-query";
import { CustomButton1 } from "../components/buttons/CustomButton1";
import { useDispatch } from "react-redux";
import { setSortedType } from "../redux/availability-slice";
import FetchDataUseQuery from "../utils/FetchDataUseQuery";
import CustomSliderV1 from "../components/slider/CustomSliderV1";

const itemsForCity = ["domesticcities","internationalcities","regions","countries","placestostay"]

//TODO: 1
export default function RoomsPage() {
    const token = getAuthToken()



    /*useEffect(() => {
        const testingData = fetchData("http://localhost:3001/services/sort/uniqueProperty", true, "PUT")
        console.log("testingData:", testingData)
    }, []);*/
    const [testingData, setTestingData] = useState(null);

    /*useEffect(() => {
        fetchData("http://localhost:3001/services/sort/uniqueProperty", true, "PUT")
            .then(data => setTestingData(data));//.then() to control if we want to send a request for the second time, but to ask this then to chatGPT
    }, []);*/

    /*/!*const uniquePropertyReturnData = FetchDataUseQuery("http://localhost:3001/services/sort/uniqueProperty")
    console.log(uniquePropertyReturnData)
    //Russia, type=true
    const typeReturnData = FetchDataUseQuery("http://localhost:3001/services/sort/type")//TODO: to add Russia there
    console.log(typeReturnData)*!/
    //uniqueProperty, type => return {uniqueProperty: [{},{},{}], type: [{},{},{}]}
    /!*const typeReturnData = FetchDataUseQuery("http://localhost:3001/services/sort/type", {sortTypes: ["uniqueProperty", "type"]})//TODO: to add Russia there
    console.log(typeReturnData)*!/
    useEffect(() => {
        fetchData("http://localhost:3001/services/sort/uniqueProperty", true, "PUT")
            .then(data => setTestingData(data));//.then() to control if we want to send a request for the second time, but to ask this then to chatGPT
    }, []);
    useEffect(() => {
        fetchData("http://localhost:3001/services/sort/type", true, "PUT")
            .then(data => setTestingData(data));//.then() to control if we want to send a request for the second time, but to ask this then to chatGPT
    }, []);*///nothing from this doesnt work

    const sortTypes = ["uniqueProperty", "type", "CZ", "sales"];
    //const sortTypes = ["CZ", "uniqueProperty", "type"];
    //const results = FetchDataUseQuery("http://localhost:3001/services/sort", { sortTypes });
    const { results, pending } = FetchDataUseQuery("http://localhost:3001/services/sort", { sortTypes });

    //console.log("results:", results.data[0])

    /*custom hook to catch rooms with useDispatch() and useSelector() redux,
    to refetch after adding/deleting reservation after useDispatch()

    RETURN PARAMS: addReservation, deleteReservation, roomsData,
    RETURN DATA: [{"id": "service123", "name": "Hotel Room", ...},{...}, ...]
    *///TODO: maybe  useRoomsData() and useCategorizedRooms() to return the same data type
    const { addReservation, deleteReservation, roomsData } = useRoomsData();//TODO:inside backend already

    /*function to filter rooms according to category using useMemo() in case if after change some category will be changed

    RETURN PARAMS: filtered rooms
    RETURN DATA: { City: roomsData.filter(room => room.category.includes("City")), Beach: ..., ... };
    RETURN DATA: //const categorized = {'City':[{},{},{},{}], 'Beach':[{},{},{},{}], 'Outdoors':[{},{},{},{}]}
    */
    const categorizedRooms = useCategorizedRooms({ roomsData: roomsData, categorises: ['City', 'Beach', 'Outdoors'], relativeLocation: false })
    const categorizedRelativeLocations = useCategorizedRooms({roomsData: roomsData, categorises: false, relativeLocation: ['domesticcities', 'internationalcities', 'regions', 'countries', 'placestostay']} )//TODO: to create locations inside database relative to my current location
    console.log("categorizedRelativeLocations:", categorizedRelativeLocations)
    console.log("categorizedRooms:", categorizedRooms)

    //TODO: to merge "value" and "resultOfOptions" in some way
    //TODO: FIRST: to display Card dynamically "Comfortable room for {value} people." and to show price for {value}
    //TODO: SECOND: to send "value" to the server
    //TODO: TTTTT
    const [value, setValue] = useState([2, 0, 1])
    const [resultOfOptions, setResultOfOptions] = useState("")
    console.log("resultOfOptions, value:",resultOfOptions, value)

    const paramsToGive = {
        value,
        setValue,
        resultOfOptions,
        setResultOfOptions
    }

    const dispatch = useDispatch()
    function onClickSetSortedType(city) {
        console.log("onCLick={() => onClickSetSortedType(city)}", city)
        dispatch(setSortedType(city))//created now
    }


    //TODO: to create logic to find cities on backend or on frontend?
    const { data, isLoading, isError, error } = useQuery({ queryFn: () => fetchData("http://localhost:3001/holidays/cities"), queryKey: ['citiesForHolidays'] })
    let citiesForHolidays = data || [];//[] will be returned
    useEffect(() => {
        console.log("citiesForHolidays:",citiesForHolidays)
        console.log("citiesForHolidays.length:",citiesForHolidays.length)
        console.log("citiesForHolidays.length - 2:",citiesForHolidays.length - 2)
    }, [citiesForHolidays]);
    if (isLoading) {
        return <h2>Loading data...</h2>
    }
    if (isError) {
        return <h2>Error loading data {error}...</h2>//I am not sure about {error}, shouldnt it be like {isError.error} or {data.error}
    }
    //TODO: step 2
    /*if (holidays) {//TODO: useQuery() instead
        fetch("distinct-database/holidays")
        let sortedAccordingToRating = []
    }*/
    /*let { holidayCity0: citiesHolidays[0], holidayCity1: citiesHolidays[1], holidayCity2: citiesHolidays[2], holidayCity3: citiesHolidays[3], holidayCity4: citiesHolidays[4] }
    if ( holidays ) {//TODO: i need 5 cities here
        //TODO: to use this in the next page after clicking on the city
    }
    //TODO: to iterate through all the cities inside useQuery()
    const { data, isLoading, isError, error } = useQuery({ queryKey: [''], queryFn: () => fetchData() })*/

    return <>
        <h2>
            second page
        </h2>

        <SearchInput paramsToGive={paramsToGive}/>

        <h2>Still interested in these properties?</h2>
        <h3>Price for 12 Jun - 13 Jun, 2 people</h3>


        <div>
            <CustomButton>children prop</CustomButton>
            <CustomButton kind="float" onClick={() => console.log('onClick')}/>
        </div>


        <>
            <h2>------------------------------</h2>
            <h2>TO link this abd what i have above \|/ /|\</h2>
            <h2>Quick and easy trip planner</h2>
            <p>Pick a vibe and explore the top destinations in the Russia</p>
            {/*<CustomSlider country="RU">
                <CustomSliderShow rooms={roomsData}/>
            </CustomSlider>*/}
            <Tabs
                defaultActiveKey="1"
                //items={items}
                items={items(categorizedRooms, addReservation, deleteReservation)}

                indicator={{
                    size: (origin) => origin - 20,
                    align: "center",
                }}
            />
        </>



       {/* <>
            <h2>Browse by property type in Russia</h2>
            <h3>(12 Jun-13 Jun, 2 adults)(number available)</h3>
            <CustomSlider type={true} country="RU">TODO: to sort by country, but in redux it doesnt make this here ".filter(room => room.country === action.payload.country)"
                if i navigate to  SelectedRoomsTypePage() => servicesID for type should be there
                country="RU"to link type&country
                i got the things i to sort in redux, now to display them after clicking TODO: HOW?
                <CustomSliderShow rooms={roomsData} text="Browse by property type"/>
            </CustomSlider>
        </>*/}

        <>
            <h1>testing for type from backend</h1>
            <CustomSliderV1 sortType="type" roomsV1={results} pending={pending} />
        </>

        {/*testing for type from backend*/}

        {/*<>TODO: -0000 uncomment
            <h2>Trending destinations</h2>
            <p>Most popular choices for travellers from the Czech Republic</p>
            <div style={{ justifyContent: "space-evenly", display: "flex", height: "80px", margin: "5px" }}>
                {citiesForHolidays && citiesForHolidays.map((city) => {
                    for (let i = 0; i < citiesForHolidays.length - 3; i++) {
                        return <div style={{ backgroundColor: "coral", width: "40%", height: "80px" }}>{city}</div>
                    }
                })}
            </div>
            <div style={{ justifyContent: "space-evenly", display: "flex", height: "80px", margin: "5px" }}>
                {citiesForHolidays && citiesForHolidays.map((city) => {
                    for (let i = 2; i < citiesForHolidays.length - 2; i++) {
                        return <div style={{backgroundColor: "coral", width: "30%", height: "80px"}}>{city}</div>
                    }
                })}
            </div>
        </>*/}


        <>
            <h2>Explore Czech Republic</h2>
            <p>These popular destinations have a lot to offer</p>
            <h1>testing for country from backend</h1>{/*TODO:to sort using geolocation(default will be "usa")*/}
            <CustomSliderV1 sortType="CZ" roomsV1={results} pending={pending}/>
        </>


        <>
            <h1>testing for uniqueProperty from backend</h1>
            <h2>Stay at our top unique
                properties</h2>TODO:DONE to add to database some identifier for unique properties 'unique: true/false'
            <p>From castles and villas to boats and igloos, we've got it all</p>
            <CustomSliderV1 sortType="uniqueProperty" roomsV1={results} pending={pending}/>
        </>


        <>
            {/*<h2>Deals for the
                weekend</h2>TODO:DONE to add to database sales for weekends((it will be done manually(i will create Form&&user.role later))||(to add to backend timer to update sales for some property for each weekend)) and someway to get them from the housekeepers(to create role "houseKeeper: true")
            <p>Save on stays for 9 May - 11 May</p>*/}
            <h1>testing for sales from backend</h1>
            <CustomSliderV1 sortType="sales" roomsV1={results} pending={pending} />
        </>

        {/**/}
        <>{/*TODO: to add something here*/}
            <h2>Homes guests love</h2>
            <h3>so sort according to type&&rating</h3>{/*DONE services.sort(service => service.totalRating => b) => return <h2>{service.id} {service.totalRating}<h2/>*/}
            {/*<CustomSlider type={true} rating={true}>
                <CustomSliderShow rooms={roomsData} text="Browse by property type"/>
            </CustomSlider>*/}
            <CustomSlider rating={true}>{/*TODO:DONE*/}
                <CustomSliderShow rooms={roomsData} text="Browse by property type"/>
            </CustomSlider>
        </>


        {/*case "uniqueProperty"://TODO: why uniqueProperty doesnt works HASH11211
            const idToGiveToUniqueProperty = props.item.id
            //console.log("I am inside uniqueProperty")
            return <>
                <Link to={`../testing/${idToGiveToUniqueProperty}`}>
                    <button key={props.item.id}
                            className="custom-slider-scroll-button">{props.item.uniqueProperty ? props.item.id : null }</button>
                </Link>
            </>
                break;*/}
        {/*TODO: to create a distinct database where i will create holidays and according to country`s holiday to find hotels with useQuery() according to rating*/}
        <>
            <h2>Get inspiration for your next trip</h2>{/*TODO: to create rating for registered user*/}
            <div style={{justifyContent: "space-evenly", display: "flex", height: "80px", margin: "5px"}}>
                {citiesForHolidays && citiesForHolidays.map((city, index) => {
                    if (index === 0 || index === 1 || index === 2) {
                        return <div style={{backgroundColor: "coral", width: "30%", height: "80px"}}>
                            <Link onClick={() => onClickSetSortedType(city)} to={`/testing/${city}/`}>{/*TODO: maybe with absolute path inside react router hook to make this.*/}
                                <Button type="link" onCLick={() => onClickSetSortedType(city)}>{city}</Button>{/*TODO: to create customLink button for this.*/}
                                {/*<button onCLick={() => onClickSetSortedType(city)}>{city}</button>*/}
                            </Link>{/*TODO: to create cities, services for SelectedRoomsTypePage()*/}{/*TODO: to populate with different data here*/}
                        </div>
                    }
                })}
            </div>
            <div style={{justifyContent: "space-evenly", display: "flex", height: "80px", margin: "5px"}}>
                {citiesForHolidays && citiesForHolidays.map((city, index) => {
                    if (index === 3 || index === 4) {
                        return <div style={{backgroundColor: "coral", width: "40%", height: "80px"}}>
                            <Button type="link">{city}</Button>
                        </div>
                    }
                })}
            </div>
        </>

        <>
            <h2>Travel more, spend less</h2>
            {!token && <AuthCard/>}
        </>


        <Tabs
            defaultActiveKey="1"
            items={itemsForCities(categorizedRelativeLocations)}
            indicator={{
                size: (origin) => origin - 20,
                align: "center",
            }}
        />

        {/*<h2>
            {categorizedRelativeLocations?.domesticcities?.[0]?.id || "Loading..."}
        </h2>*/}

        {/*TODO: to train "key" */}
        {/*TODO: to sort using "const categorizedRelativeLocations = useCategorizedRooms()" all of this =>
                //{categorizedLocations.forEach(location => {return <CustomButton1 to="location">{location}</CustomButton1>})}*/}
        {/*TODO: to change <CustomButton1/>, because its a <Link/> */}

        {/*<Outlet />3330*/}

        {/*<div className="Quick and easy trip plannerTODO:items222">
            <Card style={{ margin: "5px" }}>
                <h2>Quick and easy trip planner</h2>
                <h3>Pick a vibe and explore the top destinations in the Czech Republic</h3>
                <Tabs
                    defaultActiveKey="1"

                    items={itemsWithSlider(categorizedRooms)}

                    indicator={{
                        size: (origin) => origin - 20,
                        align: "center",
                    }}
                />
            </Card>
        </div>*/}

    </>
}
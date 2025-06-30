import { useParams } from "react-router-dom";
import SearchInput from "../components/search/SearchInput";
import { useEffect, useState } from "react";
import useSort from "../hooks/useSort";
import { Input, Radio, Button, Space, Card } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { sortAccordingToParams } from "../redux/booking-slice";
import Filter from "../components/filter/Filter";
import useFilter from "../components/filter/useFilter";
import useUpdateFilteredRoom from "./useUpdateFilteredRoom";
import Breadcrumbs from "./selectedRoomTypePage/Breadcrumbs";

const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};

export default function SelectedRoomsTypePage() { //TODO: 8882
    // export default function SelectedRoomsTypePage({}) { //TODO: 8882
    const { selectedType } = useParams()//it will be used to extract ":selectedType => "Cabins"" <h2>{params.selectedType}<h2/>


    //TODO: here i will take
    //if (selectedType == "type") {sortRedux("typeID")}
    //if (selectedType == "citiesForHolidays") {sortRedux("citiesForHolidaysID")}
    //if (selectedType == "uniqueProperty") {sortRedux("uniquePropertyID")}
    //if (selectedType == "country") {if (let country === "RU"){}}
    //TODOO: from redux i will use information for room
    const roomInfo = useSelector(state => state.booking.rooms)
    const sortedTypeRedux = useSelector(state => state.availability.sortedType)
    const sortedRoomsByTypeAndCountry = useSelector(state => state.availability.sortedRoomsByTypeAndCountry)

    const dispatch = useDispatch()
    dispatch(sortAccordingToParams(selectedType))

    console.log("roomInfo:",roomInfo)
    console.log("selectedType:",selectedType)

    const [value, setValue] = useState([2, 0, 1])
    const [resultOfOptions, setResultOfOptions] = useState("")
    console.log("resultOfOptions, value:",resultOfOptions, value)

    const paramsToGive = {
        value,
        setValue,
        resultOfOptions,
        setResultOfOptions
    }

    //const { roomsData } = useRoomsData()
    const roomsData = useSort({})


    function goToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // let filteredRoom;
    //const [filteredRoom, setFilteredRoom] = useState([]);
    const [filteredRoom, setFilteredRoom] = useState([]);
    const [filteredRoom1, setFilteredRoom1] = useState([]);

    const [antdValue, setAntdValue] = useState(9);



    const [filteredRoomStateChange, setFilteredRoomStateChange] = useState()




    const roomsToFilter = useSelector(state => state.booking.rooms) || []//[{},{},{},{}...]//TODO:\/
    /*const onChange = e => {
        setAntdValue(e.target.value);
        console.log("e.target.value",e.target.value)
        //const filteredRoom = roomsToFilter.map(room => {                                            //TODO:|
        const newFiltered = roomsToFilter.map(room => {
            if (room.totalRating > antdValue) {                                                               //TODO:|
                console.log("value is bigger")
                return room                                                                                   //TODO:|
            }                                                                                                //TODO:|
        }).filter(room => (room !== undefined))
        setFilteredRoom(newFiltered)//TODO: ----------------------------------------------------------------------------------------------------------------

        console.log("roomsToFilter:",roomsToFilter)
        console.log("antdValue:",antdValue)
        console.log("filteredRoom:",filteredRoom)
        console.log("filteredRoom?.length:",filteredRoom?.length)

    };                                                                                                          //TODO:/\*/


    //const useUpdateFilteredRoom = ({ roomsToFilter, filteredRoom, setFilteredRoom, antdValue, setAntdValue }) => {}
    //const { onChange } = useUpdateFilteredRoom({ roomsToFilter, filteredRoom, setFilteredRoom, antdValue, setAntdValue })

    /*useEffect(() => {
        const newFiltered = roomsToFilter.map(room => {//returns [{},{},{},{}]
            if (room.totalRating > antdValue) {                                                               //TODO:|
                console.log("value is bigger")
                return room//return {}                                                                                   //TODO:|
            }                                                                                                //TODO:|
        }).filter(room => (room !== undefined))
        setFilteredRoom(newFiltered)//"roomsToFilter:",roomsToFilter//TODO: ---------------------------------------------------------------------------------------------------
        console.log("antdValue, filteredRoom, roomsToFilter:", antdValue, filteredRoom, roomsToFilter)
    }, [roomsToFilter]);//this means that it will be mounted only 1 time?*/


    //const [filterApply, setFilterApply] = useState([selectedType, "Hotels"])//filterApply = []
    //const [filterApply, setFilterApply] = useState([selectedType, "Hotels"])//TODO: to be orientated on selectedType
    const [filterApply, setFilterApply] = useState(["Hotels"])

    //useFilter(roomsToFilter,filteredRoom, filterApply)
    console.log("0.filterApply:",filterApply)

    /*useEffect(() => {
        // console.log("0.filterApply:",filterApply)
        console.log("0.filterApply.includes(Hotels):",filterApply.includes("Hotels"))

        //let filteredRooms;
        const newFiltered = roomsToFilter.map(room => {//if above is markdown => roomsToFilter NO, filteredRooms YES
            if (filterApply !== []) {
                if (filterApply.includes(room.type)) {
                    return room;//return object {} //|\above returns [{}, {}, {}]
                }
            }
        }).filter(room => room !== undefined)
        setFilteredRoom(newFiltered)//TODO: -----------------------------------------------------------------------------------------------------------------------------------------

        //Filter()

        console.log("4. filteredRoom:",filteredRoom)
    }, [filterApply]);//filteredRoom.map()*/

    //PARAMS: roomsToFilter - array of objects to filter, [filteredRoom, setFilteredRoom] is lifted state up to return after filtration
    //PARAMS: [antdValue, setAntdValue] is starting values to filter
    //const { onChange } = useUpdateFilteredRoom({ roomsToFilter, filteredRoom, setFilteredRoom, antdValue, setAntdValue, filterApply, setFilterApply })
    const { onChange } = useUpdateFilteredRoom({ roomsToFilter, filteredRoom, setFilteredRoom, antdValue, setAntdValue, filterApply, setFilterApply, filteredRoom1, setFilteredRoom1 })

    useEffect(() => {
        console.log("0.filteredRoom:",filteredRoom)
        // setFilteredRoomStateChange(filteredRoom)
        console.log("filteredRoomStateChange:",filteredRoomStateChange)
    }, [filteredRoom]);

    const sortedRoomsRedux = useSelector(
        (state) => state.availability.sortedRoomsByTypeAndCountry
    );

    return <>
        <h2>
            TODO: to show according to country&propertyType(show sort there), uniqueProperty => INFO about property
        </h2>
    {(sortedTypeRedux) ? <h2>there is sortedTypeRedux {sortedTypeRedux}</h2> : <h1>doesnt have ti</h1>}


    {sortedRoomsByTypeAndCountry?.map(sortedRoomByTypeAndCountry => {
        return <h2>sortedRoomByTypeAndCountry:  {sortedRoomByTypeAndCountry.id}</h2>
    })}

    {sortedRoomsRedux?.map(room => {
        return <h2>  {room.id}</h2>
    })}
        {/*{filteredRoom?.length > 0 && filteredRoom.map((place, index) => {
            return <>
                <h2 key={index}>{place.id} for raiting {}</h2>to create variable for label TODO: to fix, works for roomsToFilter, but not for filteredRoom
            </>
        })}*/}
        {(filteredRoom !== undefined) && filteredRoom.map((place, index) => {
            return <>
                <h2 key={index}>{place.id} for raiting {}</h2>to create variable for label TODO: to fix, works for roomsToFilter, but not for filteredRoom
            </>
        })}
        {/*<Filter filterApply={filterApply} setFilterApply={(word) => {
            setFilterApply((prev) => [...prev, word]);
        }} />*/}


        <Card>{/*TODO: to design Card for filter in someway(to put it to left-side)*/}
            <Filter filterApply={filterApply} setFilterApply={setFilterApply}/>
            {/*<Filter filterApply={filterApply}  />*/}
            <Radio.Group
                style={style}
                onChange={onChange}
                value={antdValue}
                options={[
                    {value: 9, label: '9+raiting'},
                    {value: 7, label: '4+raiting'},
                    {value: 6, label: '3+raiting'},
                    {value: 3, label: '2+raiting'},
                    /*{
                        value: 4,
                        label: (
                            <>
                                More...
                                {value === 4 && (
                                    <Input
                                        variant="filled"
                                        placeholder="please input"
                                        style={{ width: 120, marginInlineStart: 12 }}
                                    />
                                )}
                            </>
                        ),
                    },*/
                ]}
            />
        </Card>

        <Card>
            {filteredRoom && <>
                <h2>new list after applying filter</h2>{/*isn't tested*/}
                <ul>{filteredRoom && filteredRoom.map(room => {
                    <li>{room.id}</li>
                })}</ul>
                <h2>TODO: to navugate to new page after "sort"</h2>
            </>}
        </Card>


        <Card>
            {!filteredRoom
                &&
                <>
                    <h2>now filtered room</h2>
                    <ul>{roomsToFilter.map(room => {
                        <li>{room.id}</li>
                    })}</ul>
                </>
            }
        </Card>



        <SearchInput paramsToGive={paramsToGive} calendar={true} selectedType={selectedType}/>

        {/*<h2>TODO: 1. home page => 2. hotels => 3. with useParams() for dynamic and useHref() for static ¨:selectedType¨ </h2>*/}

        <h2>Featured useParams(:selectedType) destinations</h2>
        <h2>Featured {selectedType} destinations</h2>

        {/*<CustomSlider>
            <CustomSliderShow rooms={roomsData} />//TODO:to use useSort() instead of this TODO:8891
        </CustomSlider>*/}

        <Button color="default" variant="link" onClick={() => goToTop()}>Search "here will be number of apartments from
            database" apartments</Button>

        <Space direction="vertical" size={16}>
            {roomInfo.map(room => {
                return <Card title="Default size card" extra={<a href="#">More</a>} style={{width: 300}}>
                    <p>{room.id}</p>
                    <p>{room.relativeLocation}</p>
                    <p>uniqueProperty: {room.uniqueProperty}</p>
                </Card>
            })}
            {/*<Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
            <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>*/}
        </Space>
    </>//TODO:to use useSort() to find number of things
}
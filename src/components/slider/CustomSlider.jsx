import { useEffect, useRef, useState } from "react";
import CustomSliderShow from "./CustomSliderShow";
import { Button } from "antd";
import { Link, Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/https";
import LikedButton from "../buttons/LikedButton";
import SwitchCase from "./SwitchCase";
import useButtonsScrollerShow from "./useButtonsScrollerShow";
import CustomSliderUI from "./CustomSliderUI";
import {useDispatch, useSelector} from "react-redux";
import {setSortedByPropertyTypeAndCountry} from "../../redux/availability-slice";


export default function CustomSlider({ children, type = false, city = false, country = false , countryy = false, uniqueProperty = false, houseKeeper = false, rating = false, sales = false }) {
    //TODO: to create button to save liked properties


    //console.log("country:", country)
    //const sortType = type ? 'type' : city ? 'cityId' : countryy ? 'country' : uniqueProperty ? "uniqueProperty" : houseKeeper ? houseKeeper : rating ? rating  : sales ? sales : 'id';
    const sortType = type ? 'type' : city ? 'cityId' : country ? "country" : uniqueProperty ? "uniqueProperty" : houseKeeper ? houseKeeper : rating ? "rating"  : sales ? "sales" : 'id';
    //console.log("sortType:", sortType)
    //TODO: to create geolocation for "country"&&city=true
    //TODO: to create in database country||geo.coords
    //TODO: to lessen the amount of conditions here and below inside "return"
    //console.log("type, country, (type === true) && (country):", type, country, Boolean((type === true) && (country)))
    const timeForReduxsetSortedByPropertyTypeAndCountry = Boolean((type === true) && (country))
    const dispatch = useDispatch()

    /*useEffect(() => {
        console.log("timeForReduxsetSortedByPropertyTypeAndCountry:",timeForReduxsetSortedByPropertyTypeAndCountry)
        if (timeForReduxsetSortedByPropertyTypeAndCountry) {
            dispatch(setSortedByPropertyTypeAndCountry({type, country}))
        }
    }, []);//to change dependencies, because of thwm i got shit

    const sortedRoomsRedux = useSelector(
        (state) => state.availability.sortedRoomsByTypeAndCountry
    );

    useEffect(() => {
        console.log('Из Redux sortedRoomsByTypeAndCountry:', sortedRoomsRedux);
    }, [sortedRoomsRedux]);*/


    const childElement = Array.isArray(children) ? children[0] : children;

    const rooms = childElement.props.rooms || childElement.props.categorizedRooms.City;

    //console.log(`child element: ${childElement}`); //calls .toString(), thats why returns [object Object]
/*    console.log("childElement:", childElement);
    console.log("childElement.props:", childElement.props);
    console.log("childElement.props.rooms:", childElement.props.rooms);
    console.log("Array.isArray(children):", Array.isArray(children));
    console.log("children[0]:", children[0]);
    console.log("children:", children);*/



    //how to use "dataToShow"
    /*const dataToShow = SwitchCase(sortType, rooms)
    dataToShow()*/

    //TODO: to create parameter 'shouldBeTyped' to sort
    //TODO: to create hook which will sort by location, type and will display according to city



    /*let counter = 0;//TODO: to check if this needed at all
    let sortedRoomsUnique = [];
    let seenIds = new Set()*/

    /*let sortedRoomsUniqueByCountry = [];
    rooms.forEach((room) => {
        /!*if (!sortedRoomsUnique.has(room.id)) {//TODO: to make .includes(room) method work, to make items unique. (rooms[9] === rooms[10] is not unique)
            counter += 1;
            sortedRoomsUnique.push(room);
        }*!/
        /!*if (countryy) {
            if (room.country === country) {
                sortedRoomsUniqueByCountry.push(room)

                //TODO:dorabotat`
                if(!seenIds.has(room.id)) {//to sort by "id"
                    seenIds.add(room.id);
                    sortedRoomsUnique.push(room);
                    counter++;
                }
            }
        }*!/
        if(!seenIds.has(room.id)) {//to sort by "id"
            seenIds.add(room.id);
            sortedRoomsUnique.push(room);
            counter++;
        }
    })*/
    /*rooms.forEach((room) => {
        if(!seenIds.has(room.id)) {//to sort by "id"
            seenIds.add(room.id);
            sortedRoomsUnique.push(room);
            counter++;
        }
    })*/
    //console.log(`counter: ${counter}`)
    //console.log("typeof(rooms):", typeof(rooms));
    //console.log("rooms:", rooms);
    //console.log("rooms[9] === rooms[10]:", rooms[9] === rooms[10])//TODO: WHY false?



    //let seenType = new Set()//same as?? let seenType = []
    /*if (type) {
        //properties.forEach(!seenType.includes(property)=>seenType.push(property))
        rooms.forEach((room, index) => {
            if (!seenType.has(room.type)) {//TODO: to see difference between .has() || .includes()
                seenType.add(room.type);
                sortedRoomsUnique.push(room);
            }
        })
    }*/

    /*switch(type) {
        case type === "type":
            // code block
            console.log("switch(type)")
            rooms.forEach((room, index) => {
                if (!seenType.has(room.type)) {//TODO: to see difference between .has() || .includes()
                    seenType.add(room.type);
                    sortedRoomsUnique.push(room);
                }
            })
            break;
        default:
            console.log("default:");
    }*/

    /*const dataToShow = SwitchCase(sortType, rooms)
    dataToShow()*/


    /*let sortedTypeUnique = [];
    let seenTypeUnique = new Set()//same as?? let seenType = []
    if (uniqueProperty) {
        //properties.forEach(!seenType.includes(property)=>seenType.push(property))
        rooms.forEach((room, index) => {
            if (!seenTypeUnique.has(room) && (room.uniqueProperty === true) ) {//TODO: to see difference between .has() || .includes()
                seenTypeUnique.add(room);
                sortedTypeUnique.push(room);
            }
        })
        console.log("sortedTypeUnique:", sortedTypeUnique)
    }*/


    /*let sortedCitiesUnique = [];
    let seenCities = new Set();
    if (country) {
        console.log("country2:")
        rooms.forEach((room, index) => {
            if (!seenCities.has(room.cityId) && (country === room.country)) {//TODO: to see difference between .has() || .includes()
                seenCities.add(room.cityId);
                sortedRoomsUnique.push(room);
                sortedCitiesUnique.push(room.cityId);
            }
        })
        console.log("sortedCitiesUnique:", sortedCitiesUnique)
    }*/


    //on the top i already have this for cities
    /*let sortedCitiesForCountryUnique = [];
    let seenCityForCountry = new Set()
    if (country && city) {
        //{properties.forEach(!seenCityForCountry.includes(city)=>seenCityForCountry.push(city))}
        rooms.forEach((room, index) => {
            if (!seenCityForCountry.has(room.cityId)) {
                seenCityForCountry.add(room.cityId);
                sortedCitiesForCountryUnique.push(room.cityId)
            }
        })
        console.log("sortedCitiesForCountryUnique:",sortedCitiesForCountryUnique)
    }*/

    //SwitchCase(sortType, rooms, country, city)
    /*let lastArray = []
    if (rating) {
        lastArray = rooms.sort((a, b) => a.totalRating - b.totalRating)//мутирующей сортировкой ... для создания копии массива
    }
    console.log("lastArray:", lastArray)*/
    /*let lastArray = [];
    if (rating) {
        lastArray = [...rooms].sort((a, b) => b.totalRating - a.totalRating);//... для создания копии массива
        sortedRoomsUnique = lastArray
    }
    console.log("lastArray:", lastArray);
    console.log("sortedRoomsUniquelastArray:", sortedRoomsUnique);*/
    //let sortedRoomsUnique = [];//array of rooms
    //В текущей реализации SwitchCase изменяет массив "по ссылке" (то есть она мутирует sortedRoomsUnique, а не возвращает его).
    let sortedRoomsUnique = SwitchCase(sortType, rooms, country, city)//filled and filtered array of rooms
    if (country) {
        console.log("12. sortedRoomsU:", sortedRoomsUnique)
    }
    //sortedRoomsUnique = [];

   /* let lastlastArray = []
    if (sales) {
        console.log("rooms.sales:", rooms);
        //const sales = rooms.forEach(room => room.sales)//forEach method doesn't return anything
        //Flattening the Array .flatMap()
        const sales = rooms.map((room) => room.sales)
        console.log("sales:", sales);
        /!*const matchingSales = rooms.map((room) => {
            room.sales.forEach(sale => {
                if (sale.startDate === "2025-01-01T00:00:00Z") {
                    console.log("sale:", sale);
                    return sale;
                }
            })
        })*!/
        /!*const matchingSales = rooms.flatMap(room =>
            (room.sales || []).filter(sale => sale.startDate === "2025-01-01T00:00:00Z")
        );
        console.log("matchingSales:", matchingSales);*!/
        console.log("roomsroomsroomsrooms:", rooms);
        //const januarySales = rooms.flatMap(room =>
        const januarySales = rooms.map(room =>
            (room.sales || []).filter(saleObj => {
                const sale = Object.values(saleObj)[0];
                return sale.startDate.startsWith("2025-01");
            })
        );
        console.log("januarySales:", januarySales);
        const januarySalesWithoutBlankLines = januarySales.filter(saleObj => {//TODO: how to filter this
            if (saleObj !== []){
                return saleObj
            } else {
                saleObj.pop()
            }
        })
        console.log("januarySalesWithoutBlankLines:", januarySalesWithoutBlankLines);

        /!*const allSalesFlat = rooms.flatMap(room => room.sales);
        console.log("allSalesFlat:", allSalesFlat);*!/
        /!*const matchingSales = rooms.sales.filter(saleObj => {
            const sale = Object.values(saleObj)[0];
            return sale.startDate === "2025-01-01T00:00:00Z";
        })
        console.log("matchingSales:", matchingSales);*!/
    }*/{/*if room.sales.forEach(date => date.startDate === "2025-01-01T00:00:00Z"){return <h2>{rooms.id} {date.startDate} {date.endDate} <h2/>}*/}

    /*const [index, setIndex] = useState(Math.floor(counter / 2));
    useEffect(() => {
        const centeredItem = Math.floor(counter / 2);
        setIndex(centeredItem);
    }, [counter]); // useEffect срабатывает при изменении counter




    useEffect(() => {
        //console.log("index: ",index)
        console.log("typeof(sortedRoomsUnique):", typeof(sortedRoomsUnique));
        console.log(`index: ${index}`)
    }, [index]);*/

    /*const prevItem = () => {
        setIndex(prevIndex => {
            const newIndex  = prevIndex - 1;
            return sortedRoomsUnique[newIndex]?.id === undefined ? prevIndex : newIndex;//TODO: to get back
            //return rooms[newIndex]?.id === undefined ? prevIndex : newIndex;
        });
    }
    const nextItem = () => {
        setIndex(prevIndex => {
            const newIndex  = prevIndex + 1;
            return sortedRoomsUnique[newIndex]?.id === undefined ? prevIndex : newIndex;//TODO: to get back
            //return rooms[newIndex]?.id === undefined ? prevIndex : newIndex;
        })
        //TODO: to create overflow: scroll here instead of button
    }*/


    //TODO: to navigate 8881
    /*const [searchParams, setSearchParams] = useSearchParams()//i need this "Setting the search params causes a navigation."

    useEffect(() => {
        console.log("newparams, params,newparams, params,newparams, params,newparams, params,newparams, params:", searchParams)
    }, [searchParams]);*/


    /*let href = useHref("cart");//TODO: 9110
    console.log("href:", href);//href:"/roomspage/cart"*/

    const currentlocation = window.location.pathname
    console.log("window.location.pathname:", window.location.pathname)

    function moveToAccordingRoomsTypePage(type) {
        //console.log("sortedRoomsUnique[index]?.type:", type);//TODO: or maybe useHref()
        //setSearchParams("type",type)//.set() method is used here, i guess
        console.log("currentlocation + type", currentlocation + '/'  + type )
        //navigate("/" + currentlocation + "/" + type);
    }


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const scrollRef = useRef(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showLeftButton, setShowLeftButton] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showRightButton, setShowRightButton] = useState(false)

    let scroll = useButtonsScrollerShow({scrollRef, setShowLeftButton, setShowRightButton})


    return <>
        {/*<div style={{textAlign: "center"}}>
            {text && <h2>{text}</h2>}

            <div className="custom-slider">
                <button onClick={() => prevItem()}>previous</button>

                {sortedRoomsUnique[index - 1] &&
                    <Button color="default" variant="link"
                            onClick={() => moveToAccordingRoomsTypePage(sortedRoomsUnique[index - 1]?.type)}>
                        <Link to={sortedRoomsUnique[index - 1]?.type}>
                            {sortedRoomsUnique[index - 1]?.type}
                        </Link>
                    </Button>}
                <Button color="default" variant="link"
                        onClick={() => moveToAccordingRoomsTypePage(sortedRoomsUnique[index]?.type)}>
                    <Link to={sortedRoomsUnique[index]?.type}>
                        {sortedRoomsUnique[index]?.type}
                    </Link>
                </Button>
                {sortedRoomsUnique[index + 1] &&
                    <Button color="default" variant="link"
                            onClick={() => moveToAccordingRoomsTypePage(sortedRoomsUnique[index + 1]?.type)}>
                        <Link to={sortedRoomsUnique[index + 1]?.type}>
                            {sortedRoomsUnique[index + 1]?.type}
                        </Link>
                    </Button>}

                <button onClick={() => nextItem()}>next</button>
            </div>

        </div>*/}



        <div style={{ textAlign: "center" }}>
            <div className="custom-slider-scroll" ref={scrollRef}>
                {/*TODO: if (type) => <Link to={item[sortType]}><Link/>*/}
                {showLeftButton && <Button shape="circle" style={{ position: "sticky", padding: "5px", left: "-10px", top: "30px"}} onClick={() => scroll("left")}>&lt;</Button>}
                <CustomSliderUI sortedRoomsUnique={sortedRoomsUnique} uniqueProperty={uniqueProperty} type={type} sortType={sortType}/>
                {/*{sortedRoomsUnique && sortedRoomsUnique.map((item, index) => {
                    if (uniqueProperty) {
                        // return <button key={index} className="custom-slider-scroll-button">{item[sortType] ? item.id : "nothing to return" }</button>
                        if (type) {
                            return <Link to={item[sortType]}>
                                <LikedButton likedID={item.id}></LikedButton>
                                <button key={index}
                                        className="custom-slider-scroll-button">{item[sortType] ? item[sortType] : "nothing to return"}
                                </button>
                            </Link>
                        }
                        return <button key={index}
                                       className="custom-slider-scroll-button">{item[uniqueProperty] ? item[sortType] : "nothing to returnnn" }</button>
                    }
                    return <button key={index} className="custom-slider-scroll-button">{item[sortType] }</button>
                    // return <button key={index} className="custom-slider-scroll-button">{item.sortType}</button>
                })}*/}
                {showRightButton && <Button shape="circle" style={{ position: "sticky", padding: "5px", right: "-10px", top: "30px"}} onClick={() => scroll("right")}>&gt;</Button>}
            </div>
        </div>



        {/*3330*/}
        <Outlet/>
    </>
}
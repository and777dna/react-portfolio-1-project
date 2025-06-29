import { Link } from "react-router-dom";
import LikedButton from "../buttons/LikedButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSortedByPropertyTypeAndCountry } from "../../redux/availability-slice";

export default function SwitchCaseUI(props) {
    function buttonClicked() {
        console.log("button has been clicked");
    }
        //: "sales" ? "sales" //"CZ" ? "CZ"  :
    const sortType = props.sortType === "country" ? "country"
                            : props.sortType === "type" ? "type"
                                : props.sortType === "CZ" ? "CZ"
                                    //: props.sortType === "sales" ? "sales"
                                        : props.sortType === "uniqueProperty" ? "uniqueProperty" : "uniqueProperty"

    if (sortType === "country") {
        console.log("props.item.id:", props.item.id);
    }

    const dispatch = useDispatch()

    function toClickToSortInsideRedux(type, country) {
        /*useEffect(() => {
            console.log("timeForReduxsetSortedByPropertyTypeAndCountry:",timeForReduxsetSortedByPropertyTypeAndCountry)
            if (timeForReduxsetSortedByPropertyTypeAndCountry) {
                dispatch(setSortedByPropertyTypeAndCountry({type, country}))
            }
        }, []);//to change dependencies, because of thwm i got shit*/

        dispatch(setSortedByPropertyTypeAndCountry({type, country}));
        console.log("dispatch(setSortedByPropertyTypeAndCountry({type, country}));");
        /*const sortedRoomsRedux = useSelector(
            (state) => state.availability.sortedRoomsByTypeAndCountry
        );

        useEffect(() => {
            console.log('Из Redux sortedRoomsByTypeAndCountry:', sortedRoomsRedux);
        }, [sortedRoomsRedux]);*/
    }

    //console.log("props:",props);//sortType: "rating", type: false, uniqueProperty: false
    //console.log("props.item:",props.item)
    //console.log("props.item.id:",props.item.id)
    //console.log("props.uniqueProperty:",props.uniqueProperty);


    //const sortType = type ? 'type' : city ? 'cityId' : country ? "country" : uniqueProperty ? "uniqueProperty" : houseKeeper ? houseKeeper : rating ? "rating"  : sales ? sales : 'id';
    /*if (props.uniqueProperty === true) {
        //return <button key={props.key}//props.key === undefined
        return <button key={props.item.id}
                       //className="custom-slider-scroll-button">{props.item[props.uniqueProperty] ? props.item[props.item.id] : "nothing to returnnn" }</button>
                       //className="custom-slider-scroll-button">{props.uniqueProperty ? props.item.id : "nothing to returnnn" }</button>
                       className="custom-slider-scroll-button">{props.item.uniqueProperty ? props.item.id : null }</button>
    } else {
        return null;
    }*/
    switch (sortType) {
        case "uniqueProperty"://TODO: why uniqueProperty doesnt works HASH11211
            const idToGiveToUniqueProperty = props.item.id
            //console.log("I am inside uniqueProperty")
            return <>
                {/*<Link to={`../testing/${idToGiveToUniqueProperty}`}>*/}
                <Link to={`../detail-info/${idToGiveToUniqueProperty}`}>
                    <button key={props.item.id}
                            className="custom-slider-scroll-button">{props.item.uniqueProperty ? props.item.id : null }</button>
                </Link>
            </>
                break;
        case "type":
            //console.log("I am inside props.type");
            return <>
                {/*my LikedButton is for every ID*/}
                {/*<LikedButton likedID={props.item.id}></LikedButton>*/}
                <Link to={`../testing/${props.item[props.sortType]}`}>{/*props.item === {..., type:"apartmants"}*/}
                    <button key={props.key}
                            onClick={() => toClickToSortInsideRedux(props.item[props.sortType], props.item.country)}
                            className="custom-slider-scroll-button">{props.item[props.sortType] ? props.item[props.sortType] : "nothing to return"}
                    </button>
                </Link>
            </>
            break;
        case "CZ"://this doesnt works
            const idToGiveCountryy = props.item.id
            return <Link to={`../testing/${idToGiveCountryy}`}>
                <button key={props.key} className="custom-slider-scroll-button">{props.item ? props.item : "thats why"}</button>
            </Link>
        case "country"://this doesnt works
            const idToGiveCountry = props.item.id
            return <Link to={`../testing/${idToGiveCountry}`}>
                <button key={props.key} className="custom-slider-scroll-button">{props.item[props.sortType] ? props.item.id : "thats why"}</button>
            </Link>
        default:
            const idToGive = props.item.id
            //console.log("props.item.id: ", props.item.id);
            //console.log("I am inside default:")
            //console.log("default1:");
            //return <Link to="../testing/'${props.item.id}'">
            //return <Link to="../testing/" + ${props.item.id}>
            //return <Link to="../testing/" + {!idToGive}>//TODO: today to make this
            //return <Link to={`../testing/${idToGive}`}>
            return <Link to={`../testing/${idToGive}`}>
                {/*<Link to="/ some/ path" />
                <Link   to={{     pathname: "/ some/ path",     search: "?query=string",     hash: "#hash",   }} />*/}
                <button key={props.key}
                        // className="custom-slider-scroll-button">{props.item[props.sortType] ? props.item.id : "thats why"}</button>
                        className="custom-slider-scroll-button">{props.item[props.sortType] ? props.item[props.sortType] : "thats why"}</button>
            </Link>
        //TODO: className for button is not applied

        // return <button key={key} className="custom-slider-scroll-button">{props.item[props.sortType] }</button>
    }
}

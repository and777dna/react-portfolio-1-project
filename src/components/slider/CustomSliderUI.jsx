import { Link } from "react-router-dom";
import LikedButton from "../buttons/LikedButton";
import SwitchCaseUI from "./SwitchCaseUI";

export default function CustomSliderUI({sortedRoomsUnique, uniqueProperty, type, sortType}) {
    //console.log("uniqueProperty, type, sortType:",uniqueProperty, type, sortType);
    //console.log("sortedRoomsUnique CustomSliderUI:", sortedRoomsUnique);
    return <>
        {sortedRoomsUnique && sortedRoomsUnique.map((item, index) => {
            return <SwitchCaseUI key={index} uniqueProperty={uniqueProperty} type={type} sortType={sortType} item={item} />
            /*if (uniqueProperty) {
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
            return <button key={index} className="custom-slider-scroll-button">{item[sortType] }</button>*/
        })}
    </>
}

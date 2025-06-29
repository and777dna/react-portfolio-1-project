import CustomSliderUI from "./CustomSliderUI";
import { useRef, useState } from "react";
import useButtonsScrollerShow from "./useButtonsScrollerShow";
import {Button} from "antd";

export default function CustomSliderV1(props) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const scrollRef = useRef(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showLeftButton, setShowLeftButton] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showRightButton, setShowRightButton] = useState(false)

    let scroll = useButtonsScrollerShow({scrollRef, setShowLeftButton, setShowRightButton})



    const typeOfSort = props.sortType;
    let countryName;
    let type;
    switch (typeOfSort) {
        case "uniqueProperty":
            type = 0;
            break;
        case "type":
            type = 1;
            break;
        case "CZ":
            type = 2;
            break;
        case "sales":
            type = 3;
            break;
        default:
            console.log("i`ve got a default case inside CustomSliderV1")
            break;
    }

    console.log("props:",props);
    const objects = props.roomsV1[type]
    console.log("objects:", objects)
    const pending = props.pending;
    if (pending) {
        return <div>
            pending...
        </div>
    }


    return <div style={{ textAlign: "center" }}>
        <div className="custom-slider-scroll" ref={scrollRef}>
            {showLeftButton &&
                <Button shape="circle" style={{position: "sticky", padding: "5px", left: "-10px", top: "30px"}}
                        onClick={() => scroll("left")}>&lt;</Button>}
            <CustomSliderUI sortedRoomsUnique={objects} sortType={typeOfSort}/>
            {/*{objects.map((object, index) => (
            <h2 key={index}>{object.name}</h2>
        ))}*/}
            {showRightButton &&
                <Button shape="circle" style={{position: "sticky", padding: "5px", right: "-10px", top: "30px"}}
                        onClick={() => scroll("right")}>&gt;</Button>}
        </div>
    </div>
}
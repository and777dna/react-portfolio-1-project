import { useEffect, useState } from "react";
import CustomSliderShow from "./CustomSliderShow";

export default function CustomSlider({ children }) {
    const childElement = Array.isArray(children) ? children[0] : children;
    const rooms = childElement.props.rooms;
    //console.log(`child element: ${childElement}`); //calls .toString(), thats why returns [object Object]
    console.log("childElement:", childElement);
    console.log("childElement.props:", childElement.props);
    console.log("childElement.props.rooms:", childElement.props.rooms);

    let counter = 0;
    rooms.forEach(() => {
        counter += 1;
    })
    console.log(`counter: ${counter}`)


    const [index, setIndex] = useState(Math.floor(counter / 2));
    useEffect(() => {
        const centeredItem = Math.floor(counter / 2);
        setIndex(centeredItem);
    }, [counter]); // useEffect срабатывает при изменении counter



    useEffect(() => {
        //console.log("index: ",index)
        console.log(`index: ${index}`)
    }, [index]);

    const prevItem = () => {
        setIndex(prevIndex => {
            const newIndex  = prevIndex - 1;
            return rooms[newIndex]?.id === undefined ? prevIndex : newIndex;
        });
    }
    const nextItem = () => {
        setIndex(prevIndex => {
            const newIndex  = prevIndex + 1;
            return rooms[newIndex]?.id === undefined ? prevIndex : newIndex;
        })
    }

    return <div style={{textAlign: "center"}}>
        <CustomSliderShow children={children} />
        <button onClick={() => prevItem()}>previous</button>
        {/*{children}*/}
        {rooms[index - 1] && <h2>{rooms[index - 1]?.id}</h2>}
        <h2>{rooms[index]?.id}</h2>
        {rooms[index + 1] && <h2>{rooms[index + 1]?.id}</h2>}
        <button onClick={() => nextItem()}>next</button>
    </div>
}
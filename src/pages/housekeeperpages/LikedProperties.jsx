import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { decrementLiked } from "../../redux/liked-slice";

export default function LikedProperties() {
    const myLikedProperties = useSelector(state => state.liked.likedServices)
    const likedCount = useSelector(state => state.liked.likedCount)

    const dispatch = useDispatch()
    function popUpPropertyFromLikes (propertyID) {
        console.log("popUpPropertyFromLikes:",propertyID)
        dispatch(decrementLiked(propertyID))
    }

    useEffect(() => {
        console.log("myLikedProperties, likedCount:",myLikedProperties, likedCount)
    }, [myLikedProperties, likedCount]);

    return <>
        <h2>my liked properties</h2>

        <h2>TODO: to create number of reservations and specific dates for them </h2>
        <h2>number of liked services {likedCount}</h2>

        <ul>
            {myLikedProperties.length > 0 && myLikedProperties.map((propertyID, index) => (
                <>
                    <li key={index}>{propertyID.id} count-{propertyID.likedCount}</li>
                    <button
                            onClick={() => popUpPropertyFromLikes(propertyID.id)}>{propertyID.id}</button>
                </>
            ))}
        </ul>


    </>
}
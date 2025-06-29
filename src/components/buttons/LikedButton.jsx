import { useDispatch, useSelector } from "react-redux";
import { incrementLiked } from "../../redux/liked-slice";
import { useEffect } from "react";

export default function LikedButton(props) {
    const likedID = props.likedID;
    //console.log("likedID:",likedID);

    const dispatch = useDispatch()

    const likedIDs = useSelector(state => state.liked.likedServices)
    const likedCount = useSelector(state => state.liked.likedCount)

    useEffect(() => {
        //console.log("likedIDs, likedCount:",likedIDs, likedCount);
    }, [likedIDs, likedCount]);

    const setLiked = (likedID) => {
        dispatch(incrementLiked(likedID))
    }



    return <button onClick={() => setLiked(likedID)} style={{position: "sticky", right: "10px", top: "10px" }}>LikedButton</button>
}
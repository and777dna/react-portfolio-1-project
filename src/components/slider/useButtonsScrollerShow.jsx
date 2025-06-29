import { useEffect, useRef, useState } from "react";

export default function useButtonsScrollerShow(scrollRef, setShowLeftButton, setShowRightButton) {
    /*// eslint-disable-next-line react-hooks/rules-of-hooks
    const scrollRef = useRef(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showLeftButton, setShowLeftButton] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showRightButton, setShowRightButton] = useState(false)*/

    const checkScrollPosition = () => {//TODO: toWatchLater
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        setShowLeftButton(scrollLeft > 0)
        setShowRightButton(clientWidth + scrollLeft < scrollWidth)
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const scrollElement = scrollRef.current
        checkScrollPosition();

        scrollElement.addEventListener("scroll", checkScrollPosition);

        return () => {
            scrollElement.removeEventListener("scroll", checkScrollPosition);
        }
    }, []);

    const scroll = (direction) => {
        const scrollAmount = 40;
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    }

    return scroll;


}
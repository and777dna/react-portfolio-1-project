import React, { useEffect } from "react";

interface UseButtonsScrollerShowParams {
    scrollRef: React.RefObject<HTMLElement | null>;
    setShowLeftButton: React.Dispatch<React.SetStateAction<boolean>>;
    setShowRightButton: React.Dispatch<React.SetStateAction<boolean>>;
}

// Это НЕ React.FC, а просто функция с типом параметров
const useButtonsScrollerShow = ({
                                    scrollRef,
                                    setShowLeftButton,
                                    setShowRightButton,
                                }: UseButtonsScrollerShowParams) => {
    const checkScrollPosition = () => {
        //console.log("scrollRef:",scrollRef);
        if (!scrollRef.current) return;  // Добавляем проверку!
        const { scrollLeft , scrollWidth, clientWidth } = scrollRef.current;

        /*const scrollLeft = scrollRef.current?.scrollLeft;
        const scrollWidth = scrollRef.current?.scrollWidth;
        const clientWidth = scrollRef.current?.clientWidth;

        if (scrollLeft === undefined || scrollWidth === undefined || clientWidth === undefined) return;*/
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(clientWidth + scrollLeft < scrollWidth);
    };

    useEffect(() => {


        if (!scrollRef.current) return; // если ref ещё пустой — выходим
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;  // Проверяем тут

        checkScrollPosition();

        scrollElement.addEventListener("scroll", checkScrollPosition);

        return () => {
            scrollElement.removeEventListener("scroll", checkScrollPosition);
        };
    }, [scrollRef]);

    const scroll = (direction: "left" | "right") => {
        const scrollAmount = 40;
        if (!scrollRef.current) return;  // Проверка перед использованием

        scrollRef.current.scrollBy({
            left: direction === "right" ? scrollAmount : -scrollAmount,
            behavior: "smooth",
        });
    };

    return scroll

};

export default useButtonsScrollerShow;

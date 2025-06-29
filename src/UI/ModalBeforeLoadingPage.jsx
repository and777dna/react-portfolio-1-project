import { createPortal } from "react-dom";
import {useEffect, useRef} from "react";

export default function ModalBeforeLoadingPage(props) {
    const dialog = useRef(null)

    useEffect(() => {
        const modal = dialog.current;
        if (!modal) return;

        if (props.open) {
            modal.showModal(); // Открывает модалку в "modal mode"
        } else {
            modal.close(); // Закрываем явно
        }


        return () => {
            if (modal.open) modal.close(); // Гарантируем, что диалог закроется при размонтировании
        };
    }, []);

    return createPortal(
        <dialog ref={dialog} open={props.open} >

        </dialog>,
        document.getElementById("modal"))/*can i use same id both for Modal.jsx and ModalBeforeLoadingPage.jsx???*/
}
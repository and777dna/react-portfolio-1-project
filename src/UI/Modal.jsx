import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

export default function Modal({ children, open, onClose }) {
    const dialog = useRef(null);

    useEffect(() => {
        const modal = dialog.current;
        if (!modal) return;

        if (open) {
            modal.showModal(); // Открывает модалку в "modal mode"
        } else {
            modal.close(); // Закрываем явно
        }

        return () => {
            if (modal.open) modal.close(); // Гарантируем, что диалог закроется при размонтировании
        };
    }, [open]);

    function handleOutsideClick(event) {
        const modal = dialog.current;
        if (modal && event.target === modal) {
            modal.close();  // Закрываем модалку при клике вне её области
            onClose();      // Вызываем функцию закрытия
        }
    }

    return createPortal(
        <dialog ref={dialog} open={open}>
            {children}
            <button onClick={() => {
                dialog.current.close(); // Закрываем диалог перед изменением состояния
                onClose();
            }}>Закрыть
            </button>
        </dialog>,
        document.getElementById("modal"))
}
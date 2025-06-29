import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import React from "react";


interface ModalProps {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children, open, onClose }) => {
    const dialog = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        const modal = dialog.current;
        if (!modal) return;

        if (open) {
            modal.showModal(); // Открывает модалку в "modal mode"
        } else {
            modal.close(); // Закрываем явно
        }

        //modal.addEventListener("click", handleOutsideClick);//new fix with chatGPT

        return () => {
            if (modal.open) modal.close(); // Гарантируем, что диалог закроется при размонтировании
        };
    }, [open]);

    function handleOutsideClick(event: MouseEvent) {
        const modal = dialog.current;
        if (modal && event.target === modal) {
            modal.close();  // Закрываем модалку при клике вне её области
            onClose();      // Вызываем функцию закрытия
        }
    }

    //TypeScript уже знает, что createPortal(...) возвращает React.ReactPortal | null.
    return createPortal(
        <dialog ref={dialog} open={open}>
            {children}
            <button onClick={() => {
                dialog.current?.close(); // Закрываем диалог перед изменением состояния
                onClose();
            }}>Закрыть
            </button>
        </dialog>,
        document.getElementById("modal")!)
}

export default Modal;
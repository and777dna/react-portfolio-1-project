import { useDispatch, useSelector } from "react-redux";
import { deleteBookingFromCart, downloadMyBookingServices } from "../redux/cart-slice";
import { useEffect, useState } from "react";
import { deleteReservationFromBookedNumbers } from "../redux/booking-slice";
import Modal from "../UI/Modal";

export default function Cart() {
    const dispatch = useDispatch()
    const bookedServices = useSelector(state => state.cart.bookedServices)
    const currentBookings = useSelector(state => state.booking.currentRoomNumbersBooked)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        dispatch(downloadMyBookingServices(currentBookings));
        console.log("currentBookings:", bookedServices);
    }, [currentBookings]);

    function handleDelete(service) {
        dispatch(deleteBookingFromCart(service))
        console.log("service:",service);
        console.log("typeof(service):",typeof(service));
        dispatch(deleteReservationFromBookedNumbers(service))

        setSelectedService(service);
    }

    function openModal(service) {
        setSelectedService(service);
        setIsModalOpen(true)
        console.log("function openModal() is clicked")
    }

    function handleCloseModal() {
        setIsModalOpen(false)
    }

    return <div>
        {/*<button onClick={() => dispatch(downloadMyBookingServices(currentBookings))}>
            Добавить в корзину
        </button>*/}
        <ul>
            {bookedServices.map((service) => (
                <li key={service.index}>
                    {service.name}-{service.description}-{service.price}-totalNumberBooked: {service.totalNumberBooked}
                    <button onClick={() => handleDelete(service)}>
                        {/*delete from booking&&cart state*/}
                        Удалить
                    </button>
                    <button onClick={() => openModal(service)}>
                        open modal
                    </button>
                </li>
            ))}
        </ul>

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <h2>Вы уверены, что хотите удалить услугу?</h2>
            <p>{selectedService ? selectedService.name : ""}</p>
            {/*<button onClick={handleDelete}>Удалить</button>*/}
            {/*<button onClick={() => handleCloseModal()}>Отмена</button>*/}
            <button onClick={() => setIsModalOpen(false)}>Отмена</button>
        </Modal>

    </div>
}
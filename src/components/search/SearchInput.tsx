import {FC, useEffect, useMemo, useRef, useState} from "react";
import MainNavigationUl from "../navigation/MainNavigationUl";
import dayjs, { Dayjs } from "dayjs";
import { Button, Calendar, Input, Row, Select, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import IncrDecrButtons from "./IncrDecrButtons";
import React from "react";
import Modal from "../../UI/Modal";

// @ts-ignore
import { fetchData } from "../../utils/https";
// @ts-ignore
import { adddReservation } from "../../redux/booking-slice"

import localeData from 'dayjs/plugin/localeData';
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
dayjs.extend(localeData);


interface SearchInputProps {
    calendar?: boolean;
    paramsToGive: Record<string, any>; // Replace with the actual type if you know it
    selectedType?: string;
    //calendarValue?: Date;//I am not sure about this at all
    //setCalendarValue?: () => void;//I am not sure about this at all
}

const SearchInput: FC<SearchInputProps> = ({ calendar = false, paramsToGive, selectedType }) => {
    const { value, setValue, resultOfOptions, setResultOfOptions } = paramsToGive;
    //TODO: i have changed value to valuee



    useEffect(() => {
        setResultOfOptions(`adults ${value[0]} children ${value[1]} rooms ${value[2]}`)
        console.log("resultOfOptions:", resultOfOptions)
    }, [value]); //it is not changing because of "e.stopPropagation();" and "onMouseDown"

    // Function to update specific index in the array
    const updateValue = (index: number, newValue: number) => {
        setValue((prev: number[]) => {
            const updated = [...prev]; // Copy previous array
            updated[index] = newValue; // Update specific index
            return updated;
        });
    };

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    function openModal() {//TODO: to give the result of search here
        setIsModalOpen(true)
        console.log("button was clicked")
    }
    function handleCloseModal() {
        setIsModalOpen(false)
    }
    const resultOfSearch = null;//TODO: to put here searchButton result

    //let resultOfOptions = "adults " + value[0] + " children " + value[1] + " rooms " + value[2];

    const options = useMemo(() => [
        { value: "Adults", label: <IncrDecrButtons title="Adults" value={value[0]} setValue={(newVal) => updateValue(0, newVal)}/> },
        { value: "Children", label: <IncrDecrButtons title="Children" value={value[1]} setValue={(newVal) => updateValue(1, newVal)}/> },
        { value: "Rooms", label: <IncrDecrButtons title="Rooms" value={value[2]} setValue={(newVal) => updateValue(2, newVal)}/> },
    ], [value]);

    const [calendarValue, setCalendarValue] = useState(() => dayjs('2025-05-03'))
    const [selectedCalendarValue, setSelectedCalendarValue] = useState(() => dayjs('2025-05-03'));

    const [selectedDate, setSelectedDate] = useState<string>();
    function toCompareSelectedStartEndDate () {}

    type CalendarDate = {
        startDate?: string;
        endDate?: string;
    }
    const [selectedDate1, setSelectedDate1] = useState<CalendarDate | null>(null);
    const [dateValue, setDateValue] = useState<Dayjs | null>(null)
    /*//TODO:to rerender a component after changing it
    useEffect(() => {
    }, []);//this will not cause a component rerender*/

    const [selectedRange, setSelectedRange] = useState<{startDate?: Dayjs, endDate?: Dayjs}>({});


    useEffect(() => {
        //console.log("selectedDateselectedDateselectedDate:", selectedDate1)
    }, [selectedDate1]);

    const dateFlag = useRef<boolean>(false);
    function pickDate(formattedDate: string) {
        if (!dateFlag.current) {
            setSelectedDate1({
                startDate: formattedDate,
                endDate: ""
            })
            dateFlag.current = true;
        } else {
            setSelectedDate1({
                ...selectedDate1,
                endDate: formattedDate
            });
            //TODO: $$$
        }
    }

    const dispatch = useDispatch()
    //TODO: to work with selectedType param which i gave through SelectedRoomsTypePage()
    useEffect(() => {
        /*//TODO: to go to backend with this date if it was clicked //fetch("/bookdate/:id", {startDate, endDate, numberOfPeopleToBook})
        //const fetchedBookings =
        const bookingData = fetchData("http://localhost:3001/services/bookdate/${selectedType}", true, "PUT", {selectedDate1})//numberOfPeopleToBook is missing here//TODO: maybe to use it $$$
        console.log("bookingData:", bookingData)
        //fetchedBookings()
        //TODO: to create dates and prices inside backend => to filter them => to return filtered data
        //TODO: to display filtered data using dispatch()
        //dispatch(adddReservation(fetchedBookings))//TODO: to edit adddReservation()*/


        const fetchBookings = async () => {
            try {
                const value = { selectedDate1 };
                console.log("value useEffect():",value)
                const url = `http://localhost:3001/services/bookdate/${selectedType}`;
                const bookingData = await fetchData(url, true, "PUT", value);
                console.log("bookingData:", bookingData);
            } catch (e) {
                console.error("Ошибка при загрузке данных:", e);
            }
        };

        fetchBookings();
    }, [selectedDate1]);
    /*
    function onSelect(date: Dayjs) {
        if (!selectedRange.startDate || (selectedRange.startDate && selectedRange.endDate)) {
            // Начинаем новый выбор
            setSelectedRange({ startDate: date, endDate: undefined });
        } else if (selectedRange.startDate && !selectedRange.endDate) {
            // Выбираем endDate, который должен быть позже startDate
            if (date.isBefore(selectedRange.startDate)) {
                // Если выбрали дату раньше startDate, меняем местами
                setSelectedRange({ startDate: date, endDate: selectedRange.startDate });
            } else {
                setSelectedRange({ ...selectedRange, endDate: date });
            }
        }
    }*/

    const [selectedDatee, setSelectedDatee] = useState(undefined)

    return <div>
        <div className="custom-search">
            {/*<Input placeholder="Введите текст" style={{ width: "40%" }} />*/}
            <Input placeholder="Введите текст"/>
            <Select
                // defaultValue="lucy"
                //defaultValue={resultOfOptions}
                value={resultOfOptions}
                // style={{ width: "45%" }}
                options={options}
            />
            <Button type="primary" icon={<SearchOutlined/>} onClick={() => openModal()}/>

            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>results of filter||search input</h2>
                {resultOfSearch}
                <button onClick={() => handleCloseModal()}>close</button>
            </Modal>
        </div>


        {/*TODO: to put to the right 'calendar-panel' and it should be together with <Select> in some way*/}
        {
            calendar && <div className="calendar-panel">
                {/*TODO: to get rid of the top signs*/}
                <Calendar fullscreen={false}
                          // defaultValue={undefined}


                          value={selectedRange.endDate || selectedRange.startDate}
                          onSelect={(date, { source }) => {
                              if (source === 'date') {
                                  /*console.log('Panel Select:', source);
                                  console.log("Выбрана дата date:", date);
                                  console.log("Выбрана дата:", date.format("DD/MM/YYYY"));*/
                                  const formattedDate = date.format("DD/MM/YYYY");
                                  //setSelectedDate(formattedDate)
                                  //setDateValue(date)
                                  pickDate(formattedDate)

                                  // Обновим только если дата изменилась
                                  if (!dateValue || !date.isSame(dateValue, "day")) {
                                      setDateValue(date);
                                  }
                                  /*setSelectedDate1({
                                      startDate: formattedDate,
                                      endDate: ""
                                  })*/
                                  //console.log("selectedDate1?.startDate:", selectedDate1?.startDate)
                                  //setSelectedDate1(CalendarDate.startDate(formattedDate))
                                  //console.log("selectedDate:", selectedDate)
                              }
                          }}
                          //value={dateValue ?? undefined}
                          //value={undefined}

                          headerRender={({ value, type, onChange, onTypeChange }) => {
                    /*const start = 0;
                    const end = 12;
                    const monthOptions = [];
                    let current = value.clone();
                    const localeData = value.localeData();
                    const months = [];*/

                    return <>
                        <div style={{ padding: 8 }}>
                            <Typography.Title level={4}>Custom header</Typography.Title>
                            <Row gutter={8}>

                                {value.year()} {value.month()}
                            </Row>
                        </div>
                    </>;

                }}
                />

                {<Calendar
                    fullscreen={false}
                    validRange={[dayjs("2025-07-01"), dayjs("2025-07-31")]}
                    value={dayjs().add(1, "month").startOf("month") }
                    //value={dayjs().add(1, "month") }
                    //value={selectedDatee}
                    onSelect={(date, { source }) => {
                        if (source === 'date') {
                            /*console.log('Panel Select:', source);
                            console.log("Выбрана дата date:", date);
                            console.log("Выбрана дата:", date.format("DD/MM/YYYY"));*/
                            const formattedDate = date.format("DD/MM/YYYY");
                            //setSelectedDate(formattedDate)
                            /*setSelectedDate1({
                                startDate: formattedDate,
                                endDate: ""
                            })*/
                            pickDate(formattedDate)
                            //console.log("selectedDate1?.startDate:", selectedDate1?.startDate)
                            //setSelectedDate1(CalendarDate.startDate(formattedDate))
                            //console.log("selectedDate:", selectedDate)
                        }
                    }}

                />}
            </div>
        }
    </div>
}


export default SearchInput;
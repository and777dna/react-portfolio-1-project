/*
import { Button, Calendar, Col, ConfigProvider, Input, Radio, Row, Select, Space, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useMemo, useState } from "react";
import IncrDecrButtons from "./IncrDecrButtons";
import Modal from "../../UI/Modal";
import dayjs from 'dayjs';

//dayjs.locale("ru");

//First part(imported inside <RoomsPage.jsx />)
export default function SearchInput({ paramsToGive, calendar = false }) {
    const { value, setValue, resultOfOptions, setResultOfOptions } = paramsToGive;

    useEffect(() => {
        setResultOfOptions(`adults ${value[0]} children ${value[1]} rooms ${value[2]}`)
        console.log("resultOfOptions:", resultOfOptions)
    }, [value]); //it is not changing because of "e.stopPropagation();" and "onMouseDown"

    // Function to update specific index in the array
    const updateValue = (index, newValue) => {
        setValue((prev) => {
            const updated = [...prev]; // Copy previous array
            updated[index] = newValue; // Update specific index
            return updated;
        });
    };

    const [isModalOpen, setIsModalOpen] = useState(false)
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
    
    return <div>
        <div className="custom-search">
            {/!*<Input placeholder="Введите текст" style={{ width: "40%" }} />*!/}
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


        {/!*TODO: to put to the right 'calendar-panel' and it should be together with <Select> in some way*!/}
        {
            calendar && <div className="calendar-panel">
                {/!*TODO: to get rid of the top signs*!/}
                <Calendar fullscreen={false} headerRender={({ value, type, onChange, onTypeChange }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];
                    let current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    /!*for (let i = 0; i < 12; i++) {
                        current = current.month(i);
                        months.push(localeData.monthsShort(current));
                    }
                    for (let i = start; i < end; i++) {
                        monthOptions.push(
                            <Select.Option key={i} value={i} className="month-item">
                                {months[i]}
                            </Select.Option>,
                        );
                    }
                    const year = value.year();//returns actual year
                    const month = value.month();//returns actual month
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                        options.push(
                            <Select.Option key={i} value={i} className="year-item">
                                {i}
                            </Select.Option>,
                        );
                    }*!/
                    return <>
                        <div style={{ padding: 8 }}>
                            <Typography.Title level={4}>Custom header</Typography.Title>
                            <Row gutter={8}>
                                {/!*<Col>
                                    <Select
                                        size="small"
                                        popupMatchSelectWidth={false}
                                        className="my-year-select"
                                        value={year}
                                        onChange={newYear => {
                                            const now = value.clone().year(newYear);
                                            onChange(now);
                                        }}
                                    >
                                        {options}
                                    </Select>
                                </Col>*!/}
                                {value.year()} {value.month()}
                                {/!*<Col>
                                    <Select
                                        size="small"
                                        popupMatchSelectWidth={false}
                                        value={month}
                                        onChange={newMonth => {
                                            const now = value.clone().month(newMonth);
                                            onChange(now);
                                        }}
                                    >
                                        {monthOptions}
                                    </Select>
                                </Col>*!/}
                            </Row>
                        </div>
                    </>;

                }}
                />
                {/!*{<ConfigProvider fullscreen={false} locale={{ locale: "en-gb" }}>
                    <Calendar />
                </ConfigProvider> }*!/}
                {<Calendar
                    fullscreen={false}
                    validRange={[dayjs("2025-06-01"), dayjs("2025-06-28")]}
                    value={dayjs().add(1, "month").startOf("month") }
                />}
                {/!*<Calendar fullscreen={false} headerRender={({ value, type, onChange, onTypeChange }) => {
                    const start = 0;
                    const end = 12;
                    const monthOptions = [];
                    let current = value.clone();
                    const localeData = value.localeData();
                    const months = [];
                    for (let i = 0; i < 12; i++) {
                        current = current.month(i);
                        months.push(localeData.monthsShort(current));
                    }
                    for (let i = start; i < end; i++) {
                        monthOptions.push(
                            <Select.Option key={i} value={i} className="month-item">
                                {months[i]}
                            </Select.Option>,
                        );
                    }
                    const year = value.year();
                    const month = value.month();
                    const options = [];
                    for (let i = year - 10; i < year + 10; i += 1) {
                        options.push(
                            <Select.Option key={i} value={i} className="year-item">
                                {i}
                            </Select.Option>,
                        );
                    }
                    return <>
                        <div style={{ padding: 8 }}>
                            <Typography.Title level={4}>Custom header</Typography.Title>
                            <Row gutter={8}>
                                <Col>
                                    <Select
                                        size="small"
                                        popupMatchSelectWidth={false}
                                        className="my-year-select"
                                        value={year}
                                        onChange={newYear => {
                                            const now = value.clone().year(newYear);
                                            onChange(now);
                                        }}
                                    >
                                        {options}
                                    </Select>
                                </Col>
                                {year} {month}
                                <Col>
                                    <Select
                                        size="small"
                                        popupMatchSelectWidth={false}
                                        value={month}
                                        onChange={newMonth => {
                                            const now = value.clone().month(newMonth);
                                            onChange(now);
                                        }}
                                    >
                                        {monthOptions}
                                    </Select>
                                </Col>
                            </Row>
                        </div>
                    </>;

                }}
                />*!/}
            </div>
        }
    </div>
}*/

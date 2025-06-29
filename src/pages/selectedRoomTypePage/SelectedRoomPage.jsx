import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import Modal from "../../UI/Modal";
import React, { useState } from "react";

function goToSection(key) {
    const section = document.getElementById(key);
    console.log("key, section:",key, section);
    if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        //section.scrollTop += 500;
    }
}

const items = [
    {
        key: "1",
        label: "Overview",
    },
    {
        key: "2",
        label: "Info & prices"
    },
    {
        key: "3",
        label: "Facilities"
    },
    {
        key: "4",
        label: "House rules"
    },
    {
        key: "5",
        label: "The fine print"
    },
    {
        key: "6",
        label: "Guest reviews",
        children: (
            <h2>here i will show Modal</h2>
        )
    },
]

export default function SelectedRoomPage() {
    const [showMap, setShowMap] = useState(false)

    const params = useParams()
    const selectedProperty = params.selectedProperty

    const roomInfo = useSelector(state => state.booking.rooms)
    const roomFindedByID = roomInfo.find((room) => room.id === selectedProperty)
    console.log("roomFindedByID:",roomFindedByID)


    const lat = roomFindedByID?.location.coordinates.lat;
    const lng = roomFindedByID?.location.coordinates.lng;
    const address = roomFindedByID?.location.address;

    if (!lat || !lng) return <p>Координаты не найдены</p>;

    /*function goToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        //element.scrollLeft += 50;
        // element.scrollTop += 10;
    }*/


    return <>
        <Tabs
            defaultActiveKey="1"
            //items={items}
            items={items}
            onChange={goToSection}

            indicator={{
                size: (origin) => origin - 20,
                align: "center",
            }}
        />


        <div id="1">
            <h2>I am inside SelectedRoomPage {selectedProperty}</h2>
        </div>

        <div id="2">
            <h2>{roomFindedByID?.name}</h2>
            <h2>{roomFindedByID?.location.address}-<span
                style={{color: "blue", cursor: "pointer", textDecoration: "underline"}}
                onClick={() => setShowMap(true)}
            >
          {lat}, {lng}
        </span></h2>
        </div>


        <div id="3">
            {showMap && (
                <div
                    onClick={() => setShowMap(false)}//to make like modal
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "#fff",
                            padding: 20,
                            borderRadius: 8,
                            width: "90%",
                            maxWidth: "800px",
                            position: "relative",
                        }}
                    >
                        <button
                            onClick={() => setShowMap(false)}
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 10,
                                background: "transparent",
                                border: "none",
                                fontSize: "20px",
                                cursor: "pointer",
                            }}
                        >
                            ✕
                        </button>

                        <iframe
                            width="100%"
                            height="400"
                            style={{border: 0}}
                            loading="lazy"
                            allowFullScreen
                            src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                        />
                    </div>
                </div>
            )}
        </div>


        <div id="4">
            {roomFindedByID?.longDescription.split(".").map((sentence) => {
                return <h2>{sentence}</h2>
            })}
        </div>

    </>

}
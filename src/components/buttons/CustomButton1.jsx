import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";

export const CustomButton1 = ({ to, children }) => {
    const [isClicked, setIsClicked] = useState(false);

    return (
        <Link to={to}>
            <Button
                size="large"
                onClick={() => setIsClicked(true)}
                onMouseLeave={() => setIsClicked(false)}
                style={{
                    borderRadius: "12px",
                    backgroundColor: isClicked ? "#1890ff" : "#ffffff",
                    color: isClicked ? "#ffffff" : "#000000",
                    boxShadow: isClicked ? "none" : "0px 4px 6px rgba(0, 0, 0, 0.2)",
                    transition: "all 0.3s ease",
                    border: "1px solid #1890ff",
                }}
            >
                {children}
            </Button>
        </Link>
    );
};
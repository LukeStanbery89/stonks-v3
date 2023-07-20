import React, { useState } from "react";

const XHRTest: React.FC = () => {
    const [data, setData] = useState<{ message: string }>({ message: "" });

    async function testXHR() {
        setData({ message: "Sending XHR..." });
        try {
            const response = await fetch("/api/data");
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const responseData = await response.json();
            console.log("response from XHR:", responseData);
            setData(responseData);
        } catch (error) {
            console.error("Error during XHR:", error);
            setData({ message: "Error during XHR" });
        }
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={testXHR}>
        Test XHR
            </button>
            <p>
                <strong>XHR Result</strong>: {data.message}
            </p>
        </div>
    );
};

export default XHRTest;

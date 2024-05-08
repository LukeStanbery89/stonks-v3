import React, { useState } from "react";
import Logger from "@lukestanbery/ledger";

const XHRTest = () => {
    const [data, setData] = useState<{ message: string }>({ message: "" });

    async function testXHR() {
        setData({ message: "Sending XHR..." });
        try {
            const response = await fetch("/api/xhrTest");
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const responseData = await response.json();
            Logger.log("response from XHR:", responseData);
            setData(responseData);
        } catch (error) {
            Logger.error("Error during XHR:", error);
            setData({ message: "Error during XHR" });
        }
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" onClick={testXHR}>
                Test XHR
            </button>
            <p>XHR Result: {data.message}</p>
        </div>
    );
};

export default XHRTest;

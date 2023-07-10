import React, { useState } from "react";
import axios from "axios";


const XHRTest: React.FC = () => {
    const [data, setData] = useState<{ message: string }>({ message: "" });

    async function testXHR() {
        setData({ message: "Sending XHR..." });
        const response = await axios.get("/api/data");
        console.log("response from XHR:", response.data);
        setData(response.data);
    }

    return (
        <div>
            <button type='button' className='btn btn-primary' onClick={testXHR}>Test XHR</button>
            <p><strong>XHR Result</strong>: {data.message}</p> {/* Access the 'message' property */}
        </div>
    );
};

export default XHRTest;

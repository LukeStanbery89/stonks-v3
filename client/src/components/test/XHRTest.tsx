import React, { useEffect, useState } from "react";
import axios from "axios";

const XHRTest: React.FC = () => {
    const [data, setData] = useState<{ message: string }>({ message: "" });

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/data"); // Replace with your API endpoint
            setData(response.data);
        };

        fetchData();
    }, []);
    return (
        <div>
            <p><strong>XHR Test</strong>: {data.message}</p> {/* Access the 'message' property */}
        </div>
    );
};

export default XHRTest;

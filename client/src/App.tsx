import React, { useEffect, useState } from "react";
import axios from "axios";

const App: React.FC = () => {
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
            <h1>Hello, World!</h1>
            <p>Data from server: {data.message}</p> {/* Access the 'message' property */}
        </div>
    );
};

export default App;

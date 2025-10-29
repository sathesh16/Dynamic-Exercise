import React, { useState, useEffect } from "react";

export default function SearchData() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    async function callData() {
        const apidata = await fetch("https://jsonplaceholder.typicode.com/posts");
        const jsData = await apidata.json();
        setData(jsData.splice(0, 19));
    }

    useEffect(() => {
        callData();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500); // wait 400ms after typing stops

        return () => clearTimeout(timeout); // cleanup old timer on each keystroke
    }, [searchTerm]);

    function highlightText(text, search) {
        if (!text) return "";
        if (!search) return text;

        // escape regex special chars
        const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const regex = new RegExp(`(${safeSearch})`, "gi");

        return text.split(regex).map((part, i) =>
            part.toLowerCase() === search.toLowerCase() ? (
                <mark key={i}>{part}</mark>
            ) : (
                part
            )
        );
    }

    return (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: "8px", width: "100%", marginBottom: "20px" }}
            />

            {data
                .filter(
                    (item) =>
                        item.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                        item.body.toLowerCase().includes(debouncedSearch.toLowerCase())
                )
                .map((item) => (
                    <div
                        key={item.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            borderRadius: "8px",
                            marginBottom: "10px",
                        }}
                    >
                        <h3>{highlightText(item.title, searchTerm)}</h3>
                        <p style={{ whiteSpace: "pre-line" }}>
                            {highlightText(item.body, searchTerm)}
                        </p>
                    </div>
                ))}
        </div>
    );
}

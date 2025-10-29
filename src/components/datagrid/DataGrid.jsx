import React, { useEffect, useState } from 'react'

function DataGrid() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState("")
    
    const rowsPerPage = 5;

    async function callData() {
        const remoteData = await fetch('https://jsonplaceholder.typicode.com/users')
        const jsData = await remoteData.json()
        setData(jsData)
    }

    useEffect(() => {
        callData();
    }, [])

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const start = (currentPage - 1) * rowsPerPage;
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const sortedData = React.useMemo(() => {
        let sortableData = [...data];
        if (sortConfig.key !== null) {
            sortableData.sort((a, b) => {
                const aValue = a[sortConfig.key].toString().toLowerCase();
                const bValue = b[sortConfig.key].toString().toLowerCase();

                if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);



    // Pagination logic
    // const totalPages = Math.ceil(sortedData.length / rowsPerPage);
    // const start = (currentPage - 1) * rowsPerPage;
    const paginatedData = sortedData.slice(start, start + rowsPerPage);



    // Handle sorting column click
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        handleSort("name")
    }, [])


    // Arrow symbol for active sort column
    const getSortSymbol = (key) => {
        if (sortConfig.key !== key) return "";
        return sortConfig.direction === "asc" ? " (asc)" : " (desc)";
    };

    return (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #000", padding: "8px" }}>No</th>
                        <th style={{ border: "1px solid #000", padding: "8px" }} onClick={() => handleSort("name")}>Name {getSortSymbol("name")}</th>
                        <th style={{ border: "1px solid #000", padding: "8px" }}>Email</th>
                        <th style={{ border: "1px solid #000", padding: "8px" }}>Phone</th>
                        <th style={{ border: "1px solid #000", padding: "8px" }}>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item, index) => (
                        <tr key={item.id}>
                            <td style={{ border: "1px solid #000", padding: "8px" }}>{index + 1}</td>
                            <td style={{ border: "1px solid #000", padding: "8px" }}>{item.name}</td>
                            <td style={{ border: "1px solid #000", padding: "8px" }}>{item.email}</td>
                            <td style={{ border: "1px solid #000", padding: "8px" }}>{item.phone}</td>
                            <td style={{ border: "1px solid #000", padding: "8px" }}>{item.company.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        style={{
                            margin: "5px",
                            padding: "5px 10px",
                            backgroundColor: currentPage === index + 1 ? "#333" : "#ccc",
                            color: currentPage === index + 1 ? "#fff" : "#000",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        {index + 1}
                    </button>))}
            </div>
        </div>
    )
}

export default DataGrid

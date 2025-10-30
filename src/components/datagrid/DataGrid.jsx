import React, { useState, useEffect } from "react";

const DataGrid = () => {
  const [data, setData] = useState([]); // all data from API
  const [filteredData, setFilteredData] = useState([]); // data after search/filter
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  //  Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const json = await response.json();
      setData(json);
      setFilteredData(json);
    };
    fetchData();
  }, []);

  //  Handle Search (Global Filter) by array.filter function with string includes
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter across all columns
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );

    setFilteredData(filtered);
    setCurrentPage(1); // reset pagination
  };

  //  Sorting Logic
  const handleSort = (columnKey) => {
    let direction = "ascending";

    // Toggle direction if same column is clicked again
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[columnKey];
      const bValue = b[columnKey];

      //Ascending order logic
      if (direction === "ascending") {
        if (aValue < bValue) return -1; //(a,b)
        if (aValue > bValue) return 1; //(b,a)
        return 0; //same position
      }

      // Descending order logic
      else {
        if (aValue < bValue) return 1;
        if (aValue > bValue) return -1;
        return 0;
      }
    });

    setFilteredData(sorted);
    setSortConfig({ key: columnKey, direction });
  };


  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "sans-serif" }}>
      <h2>Sorting + Search + Pagination</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search across all columns..."
        value={searchTerm}
        onChange={handleSearch}
        style={{
          marginBottom: "15px",
          padding: "8px",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {/* 🧾 Table */}
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name {sortConfig.key === "name" ? (sortConfig.direction === "ascending" ? "(asc)" : "(desc)") : ""}
            </th>
            <th onClick={() => handleSort("username")}>
              Username {sortConfig.key === "username" ? (sortConfig.direction === "ascending" ? "(asc)" : "(desc)") : ""}
            </th>
            <th>
              Email
            </th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>


      <div style={{ marginTop: "15px" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: "2px",
              padding: "6px 12px",
              border: "1px solid #ccc",
              background: "#000",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataGrid;

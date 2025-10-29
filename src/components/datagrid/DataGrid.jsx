import React, { useEffect, useState, useMemo, useCallback } from "react";

// ✅ TableRow Component — memoized to avoid unnecessary re-renders
const TableRow = React.memo(({ user }) => (
  <tr>
    <td>{user.id}</td>
    <td>{user.name}</td>
    <td>{user.username}</td>
    <td>{user.email}</td>
    <td>{user.address.city}</td>
  </tr>
));

const DataGrid = () => {
  // 🔹 State variables
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 5;

  // 🔹 Fetch API Data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 🔹 Handle sorting logic
  const handleSort = useCallback((columnKey) => {
    setSortConfig((prev) => {
      if (prev.key === columnKey && prev.direction === "ascending") {
        return { key: columnKey, direction: "descending" };
      }
      return { key: columnKey, direction: "ascending" };
    });
  }, []);

  // 🔹 Derived data (filtered + sorted + paginated)
  const processedData = useMemo(() => {
    let filteredData = [...data];

    // 1️⃣ Filter/Search (case-insensitive across all columns)
    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      filteredData = filteredData.filter((user) =>
        Object.values(user).some((value) =>
          typeof value === "object"
            ? JSON.stringify(value).toLowerCase().includes(lower)
            : String(value).toLowerCase().includes(lower)
        )
      );
    }

    // 2️⃣ Sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return filteredData;
  }, [data, searchTerm, sortConfig]);

  // 3️⃣ Pagination
  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = processedData.slice(startIndex, startIndex + rowsPerPage);

  // 🔹 Handle page changes
  const handlePageChange = useCallback((page) => setCurrentPage(page), []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>React Data Grid (No Libraries)</h2>

      {/* 🔍 Search box */}
      <input
        type="text"
        placeholder="Search across all columns..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // reset to first page
        }}
        style={{
          marginBottom: "15px",
          padding: "8px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* 📋 Table */}
      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%", textAlign: "left" }}
      >
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortConfig.key === "name"
                ? sortConfig.direction === "ascending"
                  ? "🔼"
                  : "🔽"
                : ""}
            </th>
            <th onClick={() => handleSort("username")}>
              Username{" "}
              {sortConfig.key === "username"
                ? sortConfig.direction === "ascending"
                  ? "🔼"
                  : "🔽"
                : ""}
            </th>
            <th>
              Email
            </th>
            <th onClick={() => handleSort("address")}>City</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((user) => <TableRow key={user.id} user={user} />)
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                No matching data found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔢 Pagination */}
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              padding: "6px 10px",
              margin: "0 3px",
              borderRadius: "4px",
              border: currentPage === index + 1 ? "2px solid #000" : "1px solid #ccc",
              backgroundColor: currentPage === index + 1 ? "#eee" : "#fff",
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

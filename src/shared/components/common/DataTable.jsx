// dynamic cols, search and devounced search, sorting, pagination, custom renderring, Status badge, rowclick, actions, responsive.
import { useMemo, useState } from "react";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Loader from "./Loader";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import SearchBar from "./SearchBar";
import StatusBadge from "./StatusBadge";
import CustomPagination from "./Pagination";
import useDebounce from "../../hooks/useDebounce";
import formatCurrency from "../../utils/formatCurrency";
function DataTable({
  columns = [],
  data = [],
  loading = false,
  error = false,
  searchable = true,
  sortable = true,
  pagination = true,
  striped = false,
  hover = true,
  pageSize = 10,
  searchFields = [],
  emptyTitle = "No Data Found",
  emptyMessage = "Nothing to display.",
  actions,
  onRowClick,
}) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  //sort config: which column and what type
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
  // frontend pageration.
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) {
      return data;
    }
    const keyword = debouncedSearch.toLowerCase();
    return data.filter((item) => {
      const fields =searchFields.length > 0? searchFields: columns.map((column) => column.accessor);
      return fields.some((field) => {
        const value = item[field];
        if (value === null || value === undefined) {
          return false;
        }
        return value.toString().toLowerCase().includes(keyword);
      });
    });
  }, [debouncedSearch, data, columns, searchFields]);
  //sorting logic
  const sortedData = useMemo(() => {
    if (!sortable || !sortConfig.key) {
      return filteredData;
    }
    return [...filteredData].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
      /* Numbers */
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortConfig.direction === "asc"? valueA - valueB: valueB - valueA;
      }
      /* Dates */
      if (!isNaN(Date.parse(valueA)) && !isNaN(Date.parse(valueB))) {
        return sortConfig.direction === "asc"
          ? new Date(valueA) - new Date(valueB)
          : new Date(valueB) - new Date(valueA);
      }
      /* Strings */
      const compare = valueA.toString().localeCompare(valueB.toString());
      return sortConfig.direction === "asc" ? compare : -compare;
    });
  }, [filteredData, sortConfig, sortable]);
    /* Pagination*/
  const totalItems = sortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentData = useMemo(() => {
    if (!pagination) {
      return sortedData;
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize, pagination]);
  /* Reset Page After Search*/
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages, debouncedSearch]);
  /* Sorting Handler*/
  const handleSort = (column) => {
    if (!sortable) return;
    setSortConfig((previous) => ({
      key: column,
      direction:
        previous.key === column && previous.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };
  /*  Utility Render Functions*/
  const renderValue = (column, row) => {
    const value = row[column.accessor];
    //custom
    if (column.render) {
      return column.render(row, value);
    }
    //image
    if (column.type === "image") {
      return (
        <img
          src={value}
          alt={row.product_name}
          width={55}
          height={55}
          className="rounded object-fit-cover"
        />
      );
    }
    //currency
    if (column.type === "currency") {
      return formatCurrency(value);
    }
   //status
    if (column.type === "status") {
      return <StatusBadge status={value} />;
    }
    //rating
    if (column.type === "rating") {
      return <span>{"⭐".repeat(value)}</span>;
    }
    //boolean
    if (column.type === "boolean") {
      return value ? "✔ Yes" : "✖ No";
    }
    //date
    if (column.type === "date") {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };
  //loading
  if (loading) {
    return <Loader message="Loading Data..." />;
  }
  //error
  if (error) {
    return <ErrorState />;
  }
  //empty
  if (!data.length) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }
  return (
    <Card className="shadow-sm border-0 rounded-4">
      <Card.Body>
        {/*Search*/}
        {searchable && (
          <div className="d-flex justify-content-end mb-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search..."
            />
          </div>
        )}
       
        {/*Responsive Table*/}
        <div className="table-responsive">
          <Table
            striped={striped}
            hover={hover}
            bordered={false}
            responsive
            className="align-middle mb-0"
          >
            {/* Table Header */}
            <thead className="table-light">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.accessor}
                    style={{
                      cursor: sortable ? "pointer" : "default",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                      verticalAlign: "middle",
                    }}
                    onClick={() => handleSort(column.accessor)}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <span>{column.header}</span>
                      {sortable && sortConfig.key === column.accessor && (
                        <span className="ms-2">
                          {sortConfig.direction === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th
                    className="text-center"
                    style={{
                      width: "170px",
                    }}
                  >
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            {/* Table Body*/}
            <tbody>
              {currentData.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick && onRowClick(row)}
                  style={{
                    cursor: onRowClick ? "pointer" : "default",
                  }}
                >
                  {columns.map((column) => (
                    <td key={column.accessor} className="align-middle">
                      {renderValue(column, row)}
                    </td>
                  ))}
                  {actions && <td className="text-center">{actions(row)}</td>}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
              {/*Footer */}
        {pagination && (
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
            <small className="text-muted mb-3 mb-md-0">
              Showing{" "}
              <strong>
                {totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}
              </strong>
              {" - "}
              <strong>{Math.min(currentPage * pageSize, totalItems)}</strong>
              {" of "}
              <strong>{totalItems}</strong>
              {" entries"}
            </small>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default DataTable;

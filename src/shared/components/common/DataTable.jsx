import { ArrowUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { SkeletonRow } from "./Skeleton";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { Pagination } from "./Pagination";
import "./DataTable.css";

function defaultGetRowKey(row) {
  return row.id;
}

function renderSortIcon(column, sortField, sortDirection) {
  if (!column.sortable) {
    return null;
  }

  const isActive = sortField === column.key;

  if (!isActive) {
    return (
      <ArrowUpDown
        className="data-table__sort-icon data-table__sort-icon--idle"
        size={14}
        strokeWidth={2}
        aria-hidden="true"
      />
    );
  }

  return sortDirection === "asc" ? (
    <ChevronUp
      className="data-table__sort-icon data-table__sort-icon--active"
      size={14}
      strokeWidth={2}
      aria-hidden="true"
    />
  ) : (
    <ChevronDown
      className="data-table__sort-icon data-table__sort-icon--active"
      size={14}
      strokeWidth={2}
      aria-hidden="true"
    />
  );
}

export function DataTable({
  columns,
  rows,
  isLoading = false,
  isError = false,
  onRetry,
  emptyState,
  sortField,
  sortDirection,
  onSortChange,
  getRowKey = defaultGetRowKey,
  pagination,
}) {
  const columnCount = columns.length;
  const showEmpty = !isLoading && !isError && rows.length === 0;

  return (
    <div className="data-table">
      <table className="data-table__table">
        <thead className="data-table__head">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`data-table__header ${column.sortable ? "data-table__header--sortable" : ""}`}
                style={{ width: column.width }}
                onClick={
                  column.sortable && onSortChange
                    ? () => onSortChange(column.key)
                    : undefined
                }
                aria-sort={
                  column.sortable && sortField === column.key
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
              >
                <span className="data-table__header-content">
                  {column.header}
                  {renderSortIcon(column, sortField, sortDirection)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading &&
            Array.from({ length: 5 }, (_, index) => (
              <SkeletonRow key={index} columns={columnCount} />
            ))}

          {!isLoading && isError ? (
            <tr>
              <td colSpan={columnCount}>
                <ErrorState onRetry={onRetry} />
              </td>
            </tr>
          ) : null}

          {showEmpty ? (
            <tr>
              <td colSpan={columnCount}>
                {emptyState && !isValidReactNode(emptyState) ? (
                  <EmptyState
                    icon={emptyState.icon}
                    heading={emptyState.heading}
                    body={emptyState.body}
                    action={emptyState.action}
                  />
                ) : (
                  (emptyState ?? (
                    <EmptyState
                      heading="No records found"
                      body="There's nothing to show yet."
                    />
                  ))
                )}
              </td>
            </tr>
          ) : null}

          {!isLoading && !isError && !showEmpty
            ? rows.map((row) => (
                <tr key={getRowKey(row)} className="data-table__row">
                  {columns.map((column) => (
                    <td key={column.key} className="data-table__cell">
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>

      {pagination ? (
        <div className="data-table__footer">
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
            pageSize={pagination.pageSize}
            onPageSizeChange={pagination.onPageSizeChange}
          />
        </div>
      ) : null}
    </div>
  );
}
function isValidReactNode(value) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    (value && typeof value === "object" && "$$typeof" in value)
  );
}

export default DataTable;

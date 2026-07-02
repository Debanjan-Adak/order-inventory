import Pagination from "react-bootstrap/Pagination";
function CustomPagination({currentPage,totalPages,totalItems,pageSize,onPageChange}) {
  if (totalPages <= 1) return null;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4">
 
      <small className="text-secondary mb-2 mb-md-0">
        Showing <strong>{startItem}</strong> - <strong> {endItem}</strong> of{" "}
        <strong>{totalItems}</strong>
      </small>

      <Pagination className="mb-0">
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
        />

        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />

        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />

        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        />
      </Pagination>
    </div>
  );
}

export default CustomPagination;

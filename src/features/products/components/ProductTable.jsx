import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import ProductImage from "./ProductImage";
import { formatCurrency } from "../../../shared/utils/formatCurrency";
import DataTable from "../../../shared/components/common/DataTable";

function ProductTable({ products, isLoading, onEdit, onDelete }) {
  const columns = [
    {
      key: "image",
      header: "",
      render: (product) => <ProductImage colour={product.colour} size="table" />,
    },
    {
      key: "product_name",
      header: "Name",
      render: (product) => (
        <Link
          to={`/products/${product.product_name}`}
          className="text-decoration-none fw-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {product.product_name}
        </Link>
      ),
    },
    {
      key: "brand",
      header: "Brand",
      render: (product) => (
        <span className="badge rounded-pill text-bg-light border">
          {product.brand}
        </span>
      ),
    },
    {
      key: "colour",
      header: "Colour",
      render: (product) => (
        <span style={{ color: "var(--text-secondary)" }}>{product.colour}</span>
      ),
    },
    {
      key: "size",
      header: "Size",
      render: (product) => (
        <span style={{ color: "var(--text-secondary)" }}>{product.size}</span>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (product) => (
        <span style={{ fontVariantNumeric: "tabular-nums" }}>{product.rating}</span>
      ),
    },
    {
      key: "unit_price",
      header: "Price",
      render: (product) => (
        <span
          className="fw-medium"
          style={{ fontVariantNumeric: "tabular-nums", color: "var(--text-primary)" }}
        >
          {formatCurrency(product.unit_price)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (product) => (
        <div className="d-flex gap-1 justify-content-end">
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-circle d-flex align-items-center justify-content-center p-1"
            aria-label="Edit product"
            onClick={() => onEdit(product)}
          >
            <Pencil size={14} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-light border rounded-circle d-flex align-items-center justify-content-center p-1"
            aria-label="Delete product"
            onClick={() => onDelete(product)}
          >
            <Trash2 size={14} strokeWidth={1.75} className="text-danger" />
          </button>
        </div>
      ),
    },
  ];

  const visibleColumns = useMemo(() => {
    const cols = columns.map(col => ({
      ...col,
      accessor: col.accessor || col.key
    }));
    if (!onEdit && !onDelete) {
      return cols.filter((col) => col.accessor !== "actions");
    }
    return cols;
  }, [onEdit, onDelete]);

  return (
    <DataTable
      columns={visibleColumns}
      data={products}
      loading={isLoading}
      rowKey={(product) => product.product_id}
      emptyTitle="No products yet"
      emptyMessage="Add a product to start building your catalog."
    />
  );
}

export default ProductTable;
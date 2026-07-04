import { Pencil, Trash2, Star, PackageSearch } from 'lucide-react';
import { DataTable } from '@shared/components/common/DataTable';
import formatCurrency from '@shared/utils/formatCurrency';
import { ProductImage } from './ProductImage';
import './ProductTable.css';

const DEFAULT_EMPTY_STATE = {
  icon: PackageSearch,
  heading: 'No products found',
  body: 'Try adjusting your filters or search query.',
};

export function ProductTable({
  rows,
  isLoading,
  isError,
  onRetry,
  emptyState,
  onEdit,
  onDelete,
  pagination,
}) {
  const columns = [
    {
      key: 'product_name',
      header: 'Product',
      render: (row) => (
        <div className="product-table__name-cell">
          <ProductImage
            image={row.image}
            colour={row.colour}
            alt={row.product_name}
            variant="avatar"
          />
          <span className="product-table__name">
            {row.product_name}
          </span>
        </div>
      ),
    },
    {
      key: 'brand',
      header: 'Brand',
    },
    {
      key: 'colour',
      header: 'Colour',
    },
    {
      key: 'size',
      header: 'Size',
    },
    {
      key: 'unit_price',
      header: 'Price',
      render: (row) => (
        <span className="product-table__price tabular-nums">
          {formatCurrency(row.unit_price)}
        </span>
      ),
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (row) => (
        <span className="product-table__rating">
          <Star
            size={14}
            strokeWidth={2}
            className="product-table__rating-star"
          />
          {Number(row.rating) || 0}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      width: 96,
      render: (row) => (
        <div className="product-table__actions">
          <button
            type="button"
            className="btn btn-outline-secondary product-table__action"
            onClick={() => onEdit?.(row)}
            aria-label={`Edit ${row.product_name}`}
            title="Edit"
          >
            <Pencil size={14} strokeWidth={2} />
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary product-table__action product-table__action--danger"
            onClick={() => onDelete?.(row)}
            aria-label={`Delete ${row.product_name}`}
            title="Delete"
          >
            <Trash2 size={14} strokeWidth={2} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      isError={isError}
      onRetry={onRetry}
      emptyState={emptyState ?? DEFAULT_EMPTY_STATE}
      pagination={pagination}
      getRowKey={(row) => row.id}
    />
  );
}

export default ProductTable;
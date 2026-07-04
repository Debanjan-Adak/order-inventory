import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { useFiltersStore } from '@stores/filtersStore';
import { EmptyState } from '@shared/components/common/EmptyState';
import { ConfirmDialog } from '@shared/components/common/ConfirmDialog';
import { Pagination } from '@shared/components/common/Pagination';
import { usePagination } from '@shared/hooks/usePagination';
import { useProducts } from '../hooks/useProducts';
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from '../hooks/useProductMutations';
import { ProductGrid } from '../components/ProductGrid';
import { ProductTable } from '../components/ProductTable';
import { ProductForm } from '../components/ProductForm';
import { ProductSearch } from '../components/ProductSearch';
import { ProductFilter } from '../components/ProductFilter';
import './Products.css';

function sortProducts(products, sortField) {
  if (!sortField) {
    return products;
  }

  return [...products].sort((a, b) => {
    if (a[sortField] < b[sortField]) return -1;
    if (a[sortField] > b[sortField]) return 1;
    return 0;
  });
}

export function Products() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  const filters = useFiltersStore((state) => state.products);
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useProducts();

  const [viewMode, setViewMode] = useState('grid');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const filteredProducts = useMemo(() => {
    const all = products ?? [];
    const search = filters.search.trim().toLowerCase();

    const filtered = all.filter((product) => {
      if (
        search &&
        !product.product_name.toLowerCase().includes(search)
      ) {
        return false;
      }

      if (
        filters.brand &&
        product.brand !== filters.brand
      ) {
        return false;
      }

      if (
        filters.colour &&
        product.colour !== filters.colour
      ) {
        return false;
      }

      return true;
    });

    return sortProducts(filtered, filters.sortField);
  }, [products, filters]);

  const {
    page,
    setPage,
    totalPages,
    pageItems,
  } = usePagination({
    totalItems: filteredProducts.length,
    pageSize: 12,
  });

  const pagedProducts = pageItems(filteredProducts);

  const hasNoData =
    !isLoading &&
    !isError &&
    (products ?? []).length === 0;

  const hasActiveFilters = Boolean(
    filters.search ||
      filters.brand ||
      filters.colour
  );

  const hasNoResults =
    !isLoading &&
    !isError &&
    (products ?? []).length > 0 &&
    filteredProducts.length === 0;

  function openCreateForm() {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  function openEditForm(product) {
    setEditingProduct(product);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingProduct(null);
  }

  async function handleFormSubmit(values) {
    if (editingProduct) {
      await updateProduct.mutateAsync({
        id: editingProduct.id,
        ...values,
      });
    } else {
      await createProduct.mutateAsync(values);
    }
  }

  async function handleDeleteConfirm() {
    if (!deletingProduct) return;

    try {
      await deleteProduct.mutateAsync(
        deletingProduct.id
      );
      setDeletingProduct(null);
    } catch {}
  }

  if (isAdmin) {
    const adminEmptyState = hasNoResults
      ? {
          heading: 'No products match your filters',
          body: 'Try adjusting the brand or colour filters.',
        }
      : {
          heading: 'No products yet',
          body: 'Add a product to start building your catalog.',
        };

    return (
      <div className="products-page products-page--admin">
        <div className="products-page__header">
          <h1 className="products-page__title">
            Products
          </h1>

          <button
            type="button"
            className="btn btn-primary"
            onClick={openCreateForm}
          >
            <Plus
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Add Product
          </button>
        </div>

        <div className="products-page__toolbar">
          <ProductSearch />
          <ProductFilter />

          <div
            className="products-page__view-toggle"
            role="group"
            aria-label="Toggle view"
          >
            <button
              type="button"
              className={`products-page__view-btn ${
                viewMode === 'grid'
                  ? 'products-page__view-btn--active'
                  : ''
              }`}
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              aria-pressed={viewMode === 'grid'}
              title="Grid view"
            >
              <LayoutGrid
                size={16}
                strokeWidth={2}
              />
            </button>

            <button
              type="button"
              className={`products-page__view-btn ${
                viewMode === 'list'
                  ? 'products-page__view-btn--active'
                  : ''
              }`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
              aria-pressed={viewMode === 'list'}
              title="List view"
            >
              <List
                size={16}
                strokeWidth={2}
              />
            </button>
          </div>
        </div>

        <div
          key={viewMode}
          className="products-page__content"
        >
          {viewMode === 'grid' ? (
            <>
              <ProductGrid
                products={pagedProducts}
                mode="admin"
                isLoading={isLoading}
                emptyState={adminEmptyState}
                onEdit={openEditForm}
                onDelete={setDeletingProduct}
              />

              {filteredProducts.length > 12 && (
                <div className="mt-4">
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              )}
            </>
          ) : (
            <ProductTable
              rows={pagedProducts}
              isLoading={isLoading}
              isError={isError}
              onRetry={refetch}
              emptyState={adminEmptyState}
              onEdit={openEditForm}
              onDelete={setDeletingProduct}
              pagination={
                filteredProducts.length > 12
                  ? {
                      page,
                      totalPages,
                      onPageChange: setPage,
                    }
                  : undefined
              }
            />
          )}
        </div>

        <ProductForm
          isOpen={isFormOpen}
          onClose={closeForm}
          initialValues={editingProduct}
          onSubmit={handleFormSubmit}
        />

        <ConfirmDialog
          isOpen={Boolean(deletingProduct)}
          onClose={() =>
            setDeletingProduct(null)
          }
          onConfirm={handleDeleteConfirm}
          title="Delete this product?"
          body={`This will permanently remove ${
            deletingProduct?.product_name ??
            'this product'
          } from the catalog.`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          isDestructive
          isPending={deleteProduct.isPending}
        />
      </div>
    );
  }

  return (
    <div className="products-page products-page--customer">
      <h1 className="products-page__title">
        Products
      </h1>

      <div className="products-page__toolbar">
        <ProductSearch />
        <ProductFilter />
      </div>

      {hasNoData ? (
        <EmptyState
          heading="No products yet"
          body="Check back soon for new arrivals."
        />
      ) : (
        <>
          <ProductGrid
            products={pagedProducts}
            mode="customer"
            isLoading={isLoading}
            emptyState={
              hasActiveFilters
                ? {
                    heading:
                      'No products match your filters',
                    body: 'Try adjusting the brand or colour filters.',
                  }
                : {
                    heading: 'No products found',
                    body: "There's nothing to show yet.",
                  }
            }
          />

          {filteredProducts.length > 12 && (
            <div className="mt-4">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
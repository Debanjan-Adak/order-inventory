// for structure

import { useState, useMemo } from "react";
import { LayoutGrid, List } from "lucide-react";
import PageHeader from "../../../shared/components/layout/PageHeader";
import ProductGrid from "../components/ProductGrid";
import ProductTable from "../components/ProductTable";
import ProductSearch from "../components/ProductSearch";
import ProductFilter from "../components/ProductFilter";
import ProductForm from "../components/ProductForm";
import ConfirmDialog from "../../../shared/components/common/ConfirmDialog";
import { useProducts } from "../hooks/useProducts";
import { useDeleteProduct } from "../hooks/useProductMutations";
import useAuthStore from "../../auth/store/authStore";

function Products() {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const role = useAuthStore((state) => state.role);
  const isAdmin = role === "admin";

  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("");
  const [colour, setColour] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchesSearch = searchTerm
        ? product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesBrand = brand ? product.brand === brand : true;
      const matchesColour = colour ? product.colour === colour : true;
      return matchesSearch && matchesBrand && matchesColour;
    });
  }, [products, searchTerm, brand, colour]);

  const hasFilters = Boolean(searchTerm || brand || colour);

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (product) => {
    setDeletingProduct(product);
  };

  const handleConfirmDelete = async () => {
    if (deletingProduct) {
      await deleteProduct.mutateAsync(deletingProduct.product_id);
      setDeletingProduct(null);
    }
  };

  return (
    <div className="d-flex flex-column gap-4">
      <PageHeader title="Products" actionLabel={isAdmin ? "Add Product" : undefined} onAction={isAdmin ? handleAddClick : undefined} />

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <ProductSearch onSearch={setSearchTerm} />
          <ProductFilter
            products={products}
            brand={brand}
            colour={colour}
            onBrandChange={setBrand}
            onColourChange={setColour}
          />
        </div>

        <div className="btn-group" role="group" aria-label="View toggle">
          <button
            type="button"
            className={"btn btn-outline-secondary" + (viewMode === "grid" ? " active" : "")}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid size={16} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            className={"btn btn-outline-secondary" + (viewMode === "table" ? " active" : "")}
            onClick={() => setViewMode("table")}
            aria-label="Table view"
          >
            <List size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <ProductGrid
          products={filteredProducts}
          isLoading={isLoading}
          onEdit={isAdmin ? handleEditClick : undefined}
          onDelete={isAdmin ? handleDeleteClick : undefined}
          hasFilters={hasFilters}
        />
      ) : (
        <ProductTable
          products={filteredProducts}
          isLoading={isLoading}
          onEdit={isAdmin ? handleEditClick : undefined}
          onDelete={isAdmin ? handleDeleteClick : undefined}
        />
      )}

      <ProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        product={editingProduct}
      />

      <ConfirmDialog
        isOpen={Boolean(deletingProduct)}
        title="Delete this product?"
        body={
          deletingProduct
            ? `This will permanently remove ${deletingProduct.product_name} from the catalog.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingProduct(null)}
        isDestructive
      />
    </div>
  );
}

export default Products;
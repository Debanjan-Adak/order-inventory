import ProductCard from "./ProductCard";
import Skeleton from "../../../shared/components/common/Skeleton";
import EmptyState from "../../../shared/components/common/EmptyState";

function ProductGrid({ products, isLoading, onEdit, onDelete, hasFilters }) {
  if (isLoading) {
    return (
      <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div className="col" key={i}>
            <div className="card border h-100">
              <div className="p-3 pb-0">
                <div className="placeholder-glow">
                  <span
                    className="placeholder col-12 rounded-3"
                    style={{ height: "110px" }}
                  ></span>
                </div>
              </div>
              <div className="card-body placeholder-glow d-flex flex-column gap-2">
                <span className="placeholder col-8"></span>
                <span className="placeholder col-5"></span>
                <span className="placeholder col-4"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return hasFilters ? (
      <EmptyState
        heading="No products match your filters"
        body="Try adjusting the brand or colour filters."
      />
    ) : (
      <EmptyState
        heading="No products yet"
        body="Add a product to start building your catalog."
      />
    );
  }

  return (
    <div
      className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4"
      style={{ animation: "fadeIn 250ms ease-in-out" }}
    >
      {products.map((product, index) => (
        <div
          className="col"
          key={product.product_id}
          style={{
            animation: "fadeInUp 250ms ease-out",
            animationDelay: `${index * 30}ms`,
            animationFillMode: "backwards",
          }}
        >
          <ProductCard product={product} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";
import { useInventory } from "../../inventory/hooks/useInventory";
import { useProducts } from "../../products/hooks/useProducts";

const LOW_STOCK_THRESHOLD = 10;

function LowStockCard() {
  const { data: inventory, isLoading: inventoryLoading } = useInventory();
  const { data: products, isLoading: productsLoading } = useProducts();

  const isLoading = inventoryLoading || productsLoading;

  const lowStockItems = useMemo(() => {
    if (!inventory) return [];
    return inventory
      .filter((item) => item.product_inventory < LOW_STOCK_THRESHOLD)
      .sort((a, b) => a.product_inventory - b.product_inventory)
      .slice(0, 5);
  }, [inventory]);

  const productNameFor = (productId) => {
    const product = products?.find((p) => p.product_id === productId);
    return product ? product.product_name : "Unknown product";
  };

  return (
    <div className="card border h-100">
      <div className="card-body d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="h6 fw-semibold mb-0" style={{ color: "var(--text-primary)" }}>
            Low Stock Alerts
          </h3>
          <Link to="/admin/inventory" className="small text-decoration-none">
            View all
          </Link>
        </div>

        {isLoading ? (
          <div className="d-flex flex-column gap-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="placeholder-glow"
              >
                <span className="placeholder col-12 rounded" style={{ height: "20px" }}></span>
              </span>
            ))}
          </div>
        ) : lowStockItems.length === 0 ? (
          <p className="small mb-0" style={{ color: "var(--text-muted)" }}>
            No low stock items right now.
          </p>
        ) : (
          <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
            {lowStockItems.map((item) => (
              <li
                key={item.inventory_id}
                className="d-flex align-items-center justify-content-between small"
              >
                <div className="d-flex align-items-center gap-2">
                  <TriangleAlert
                    size={16}
                    strokeWidth={1.75}
                    style={{ color: "var(--status-lowstock)" }}
                  />
                  <span style={{ color: "var(--text-secondary)" }}>
                    {productNameFor(item.product_id)}
                  </span>
                </div>
                <span
                  className="fw-medium"
                  style={{ fontVariantNumeric: "tabular-nums", color: "var(--status-lowstock)" }}
                >
                  {item.product_inventory} left
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LowStockCard;
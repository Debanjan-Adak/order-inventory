import { Users, ShoppingCart, Boxes } from "lucide-react";
import PageHeader from "../../../shared/components/layout/PageHeader";
import StatsCard from "../components/StatsCard";
import RevenueCard from "../components/RevenueCard";
import LowStockCard from "../components/LowStockCard";
import RecentOrders from "../components/RecentOrders";
import DashboardChart from "../components/DashboardChart";
import { useOrders } from "../../orders/hooks/useOrders";
import { useCustomers } from "../../customers/hooks/useCustomers";
import { useInventory } from "../../inventory/hooks/useInventory";

function Dashboard() {
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: customers, isLoading: customersLoading } = useCustomers();
  const { data: inventory, isLoading: inventoryLoading } = useInventory();

  const totalUnits = inventory
    ? inventory.reduce((sum, item) => sum + item.product_inventory, 0)
    : 0;

  return (
    <div className="d-flex flex-column gap-4">
      <PageHeader title="Dashboard" />

      <div className="row g-3 row-cols-1 row-cols-sm-2 row-cols-lg-4">
        <div className="col">
          <StatsCard
            icon={ShoppingCart}
            label="Total Orders"
            value={orders ? orders.length : 0}
            isLoading={ordersLoading}
          />
        </div>
        <div className="col">
          <StatsCard
            icon={Users}
            label="Total Customers"
            value={customers ? customers.length : 0}
            isLoading={customersLoading}
          />
        </div>
        <div className="col">
          <RevenueCard />
        </div>
        <div className="col">
          <StatsCard
            icon={Boxes}
            label="Units in Stock"
            value={totalUnits}
            isLoading={inventoryLoading}
          />
        </div>
      </div>

      <DashboardChart />

      <div className="row g-3 row-cols-1 row-cols-lg-2">
        <div className="col">
          <RecentOrders />
        </div>
        <div className="col">
          <LowStockCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
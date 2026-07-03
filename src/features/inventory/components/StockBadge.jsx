import React from "react";
import { StockBadge } from "./StockBadge";

export const InventoryCard = ({ item, onRestock }) => {
  return (
    <div>
      <div>
        <span>Bridge: #{item.inventory_id}</span>
        <h5>SKU_{item.product_id}</h5>
        <p>Warehouse Node: #{item.store_id}</p>
      </div>

      <div>
        <StockBadge quantity={item.product_inventory} />
        <button onClick={() => onRestock(item)}>
          Adjust
        </button>
      </div>
    </div>
  );
};
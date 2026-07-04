import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import OrderTable from "../OrderTable";
import { renderWithProviders } from "../../../../test/utils";
import * as customersHooks from "@features/customers/hooks/useCustomers";
import * as storesHooks from "@features/stores/hooks/useStores";

vi.mock("@features/customers/hooks/useCustomers", () => ({
  useCustomers: vi.fn(),
  useCustomerOrders: vi.fn(),
}));

vi.mock("@features/stores/hooks/useStores", () => ({
  useStores: vi.fn(),
}));

const orders = [
  {
    id: 1,
    order_id: 1001,
    customer_id: 10,
    store_id: 2,
    order_tms: "2023-01-01 10:00:00",
    order_status: "COMPLETE",
  },
];

describe("OrderTable Component", () => {
  it("UT-034: renders orders table successfully", () => {
    customersHooks.useCustomers.mockReturnValue({
      data: [{ customer_id: 10, full_name: "Gary Jenkins" }],
    });
    storesHooks.useStores.mockReturnValue({
      data: [{ store_id: 2, store_name: "Online" }],
    });

    renderWithProviders(
      <OrderTable orders={orders} basePath="/admin/orders" />,
    );

    expect(screen.getByText("1001")).toBeInTheDocument();
    expect(screen.getByText("Gary Jenkins")).toBeInTheDocument();
    expect(screen.getByText("Online")).toBeInTheDocument();
  });
});

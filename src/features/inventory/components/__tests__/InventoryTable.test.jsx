import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import InventoryTable from "../InventoryTable";
import { renderWithProviders } from "../../../../test/utils";

vi.mock("./RestockModal", () => ({
  RestockModal: () => <div data-testid="restock-modal" />,
}));

const rows = [
  {
    id: 1,
    product_inventory: 20,
    product: { product_name: "Premium Phone", colour: "Black" },
    store: { store_name: "London Store" },
  },
];

describe("InventoryTable Component", () => {
  it("UT-031: renders inventory records correctly", () => {
    renderWithProviders(<InventoryTable rows={rows} />);
    expect(screen.getByText("Premium Phone")).toBeInTheDocument();
    expect(screen.getByText("London Store")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });
});

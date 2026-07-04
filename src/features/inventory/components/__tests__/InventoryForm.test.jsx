import React from "react";
import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InventoryForm from "../InventoryForm";
import { renderWithProviders } from "../../../../test/utils";
import * as mutations from "../../hooks/useInventoryMutations";

vi.mock("../../hooks/useInventoryMutations", () => ({
  useUpdateInventory: vi.fn(),
}));

describe("InventoryForm Component", () => {
  it("UT-032: validates required fields on submit", async () => {
    mutations.useUpdateInventory.mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: false,
    });
    renderWithProviders(<InventoryForm inventoryRow={{ id: 1 }} />);

    const input = screen.getByLabelText("Quantity");
    await userEvent.clear(input);

    const saveBtn = screen.getByRole("button", { name: "Save" });
    await userEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText("Quantity is required.")).toBeInTheDocument();
    });
  });

  it("UT-033: submits valid inventory quantity", async () => {
    const mutateAsync = vi.fn().mockResolvedValue({});
    mutations.useUpdateInventory.mockReturnValue({
      mutateAsync,
      isPending: false,
    });
    const handleDone = vi.fn();

    renderWithProviders(
      <InventoryForm
        inventoryRow={{ id: 1, product_inventory: 10 }}
        onDone={handleDone}
      />,
    );

    const input = screen.getByLabelText("Quantity");
    await userEvent.clear(input);
    await userEvent.type(input, "15");

    const saveBtn = screen.getByRole("button", { name: "Save" });
    await userEvent.click(saveBtn);

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({
        id: 1,
        product_inventory: 15,
      });
      expect(handleDone).toHaveBeenCalled();
    });
  });
});

import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewOrderModal } from "../../pages/Orders";
import { renderWithProviders } from "../../../../test/utils";
import { useOrderDraftStore } from "@stores/orderDraftStore";
import * as customersHooks from "@features/customers/hooks/useCustomers";
import * as storesHooks from "@features/stores/hooks/useStores";
import * as productsHooks from "@features/products/hooks/useProducts";
import * as mutations from "../../hooks/useOrderMutations";

vi.mock("@features/customers/hooks/useCustomers", () => ({
  useCustomers: vi.fn(),
  useCustomerOrders: vi.fn(),
}));

vi.mock("@features/stores/hooks/useStores", () => ({
  useStores: vi.fn(),
}));

vi.mock("@features/products/hooks/useProducts", () => ({
  useProducts: vi.fn(),
  useProductDetails: vi.fn(),
}));

vi.mock("../../hooks/useOrderMutations", () => ({
  useCreateOrder: vi.fn(),
  useUpdateOrder: vi.fn(),
  useCancelOrder: vi.fn(),
}));

describe("NewOrderModal Component (OrderForm)", () => {
  beforeEach(() => {
    let modalRoot = document.getElementById("modal-root");
    if (!modalRoot) {
      modalRoot = document.createElement("div");
      modalRoot.setAttribute("id", "modal-root");
      document.body.appendChild(modalRoot);
    }
    useOrderDraftStore.setState({
      customerId: null,
      storeId: null,
      lines: [],
    });
  });

  it("UT-035: validates fields and submits valid order information", async () => {
    customersHooks.useCustomers.mockReturnValue({
      data: [{ customer_id: 10, full_name: "Gary Jenkins" }],
    });
    storesHooks.useStores.mockReturnValue({
      data: [{ store_id: 2, store_name: "Online" }],
    });
    productsHooks.useProducts.mockReturnValue({
      data: [{ product_id: 5, product_name: "Hat", unit_price: 15 }],
    });

    const mutateAsync = vi.fn().mockResolvedValue({ id: 99 });
    mutations.useCreateOrder.mockReturnValue({ mutateAsync, isPending: false });

    renderWithProviders(<NewOrderModal isOpen={true} onClose={() => {}} />);

    const customerSelect = screen.getByLabelText("Customer");
    const storeSelect = screen.getByLabelText("Store");

    await userEvent.selectOptions(customerSelect, "10");
    await userEvent.selectOptions(storeSelect, "2");

    const productSelect = screen.getByLabelText("Product");
    const qtyInput = screen.getByLabelText("Qty");
    const addBtn = screen.getByRole("button", { name: "Add" });

    await userEvent.selectOptions(productSelect, "5");
    await userEvent.clear(qtyInput);
    await userEvent.type(qtyInput, "2");
    await userEvent.click(addBtn);

    const submitBtn = screen.getByRole("button", { name: "Submit Order" });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(mutateAsync).toHaveBeenCalledWith({
        customerId: 10,
        storeId: 2,
        items: [{ productId: 5, quantity: 2, unitPrice: 15 }],
      });
    });
  });
});

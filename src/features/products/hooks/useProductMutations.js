// for structure
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, updateProduct, deleteProduct } from "../api/productApi";
import { useToast } from "../../../shared/hooks/useToast";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Product added.");
    },
    onError: () => {
      showError("Couldn't save product. Please try again.");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Product updated.");
    },
    onError: () => {
      showError("Couldn't save product. Please try again.");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showSuccess("Product deleted.");
    },
    onError: () => {
      showError("Couldn't delete product. Please try again.");
    },
  });
};
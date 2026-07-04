import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { useCreateProduct } from '../hooks/useProductMutations';

export function AddProduct() {
  const navigate = useNavigate();
  const createProduct = useCreateProduct();

  async function handleSubmit(values) {
    await createProduct.mutateAsync(values);
  }

  return (
    <ProductForm
      isOpen
      onClose={() => navigate(-1)}
      onSubmit={handleSubmit}
    />
  );
}

export default AddProduct;
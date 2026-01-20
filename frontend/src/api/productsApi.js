const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const updateProductStock = async (id, newQuantity) => {
  const response = await fetch(`${API_URL}/update-stock`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, newQuantity }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to update stock');
  }

  return data;
};
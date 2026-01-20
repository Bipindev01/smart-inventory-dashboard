import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts, updateProductStock } from '../api/productsApi';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async (id, newQuantity) => {
    // Extra safety check to prevent negative stock
    if (newQuantity < 0) return;

    try {
      setUpdatingId(id);
      setError(null);

      const response = await updateProductStock(id, newQuantity);

      // Update only the specific product in state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === id ? response.product : p
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner large"></div>
        <p>Loading inventory...</p>
      </div>
    );
  }

  const criticalCount = products.filter(
    (p) => p.stockQuantity < p.lowStockThreshold
  ).length;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📦 Smart Inventory Dashboard</h1>
        <p>Monitor and manage your product stock levels</p>
      </header>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">{products.length}</p>
        </div>
        <div className="stat-card critical">
          <h3>Critical Stock</h3>
          <p className="stat-value">{criticalCount}</p>
        </div>
        <div className="stat-card">
          <h3>Inventory Value</h3>
          <p className="stat-value">
            ${products.reduce((sum, p) => sum + p.price * p.stockQuantity, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdateStock={handleUpdateStock}
            isUpdating={updatingId === product.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
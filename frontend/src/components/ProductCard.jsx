import React from 'react';

function ProductCard({ product, onUpdateStock, isUpdating }) {
  const isLowStock = product.stockQuantity < product.lowStockThreshold;
  const isOutOfStock = product.stockQuantity === 0;

  const handleIncrement = () => {
    onUpdateStock(product.id, product.stockQuantity + 1);
  };

  const handleDecrement = () => {
    if (product.stockQuantity > 0) {
      onUpdateStock(product.id, product.stockQuantity - 1);
    }
  };

  return (
    <div className={`product-card ${isLowStock ? 'low-stock' : ''}`}>
      {isLowStock && (
        <div className="stock-badge">
          {isOutOfStock ? '🚨 OUT OF STOCK' : '⚠️ CRITICAL LOW'}
        </div>
      )}

      {/* Product Image */}
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.title}
          className="product-image"
        />
      </div>

      <div className="product-content">
        <div className="product-header">
          <div className="category-badge">{product.category}</div>
          <h3 className="product-name">{product.title}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          
          {/* Rating */}
          {product.rating && (
            <div className="product-rating">
              <span className="rating-stars">⭐ {product.rating.rate}</span>
              <span className="rating-count">({product.rating.count} reviews)</span>
            </div>
          )}
        </div>

        <div className="stock-info">
          <div className="stock-row">
            <span className="stock-label">Current Stock:</span>
            <span className={`stock-value ${isLowStock ? 'critical' : ''}`}>
              {product.stockQuantity}
            </span>
          </div>

          <div className="progress-bar">
            <div
              className={`progress-fill ${isLowStock ? 'low' : ''}`}
              style={{
                width: `${Math.min(
                  (product.stockQuantity / product.lowStockThreshold) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>

          <p className="threshold-text">
            Threshold: {product.lowStockThreshold} units
          </p>
        </div>

        <div className="stock-controls">
          <button
            className="btn btn-decrement"
            onClick={handleDecrement}
            disabled={isUpdating || product.stockQuantity === 0}
          >
            −
          </button>

          <button
            className="btn btn-increment"
            onClick={handleIncrement}
            disabled={isUpdating}
          >
            +
          </button>
        </div>

        {isUpdating && (
          <div className="updating-indicator">
            <div className="spinner"></div>
            <span>Updating...</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
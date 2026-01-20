import React from 'react';
import "./LandingPage.css";


function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-content">
          <div className="landing-icon">📦</div>
          <h1 className="landing-title">Smart Inventory Dashboard</h1>
          <p className="landing-subtitle">
            Manage your product inventory with ease. Track stock levels,
            monitor critical items, and keep your business running smoothly.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-time Tracking</h3>
              <p>Monitor stock levels instantly</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚠️</div>
              <h3>Low Stock Alerts</h3>
              <p>Get notified before running out</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✏️</div>
              <h3>Easy Updates</h3>
              <p>Adjust quantities with one click</p>
            </div>
          </div>

          <button className="get-started-btn" onClick={onGetStarted}>
            Get Started →
          </button>

          <div className="landing-stats">
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Monitoring</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Reliable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
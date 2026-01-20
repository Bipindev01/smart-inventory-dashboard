import React, { useState } from 'react';
import Dashboard from './pages/Dashboard.jsx';
import LandingPage from './pages/LandingPage.jsx';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (!showDashboard) {
    return <LandingPage onGetStarted={() => setShowDashboard(true)} />;
  }

  return <Dashboard />;
}

export default App;
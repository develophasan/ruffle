import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppBar from './components/AppBar';
import BottomNav from './components/BottomNav';
import MobileDrawer from './components/MobileDrawer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRaffle from './pages/CreateRaffle';
import CreateGoldDayRaffle from './pages/CreateGoldDayRaffle';
import EditRaffle from './pages/EditRaffle';
import RaffleHistory from './pages/RaffleHistory';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-light pb-16 relative">
          <AppBar onMenuClick={() => setIsDrawerOpen(true)} />
          <MobileDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />
          <main className="container mx-auto px-4 py-8 mt-14">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create-raffle" element={<CreateRaffle />} />
              <Route path="/create-gold-day" element={<CreateGoldDayRaffle />} />
              <Route path="/edit-raffle/:raffleId" element={<EditRaffle />} />
              <Route path="/history" element={<RaffleHistory />} />
            </Routes>
          </main>
          <BottomNav />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
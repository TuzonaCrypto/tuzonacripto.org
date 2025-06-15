
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import MapPage from '@/pages/MapPage';
import BusinessPage from '@/pages/BusinessPage';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import PricingPage from '@/pages/PricingPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import PaymentCancelPage from '@/pages/PaymentCancelPage';
import Navbar from '@/components/Navbar';
import CryptoTicker from '@/components/CryptoTicker';
import SocialMediaButtons from '@/components/SocialMediaButtons';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Ensure Stripe is loaded outside of the component render to avoid re-creating it on every render.
const stripePromise = loadStripe('pk_test_51RZ1r3InS4ZVnXVLhqFXReJfkf8kftW7fnz0ftzztGck7DS2VvlC3i705nQlXNPf3OItW2JpyXL1t8XQtj3d8s6W00K42eRt8M');

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Elements provider should wrap all components that need access to Stripe */}
        <Elements stripe={stripePromise}>
          <div className="min-h-screen bg-background flex flex-col">
            <CryptoTicker />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mapa" element={<MapPage />} />
                <Route path="/negocio/:id" element={<BusinessPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/planes" element={<PricingPage />} />
                <Route path="/payment-success" element={<PaymentSuccessPage />} />
                <Route path="/payment-cancel" element={<PaymentCancelPage />} />
              </Routes>
            </main>
            <SocialMediaButtons />
            <Footer />
            <Toaster />
          </div>
        </Elements>
      </AuthProvider>
    </Router>
  );
}

export default App;

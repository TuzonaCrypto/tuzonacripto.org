import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import MapPage from '@/pages/MapPage';
import BusinessPage from '@/pages/BusinessPage';
import AuthPage from '@/pages/AuthPage';
import DashboardPage from '@/pages/DashboardPage';
import PricingPage from '@/pages/PricingPage';
import PaymentSuccessPage from '@/pages/PaymentSuccessPage';
import PaymentCancelPage from '@/pages/PaymentCancelPage';
import CreateAdminPage from '@/pages/CreateAdminPage';
import ComingSoonPage from '@/pages/ComingSoonPage';
import NewsPage from '@/pages/NewsPage';
import ContactPage from '@/pages/ContactPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import Navbar from '@/components/Navbar';
import CryptoTicker from '@/components/CryptoTicker';
import SocialMediaButtons from '@/components/SocialMediaButtons';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import ModuleDetailPage from '@/pages/modules/ModuleDetailPage';
import { moduleDetails } from '@/data/moduleDetails';
import DownloadAppCta from '@/components/DownloadAppCta';


function App() {
  return (
    <Suspense fallback="loading">
      <HelmetProvider>
        <Router>
          <AuthProvider>
            <div className="min-h-screen bg-background flex flex-col site-background">
              <div className="background-overlay"></div>
              <div className="relative z-10 flex flex-col flex-grow">
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
                    <Route path="/proximamente" element={<ComingSoonPage />} />
                    <Route path="/noticias" element={<NewsPage />} />
                    <Route path="/contacto" element={<ContactPage />} />
                    <Route path="/terminos-y-condiciones" element={<TermsOfServicePage />} />
                    <Route path="/payment-success" element={<PaymentSuccessPage />} />
                    <Route path="/payment-cancel" element={<PaymentCancelPage />} />
                    <Route path="/create-master-account" element={<CreateAdminPage />} />
                    
                    {Object.values(moduleDetails).map(module => (
                      <Route 
                        key={module.id}
                        path={module.path} 
                        element={<ModuleDetailPage module={module} />} 
                      />
                    ))}
                  </Routes>
                </main>
                <DownloadAppCta />
                <SocialMediaButtons />
                <Footer />
                <Toaster />
              </div>
            </div>
          </AuthProvider>
        </Router>
      </HelmetProvider>
    </Suspense>
  );
}

export default App;
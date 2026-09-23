import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ConnectModal } from './components/ConnectModal';
import { AuthProvider } from './context/AuthContext';
import { WorkspaceProvider, useWorkspace } from './context/WorkspaceContext';
import { AppLayout } from './components/app/AppLayout';

// Public Marketing Pages
import { HomePage } from './pages/HomePage';
import { WhatIsWhatsAppAIPage } from './pages/WhatIsWhatsAppAIPage';
import { WhatsAppAIForBusinessPage } from './pages/WhatsAppAIForBusinessPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { UseCasesPage } from './pages/UseCasesPage';
import { RealEstatePage } from './pages/RealEstatePage';
import { SmallBusinessPage } from './pages/SmallBusinessPage';
import { CustomerSupportPage } from './pages/CustomerSupportPage';
import { FAQPage } from './pages/FAQPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Private App Pages
import { ConnectWhatsAppPage } from './pages/app/ConnectWhatsAppPage';
import { InboxPage } from './pages/app/InboxPage';
import { ContactsPage } from './pages/app/ContactsPage';
import { AIKnowledgePage } from './pages/app/AIKnowledgePage';
import { AutomationsPage } from './pages/app/AutomationsPage';
import { BroadcastsPage } from './pages/app/BroadcastsPage';
import { TemplatesPage } from './pages/app/TemplatesPage';
import { AnalyticsPage } from './pages/app/AnalyticsPage';
import { SettingsPage } from './pages/app/SettingsPage';

// Public Layout Container
const PublicLayout: React.FC<{
  isConnectOpen: boolean;
  onOpenConnect: () => void;
  onCloseConnect: () => void;
}> = ({ isConnectOpen, onOpenConnect, onCloseConnect }) => {
  return (
    <div className="min-h-screen bg-transparent text-slate-900 flex flex-col selection:bg-gold-200 selection:text-namnilam-950">
      <Navbar />
      <main className="flex-1">
        <Outlet context={{ onOpenConnect }} />
      </main>
      <Footer />
      <ConnectModal isOpen={isConnectOpen} onClose={onCloseConnect} />
    </div>
  );
};

// Smart Controller for /app
const AppIndex: React.FC = () => {
  const { whatsAppAccount } = useWorkspace();
  if (whatsAppAccount.status === 'connected') {
    return <Navigate to="/app/inbox" replace />;
  }
  return <Navigate to="/app/connect" replace />;
};

// Workspace Shell Layout
const WorkspaceShell: React.FC = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export const App: React.FC = () => {
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const handleOpenConnect = () => {
    setIsConnectOpen(true);
  };

  const handleCloseConnect = () => {
    setIsConnectOpen(false);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <WorkspaceProvider>
          <ScrollToTop />
          <Routes>
            {/* ======================================================== */}
            {/* PUBLIC MARKETING PAGES (with Navbar, Footer & SEO)       */}
            {/* ======================================================== */}
            <Route
              element={
                <PublicLayout
                  isConnectOpen={isConnectOpen}
                  onOpenConnect={handleOpenConnect}
                  onCloseConnect={handleCloseConnect}
                />
              }
            >
              <Route path="/" element={<HomePage onOpenConnect={handleOpenConnect} />} />
              <Route path="/whatsapp-ai" element={<WhatIsWhatsAppAIPage />} />
              <Route path="/whatsapp-ai-for-business" element={<WhatsAppAIForBusinessPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/use-cases" element={<UseCasesPage />} />
              <Route path="/whatsapp-ai-for-real-estate" element={<RealEstatePage />} />
              <Route path="/whatsapp-ai-for-small-business" element={<SmallBusinessPage />} />
              <Route path="/whatsapp-ai-for-customer-support" element={<CustomerSupportPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* ======================================================== */}
            {/* DIRECT WHATSAPP ACCESS & ONBOARDING (No login required)   */}
            {/* ======================================================== */}
            <Route path="/app/login" element={<Navigate to="/app" replace />} />
            <Route path="/app/signup" element={<Navigate to="/app" replace />} />
            <Route path="/app/connect" element={<ConnectWhatsAppPage />} />

            {/* ======================================================== */}
            {/* WHATSAPP WEB WORKSPACE & AI AUTOMATION ROUTES            */}
            {/* ======================================================== */}
            <Route path="/app" element={<WorkspaceShell />}>
              <Route index element={<AppIndex />} />
              <Route path="inbox" element={<InboxPage />} />
              <Route path="contacts" element={<ContactsPage />} />
              <Route path="ai" element={<AIKnowledgePage />} />
              <Route path="automations" element={<AutomationsPage />} />
              <Route path="broadcasts" element={<BroadcastsPage />} />
              <Route path="templates" element={<TemplatesPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </WorkspaceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

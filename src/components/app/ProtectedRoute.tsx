import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireWhatsApp?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireWhatsApp = false,
}) => {
  const { user, isLoading } = useAuth();
  const { whatsAppAccount } = useWorkspace();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F1F6F3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-namnilam-800 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-namnilam-900 tracking-wider uppercase">
            Loading Nam Nilam Workspace...
          </span>
        </div>
      </div>
    );
  }

  // Not logged in -> go to login
  if (!user) {
    return <Navigate to="/app/login" state={{ from: location }} replace />;
  }

  // Logged in, but route requires WhatsApp connected and it is disconnected
  if (requireWhatsApp && whatsAppAccount.status === 'disconnected' && location.pathname !== '/app/connect') {
    return <Navigate to="/app/connect" replace />;
  }

  return <>{children}</>;
};

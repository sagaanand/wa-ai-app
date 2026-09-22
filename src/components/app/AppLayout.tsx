import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toasts, removeToast } = useWorkspace();

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#EFEAE2] flex flex-col font-sans select-none text-slate-900">
      
      {/* Floating Toast Notification Container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold backdrop-blur-md transition-all animate-in slide-in-from-top-2 ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-700'
                : toast.type === 'warning'
                ? 'bg-amber-900 text-amber-100 border-amber-700'
                : toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-700'
                : 'bg-slate-900 text-white border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-300" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-sky-300" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-70 hover:opacity-100 text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Main Full-screen Viewport (No Sidebar) */}
      <main className="flex-1 h-full w-full overflow-hidden flex flex-col">
        {children}
      </main>

    </div>
  );
};

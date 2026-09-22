import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import {
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAuth } from '../../context/AuthContext';
import { SEOHead } from '../../components/SEOHead';

export const ConnectWhatsAppPage: React.FC = () => {
  const navigate = useNavigate();
  const { workspace } = useAuth();
  const { whatsAppAccount } = useWorkspace();

  const [qrImage, setQrImage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('Connecting to WhatsApp bridge...');
  const [backendError, setBackendError] = useState<string | null>(null);

  // If already connected in workspace context, auto-redirect to inbox
  useEffect(() => {
    if (whatsAppAccount.status === 'connected') {
      const timer = setTimeout(() => {
        navigate('/app/inbox');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [whatsAppAccount.status, navigate]);

  // Poll backend for real Baileys QR code and connection status
  useEffect(() => {
    let isMounted = true;

    const fetchQR = async () => {
      try {
        const res = await fetch('/api/qr');
        if (!res.ok) {
          if (isMounted) {
            setBackendError('Backend server is starting up. Please wait a moment...');
          }
          return;
        }

        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          if (isMounted && window.location.hostname !== 'localhost') {
            setBackendError(
              'To connect your personal WhatsApp, open this app locally at http://localhost:5173/app/connect where your Node.js Baileys bridge is running.'
            );
          }
          return;
        }

        const data = await res.json();
        if (!isMounted) return;

        setBackendError(null);

        if (data.status === 'connected') {
          setStatusMessage('WhatsApp connected successfully!');
          navigate('/app/inbox');
          return;
        }

        if (data.qrImage) {
          setQrImage(data.qrImage);
          setStatusMessage('Scan QR code with WhatsApp');
        } else if (data.qr) {
          try {
            const dataUrl = await QRCode.toDataURL(data.qr, {
              width: 280,
              margin: 1,
              color: { dark: '#111B21', light: '#FFFFFF' },
              errorCorrectionLevel: 'M',
            });
            if (isMounted) {
              setQrImage(dataUrl);
              setStatusMessage('Scan QR code with WhatsApp');
            }
          } catch (e) {
            console.error('Failed to convert QR string to data URL:', e);
          }
        } else {
          setStatusMessage('Generating fresh WhatsApp QR code...');
        }
      } catch (err: any) {
        if (isMounted) {
          setBackendError('Connecting to WhatsApp session bridge (http://localhost:3001)...');
        }
      }
    };

    fetchQR();
    const interval = setInterval(fetchQR, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [navigate]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    setQrImage(null);
    setStatusMessage('Requesting fresh QR code...');
    try {
      await fetch('/api/refresh-qr', { method: 'POST' });
    } catch (e) {}

    setTimeout(async () => {
      try {
        const res = await fetch('/api/qr');
        if (res.ok) {
          const data = await res.json();
          if (data.qrImage) setQrImage(data.qrImage);
        }
      } catch (e) {}
      setIsRefreshing(false);
    }, 1200);
  };

  return (
    <>
      <SEOHead
        title="Connect WhatsApp | Nam Nilam AI"
        description="Link your WhatsApp to Nam Nilam AI by scanning the QR code from Linked Devices."
        canonicalUrl="https://wa.namnilam.com/app/connect"
      />

      <div className="min-h-screen bg-[#EAE6DF] flex flex-col font-sans select-none text-slate-800">
        
        {/* Authentic WhatsApp Web Top Green Strip */}
        <div className="bg-[#00a884] h-36 sm:h-48 w-full flex items-center px-6 sm:px-12 lg:px-24">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white ring-2 ring-white/50 p-0.5 flex items-center justify-center shadow-xs">
              <img
                src="/nam-nilam-logo.png"
                alt="Nam Nilam"
                className="w-8 h-8 rounded-full"
              />
            </div>
            <div>
              <span className="font-extrabold text-white text-base sm:text-lg tracking-tight block">
                Nam Nilam WhatsApp AI
              </span>
              <span className="text-[11px] text-white/80 font-medium">
                Web WhatsApp + AI Assistant · {workspace?.name || 'My Business'}
              </span>
            </div>
          </div>
        </div>

        {/* Centered Main Linking Card (Web WhatsApp style) */}
        <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 -mt-16 sm:-mt-24 mb-12">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-10 relative overflow-hidden">
            
            {/* If currently connected */}
            {whatsAppAccount.status === 'connected' ? (
              <div className="text-center py-8 space-y-5 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
                    <span className="w-2 h-2 rounded-full bg-wa-light animate-pulse" />
                    WhatsApp Connected
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Your WhatsApp is Active!
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-mono">
                    {whatsAppAccount.phoneNumber}
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => navigate('/app/inbox')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-namnilam-900 hover:bg-namnilam-950 text-white font-bold text-xs shadow-md transition active:scale-95"
                  >
                    <span>Open WhatsApp Chats</span>
                    <ArrowRight className="w-4 h-4 text-gold-300" />
                  </button>
                </div>
              </div>
            ) : (
              /* QR Code Connection Interface */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Step-by-Step Instructions */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Use Nam Nilam on your computer
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Scan this QR code from your WhatsApp mobile app to connect.
                    </p>
                  </div>

                  <ol className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </span>
                      <span>
                        Open <strong>WhatsApp</strong> on your phone
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        2
                      </span>
                      <span>
                        Tap <strong>Menu</strong> (Android ⋮) or <strong>Settings</strong> (iPhone ⚙️) and select <strong>Linked Devices</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        3
                      </span>
                      <span>
                        Tap on <strong>Link a Device</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-800 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        4
                      </span>
                      <span>
                        Point your phone to this screen to capture the QR code
                      </span>
                    </li>
                  </ol>

                  {/* Security Note */}
                  <div className="pt-2 flex items-center gap-2.5 text-xs text-slate-500 border-t border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      End-to-end encrypted session. Your personal chats and calls remain private.
                    </span>
                  </div>
                </div>

                {/* Right: Real Dynamic QR Code Canvas */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="p-5 bg-white rounded-2xl border-2 border-slate-200 shadow-md flex flex-col items-center relative">
                    
                    {/* QR Code Image or Loading State */}
                    <div className="relative w-64 h-64 bg-white flex items-center justify-center rounded-xl overflow-hidden border border-slate-100 shadow-inner">
                      {qrImage ? (
                        <div className="relative flex items-center justify-center w-full h-full p-2">
                          <img
                            src={qrImage}
                            alt="WhatsApp Link QR Code"
                            className="w-56 h-56 object-contain rounded-lg shadow-2xs"
                          />
                          
                          {/* Center Brand / WhatsApp Badge */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-10 h-10 rounded-full bg-white ring-2 ring-[#00a884] p-0.5 shadow-md flex items-center justify-center">
                              <img src="/nam-nilam-logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3 p-4 text-center">
                          <Loader2 className="w-8 h-8 text-[#00a884] animate-spin" />
                          <span className="text-xs font-bold text-slate-800">
                            {statusMessage}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Starting Baileys session bridge
                          </span>
                          {backendError && (
                            <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] text-left leading-relaxed">
                              {backendError}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Refresh Button */}
                    <div className="mt-3 flex items-center justify-center w-full text-xs text-slate-500">
                      <button
                        type="button"
                        onClick={handleManualRefresh}
                        disabled={isRefreshing}
                        className="text-[#008069] hover:text-[#00604f] font-bold flex items-center gap-1.5 transition disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                        <span>{isRefreshing ? 'Refreshing...' : 'Refresh QR Code'}</span>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </>
  );
};

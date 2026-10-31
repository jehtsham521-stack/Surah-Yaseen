import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, X, Smartphone, Check, Copy } from 'lucide-react';

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const appUrl =
    window.location.hostname.includes('run.app')
      ? `${window.location.protocol}//${window.location.host}`
      : window.location.href;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
    appUrl
  )}&margin=4`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Install App on Mobile Device
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main App Icon & Name */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50">
            <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-amiri text-2xl font-bold shadow-md shrink-0">
              یس
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Surah Yaseen
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Offline support · 4 Audio Reciters · Word-by-Word Analysis · Quranic Grammar
              </p>
            </div>
          </div>

          {/* Primary Action Button (If Browser Supports direct PWA prompt) */}
          {isInstallable && !isInstalled ? (
            <button
              onClick={handleInstallClick}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md transition flex items-center justify-center gap-2 active:scale-98"
            >
              <Download className="w-5 h-5" />
              <span>Install App on this Device</span>
            </button>
          ) : isInstalled ? (
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-semibold text-center flex items-center justify-center gap-2">
              <Check className="w-4 h-4" /> App is installed on this device
            </div>
          ) : null}

          {/* QR Code and Direct URL */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              1. Open on Mobile Phone
            </h5>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850">
              <div className="bg-white p-2 rounded-xl shadow-xs shrink-0 border border-slate-200 dark:border-slate-700">
                <img
                  src={qrCodeUrl}
                  alt="QR Code for mobile"
                  className="w-28 h-28 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Scan QR code with your smartphone camera:
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Point your mobile phone camera at the QR code to open the application instantly.
                </p>
              </div>
            </div>

            {/* Copy Link Input */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
              <input
                type="text"
                readOnly
                value={appUrl}
                className="w-full bg-transparent text-xs text-slate-600 dark:text-slate-300 focus:outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition shrink-0 flex items-center gap-1 cursor-pointer active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Step-by-Step Mobile Instructions */}
          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              2. Installation Steps on Mobile
            </h5>

            {/* Android / Chrome steps */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Android (Google Chrome):
                </span>
              </div>
              <ol className="text-xs text-slate-600 dark:text-slate-300 list-decimal list-inside space-y-1 pl-2">
                <li>Open the URL in Google Chrome on your Android device.</li>
                <li>Tap the <strong>three dots (⋮)</strong> menu in the upper-right corner.</li>
                <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                <li>The app installs immediately with an app launcher icon.</li>
              </ol>
            </div>

            {/* iPhone / Safari steps */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-600" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  iPhone / iPad (Apple Safari):
                </span>
              </div>
              <ol className="text-xs text-slate-600 dark:text-slate-300 list-decimal list-inside space-y-1 pl-2">
                <li>Open the URL in Safari on your iPhone or iPad.</li>
                <li>Tap the <strong>Share</strong> button on the browser toolbar.</li>
                <li>Scroll down and select <strong>"Add to Home Screen"</strong>.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

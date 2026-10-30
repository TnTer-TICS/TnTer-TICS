import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp, UserPlus, Calendar } from 'lucide-react';
import { CONFIG } from '../constants/config.ts';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      
      {/* Scroll Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-900 text-white flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
          title="Lên đầu trang"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Zalo Button */}
      <a
        href={CONFIG.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 hover:scale-110 transition-transform"
        title="Chat Zalo ngay"
      >
        <span className="font-extrabold text-[13px] tracking-tight">Zalo</span>
        <span className="absolute right-15 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
          Chat Zalo tư vấn: {CONFIG.hotline}
        </span>
      </a>

      {/* Phone Hotline Call */}
      <a
        href={`tel:${CONFIG.hotlineRaw}`}
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/35 hover:scale-110 transition-transform animate-bounce"
        title="Gọi Hotline ngay"
      >
        <Phone className="w-5 h-5" />
        <span className="absolute right-15 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
          Hotline: {CONFIG.hotline} (24/7)
        </span>
      </a>

    </div>
  );
};

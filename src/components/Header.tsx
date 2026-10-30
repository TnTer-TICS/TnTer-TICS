import React, { useState } from 'react';
import { HeartPulse, Phone, Menu, X, Calculator, UserPlus, ShieldCheck, MapPin, Sparkles, FileSpreadsheet } from 'lucide-react';
import { CONFIG } from '../constants/config.ts';

interface HeaderProps {
  onOpenSheetGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSheetGuide }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-teal-800 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-medium text-[11px] sm:text-xs">
              Phục vụ: TP.HCM • Bình Dương • Đồng Nai & khu vực lân cận
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="hidden md:inline-flex items-center gap-1.5 text-teal-100">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              100% Nhân sự kiểm định CCCD, hạnh kiểm & sức khỏe định kỳ
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-amber-300 bg-teal-900/60 px-2 py-0.5 rounded">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Tiết kiệm 20% so với thị trường
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
            <HeartPulse className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-baseline">
              <span className="text-2xl font-black tracking-tight text-slate-900">TnTer</span>
              <span className="text-2xl font-black tracking-tight text-teal-600">-TICS</span>
            </div>
            <span className="block text-[10px] tracking-wider uppercase font-semibold text-slate-400">
              Chăm Sóc & Tiện Lợi Gia Đình
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-6 font-medium text-sm text-slate-600">
          <a href="#services" className="hover:text-teal-700 transition-colors">
            Dịch Vụ
          </a>
          <a
            href="#calculator"
            className="hover:text-amber-700 text-amber-700 font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Calculator className="w-4 h-4 text-amber-600" />
            Tính Giá (-20%)
          </a>
          <a href="#pricing" className="hover:text-teal-700 transition-colors">
            Bảng Giá
          </a>
          <a
            href="#recruitment"
            className="text-teal-700 font-semibold flex items-center gap-1.5 hover:text-teal-800 transition-colors bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200/70"
          >
            <UserPlus className="w-4 h-4 text-teal-600" />
            Tuyển Dụng & Đào Tạo
          </a>
          <a href="#process" className="hover:text-teal-700 transition-colors">
            Quy Trình
          </a>
          <button
            onClick={onOpenSheetGuide}
            className="text-slate-500 hover:text-teal-700 flex items-center gap-1 transition-colors text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-slate-100"
            title="Xem mã Google Apps Script và hướng dẫn nhận dữ liệu vào Google Sheet"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>Đồng Bộ Sheet</span>
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={`tel:${CONFIG.hotlineRaw}`}
            className="flex items-center gap-2.5 text-slate-700 font-bold hover:text-teal-700 transition-colors group"
          >
            <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 font-normal uppercase leading-tight">Hotline 24/7</span>
              <span className="text-sm font-extrabold tracking-tight text-slate-900 group-hover:text-teal-700">
                {CONFIG.hotline}
              </span>
            </div>
          </a>

          <a
            href="#booking"
            className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-teal-700/20 text-sm transition-all hover:scale-[1.02] active:scale-95"
          >
            Đặt Lịch Nhanh
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-teal-700 rounded-lg focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3 shadow-lg">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-medium text-slate-700 hover:text-teal-700 py-1"
          >
            Dịch Vụ Chăm Sóc
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-amber-700 py-1 flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-amber-600" />
            Bảng Tính Chi Phí (Tiết kiệm 20%)
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-medium text-slate-700 hover:text-teal-700 py-1"
          >
            Bảng Giá Dịch Vụ
          </a>
          <a
            href="#recruitment"
            onClick={() => setMobileMenuOpen(false)}
            className="block font-bold text-teal-700 py-1 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4 text-teal-600" />
            Tuyển Dụng & Đào Tạo Việc Làm
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSheetGuide();
            }}
            className="w-full text-left font-medium text-slate-700 hover:text-teal-700 py-1 flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            Hướng Dẫn & Mã Code Google Sheet
          </button>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${CONFIG.hotlineRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 font-bold text-slate-800 text-sm"
            >
              <Phone className="w-4 h-4 text-teal-700" />
              Gọi Hotline: {CONFIG.hotline}
            </a>
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center py-2.5 rounded-xl bg-teal-700 text-white font-bold text-sm shadow-md"
            >
              Đặt Lịch Dịch Vụ Ngay
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

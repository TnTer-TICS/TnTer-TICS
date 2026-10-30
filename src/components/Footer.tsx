import React from 'react';
import { HeartPulse, MapPin, Phone, Mail, Clock, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { CONFIG } from '../constants/config.ts';

interface FooterProps {
  onOpenSheetGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSheetGuide }) => {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-black text-white">TnTer</span>
                <span className="text-2xl font-black text-teal-400">-TICS</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-4">
              Giải pháp tiện ích toàn diện cho gia đình: chăm sóc người cao tuổi, phục hồi mẹ sau sinh, tắm bé sơ sinh, dọn dẹp nhà cửa và giữ trẻ em. Tiết kiệm 20% chi phí so với thị trường tại TP.HCM, Bình Dương và Đồng Nai.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Nhân sự được kiểm định tư pháp & đào tạo y khoa bài bản</span>
            </div>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Danh Mục Dịch Vụ</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Chăm sóc người cao tuổi tại nhà & viện
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Chăm sóc mẹ sau sinh & massage kích sữa
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Tắm bé sơ sinh chuẩn y khoa
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Dọn dẹp nhà cửa theo giờ & định kỳ
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-teal-400 transition-colors">
                  Trông giữ trẻ em & hỗ trợ ăn dặm
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                  Bảng tính so sánh giá tiết kiệm 20%
                </a>
              </li>
            </ul>
          </div>

          {/* Regional Areas */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Khu Vực Phục Vụ</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li className="text-slate-300 font-medium">TP. Hồ Chí Minh</li>
              <li className="text-slate-400 text-[11px]">(22 quận huyện & TP. Thủ Đức)</li>
              <li className="text-slate-300 font-medium pt-1">Bình Dương</li>
              <li className="text-slate-400 text-[11px]">(Thủ Dầu Một, Dĩ An, Thuận An...)</li>
              <li className="text-slate-300 font-medium pt-1">Đồng Nai</li>
              <li className="text-slate-400 text-[11px]">(Biên Hòa, Long Thành, Nhơn Trạch...)</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Thông Tin Liên Hệ</h4>
            <ul className="text-xs space-y-3 text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{CONFIG.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`tel:${CONFIG.hotlineRaw}`}
                  className="text-white font-bold text-sm hover:text-teal-400 transition-colors"
                >
                  {CONFIG.hotline}
                </a>
                <span className="text-[10px] bg-teal-900/80 text-teal-300 px-2 py-0.5 rounded">
                  24/7
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>lienhe@tntertics.vn</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Làm việc tất cả các ngày trong tuần & ngày Lễ</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenSheetGuide}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Xem Mã Google Apps Script & Hướng Dẫn Sheet</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 {CONFIG.brandName} (tntertics.vn). Tất cả các quyền được bảo lưu.</p>
          <div className="flex gap-4 text-slate-400">
            <span>Tiêu chuẩn y khoa gia đình</span>
            <span>•</span>
            <span>Bảo mật thông tin khách hàng</span>
            <span>•</span>
            <span>Bảo hiểm trách nhiệm</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

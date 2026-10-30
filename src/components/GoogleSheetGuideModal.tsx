import React, { useState } from 'react';
import { X, Copy, Check, FileSpreadsheet, AlertTriangle, ArrowRight, CheckCircle2, Send, ExternalLink } from 'lucide-react';
import { CONFIG, GOOGLE_APPS_SCRIPT_CODE } from '../constants/config.ts';

interface GoogleSheetGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleSheetGuideModal: React.FC<GoogleSheetGuideModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
  const [testingType, setTestingType] = useState<'booking' | 'recruitment' | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      alert("Đã chọn toàn bộ mã code, quý khách có thể nhấn Ctrl+C để sao chép!");
    }
  };

  const sendTestPayload = async (type: 'booking' | 'recruitment') => {
    setTestingType(type);
    setTestStatus("Đang gửi đơn thử nghiệm đến Google Sheet...");

    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const payload =
      type === 'recruitment'
        ? {
            type: "recruitment",
            time: formattedTime,
            name: "Lâm Tâm Như (Ứng viên Test)",
            phone: "0982405755",
            birthYear: "1988",
            position: "Chăm sóc mẹ sau sinh & Tắm bé",
            experience: "Từ 1 - 3 năm kinh nghiệm",
            area: "TP. Hồ Chí Minh (Quận 10)",
            trainingNeed: "Muốn tham gia lớp đào tạo kỹ năng chuẩn y khoa miễn phí",
            notes: "Kiểm tra tự động ghi đúng 11 cột vào tab Applications-Tuyển Dụng",
            source: "Website tntertics.vn (Tuyển Dụng)",
            status: "Ứng viên mới – Cần gọi phỏng vấn"
          }
        : {
            type: "booking",
            time: formattedTime,
            name: "Nguyễn Văn Test",
            phone: "0982405755",
            service: "Chăm sóc người cao tuổi & Người bệnh",
            package: "Gói Ở lại 24/7 tại nhà (8.500.000đ/tháng)",
            area: "236/25a Hòa Hảo, Phường Vườn Lài, TP.HCM",
            notes: "Đơn đặt lịch thử nghiệm vào tab Bookings - Dat lich",
            source: "Website tntertics.vn",
            status: "Mới – Cần gọi lại trong 30p"
          };

    try {
      await fetch(CONFIG.webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      setTestStatus(
        type === 'recruitment'
          ? `✓ ĐÃ GỬI THỬ ĐƠN TUYỂN DỤNG!\nBạn hãy mở Google Sheet kiểm tra tab "Applications-Tuyển Dụng" xem dòng ứng viên "Lâm Tâm Như" với đầy đủ 11 cột.`
          : `✓ ĐÃ GỬI THỬ ĐƠN ĐẶT LỊCH!\nBạn hãy mở Google Sheet kiểm tra tab "Bookings - Dat lich" xem dòng của "Nguyễn Văn Test".`
      );
    } catch (err) {
      setTestStatus("Lỗi kết nối khi gửi: " + String(err));
    } finally {
      setTestingType(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-teal-800 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Hướng Dẫn & Khắc Phục Dữ Liệu Google Sheet</h3>
              <p className="text-xs text-teal-200">Đồng bộ chính xác 100% vào đúng tab và đúng 11 cột</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-teal-200 hover:text-white hover:bg-teal-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs sm:text-sm">
          
          {/* Diagnostic explanation */}
          <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Nguyên nhân dữ liệu tuyển dụng bị nhảy nhầm sang tab "Bookings - Dat lich":</span>
            </div>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-amber-950">
              <li>
                <strong>Tên trang tính không khớp:</strong> Trong file Google Sheet thực tế của bạn, tab có tên là <code>Applications-Tuyển Dụng</code> (chữ hoa A, 2 chữ <code>pp</code>, chữ <code>D</code> viết hoa). Mã cũ tìm kiếm từ khóa viết thường chưa khớp nên Google Script mặc định đổ về tab đầu tiên.
              </li>
              <li>
                <strong>Chưa tạo New Version khi Deploy:</strong> Sau khi dán code mới vào Apps Script, nếu chỉ bấm Save mà không bấm <em>"Triển khai (Deploy) &gt; Quản lý triển khai &gt; Chỉnh sửa &gt; Phiên bản mới"</em>, Google vẫn sẽ tiếp tục chạy mã cũ!
              </li>
            </ul>
          </div>

          {/* 3 Steps To Fix */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              <span>3 Bước Thao Tác Nhanh (Chỉ mất 60 giây)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-teal-800 mb-1">Bước 1: Sao chép mã code</div>
                <p className="text-slate-600 leading-relaxed">
                  Nhấn nút <strong>"Sao Chép Mã Apps Script"</strong> ở góc dưới để lấy toàn bộ đoạn mã tối ưu đã xử lý tìm kiếm tab tự động.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-teal-800 mb-1">Bước 2: Dán vào Google Sheet</div>
                <p className="text-slate-600 leading-relaxed">
                  Vào Google Sheet &gt; <strong>Tiện ích mở rộng (Extensions)</strong> &gt; <strong>Apps Script</strong>. Xóa toàn bộ mã cũ và dán mã mới vào.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-teal-800 mb-1">Bước 3: Tạo Phiên Bản Mới (Quan Trọng)</div>
                <p className="text-slate-600 leading-relaxed">
                  Bấm <strong>Triển khai (Deploy)</strong> &gt; <strong>Quản lý tùy chọn triển khai</strong> &gt; Bấm icon <strong>Cây bút (Chỉnh sửa)</strong> &gt; Chọn <strong>Phiên bản mới (New version)</strong> &gt; Bấm <strong>Triển khai</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-bold text-teal-900 text-xs sm:text-sm">
                Kiểm tra ngay kết nối tới Google Sheet của bạn:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => sendTestPayload('recruitment')}
                  disabled={testingType !== null}
                  className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 disabled:bg-teal-400 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Test gửi Đơn Tuyển Dụng</span>
                </button>
                <button
                  onClick={() => sendTestPayload('booking')}
                  disabled={testingType !== null}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Test gửi Đơn Đặt Lịch</span>
                </button>
              </div>
            </div>

            {testStatus && (
              <div className="p-3 bg-white rounded-xl border border-teal-300 text-xs font-medium text-slate-800 whitespace-pre-line">
                {testStatus}
              </div>
            )}
          </div>

          {/* Code Viewer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">Mã nguồn Google Apps Script hoàn chỉnh:</span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Đã sao chép vào bộ nhớ tạm!" : "Sao Chép Mã Apps Script"}</span>
              </button>
            </div>

            <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-60 leading-relaxed border border-slate-800">
              {GOOGLE_APPS_SCRIPT_CODE}
            </pre>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500">
            Webhook URL: <code className="bg-slate-200 px-1 py-0.5 rounded text-[10px] text-slate-700 font-mono">{CONFIG.webhookUrl.slice(0, 50)}...</code>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer"
          >
            Đóng Hướng Dẫn
          </button>
        </div>

      </div>
    </div>
  );
};

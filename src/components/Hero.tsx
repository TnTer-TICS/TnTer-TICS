import React, { useState } from 'react';
import { Send, Clock, ShieldCheck, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { CONFIG, SERVICES } from '../constants/config.ts';

interface HeroProps {
  selectedService: string;
  selectedPackage: string;
  onServiceChange: (service: string, pkg: string) => void;
  bookingNotes?: string;
}

export const Hero: React.FC<HeroProps> = ({
  selectedService,
  selectedPackage,
  onServiceChange,
  bookingNotes = ""
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('');
  const [notes, setNotes] = useState(bookingNotes);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Sync external notes if changed from Calculator
  React.useEffect(() => {
    if (bookingNotes) {
      setNotes(bookingNotes);
    }
  }, [bookingNotes]);

  // Current active service package list
  const currentServiceObj = SERVICES.find(s => s.name === selectedService) || SERVICES[0];

  const handleServiceSelect = (newServiceName: string) => {
    const sObj = SERVICES.find(s => s.name === newServiceName) || SERVICES[0];
    onServiceChange(newServiceName, sObj.packages[0]);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !area.trim()) {
      alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ/Khu vực phục vụ!");
      return;
    }

    setIsSubmitting(true);
    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const payload = {
      type: "booking",
      time: formattedTime,
      name: name.trim(),
      phone: phone.trim(),
      service: selectedService,
      package: selectedPackage,
      area: area.trim(),
      notes: notes.trim(),
      source: "Website tntertics.vn",
      status: "Mới – Cần gọi lại trong 30p"
    };

    try {
      if (CONFIG.webhookUrl) {
        await fetch(CONFIG.webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      setSubmitSuccess(
        `Cảm ơn quý khách ${payload.name}! TnTer-TICS đã tiếp nhận yêu cầu đặt lịch dịch vụ "${payload.service} - ${payload.package}". Chuyên viên tư vấn sẽ gọi điện xác nhận trong vòng 30 phút qua số ${payload.phone}.`
      );

      // Reset fields
      setName('');
      setPhone('');
      setArea('');
      setNotes('');
    } catch (err) {
      console.error("Booking submission error:", err);
      alert("Đã xảy ra lỗi khi gửi yêu cầu. Quý khách vui lòng gọi trực tiếp hotline 0982.405.755 để được hỗ trợ tức thì!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-teal-50/70 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background ambient blur */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 -z-10 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" />
              <span>Thương Hiệu Tiện Ích Đáng Tin Cậy Tại Miền Nam</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Tận Tâm Chăm Sóc <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600">
                Mẹ, Bé & Người Cao Tuổi
              </span>{' '}
              Tại Nhà
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              <strong>TnTer-TICS</strong> đồng hành cùng gia đình bạn giải tỏa áp lực chăm sóc người thân. Nhân viên được kiểm định nhân thân, đào tạo kỹ năng chuẩn y khoa và làm việc tận tụy. Cam kết <strong>tiết kiệm 20% chi phí</strong> so với thị trường tại TP.HCM, Bình Dương và Đồng Nai.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-teal-800">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span className="text-2xl font-black">60 Phút</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Bố trí nhân sự nhanh chóng</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-teal-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-2xl font-black">100%</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Xác thực CCCD & sức khỏe</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-teal-800">
                  <RefreshCw className="w-4 h-4 text-amber-600" />
                  <span className="text-2xl font-black">Miễn Phí</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Đổi nhân sự nếu chưa vừa ý</p>
              </div>
            </div>

            {/* Quick Address Anchor */}
            <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-700">Trụ sở:</span>
              <span>{CONFIG.address}</span>
            </div>
          </div>

          {/* Right Column: Customer Booking Hub */}
          <div className="lg:col-span-5" id="booking">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/80 border border-slate-200/90 relative">
              {/* Badge */}
              <div className="absolute -top-3.5 right-6 bg-amber-500 text-white font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Tiết kiệm 20% phí</span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Đăng Ký Đặt Lịch Nhanh</h2>
              <p className="text-xs text-slate-500 mb-5">
                Chuyên viên điều phối gọi lại tư vấn chi tiết sau 5 - 30 phút
              </p>

              {submitSuccess ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-emerald-900">Đặt Lịch Thành Công!</h4>
                    <p className="text-xs text-emerald-700 mt-2 leading-relaxed">{submitSuccess}</p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="inline-block bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                  >
                    Đặt thêm yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      1. Chọn dịch vụ cần chăm sóc:
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => handleServiceSelect(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-teal-600 focus:outline-none transition-all"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      2. Gói dịch vụ chi tiết:
                    </label>
                    <select
                      value={selectedPackage}
                      onChange={(e) => onServiceChange(selectedService, e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 font-medium focus:ring-2 focus:ring-teal-600 focus:outline-none transition-all"
                    >
                      {currentServiceObj.packages.map((pkg, i) => (
                        <option key={i} value={pkg}>
                          {pkg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Họ và tên:
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ví dụ: Nguyễn Thị Lan"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Số điện thoại:
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10,11}"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="09xxxxxxxx"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Địa chỉ / Khu vực cần phục vụ:
                    </label>
                    <input
                      type="text"
                      required
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="Ví dụ: 123 Hòa Hảo, Q.10, HCM hoặc Dĩ An, Bình Dương..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Ghi chú cụ thể (Tình trạng người thân, giờ giấc...):
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ví dụ: Chăm bà 78 tuổi bị lẫn nhẹ, cần người hiền lành, ca 8 tiếng..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-700 hover:bg-teal-800 disabled:bg-teal-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-700/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-wide cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Đang đồng bộ đơn hàng...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Gửi Yêu Cầu Cho TnTer-TICS</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    Bảo mật thông tin 100% • Tư vấn báo giá miễn phí • Không đặt cọc trước
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingTableProps {
  onSelectPackage: (serviceName: string, packageName: string) => void;
}

export const PricingTable: React.FC<PricingTableProps> = ({ onSelectPackage }) => {
  const plans = [
    {
      category: "Dọn dẹp & Giữ trẻ",
      name: "Gói Theo Giờ Linh Hoạt",
      subtitle: "Phù hợp nhu cầu phát sinh theo ngày",
      price: "70.000đ",
      unit: "/ giờ",
      competitorPrice: "Mặt bằng đối thủ: 90.000đ/h",
      isPopular: false,
      features: [
        "Ca làm tối thiểu từ 2h - 4h/buổi",
        "Dọn dẹp phòng khách, bếp, toilet sạch sẽ",
        "Trông nom, chơi đùa cùng bé an toàn",
        "Có mặt sau 60 phút khi cần gấp",
        "Có người thay thế nếu nhân viên bận"
      ],
      serviceName: "Dọn dẹp nhà cửa & Chăm sóc trẻ em",
      packageName: "Gói Giữ trẻ & Dọn dẹp theo giờ (70.000đ/h)"
    },
    {
      category: "Mẹ & Bé Sau Sinh",
      name: "Gói Trọn Vẹn 12 Buổi",
      subtitle: "Liệu trình phục hồi sau sinh & tắm bé",
      price: "3.800.000đ",
      unit: "/ 12 buổi (90p/buổi)",
      competitorPrice: "Mặt bằng đối thủ: 4.800.000đ",
      isPopular: true,
      features: [
        "Tắm bé sơ sinh & massage kích thích phát triển",
        "Vệ sinh mắt, mũi, tai và rốn chuẩn vô trùng",
        "Xông hơ thảo mộc thiên nhiên toàn thân cho mẹ",
        "Massage kích tia sữa, giảm đau lưng cổ vai",
        "Chăm sóc vết mổ/vết may mau lành chống sẹo",
        "Trang bị đầy đủ dụng cụ và thảo dược thiên nhiên"
      ],
      serviceName: "Chăm sóc mẹ sau sinh & Tắm bé",
      packageName: "Gói Trọn Vẹn 12 buổi (Chăm mẹ & Tắm bé)"
    },
    {
      category: "Người Cao Tuổi & Bệnh",
      name: "Gói Ở Lại Toàn Thời Gian 24/7",
      subtitle: "Đồng hành chăm sóc chuyên sâu tại nhà hoặc viện",
      price: "8.500.000đ",
      unit: "/ tháng",
      competitorPrice: "Mặt bằng đối thủ: 11.000.000đ",
      isPopular: false,
      features: [
        "Nhân sự ở lại 24/24 lo toàn diện sinh hoạt",
        "Nấu ăn dinh dưỡng, hỗ trợ ăn uống & uống thuốc",
        "Tắm rửa, vệ sinh thân thể, thay bỉm sạch sẽ",
        "Đo huyết áp, đường huyết, xoa bóp tay chân",
        "Lật trở người bệnh chống loét tì đè",
        "Đổi người miễn phí không giới hạn"
      ],
      serviceName: "Chăm sóc người cao tuổi & Người bệnh",
      packageName: "Gói Ở lại 24/7 tại nhà (8.500.000đ/tháng)"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-700 font-extrabold uppercase tracking-wider text-xs">
            Bảng Giá Tham Khảo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Mức Giá Cạnh Tranh Nhất Thị Trường
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
            Áp dụng thống nhất tại TP.HCM, Bình Dương và Đồng Nai. Minh bạch, không chi phí ẩn, không phụ thu vô lý.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all relative ${
                p.isPopular
                  ? 'bg-teal-50/30 border-2 border-teal-600 shadow-xl shadow-teal-700/10'
                  : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-teal-400'
              }`}
            >
              {p.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gói Được Khách Hàng Chọn Nhiều Nhất</span>
                </div>
              )}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {p.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-1">{p.name}</h3>
                <p className="text-xs text-slate-500 mb-6">{p.subtitle}</p>

                <div className="mb-6">
                  <div className="text-3xl sm:text-4xl font-black text-teal-800">
                    {p.price}{' '}
                    <span className="text-xs sm:text-sm font-normal text-slate-400">
                      {p.unit}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-amber-700 mt-1.5 line-through">
                    {p.competitorPrice}
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                    ✓ Đã giảm 20% so với đối thủ
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {p.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectPackage(p.serviceName, p.packageName)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  p.isPopular
                    ? 'bg-teal-700 hover:bg-teal-800 text-white shadow-md shadow-teal-700/20'
                    : 'bg-slate-100 hover:bg-teal-700 hover:text-white text-slate-700'
                }`}
              >
                <span>Chọn Gói Này & Đặt Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

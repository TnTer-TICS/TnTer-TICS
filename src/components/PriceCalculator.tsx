import React, { useState } from 'react';
import { Calculator, Sparkles, PiggyBank, ArrowRight, ShieldCheck, HeartPulse, Baby, Home } from 'lucide-react';

interface CalcFormat {
  id: string;
  label: string;
  unit: string;
  competitorUnitRate: number;
  min: number;
  max: number;
  step: number;
  defaultVal: number;
  targetService: string;
  targetPackage: string;
}

interface ServiceCalcConfig {
  serviceId: string;
  serviceName: string;
  icon: React.ComponentType<{ className?: string }>;
  formats: CalcFormat[];
}

const CALC_DATA: ServiceCalcConfig[] = [
  {
    serviceId: "elderly",
    serviceName: "Chăm Sóc Người Cao Tuổi",
    icon: HeartPulse,
    formats: [
      {
        id: "elderly_247",
        label: "Ca 24/7 Ở lại toàn thời gian (Tháng)",
        unit: "tháng",
        competitorUnitRate: 11000000,
        min: 1,
        max: 6,
        step: 1,
        defaultVal: 1,
        targetService: "Chăm sóc người cao tuổi & Người bệnh",
        targetPackage: "Gói Ở lại 24/7 tại nhà (8.500.000đ/tháng)"
      },
      {
        id: "elderly_8h",
        label: "Ca hành chính 8 tiếng/ngày",
        unit: "ngày",
        competitorUnitRate: 550000,
        min: 1,
        max: 30,
        step: 1,
        defaultVal: 7,
        targetService: "Chăm sóc người cao tuổi & Người bệnh",
        targetPackage: "Gói Ca 8 tiếng/ngày (450.000đ/ca)"
      },
      {
        id: "elderly_12h",
        label: "Ca chăm sóc 12 tiếng/ngày",
        unit: "ngày",
        competitorUnitRate: 700000,
        min: 1,
        max: 30,
        step: 1,
        defaultVal: 7,
        targetService: "Chăm sóc người cao tuổi & Người bệnh",
        targetPackage: "Gói Ca 12 tiếng/ngày (600.000đ/ca)"
      }
    ]
  },
  {
    serviceId: "postpartum",
    serviceName: "Chăm Sóc Mẹ & Bé Sau Sinh",
    icon: Baby,
    formats: [
      {
        id: "postpartum_12",
        label: "Combo chăm mẹ & tắm bé trọn gói 12 buổi",
        unit: "gói",
        competitorUnitRate: 4800000,
        min: 1,
        max: 3,
        step: 1,
        defaultVal: 1,
        targetService: "Chăm sóc mẹ sau sinh & Tắm bé",
        targetPackage: "Gói Trọn Vẹn 12 buổi (Chăm mẹ & Tắm bé)"
      },
      {
        id: "postpartum_20",
        label: "Liệu trình phục hồi toàn diện 20 buổi",
        unit: "gói",
        competitorUnitRate: 7500000,
        min: 1,
        max: 3,
        step: 1,
        defaultVal: 1,
        targetService: "Chăm sóc mẹ sau sinh & Tắm bé",
        targetPackage: "Gói Toàn Diện 20 buổi (Phục hồi sau sinh)"
      },
      {
        id: "postpartum_single",
        label: "Tắm bé sơ sinh & Massage theo buổi",
        unit: "buổi",
        competitorUnitRate: 150000,
        min: 5,
        max: 30,
        step: 1,
        defaultVal: 10,
        targetService: "Chăm sóc mẹ sau sinh & Tắm bé",
        targetPackage: "Tắm bé sơ sinh & Massage theo buổi (120k/buổi)"
      }
    ]
  },
  {
    serviceId: "clean",
    serviceName: "Dọn Dẹp Nhà & Giữ Trẻ",
    icon: Home,
    formats: [
      {
        id: "clean_hour",
        label: "Dọn dẹp & Giữ trẻ theo giờ linh hoạt",
        unit: "giờ",
        competitorUnitRate: 90000,
        min: 4,
        max: 60,
        step: 2,
        defaultVal: 12,
        targetService: "Dọn dẹp nhà cửa & Chăm sóc trẻ em",
        targetPackage: "Gói Giữ trẻ & Dọn dẹp theo giờ (70.000đ/h)"
      },
      {
        id: "clean_month",
        label: "Gói tháng định kỳ (3 buổi/tuần, 4h/buổi)",
        unit: "tháng",
        competitorUnitRate: 4200000,
        min: 1,
        max: 6,
        step: 1,
        defaultVal: 1,
        targetService: "Dọn dẹp nhà cửa & Chăm sóc trẻ em",
        targetPackage: "Gói Định kỳ 3 buổi/tuần (3 - 4h/buổi)"
      }
    ]
  }
];

interface PriceCalculatorProps {
  onApplyCalc: (serviceName: string, packageName: string, noteText: string) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ onApplyCalc }) => {
  const [activeServiceIdx, setActiveServiceIdx] = useState<number>(0);
  const [activeFormatIdx, setActiveFormatIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(CALC_DATA[0].formats[0].defaultVal);

  const currentService = CALC_DATA[activeServiceIdx];
  const currentFormat = currentService.formats[activeFormatIdx] || currentService.formats[0];

  const handleServiceChange = (idx: number) => {
    setActiveServiceIdx(idx);
    setActiveFormatIdx(0);
    setQuantity(CALC_DATA[idx].formats[0].defaultVal);
  };

  const handleFormatChange = (fIdx: number) => {
    setActiveFormatIdx(fIdx);
    setQuantity(currentService.formats[fIdx].defaultVal);
  };

  // Math: 20% discount compared to competitors
  const competitorTotal = currentFormat.competitorUnitRate * quantity;
  const tnterTotal = Math.round(competitorTotal * 0.8);
  const savedTotal = competitorTotal - tnterTotal;

  const handleApply = () => {
    const formattedTnter = tnterTotal.toLocaleString('vi-VN');
    const formattedSaved = savedTotal.toLocaleString('vi-VN');
    const note = `[Đăng ký theo Bảng Tính Chi Phí -20%] Gói: ${currentFormat.label} | Số lượng: ${quantity} ${currentFormat.unit} | Giá TnTer-TICS: ${formattedTnter}đ (Tiết kiệm ${formattedSaved}đ so với thị trường).`;

    onApplyCalc(currentFormat.targetService, currentFormat.targetPackage, note);
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chính Sách Giá Tốt Nhất Phân Khúc</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Bảng Tính Chi Phí Trực Tuyến & Tiết Kiệm 20%
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
            TnTer-TICS cam kết minh bạch chi phí: giá rẻ hơn 20% so với mức giá sàn của các đối thủ tại TP.HCM, Bình Dương và Đồng Nai mà vẫn giữ nguyên tiêu chuẩn chăm sóc cao cấp.
          </p>
        </div>

        {/* Interactive Box */}
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Select Service Category */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  1. Chọn dịch vụ gia đình bạn cần:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {CALC_DATA.map((srv, idx) => {
                    const Icon = srv.icon;
                    const isActive = activeServiceIdx === idx;
                    return (
                      <button
                        key={srv.serviceId}
                        type="button"
                        onClick={() => handleServiceChange(idx)}
                        className={`p-3.5 rounded-2xl border text-xs font-bold transition-all text-left flex flex-col gap-1.5 cursor-pointer ${
                          isActive
                            ? 'bg-teal-600/30 border-teal-400 text-white shadow-md'
                            : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-teal-300' : 'text-slate-400'}`} />
                        <span className="leading-tight">{srv.serviceName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Select Format */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  2. Chọn hình thức và gói thời gian:
                </label>
                <select
                  value={activeFormatIdx}
                  onChange={(e) => handleFormatChange(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-teal-400 cursor-pointer"
                >
                  {currentService.formats.map((fmt, fIdx) => (
                    <option key={fmt.id} value={fIdx}>
                      {fmt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 3: Slider Quantity */}
              <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300 uppercase mb-3">
                  <span>3. Số lượng ({currentFormat.unit}):</span>
                  <span className="text-teal-400 font-extrabold text-sm sm:text-base">
                    {quantity} {currentFormat.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={currentFormat.min}
                  max={currentFormat.max}
                  step={currentFormat.step}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
                  <span>Tối thiểu: {currentFormat.min} {currentFormat.unit}</span>
                  <span>Tối đa: {currentFormat.max} {currentFormat.unit}</span>
                </div>
              </div>

            </div>

            {/* Right Output: Real-time Comparison Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-700 space-y-5 shadow-inner">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="text-slate-400">Giá mặt bằng đối thủ:</span>
                <span className="text-sm font-semibold line-through text-slate-500">
                  {competitorTotal.toLocaleString('vi-VN')}đ
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                    Giá TnTer-TICS:
                  </span>
                  <span className="px-2.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded text-[11px] font-extrabold">
                    -20% Tiết Kiệm
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                  {tnterTotal.toLocaleString('vi-VN')}
                  <span className="text-base sm:text-lg font-normal text-slate-400 ml-1">đ</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Áp dụng cho {quantity} {currentFormat.unit} ({currentFormat.label})
                </p>
              </div>

              {/* Savings Highlight */}
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-3.5 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <PiggyBank className="w-4 h-4 text-emerald-400 shrink-0" />
                  Bạn tiết kiệm được:
                </span>
                <span className="font-extrabold text-emerald-400 text-base">
                  {savedTotal.toLocaleString('vi-VN')}đ
                </span>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleApply}
                className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-teal-700/30 transition-all hover:scale-[1.01] active:scale-95 text-xs uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Áp Dụng Mức Giá Này & Đặt Lịch</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Không phát sinh chi phí phụ ngoài thỏa thuận</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

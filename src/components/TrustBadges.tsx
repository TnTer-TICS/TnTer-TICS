import React from 'react';
import { BadgeCheck, Stethoscope, RefreshCw, PiggyBank, ShieldCheck, HeartHandshake } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const pillars = [
    {
      icon: BadgeCheck,
      title: "Hồ Sơ Xác Thực 100%",
      desc: "Nhân viên đều có CCCD gắn chip, xác nhận hạnh kiểm của công an địa phương và hồ sơ khám sức khỏe định kỳ âm tính bệnh truyền nhiễm.",
      color: "text-teal-600 bg-teal-50"
    },
    {
      icon: Stethoscope,
      title: "Đào Tạo Chuẩn Y Khoa",
      desc: "Đội ngũ chăm sóc mẹ bé và người cao tuổi được trang bị kỹ năng sơ cấp cứu, xoa bóp bấm huyệt trị liệu và kỹ thuật phục hồi thể trạng.",
      color: "text-emerald-600 bg-emerald-50"
    },
    {
      icon: PiggyBank,
      title: "Tiết Kiệm 20% Chi Phí",
      desc: "Mô hình vận hành tinh gọn, tối ưu định mức giá so với các đối thủ cùng phân khúc, giúp mọi gia đình dễ dàng tiếp cận dịch vụ cao cấp.",
      color: "text-amber-600 bg-amber-50"
    },
    {
      icon: RefreshCw,
      title: "Đổi Người Linh Hoạt",
      desc: "Được quyền đổi nhân sự hoàn toàn miễn phí không giới hạn nếu quý khách cảm thấy phong cách làm việc chưa thật sự hòa hợp với gia đình.",
      color: "text-sky-600 bg-sky-50"
    },
    {
      icon: ShieldCheck,
      title: "Bảo Hiểm An Tâm Gia Đình",
      desc: "Hợp đồng minh bạch, cam kết đền bù và chính sách bảo hiểm tài sản đầy đủ, mang lại sự yên tâm tuyệt đối khi nhân viên làm việc tại nhà.",
      color: "text-indigo-600 bg-indigo-50"
    },
    {
      icon: HeartHandshake,
      title: "Đồng Hành Suốt Ca Làm",
      desc: "Chuyên viên quản lý ca định kỳ thăm hỏi, lắng nghe ý kiến phản hồi và điều chỉnh quy trình chăm sóc phù hợp nhất với sức khỏe người thân.",
      color: "text-rose-600 bg-rose-50"
    }
  ];

  return (
    <section id="about" className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-teal-700 font-extrabold uppercase tracking-wider text-xs">Giá Trị Cốt Lõi</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Vì Sao Gia Đình Bạn Nên Chọn TnTer-TICS?
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
            Chúng tôi xem người thân của bạn như chính người thân trong gia đình mình, đặt sự an tâm và thuận tiện của khách hàng lên hàng đầu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/90 hover:border-teal-400 hover:bg-teal-50/30 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

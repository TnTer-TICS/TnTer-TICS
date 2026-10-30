import React from 'react';
import { PhoneCall, Users, Home, Award } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: PhoneCall,
      title: "Tiếp Nhận Nhu Cầu",
      desc: "Quý khách để lại thông tin đặt lịch trên website hoặc gọi trực tiếp Hotline/Zalo 0982.405.755. Chuyên viên gọi lại sau 5 phút."
    },
    {
      num: "02",
      icon: Users,
      title: "Sàng Lọc & Ghép Đôi",
      desc: "TnTer-TICS lựa chọn nhân sự có kinh nghiệm phù hợp với tình trạng sức khỏe của người thân và gần khu vực bạn sinh sống."
    },
    {
      num: "03",
      icon: Home,
      title: "Nhận Việc & Thử Việc",
      desc: "Nhân viên mang đầy đủ hợp đồng, giấy tờ tùy thân đến tận nhà phục vụ. Được quyền đổi người miễn phí nếu gia đình chưa hài lòng."
    },
    {
      num: "04",
      icon: Award,
      title: "Chăm Sóc & Hậu Mãi",
      desc: "Bộ phận Chăm sóc khách hàng định kỳ gọi thăm hỏi sức khỏe, kiểm tra chất lượng ca làm việc và giải quyết mọi phát sinh 24/7."
    }
  ];

  return (
    <section id="process" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-700 font-extrabold uppercase tracking-wider text-xs">
            Quy Trình Chuẩn Hóa
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            4 Bước Đặt Dịch Vụ Dễ Dàng & Nhanh Chóng
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
            Chỉ mất chưa đầy 60 giây gửi thông tin, đội ngũ chăm sóc TnTer-TICS sẽ có mặt để san sẻ gánh nặng cùng bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="bg-slate-50 rounded-3xl p-6 border border-slate-200/90 relative hover:border-teal-400 hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-300 group-hover:text-teal-600 transition-colors">
                    {st.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

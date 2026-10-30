import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Anh Minh Trí",
      location: "Quận 10, TP. Hồ Chí Minh",
      service: "Chăm sóc bố sau phẫu thuật thay khớp háng",
      rating: 5,
      content:
        "Bố mình 76 tuổi mổ xong đi lại rất khó, gia đình ai cũng bận đi làm cả ngày. May mắn tìm được chị điều dưỡng bên TnTer-TICS qua tập phục hồi chức năng và tắm rửa xoa bóp rất ân cần. Bố vui tính hơn hẳn, vết mổ mau lành. Cả nhà thật sự trút được gánh nặng.",
      badge: "Đã sử dụng ca 8h trong 2 tháng"
    },
    {
      name: "Chị Thu Thảo",
      location: "TP. Dĩ An, Bình Dương",
      service: "Gói 20 buổi Chăm sóc mẹ sau sinh & Tắm bé",
      rating: 5,
      content:
        "Sinh bé đầu lòng lúng túng đủ thứ, mình bị cương sữa phát sốt. Nhờ chị chuyên viên qua massage thông tia sữa và xông hơ thảo dược nhẹ người hẳn. Bé được tắm, vệ sinh rốn và rèn nếp ngủ rất ngoan. Giá lại tiết kiệm hơn các bên khác cả triệu đồng.",
      badge: "Khách hàng thân thiết"
    },
    {
      name: "Chị Hoàng Yến",
      location: "TP. Biên Hòa, Đồng Nai",
      service: "Dọn dẹp nhà cửa & Giữ bé 3 tuổi định kỳ",
      rating: 5,
      content:
        "Cô giúp việc nấu ăn rất vừa miệng, sạch sẽ gọn gàng. Giữ bé nhà mình không cho coi tivi hay điện thoại mà bày trò chơi xếp hình, kể chuyện. Chi phí 70k/h quá hợp lý so với chất lượng và sự tận tâm của cô. Sẽ tiếp tục gắn bó lâu dài cùng TnTer-TICS.",
      badge: "Gói định kỳ 3 buổi/tuần"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-700 font-extrabold uppercase tracking-wider text-xs">
            Trải Nghiệm Thực Tế
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Hơn 1.200+ Gia Đình Đã Tin Chọn TnTer-TICS
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
            Sự an tâm và nụ cười của người thân bạn chính là thước đo giá trị cao nhất của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-200" />
                </div>

                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-6">
                  "{r.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-sm">{r.name}</div>
                <div className="text-xs text-slate-400">{r.location}</div>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 mt-2 bg-teal-50 px-2 py-0.5 rounded">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{r.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

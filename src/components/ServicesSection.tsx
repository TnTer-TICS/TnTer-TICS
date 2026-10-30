import React from 'react';
import { HeartPulse, Baby, Sparkles, Check, ArrowRight, ShieldAlert } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string, packageName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const services = [
    {
      id: "elderly",
      title: "Chăm Sóc Người Cao Tuổi & Người Bệnh",
      tag: "Hiếu Kính & Tận Tụy",
      tagColor: "bg-teal-100 text-teal-800",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=700&q=80",
      desc: "Chăm lo chu đáo từng bữa ăn, giấc ngủ, theo dõi chỉ số huyết áp, nhắc thuốc đúng giờ và bầu bạn giúp các cụ vui vẻ tuổi già.",
      tasks: [
        "Hỗ trợ ăn uống, uống thuốc đúng toa, hỗ trợ người ăn qua sonde",
        "Tắm rửa, vệ sinh cá nhân, thay bỉm, vệ sinh thân thể sạch sẽ",
        "Đo huyết áp, đường huyết, xoa bóp tay chân chống nhức mỏi",
        "Lật trở chống loét tì đè, tập vận động nhẹ nhàng",
        "Trò chuyện, dạo bộ, kích thích tinh thần lạc quan yêu đời"
      ],
      priceNote: "Từ 450.000đ/ca 8h • Ở lại 24/7 chỉ từ 8.5 triệu/tháng",
      serviceName: "Chăm sóc người cao tuổi & Người bệnh",
      defaultPackage: "Gói Ở lại 24/7 tại nhà (8.500.000đ/tháng)"
    },
    {
      id: "postpartum",
      title: "Chăm Sóc Mẹ Sau Sinh & Tắm Bé Sơ Sinh",
      tag: "Chuẩn Y Khoa Toàn Diện",
      tagColor: "bg-rose-100 text-rose-800",
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=700&q=80",
      desc: "Giúp mẹ phục hồi thể trạng nhanh chóng, ngừa trầm cảm sau sinh và bé yêu được nâng niu bằng liệu trình y tế khoa học.",
      tasks: [
        "Tắm bé sơ sinh, vệ sinh mắt, mũi, tai, miệng và rốn chuẩn vô trùng",
        "Massage thư giãn, xoa bụng chống đầy hơi và rèn nếp ngủ cho bé",
        "Xông hơ thảo dược thiên nhiên, chăm sóc vết mổ/vết khâu mau lành",
        "Massage kích tia sữa, giảm cương tức tuyến sữa, xoa bóp cổ vai gáy",
        "Hỗ trợ nếp ăn dặm và cách xử lý sơ cứu sặc sữa tại nhà"
      ],
      priceNote: "Từ 120.000đ/buổi tắm bé • Combo 12 buổi trọn gói 3.8 triệu",
      serviceName: "Chăm sóc mẹ sau sinh & Tắm bé",
      defaultPackage: "Gói Trọn Vẹn 12 buổi (Chăm mẹ & Tắm bé)"
    },
    {
      id: "cleaning",
      title: "Dọn Dẹp Nhà Cửa & Chăm Sóc Trẻ Em",
      tag: "Nhà Sạch - Bé An Vui",
      tagColor: "bg-amber-100 text-amber-800",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
      desc: "Giải phóng sức lao động cho các bậc phụ huynh bận rộn. Không gian nhà cửa thơm tho và con thơ được bảo mẫu kèm cặp an toàn.",
      tasks: [
        "Lau dọn phòng khách, hút bụi, làm sạch sàn nhà, phòng ngủ",
        "Vệ sinh kỹ lưỡng khu vực bếp nấu, tẩy rửa nhà vệ sinh sạch khuẩn",
        "Giặt ủi quần áo, gấp đồ gọn gàng ngăn nắp",
        "Trông nom trẻ em chu đáo, kiên nhẫn dỗ bé ăn ngoan, chơi trò chơi trí tuệ",
        "Hỗ trợ đưa đón bé đi học (theo thỏa thuận riêng của gia đình)"
      ],
      priceNote: "Chỉ từ 70.000đ/giờ (giảm 20% so với 90.000đ đối thủ)",
      serviceName: "Dọn dẹp nhà cửa & Chăm sóc trẻ em",
      defaultPackage: "Gói Giữ trẻ & Dọn dẹp theo giờ (70.000đ/h)"
    }
  ];

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-teal-700 font-extrabold uppercase tracking-wider text-xs">
            Dịch Vụ Trọng Tâm
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Giải Pháp Tiện Lợi Toàn Diện Cho Gia Đình
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
            Thiết kế linh hoạt theo ca giờ, theo ngày hoặc ở lại toàn thời gian tại TP.HCM, Bình Dương và Đồng Nai.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-teal-500/80 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 bg-slate-100 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full shadow-xs ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>

                <div className="p-6 sm:p-7">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {item.tasks.map((task, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-tight">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t border-slate-100 bg-slate-50/50 mt-auto">
                <div className="text-xs font-semibold text-teal-800 mb-3 pt-4">
                  {item.priceNote}
                </div>
                <button
                  onClick={() => onSelectService(item.serviceName, item.defaultPackage)}
                  className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase rounded-xl transition-all shadow-md shadow-teal-700/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Chọn Gói Này & Đặt Lịch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { UserPlus, Award, Wallet, MapPin, CheckCircle2, Send, Clock, BookOpen } from 'lucide-react';
import { CONFIG } from '../constants/config.ts';

export const RecruitmentSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [position, setPosition] = useState('Chăm sóc người cao tuổi & Người bệnh');
  const [experience, setExperience] = useState('Chưa có kinh nghiệm - Cần đào tạo từ đầu (Miễn phí)');
  const [area, setArea] = useState('TP. Hồ Chí Minh');
  const [trainingNeed, setTrainingNeed] = useState('Muốn tham gia lớp đào tạo kỹ năng chuẩn y khoa miễn phí');
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !birthYear.trim()) {
      alert("Vui lòng điền đầy đủ Họ tên, Số điện thoại và Năm sinh!");
      return;
    }

    setIsSubmitting(true);
    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    // Payload exactly mapped to the 11 columns in "Applications-Tuyển Dụng"
    const payload = {
      type: "recruitment",
      time: formattedTime,
      name: name.trim(),
      phone: phone.trim(),
      birthYear: birthYear.trim(),
      position: position,
      experience: experience,
      area: area,
      trainingNeed: trainingNeed,
      notes: notes.trim(),
      source: "Website tntertics.vn (Tuyển Dụng)",
      status: "Ứng viên mới – Cần gọi phỏng vấn"
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

      setSuccessMsg(
        `Nộp hồ sơ thành công! Chào bạn ${payload.name}, phòng nhân sự TnTer-TICS đã tiếp nhận hồ sơ vào trang tính "Applications-Tuyển Dụng". Chuyên viên nhân sự sẽ liên hệ qua số ${payload.phone} trong 24 giờ để hẹn lịch phỏng vấn và xếp lớp đào tạo gần nhà bạn nhất!`
      );

      // Reset form
      setName('');
      setPhone('');
      setBirthYear('');
      setNotes('');
    } catch (err) {
      console.error("Recruitment submission error:", err);
      alert("Có lỗi khi gửi hồ sơ, vui lòng liên hệ trực tiếp hotline tuyển dụng 0982.405.755 để được phỏng vấn ngay!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="recruitment" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Pitch & Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wide">
              <Award className="w-3.5 h-3.5" />
              <span>Chương Trình Đào Tạo Nghề & Tuyển Dụng Nhân Sự</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Gia Nhập Đội Ngũ <span className="text-teal-700">TnTer-TICS</span> <br />
              Thu Nhập Ổn Định <span className="text-emerald-600">10 – 18 Triệu / Tháng</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Bạn đang tìm kiếm một công việc nhân văn, thu nhập tốt và được tôn trọng? TnTer-TICS liên tục khai giảng các lớp <strong>đào tạo nghiệp vụ chăm sóc chuẩn y khoa hoàn toàn MIỄN PHÍ</strong>. 100% học viên hoàn thành khóa học được bố trí ca làm việc ngay gần nơi ở tại TP.HCM, Bình Dương hoặc Đồng Nai.
            </p>

            {/* 3 Core Benefits */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Thu Nhập Hấp Dẫn & Thưởng Nóng</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Thu nhập từ 10.000.000đ – 18.000.000đ/tháng. Nhận lương đúng ngày, có phụ cấp xăng xe, thưởng lễ Tết và bảo hiểm thân thể.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Đào Tạo Nghiệp Vụ Chuẩn Y Khoa Miễn Phí</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Thực hành bài bản: sơ cứu ban đầu, xoa bóp trị liệu, chăm sóc người cao tuổi, tắm bé sơ sinh và kích sữa cho mẹ. Cấp chứng nhận hoàn thành.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Sắp Xếp Ca Làm Gần Nhà</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Ưu tiên phân bổ ca làm việc tại đúng quận/huyện bạn sinh sống. Linh hoạt ca 8h, ca 12h hoặc ca 24/7 có bao ăn ở tại nhà gia chủ.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-teal-800 text-white rounded-2xl flex items-center justify-between text-xs font-medium">
              <span>Cần tư vấn trực tiếp về đào tạo việc làm?</span>
              <a
                href={`tel:${CONFIG.hotlineRaw}`}
                className="font-bold underline text-amber-300 hover:text-white transition-colors"
              >
                Hotline Tuyển Dụng: {CONFIG.hotline}
              </a>
            </div>
          </div>

          {/* Right Column: Recruitment Form (Sends to Applications-Tuyển Dụng) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/90 relative">
              <div className="absolute -top-3.5 right-6 bg-teal-700 text-white font-bold text-xs uppercase px-3.5 py-1 rounded-full shadow-md">
                Tuyển Dụng & Nhận Việc Ngay
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-1">Đăng Ký Tuyển Dụng & Đào Tạo</h3>
              <p className="text-xs text-slate-500 mb-5">
                Hồ sơ tự động đổ về trang tính <strong>Applications-Tuyển Dụng</strong>
              </p>

              {successMsg ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-emerald-900">Hồ Sơ Đã Được Tiếp Nhận!</h4>
                    <p className="text-xs text-emerald-700 mt-2 leading-relaxed">{successMsg}</p>
                  </div>
                  <button
                    onClick={() => setSuccessMsg(null)}
                    className="inline-block bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                  >
                    Nộp thêm hồ sơ khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Họ và tên của bạn:
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ví dụ: Lâm Tâm Như"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
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
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Năm sinh:
                      </label>
                      <input
                        type="number"
                        required
                        min="1960"
                        max="2008"
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        placeholder="Ví dụ: 1988"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Vị trí mong muốn:
                      </label>
                      <select
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                      >
                        <option value="Chăm sóc người cao tuổi & Người bệnh">Chăm sóc người cao tuổi / Người bệnh</option>
                        <option value="Chăm sóc mẹ sau sinh & Tắm bé">Chăm sóc mẹ sau sinh & Tắm bé</option>
                        <option value="Dọn dẹp nhà cửa & Chăm sóc trẻ em">Dọn dẹp nhà & Giữ trẻ em</option>
                        <option value="Tất cả các vị trí (sẵn sàng làm)">Tất cả các vị trí (sẵn sàng làm)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Kinh nghiệm hiện có:
                      </label>
                      <select
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                      >
                        <option value="Chưa có kinh nghiệm - Cần đào tạo từ đầu (Miễn phí)">Chưa có - Cần đào tạo từ đầu</option>
                        <option value="Dưới 1 năm kinh nghiệm">Dưới 1 năm kinh nghiệm</option>
                        <option value="Từ 1 - 3 năm kinh nghiệm">Từ 1 - 3 năm kinh nghiệm</option>
                        <option value="Trên 3 năm kinh nghiệm / Có chứng chỉ y tế">Trên 3 năm / Có chứng chỉ y tế</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Khu vực muốn làm việc:
                      </label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                      >
                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Bình Dương">Bình Dương</option>
                        <option value="Đồng Nai">Đồng Nai</option>
                        <option value="Linh hoạt các khu vực lân cận">Linh hoạt các khu vực</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Nhu cầu đào tạo kỹ năng:
                    </label>
                    <select
                      value={trainingNeed}
                      onChange={(e) => setTrainingNeed(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    >
                      <option value="Muốn tham gia lớp đào tạo kỹ năng chuẩn y khoa miễn phí">
                        Muốn tham gia khóa đào tạo kỹ năng chuẩn y khoa miễn phí
                      </option>
                      <option value="Đã có tay nghề chuyên môn, muốn nhận ca đi làm ngay">
                        Đã có tay nghề chuyên môn, muốn nhận ca đi làm ngay
                      </option>
                      <option value="Cần bồi dưỡng thêm kỹ năng xoa bóp, vật lý trị liệu">
                        Cần bồi dưỡng thêm kỹ năng xoa bóp, vật lý trị liệu
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Ghi chú thêm về bản thân (Thời gian rảnh, ca làm mong muốn...):
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ví dụ: Muốn làm ca 24/7 ở lại hoặc ca 8 tiếng tại khu vực Quận 10, Thủ Đức..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-teal-800 hover:bg-teal-900 disabled:bg-teal-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-800/25 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Đang gửi hồ sơ ứng tuyển...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Nộp Hồ Sơ Ứng Tuyển & Đào Tạo Ngay</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    TnTer-TICS cam kết không thu bất kỳ khoản phí môi giới hay tiền cọc nào từ người lao động.
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

export const CONFIG = {
  brandName: "TnTer-TICS",
  tagline: "Tiện Lợi & Tận Tâm Cho Mọi Mái Ấm",
  hotline: "0982.405.755",
  hotlineRaw: "0982405755",
  zaloUrl: "https://zalo.me/0982405755",
  address: "236/25a Hòa Hảo, Phường Vườn Lài, TP. Hồ Chí Minh",
  areasServed: [
    "TP. Hồ Chí Minh (Tất cả 22 quận, huyện & TP. Thủ Đức)",
    "Bình Dương (Thủ Dầu Một, Dĩ An, Thuận An, Tân Uyên, Bến Cát)",
    "Đồng Nai (Biên Hòa, Long Thành, Nhơn Trạch, Trảng Bom)",
    "Các khu vực lân cận theo thỏa thuận riêng"
  ],
  webhookUrl: "https://script.google.com/macros/s/AKfycbybr9SPINefw0etKrmyCuefOckF5IxmiUs2Zg9Ayw-MsUgllhVhtz4-4HyCIe8WVkYN/exec",
  domain: "tntertics.vn",
};

export interface ServicePackage {
  id: string;
  name: string;
  shortDesc: string;
  packages: string[];
}

export const SERVICES: ServicePackage[] = [
  {
    id: "postpartum",
    name: "Chăm sóc mẹ sau sinh & Tắm bé",
    shortDesc: "Phục hồi sức khỏe cho mẹ, chăm sóc tắm bé sơ sinh chuẩn y khoa tại nhà.",
    packages: [
      "Gói Trọn Vẹn 12 buổi (Chăm mẹ & Tắm bé)",
      "Gói Toàn Diện 20 buổi (Phục hồi sau sinh)",
      "Tắm bé sơ sinh & Massage theo buổi (120k/buổi)",
      "Chăm sóc mẹ & bé sau sinh theo ca 8 tiếng/ngày",
      "Ca 24/7 ở lại cùng mẹ và bé sơ sinh"
    ]
  },
  {
    id: "elderly",
    name: "Chăm sóc người cao tuổi & Người bệnh",
    shortDesc: "Tận tâm chăm sóc sức khỏe, hỗ trợ ăn uống, vận động và theo dõi y tế 24/7.",
    packages: [
      "Gói Ở lại 24/7 tại nhà (8.500.000đ/tháng)",
      "Gói Ca 8 tiếng/ngày (450.000đ/ca)",
      "Gói Ca 12 tiếng/ngày (600.000đ/ca)",
      "Chăm sóc bệnh nhân tại Bệnh viện theo ngày",
      "Hỗ trợ phục hồi chức năng & vật lý trị liệu cơ bản"
    ]
  },
  {
    id: "cleaning",
    name: "Dọn dẹp nhà cửa & Chăm sóc trẻ em",
    shortDesc: "Nhà sạch tinh tươm, bảo mẫu kiên nhẫn chăm bé ăn học và vui chơi an toàn.",
    packages: [
      "Gói Giữ trẻ & Dọn dẹp theo giờ (70.000đ/h)",
      "Gói Định kỳ 3 buổi/tuần (3 - 4h/buổi)",
      "Trọn gói giúp việc & giữ trẻ theo tháng",
      "Nấu ăn gia đình & chuẩn bị đồ ăn dặm cho bé"
    ]
  }
];

export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * =========================================================================
 * GOOGLE APPS SCRIPT CHO TNT-TICS (tntertics.vn)
 * Tự động phân luồng:
 * 1. Đơn Đặt Lịch -> Trang tính "Bookings - Dat lich" (hoặc "TnTer-TICS")
 * 2. Đơn Tuyển Dụng -> Trang tính "Applications-Tuyển Dụng" (Đủ 11 cột)
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Khóa script trong 10 giây để tránh ghi trùng khi nhiều người nộp cùng lúc
  lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var data = {};
    
    // Đọc payload từ fetch JSON
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    // Lấy thời gian chuẩn múi giờ Việt Nam (GMT+7)
    var formattedTime = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");

    // =======================================================================
    // LUỒNG 1: ỨNG VIÊN ĐĂNG KÝ TUYỂN DỤNG & ĐÀO TẠO
    // =======================================================================
    if (data.type === "recruitment") {
      var recruitSheet = null;
      var sheets = ss.getSheets();
      
      // Tìm tab không phân biệt hoa thường hoặc khoảng trắng
      for (var i = 0; i < sheets.length; i++) {
        var sName = sheets[i].getName().toLowerCase().replace(/\\s+/g, '');
        if (sName.indexOf("tuyendung") !== -1 || sName.indexOf("tuyểndụng") !== -1 || sName.indexOf("application") !== -1) {
          recruitSheet = sheets[i];
          break;
        }
      }

      // Nếu chưa có, tự tạo tab chuẩn
      if (!recruitSheet) {
        recruitSheet = ss.insertSheet("Applications-Tuyển Dụng");
      }

      // Đảm bảo dòng tiêu đề đủ chuẩn 11 cột
      if (recruitSheet.getLastRow() === 0) {
        recruitSheet.appendRow([
          "Thời gian",
          "Họ tên",
          "SĐT",
          "Năm sinh",
          "Vị trí ứng tuyển",
          "Kinh nghiệm",
          "Khu vực làm việc",
          "Nhu cầu đào tạo",
          "Ghi chú",
          "Nguồn",
          "Trạng thái"
        ]);
        // Định dạng tiêu đề đậm và nền nổi bật
        recruitSheet.getRange(1, 1, 1, 11).setFontWeight("bold").setBackground("#e6fffa");
      }

      // Ghi đầy đủ 11 cột thông tin ứng viên
      recruitSheet.appendRow([
        data.time || formattedTime,
        data.name || "",
        data.phone ? ("'" + data.phone) : "", // Giữ số 0 ở đầu SĐT
        data.birthYear || "",
        data.position || "",
        data.experience || "",
        data.area || "",
        data.trainingNeed || "Có nhu cầu đào tạo",
        data.notes || "",
        data.source || "Website tntertics.vn (Tuyển Dụng)",
        data.status || "Ứng viên mới – Cần gọi phỏng vấn"
      ]);

      return ContentService.createTextOutput(JSON.stringify({ 
        status: "success", 
        target: "Applications-Tuyển Dụng", 
        name: data.name 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // =======================================================================
    // LUỒNG 2: KHÁCH HÀNG ĐẶT LỊCH DỊCH VỤ (BOOKING)
    // =======================================================================
    else {
      var bookingSheet = null;
      var allSheets = ss.getSheets();

      // Tìm tab đặt lịch (Bookings - Dat lich hoặc TnTer-TICS hoặc tab đầu tiên)
      for (var j = 0; j < allSheets.length; j++) {
        var bName = allSheets[j].getName().toLowerCase();
        if (bName.indexOf("booking") !== -1 || bName.indexOf("đặt lịch") !== -1 || bName.indexOf("dat lich") !== -1) {
          bookingSheet = allSheets[j];
          break;
        }
      }

      if (!bookingSheet) {
        bookingSheet = ss.getSheetByName("TnTer-TICS") || allSheets[0];
      }

      // Nếu tab mới toanh, tạo tiêu đề chuẩn 9 cột
      if (bookingSheet.getLastRow() === 0) {
        bookingSheet.appendRow([
          "Thời gian",
          "Họ tên",
          "SĐT",
          "Dịch vụ",
          "Gói",
          "Địa chỉ / Khu vực",
          "Ghi chú",
          "Nguồn",
          "Trạng thái"
        ]);
        bookingSheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#f0fdf4");
      }

      // Ghi đúng 9 cột của khách đặt lịch
      bookingSheet.appendRow([
        data.time || formattedTime,
        data.name || "",
        data.phone ? ("'" + data.phone) : "", // Giữ số 0 ở đầu SĐT
        data.service || "",
        data.package || "",
        data.area || "",
        data.notes || "",
        data.source || "Website tntertics.vn",
        data.status || "Mới – Cần gọi lại trong 30p"
      ]);

      return ContentService.createTextOutput(JSON.stringify({ 
        status: "success", 
        target: bookingSheet.getName(), 
        name: data.name 
      })).setMimeType(ContentService.MimeType.JSON);
    }

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
`;

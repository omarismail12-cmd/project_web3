document.addEventListener("DOMContentLoaded", () => {
  // تحميل الهيدر
  injectHTML("/project_web3/includes/header.html", ".header", "Header", () => {
    setupMobileMenu();        // ✅ بعد تحميل الهيدر
    enableSmoothScroll();     // ✅ إذا فيه روابط في الهيدر
  });

  // تحميل الفوتر
  injectHTML("/project_web3/includes/footer.html", ".footer", "Footer", () => {
    updateFooterYear();       // ✅ بعد تحميل الفوتر
  });

  // استدعاء باقي الدوال التي لا تعتمد على الهيدر أو الفوتر
  setupContactForm();
});

/**
 * دالة لحقن HTML من ملف خارجي داخل عنصر معين
 * @param {string} path - مسار الملف
 * @param {string} selector - محدد العنصر (مثل .header أو .footer)
 * @param {string} label - اسم يُستخدم للتنبيه في الكونسول
 * @param {Function} [callback] - دالة اختيارية تُنفذ بعد النجاح
 */
function injectHTML(path, selector, label, callback) {
  fetch(path)
    .then(response => {
      if (!response.ok) throw new Error(`${label} لم يتم تحميله (${response.status})`);
      return response.text();
    })
    .then(data => {
      const container = document.querySelector(selector);
      if (container) {
        container.innerHTML = data;
        console.log(`${label} ✅`);

        if (typeof callback === 'function') {
          callback(); // ✅ شغل الدالة بعد الحقن
        }
      } else {
        console.warn(`⚠️ العنصر ${selector} غير موجود في الصفحة`);
      }
    })
    .catch(error => {
      console.error(`❌ ${label}:`, error);
    });
}

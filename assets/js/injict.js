// inject.js

document.addEventListener("DOMContentLoaded", () => {

  injectHTML("/includes/header.html", ".header", "");

 
  injectHTML("/includes/footer.html", ".footer", "");
});

/**
 * 
 * @param {string} path 
 * @param {string} selector 
 * @param {string} label 
 */
function injectHTML(path, selector, label) {
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
      } else {
        console.warn(`⚠️  ${selector} `);
      }
    })
    .catch(error => {
      console.error(`❌ ${label}:`, error);
    });
}

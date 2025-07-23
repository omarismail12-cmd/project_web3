// inject.js

document.addEventListener("DOMContentLoaded", () => {

  injectHTML("/project_web3/includes/header.html", ".header", "Header");

 
  injectHTML("/project_web3/includes/footer.html", ".footer", "Footer");
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

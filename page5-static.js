(function () {
  var page = new URLSearchParams(location.search).get('page');
  function ensureHomeIcon() {
    if (Number(page) <= 1 || document.querySelector('.site-home-icon')) return;
    var home = document.createElement('a'); home.className = 'site-home-icon'; home.href = '/'; home.setAttribute('aria-label', 'Homepage'); home.textContent = '↗'; document.body.appendChild(home);
  }
  function ensurePageNumber() {
    if (document.querySelector('.page-number-label')) return;
    var label = document.createElement('div'); label.className = 'page-number-label'; label.textContent = 'Page ' + (Number(page) || 1); document.body.appendChild(label);
  }
  function ensurePageNumber() {
    if (document.querySelector('.page-number-label')) return;
    var label = document.createElement('div'); label.className = 'page-number-label'; label.textContent = 'Page ' + (Number(page) || 1); document.body.appendChild(label);
  }
  if (page === '6') {
    document.addEventListener('DOMContentLoaded', function () { document.body.replaceChildren(); ensureHomeIcon(); ensurePageNumber(); setInterval(function(){ensureHomeIcon();ensurePageNumber()}, 100); });
    return;
  }
  if (page !== '5') {
    document.addEventListener('DOMContentLoaded', function () { ensureHomeIcon(); ensurePageNumber(); setInterval(function(){ensureHomeIcon();ensurePageNumber()}, 100); });
    return;
  }
  var css = document.createElement('style');
  css.textContent += '.page-number-label{position:fixed;bottom:8px;left:50%;transform:translateX(-50%);z-index:50;border-top:1px solid #24332f55;padding:5px 22px 0;color:#24332f99;font-size:11px;letter-spacing:.08em}';
  document.head.appendChild(css);
  var pageStyle = document.createElement('style'); pageStyle.textContent = '.page-number-label{position:fixed;bottom:8px;left:50%;transform:translateX(-50%);z-index:50;border-top:1px solid #24332f55;padding:5px 22px 0;color:#24332f99;font-size:11px;letter-spacing:.08em}'; document.head.appendChild(pageStyle);
  document.addEventListener('DOMContentLoaded', function () {
    var main = document.createElement('main');
    main.className = 'static-page-five';
    ensureHomeIcon(); ensurePageNumber(); setInterval(function(){ensureHomeIcon();ensurePageNumber()}, 100);
    main.innerHTML = '<h1>A little sky, a little joy</h1><div class="static-page-five-grid"><figure><img src="/page5-photo-1.jpg" alt="Clouds with a pink heart"></figure><figure><img src="/page5-photo-5.png" alt="Bare tree branches"></figure><figure><img src="/page5-photo-6.png" alt="Trees in the fog"></figure><figure><img src="/page5-photo-7.png" alt="Pink evening sky"></figure></div><button class="static-page-five-next" onclick="location.href=location.pathname+\'?page=6\'">Next</button>';
    document.body.replaceChildren(main);
    ensurePageNumber();
    setInterval(function () { document.querySelectorAll('button').forEach(function (button) { if (button.textContent.trim() === 'Skip') button.remove(); }); }, 100);
  });
}());

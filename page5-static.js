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
  if (page === '6') {
    document.addEventListener('DOMContentLoaded', function () { document.body.replaceChildren(); ensureHomeIcon(); ensurePageNumber(); setInterval(function(){ensureHomeIcon();ensurePageNumber()}, 100); });
    return;
  }
  if (page !== '5') {
    document.addEventListener('DOMContentLoaded', function () { ensureHomeIcon(); ensurePageNumber(); setInterval(function(){ensureHomeIcon();ensurePageNumber()}, 100); });
    return;
  }
  var css = document.createElement('style');
  css.textContent = '@keyframes staticPageFiveFloat{0%,100%{transform:translateY(0) rotate(var(--tilt))}50%{transform:translateY(-8px) rotate(var(--tilt))}}.static-page-five{min-height:100vh;padding:28px 24px;background:linear-gradient(145deg,#fffaf4,#edf5f1);text-align:center;box-sizing:border-box}.static-page-five h1{font:italic clamp(30px,6vw,58px) Georgia,serif;color:#24332f;margin:0 0 24px}.static-page-five-grid{max-width:900px;margin:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 16px}.static-page-five-grid figure{position:relative;margin:-18px;padding:10px;background:#fff;border-radius:22px;box-shadow:0 14px 30px #24332f2b;transition:transform .25s ease,box-shadow .25s ease;animation:staticPageFiveFloat 5s ease-in-out infinite}.static-page-five-grid figure:nth-child(1){--tilt:-7deg;z-index:4}.static-page-five-grid figure:nth-child(2){--tilt:6deg;z-index:3}.static-page-five-grid figure:nth-child(3){--tilt:5deg;z-index:2}.static-page-five-grid figure:nth-child(4){--tilt:-8deg;z-index:3}.static-page-five-grid figure:hover{transform:translateY(-14px) rotate(0deg)!important;z-index:10}.static-page-five-grid img{display:block;width:100%;height:330px;object-fit:cover;border-radius:15px}.static-page-five-next{display:block;margin:28px auto 0;border:0;border-radius:999px;padding:13px 32px;background:#24332f;color:#fff;font-size:17px;font-weight:800;cursor:pointer}.site-home-icon{position:fixed;top:20px;left:24px;z-index:50;width:48px;height:48px;border-radius:14px;background:#ed9275;color:#24332f;text-decoration:none;display:grid;place-items:center;font-size:28px;font-weight:800;box-shadow:0 8px 18px #24332f25}.page-number-label{position:fixed;bottom:8px;left:50%;transform:translateX(-50%);z-index:50;border-top:1px solid #24332f55;padding:5px 22px 0;color:#24332f99;font-size:11px;letter-spacing:.08em}@media(max-width:700px){.static-page-five{padding:18px 12px}.static-page-five h1{font-size:32px}.static-page-five-grid{gap:0 8px}.static-page-five-grid figure{margin:-10px;padding:6px}.static-page-five-grid img{height:190px;border-radius:10px}}';
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

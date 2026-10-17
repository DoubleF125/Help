(function () {
  var page = new URLSearchParams(location.search).get('page');
  if (page === '6') {
    document.addEventListener('DOMContentLoaded', function () { document.body.replaceChildren(); });
    return;
  }
  if (page !== '5') return;
  var css = document.createElement('style');
  css.textContent = '.static-page-five{min-height:100vh;padding:28px 24px;background:linear-gradient(145deg,#fffaf4,#edf5f1);text-align:center;box-sizing:border-box}.static-page-five h1{font:italic clamp(30px,6vw,58px) Georgia,serif;color:#24332f;margin:0 0 24px}.static-page-five-grid{max-width:900px;margin:auto;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 16px}.static-page-five-grid figure{position:relative;margin:-18px;padding:10px;background:#fff;border-radius:22px;box-shadow:0 14px 30px #24332f2b}.static-page-five-grid figure:nth-child(1){transform:rotate(-7deg);z-index:4}.static-page-five-grid figure:nth-child(2){transform:rotate(6deg);z-index:3}.static-page-five-grid figure:nth-child(3){transform:rotate(5deg);z-index:2}.static-page-five-grid figure:nth-child(4){transform:rotate(-8deg);z-index:3}.static-page-five-grid img{display:block;width:100%;height:330px;object-fit:cover;border-radius:15px}.static-page-five-next{display:block;margin:28px auto 0;border:0;border-radius:999px;padding:13px 32px;background:#24332f;color:#fff;font-size:17px;font-weight:800;cursor:pointer}@media(max-width:700px){.static-page-five{padding:18px 12px}.static-page-five h1{font-size:32px}.static-page-five-grid{gap:0 8px}.static-page-five-grid figure{margin:-10px;padding:6px;border-radius:15px}.static-page-five-grid img{height:190px;border-radius:10px}}';
  document.head.appendChild(css);
  document.addEventListener('DOMContentLoaded', function () {
    var main = document.createElement('main');
    main.className = 'static-page-five';
    main.innerHTML = '<h1>A little sky, a little joy</h1><div class="static-page-five-grid"><figure><img src="/page5-photo-1.jpg" alt="Clouds with a pink heart"></figure><figure><img src="/page5-photo-5.png" alt="Bare tree branches"></figure><figure><img src="/page5-photo-6.png" alt="Trees in the fog"></figure><figure><img src="/page5-photo-7.png" alt="Pink evening sky"></figure></div><button class="static-page-five-next" onclick="location.href=location.pathname+\'?page=6\'">Next</button>';
    document.body.replaceChildren(main);
  });
}());

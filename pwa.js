(function(){
  if('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(function(){});
  var promptEvent;
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();promptEvent=e;var b=document.getElementById('installApp');if(b)b.hidden=false});
  window.addEventListener('appinstalled',function(){var b=document.getElementById('installApp');if(b)b.remove();promptEvent=null});
  var b=document.createElement('button');b.id='installApp';b.hidden=true;b.textContent='Install app';b.style.cssText='position:fixed;left:18px;bottom:18px;z-index:20;border:0;border-radius:999px;padding:11px 16px;background:#e58f74;color:#fff;font-weight:700;cursor:pointer';document.body.appendChild(b);
  b.onclick=async function(){if(!promptEvent)return;promptEvent.prompt();await promptEvent.userChoice;promptEvent=null;b.hidden=true};
})();

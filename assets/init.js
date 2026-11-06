/* runs in <head> before first paint: apply the saved language, color theme and light/dark mode so pages do not flash.
   Also exposes window.RKTheme(cfg) so the app can re-apply the theme when settings change. */
(function(){
  var KEY='rolling-kelas-v2',H={blue:215,purple:270,orange:28,pink:335},cols=null;
  function metas(){
    if(!cols)return;
    var ms=document.querySelectorAll('meta[name=theme-color]');
    for(var i=0;i<ms.length;i++){var m=ms[i],dk=/dark/.test(m.media||'');
      m.content=cols.mode==='light'?cols.l:cols.mode==='dark'?cols.d:(dk?cols.d:cols.l)}
  }
  function theme(c){
    c=c||{};var h=H[c.theme],mode=c.themeMode==='light'||c.themeMode==='dark'?c.themeMode:'system',root=document.documentElement;
    if(mode==='system')root.removeAttribute('data-theme');else root.setAttribute('data-theme',mode);
    var st=document.getElementById('themeCss');if(!st){st=document.createElement('style');st.id='themeCss';document.head.appendChild(st)}
    if(h==null){st.textContent='';cols={mode:mode,l:'#fdfdf5',d:'#11140f'}}
    else{
      var L='--primary:hsl('+h+' 45% 33%);--pc:hsl('+h+' 80% 86%);--on-pc:hsl('+h+' 90% 8%);--sc:hsl('+h+' 30% 86%);--on-sc:hsl('+h+' 40% 10%);--bg:hsl('+h+' 30% 98%);--s1:hsl('+h+' 25% 95%);--s2:hsl('+h+' 22% 93%);--s3:hsl('+h+' 20% 91%);--s4:hsl('+h+' 18% 88%);--outline:hsl('+h+' 8% 45%);--ov:hsl('+h+' 12% 77%);--onv:hsl('+h+' 10% 27%);--lg1:hsl('+h+' 45% 50%);--lg2:hsl('+h+' 60% 26%);--lgs:hsl('+h+' 80% 86%)';
      var D='--primary:hsl('+h+' 50% 70%);--on-primary:hsl('+h+' 90% 12%);--pc:hsl('+h+' 70% 20%);--on-pc:hsl('+h+' 80% 86%);--sc:hsl('+h+' 18% 26%);--on-sc:hsl('+h+' 30% 86%);--bg:hsl('+h+' 15% 7%);--s1:hsl('+h+' 14% 10%);--s2:hsl('+h+' 13% 12%);--s3:hsl('+h+' 12% 15%);--s4:hsl('+h+' 11% 19%);--outline:hsl('+h+' 8% 56%);--ov:hsl('+h+' 10% 27%);--onv:hsl('+h+' 12% 77%)';
      st.textContent=':root:root{'+L+'}@media(prefers-color-scheme:dark){:root:root:not([data-theme=light]){'+D+'}}:root:root[data-theme=dark]{'+D+'}';
      cols={mode:mode,l:'hsl('+h+' 30% 98%)',d:'hsl('+h+' 15% 7%)'};
    }
    metas();
  }
  window.RKTheme=theme;
  document.addEventListener('DOMContentLoaded',metas);
  var l='id',cfg={};
  try{var d=JSON.parse(localStorage.getItem(KEY)||'{}');cfg=d.cfg||{};if(d.lang==='en'||d.lang==='id')l=d.lang;else{var x=localStorage.getItem('rolling-kelas-lang');if(x==='en'||x==='id')l=x}}catch(e){}
  document.documentElement.lang=l;
  theme(cfg);
})();

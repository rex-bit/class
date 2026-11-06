/* runs in <head> before first paint: apply the saved language so pages do not flash */
(function(){
  var l='id';
  try{var d=JSON.parse(localStorage.getItem('rolling-kelas-v2')||'{}');if(d.lang==='en'||d.lang==='id')l=d.lang;else{var x=localStorage.getItem('rolling-kelas-lang');if(x==='en'||x==='id')l=x}}catch(e){}
  document.documentElement.lang=l;

  var H={blue:215,purple:270,orange:28,pink:335};
  try{var c=(JSON.parse(localStorage.getItem('rolling-kelas-v2')||'{}').cfg||{}).theme,h=H[c];
  if(h!=null){
    var L='--primary:hsl('+h+' 45% 33%);--pc:hsl('+h+' 80% 86%);--on-pc:hsl('+h+' 90% 8%);--sc:hsl('+h+' 30% 86%);--on-sc:hsl('+h+' 40% 10%);--bg:hsl('+h+' 30% 98%);--s1:hsl('+h+' 25% 95%);--s2:hsl('+h+' 22% 93%);--s3:hsl('+h+' 20% 91%);--s4:hsl('+h+' 18% 88%);--outline:hsl('+h+' 8% 45%);--ov:hsl('+h+' 12% 77%);--onv:hsl('+h+' 10% 27%);--lg1:hsl('+h+' 45% 50%);--lg2:hsl('+h+' 60% 26%);--lgs:hsl('+h+' 80% 86%)';
    var D='--primary:hsl('+h+' 50% 70%);--on-primary:hsl('+h+' 90% 12%);--pc:hsl('+h+' 70% 20%);--on-pc:hsl('+h+' 80% 86%);--sc:hsl('+h+' 18% 26%);--on-sc:hsl('+h+' 30% 86%);--bg:hsl('+h+' 15% 7%);--s1:hsl('+h+' 14% 10%);--s2:hsl('+h+' 13% 12%);--s3:hsl('+h+' 12% 15%);--s4:hsl('+h+' 11% 19%);--outline:hsl('+h+' 8% 56%);--ov:hsl('+h+' 10% 27%);--onv:hsl('+h+' 12% 77%)';
    var st=document.createElement('style');st.textContent=':root:root{'+L+'}@media(prefers-color-scheme:dark){:root:root{'+D+'}}';document.head.appendChild(st);
    var m=document.querySelector('meta[name=theme-color]');if(m)m.content='hsl('+h+' 45% 33%)';
  }}catch(e){}
})();

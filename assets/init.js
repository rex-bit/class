/* runs in <head> before first paint: apply the saved language so pages do not flash */
(function(){
  var l='id';
  try{var d=JSON.parse(localStorage.getItem('rolling-kelas-v2')||'{}');if(d.lang==='en'||d.lang==='id')l=d.lang;else{var x=localStorage.getItem('rolling-kelas-lang');if(x==='en'||x==='id')l=x}}catch(e){}
  document.documentElement.lang=l;
})();

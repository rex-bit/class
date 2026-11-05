/* Rolling Kelas info pages: shared behaviour (language, mobile menu, toast, helpers). No network requests. */
(function(){
  var SITE=window.SITE=Object.assign({name:'Rolling Kelas',owner:'Rex-bit',repo:'',email:'',reportEndpoint:''},window.SITE_CONFIG||{});
  var root=document.documentElement,KEY='rolling-kelas-v2';
  var RK=window.RK={SITE:SITE,
    lang:function(){return root.lang==='en'?'en':'id'},
    /* pick the right language from a {en,id} object (or return a plain string unchanged) */
    tx:function(v,l){if(v==null)return '';if(typeof v==='string')return v;l=l||RK.lang();return v[l]||v.en||v.id||''},
    el:function(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e},
    toast:function(msg,ms){var t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');clearTimeout(RK.toast.t);RK.toast.t=setTimeout(function(){t.classList.remove('show')},ms||4200)}
  };
  function meta(sel,attr,val){var m=document.querySelector(sel);if(m&&val)m.setAttribute(attr,val)}
  function applyLang(l,persist){
    root.lang=l;
    var d=root.dataset;
    if(d['title'+l])document.title=d['title'+l];
    if(d['desc'+l]){meta('meta[name=description]','content',d['desc'+l]);meta('meta[property="og:description"]','content',d['desc'+l])}
    if(d['title'+l])meta('meta[property="og:title"]','content',d['title'+l]);
    var b=document.getElementById('langbtn');if(b){b.textContent=l.toUpperCase();b.setAttribute('aria-label',l==='en'?'Language: English. Switch to Indonesian':'Bahasa: Indonesia. Ganti ke Inggris')}
    if(persist){
      try{localStorage.setItem('rolling-kelas-lang',l);var raw=localStorage.getItem(KEY);if(raw){var o=JSON.parse(raw);o.lang=l;localStorage.setItem(KEY,JSON.stringify(o))}}catch(e){}
    }
    var k=l==='en'?'En':'Id';
    document.querySelectorAll('[data-t-id]').forEach(function(e){e.textContent=e.dataset['t'+k]});
    document.querySelectorAll('[data-ph-id]').forEach(function(e){e.placeholder=e.dataset['ph'+k]});
    document.dispatchEvent(new CustomEvent('langchange',{detail:l}));
  }
  document.addEventListener('DOMContentLoaded',function(){
    applyLang(RK.lang(),false);
    var lb=document.getElementById('langbtn');
    if(lb)lb.addEventListener('click',function(){applyLang(RK.lang()==='en'?'id':'en',true)});
    var mb=document.getElementById('menubtn'),nav=document.getElementById('mainnav');
    if(mb&&nav){
      var close=function(){nav.classList.remove('open');mb.setAttribute('aria-expanded','false')};
      mb.addEventListener('click',function(e){e.stopPropagation();var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o?'true':'false')});
      document.addEventListener('click',function(e){if(!nav.contains(e.target))close()});
      document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
      nav.addEventListener('click',function(e){if(e.target.closest('a'))close()});
    }
    document.querySelectorAll('[data-brand]').forEach(function(n){n.textContent=SITE.name});
  });
})();

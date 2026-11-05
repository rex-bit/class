/* Report a Bug: validates the form and prepares a report. Nothing is sent anywhere unless SITE.reportEndpoint is configured. */
(function(){
  var M={
    en:{req:'This field is required.',min:function(n){return 'Please write at least '+n+' characters.'},max:function(n){return 'Please keep it under '+n+' characters.'},cat:'Please choose a category.',
      fix:'Please fix the highlighted fields.',prepared:'Report prepared. It has NOT been sent anywhere.',copied:'Report copied to clipboard.',copyFail:'Could not copy. Select the text and copy it manually.',
      saved:'Report file downloaded.',sending:'Sending…',sent:'Report sent. Thank you!',sendFail:'Could not send the report. Please copy it and send it manually.',detected:'Browser and device detected.',
      noBackend:'This site has no server to receive reports yet, so nothing was sent or saved. Copy or download the report below and send it to the developer yourself.'},
    id:{req:'Kolom ini wajib diisi.',min:function(n){return 'Tulis minimal '+n+' karakter.'},max:function(n){return 'Maksimal '+n+' karakter.'},cat:'Pilih kategori.',
      fix:'Perbaiki kolom yang ditandai.',prepared:'Laporan sudah disiapkan. Laporan BELUM dikirim ke mana pun.',copied:'Laporan disalin ke clipboard.',copyFail:'Gagal menyalin. Pilih teksnya dan salin secara manual.',
      saved:'File laporan diunduh.',sending:'Mengirim…',sent:'Laporan terkirim. Terima kasih!',sendFail:'Laporan gagal dikirim. Silakan salin dan kirim secara manual.',detected:'Browser dan perangkat terdeteksi.',
      noBackend:'Situs ini belum memiliki server untuk menerima laporan, jadi tidak ada yang terkirim atau tersimpan. Salin atau unduh laporan di bawah, lalu kirim sendiri ke pengembang.'}
  };
  var RULES={title:[5,100],desc:[20,2000],device:[3,120],steps:[10,2000],expected:[5,1000],actual:[5,1000]};
  var LABELS={title:'Bug Title',desc:'Description',cat:'Category',device:'Browser / Device',steps:'Steps to Reproduce',expected:'Expected Result',actual:'Actual Result'};
  var form,touched={};
  function m(){return M[RK.lang()]}
  function val(id){return form.elements[id].value.trim()}
  function check(id){
    var v=val(id),r=RULES[id],t=m();
    if(id==='cat')return v?'':t.cat;
    if(!v)return t.req;
    if(v.length<r[0])return t.min(r[0]);
    if(v.length>r[1])return t.max(r[1]);
    if(!/[\p{L}\p{N}]/u.test(v))return t.req;
    return '';
  }
  function show(id){
    var e=check(id),inp=form.elements[id],box=document.getElementById('e-'+id);
    if(e){inp.setAttribute('aria-invalid','true');box.textContent=e}else{inp.removeAttribute('aria-invalid');box.textContent=''}
    return !e;
  }
  function count(id){var c=document.getElementById('c-'+id);if(c)c.textContent=form.elements[id].value.length+'/'+RULES[id][1]}
  function build(){
    var d=new Date().toISOString();
    return ['Rolling Kelas bug report','Created: '+d,'Page: '+location.origin+location.pathname.replace(/[^/]*$/,'')+'index.html','',
      'Title: '+val('title'),'Category: '+val('cat'),'Browser / Device: '+val('device'),'','Description:',val('desc'),'','Steps to reproduce:',val('steps'),'','Expected result:',val('expected'),'','Actual result:',val('actual')].join('\n');
  }
  function download(txt){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/plain'}));a.download='rolling-kelas-bug-report.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},2000);RK.toast(m().saved)}
  function copy(txt){
    var done=function(){RK.toast(m().copied)},fail=function(){RK.toast(m().copyFail)};
    if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(txt).then(done,fail);
    else{try{var ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();var ok=document.execCommand('copy');ta.remove();ok?done():fail()}catch(e){fail()}}
  }
  function result(txt,sent){
    var box=document.getElementById('result');box.hidden=false;box.textContent='';
    var h=RK.el('h2');h.appendChild(RK.el('span',null,sent?m().sent:m().prepared));box.appendChild(h);
    if(!sent)box.appendChild(RK.el('p',null,m().noBackend));
    var pre=RK.el('pre',null,txt);pre.tabIndex=0;box.appendChild(pre);
    var row=RK.el('div','row');
    var b1=RK.el('button','btn fill',RK.lang()==='en'?'Copy report':'Salin laporan');b1.type='button';b1.onclick=function(){copy(txt)};row.appendChild(b1);
    var b2=RK.el('button','btn tonal',RK.lang()==='en'?'Download .txt':'Unduh .txt');b2.type='button';b2.onclick=function(){download(txt)};row.appendChild(b2);
    var S=RK.SITE;
    if(S.email){var a=RK.el('a','btn tonal',RK.lang()==='en'?'Send by email':'Kirim lewat email');a.href='mailto:'+encodeURIComponent(S.email).replace('%40','@')+'?subject='+encodeURIComponent('[Bug] '+val('title'))+'&body='+encodeURIComponent(txt);row.appendChild(a)}
    if(/^[\w.-]+\/[\w.-]+$/.test(S.repo||'')){var g=RK.el('a','btn tonal',RK.lang()==='en'?'Open GitHub issue':'Buka issue GitHub');g.href='https://github.com/'+S.repo+'/issues/new?title='+encodeURIComponent(val('title'))+'&body='+encodeURIComponent(txt);g.target='_blank';g.rel='noopener';row.appendChild(g)}
    box.appendChild(row);
    box.scrollIntoView({behavior:'smooth',block:'start'});
  }
  function submit(e){
    e.preventDefault();
    var ids=Object.keys(LABELS),bad=null;
    ids.forEach(function(id){touched[id]=true;if(!show(id)&&!bad)bad=id});
    if(bad){form.elements[bad].focus();RK.toast(m().fix);return}
    var txt=build(),S=RK.SITE;
    if(S.reportEndpoint){
      var btn=document.getElementById('submit');btn.disabled=true;RK.toast(m().sending);
      fetch(S.reportEndpoint,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({_subject:'[Bug] '+val('title'),title:val('title'),description:val('desc'),category:val('cat'),device:val('device'),steps:val('steps'),expected:val('expected'),actual:val('actual'),created:new Date().toISOString(),language:RK.lang()})})
        .then(function(r){if(!r.ok)throw new Error(r.status);result(txt,true);RK.toast(m().sent);form.reset();ids.forEach(count)})
        .catch(function(){result(txt,false);RK.toast(m().sendFail)})
        .then(function(){btn.disabled=false});
      return;
    }
    result(txt,false);RK.toast(m().prepared,6000);
  }
  function detect(){
    var ua=navigator.userAgent,b='Browser';
    var mm=ua.match(/(Edg|OPR|Firefox|Chrome|CriOS|FxiOS|Version)\/([\d.]+)/);
    if(mm){var n={Edg:'Edge',OPR:'Opera',CriOS:'Chrome (iOS)',FxiOS:'Firefox (iOS)',Version:/Safari/.test(ua)?'Safari':'Browser'}[mm[1]]||mm[1];b=n+' '+mm[2].split('.')[0]}
    var os=/Android/.test(ua)?'Android':/iPhone|iPad|iPod/.test(ua)?'iOS':/Windows/.test(ua)?'Windows':/Mac OS X/.test(ua)?'macOS':/Linux/.test(ua)?'Linux':'';
    form.elements.device.value=(b+(os?' on '+os:'')+', '+screen.width+'x'+screen.height).slice(0,120);
    show('device');count('device');RK.toast(m().detected);
  }
  document.addEventListener('DOMContentLoaded',function(){
    form=document.getElementById('bugform');if(!form)return;
    form.setAttribute('novalidate','');
    var remote=!!RK.SITE.reportEndpoint;var nl=document.getElementById('note-local'),nr=document.getElementById('note-remote');if(nl)nl.hidden=remote;if(nr)nr.hidden=!remote;
    Object.keys(LABELS).forEach(function(id){
      var el=form.elements[id];
      el.addEventListener('input',function(){count(id);if(touched[id])show(id)});
      el.addEventListener('blur',function(){touched[id]=true;show(id)});
      el.addEventListener('change',function(){if(touched[id])show(id)});
      count(id);
    });
    form.addEventListener('submit',submit);
    form.addEventListener('reset',function(){touched={};setTimeout(function(){Object.keys(LABELS).forEach(function(id){form.elements[id].removeAttribute('aria-invalid');count(id)});document.querySelectorAll('.err').forEach(function(x){x.textContent=''});document.getElementById('result').hidden=true},0)});
    document.getElementById('detect').addEventListener('click',detect);
  });
  document.addEventListener('langchange',function(){if(!form)return;Object.keys(touched).forEach(function(id){if(touched[id])show(id)})});
})();

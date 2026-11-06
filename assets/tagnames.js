/* Tag Names tool: guesses gender for each line and appends (L)/(P). Everything runs in the browser; nothing is sent anywhere. */
(function(){
  var T={
    en:{boys:'Boys (L)',girls:'Girls (P)',unsure:'Uncertain',total:'Names',copied:'Copied to clipboard.',copyFail:'Could not copy. Select the text and copy it manually.',empty:'Paste some names on the left to see the result here.',saved:'File downloaded.',tap:'Tap L/P to correct',loaded:'Sample loaded.'},
    id:{boys:'Laki-laki (L)',girls:'Perempuan (P)',unsure:'Belum pasti',total:'Nama',copied:'Disalin ke clipboard.',copyFail:'Gagal menyalin. Pilih teksnya dan salin manual.',empty:'Tempel beberapa nama di sebelah kiri untuk melihat hasilnya di sini.',saved:'File diunduh.',tap:'Ketuk L/P untuk mengoreksi',loaded:'Contoh dimuat.'}
  };
  var SAMPLE='Budi Santoso\nSiti Aminah\nAndi\nDewi Lestari\nRizky Ramadhan\nNadia\nFajar\nPutri Ayu\nKevin\nSalsa\nHana (L)\nBayu';
  var rows=[],ov={};
  function $(id){return document.getElementById(id)}
  function m(){return T[RK.lang()]}
  function fmt(r){
    var tg=r.g==='M'?'L':'P',f=$('fmt').value;
    return f==='br'?r.name+' ['+tg+']':f==='dash'?r.name+' - '+tg:r.name+' ('+tg+')';
  }
  function parse(){
    var strip=$('strip').checked;
    rows=$('src').value.split('\n').map(function(l){return RK_classify(l,strip)}).filter(Boolean);
    rows.forEach(function(r){var k=r.name.toLowerCase();if(ov[k]){r.g=ov[k];r.u=false}});
  }
  function RK_classify(l,strip){return window.RKG.classify(l,strip)}
  function textOut(){return rows.map(fmt).join('\n')}
  function render(){
    parse();
    var list=$('rows');list.textContent='';
    var b=rows.filter(function(r){return r.g==='M'}).length,g=rows.length-b,u=rows.filter(function(r){return r.u}).length;
    $('c-total').textContent=rows.length;$('c-m').textContent=b;$('c-f').textContent=g;$('c-u').textContent=u;
    $('copy').disabled=$('dl').disabled=!rows.length;
    if(!rows.length){list.appendChild(RK.el('div','empty',m().empty));$('out').value='';return}
    rows.forEach(function(r){
      var li=RK.el('div','trow');
      li.appendChild(RK.el('span','tname',r.name));
      var btn=RK.el('button','gbtn '+(r.g==='M'?'m':'f')+(r.u?' u':''),(r.g==='M'?'L':'P')+(r.u?'?':''));
      btn.type='button';btn.title=m().tap;btn.setAttribute('aria-label',r.name+': '+(r.g==='M'?'L':'P')+'. '+m().tap);
      btn.onclick=function(){ov[r.name.toLowerCase()]=r.g==='M'?'F':'M';render()};
      li.appendChild(btn);list.appendChild(li);
    });
    $('out').value=textOut();
  }
  function copy(){
    var txt=$('out').value,ok=function(){RK.toast(m().copied)},no=function(){RK.toast(m().copyFail)};
    if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(txt).then(ok,no);
    else{try{$('out').select();document.execCommand('copy')?ok():no()}catch(e){no()}}
  }
  document.addEventListener('DOMContentLoaded',function(){
    ['src','fmt','strip'].forEach(function(id){$(id).addEventListener(id==='src'?'input':'change',function(){if(id==='src')ov=ov;render()})});
    $('copy').onclick=copy;
    $('dl').onclick=function(){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([$('out').value+'\n'],{type:'text/plain'}));a.download='daftar-nama-LP.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},2000);RK.toast(m().saved)};
    $('sample').onclick=function(){$('src').value=SAMPLE;ov={};render();RK.toast(m().loaded)};
    $('clear').onclick=function(){$('src').value='';ov={};render();$('src').focus()};
    render();
  });
  document.addEventListener('langchange',render);
})();

/* renders window.ROADMAP (data/roadmap.js) as a three-column board with progress */
(function(){
  var ST=[
    {k:'planned',en:'Planned',id:'Direncanakan'},
    {k:'progress',en:'In Progress',id:'Sedang Dikerjakan'},
    {k:'done',en:'Completed',id:'Selesai'}
  ];
  var active='all';
  function lab(s){return RK.lang()==='en'?s.en:s.id}
  function track(it){
    var w=RK.el('div','track');
    var stage={planned:0,progress:1,done:2}[it.status];
    var segs=[0,1,2];
    segs.forEach(function(i){
      var b=RK.el('i',i<stage||it.status==='done'?'on':'');
      if(i===stage&&it.status==='progress'){b.className='half';b.style.setProperty('--p',(typeof it.progress==='number'?Math.max(0,Math.min(100,it.progress)):50)+'%')}
      w.appendChild(b);
    });
    var s=ST.filter(function(x){return x.k===it.status})[0];
    var tx=RK.el('span',null,lab(s));
    if(it.status==='progress'&&typeof it.progress==='number')tx.textContent+=' · '+it.progress+'%';
    w.appendChild(tx);
    return w;
  }
  function render(){
    var data=(window.ROADMAP||[]).filter(function(i){return i&&ST.some(function(s){return s.k===i.status})});
    var count={};ST.forEach(function(s){count[s.k]=data.filter(function(i){return i.status===s.k}).length});
    var total=data.length,pct=total?Math.round(count.done/total*100):0;
    document.getElementById('st-total').textContent=total;
    ST.forEach(function(s){document.getElementById('st-'+s.k).textContent=count[s.k]});
    document.getElementById('ov-pct').textContent=pct+'%';
    document.getElementById('ov-bar').style.width=pct+'%';
    document.getElementById('ov-bar').parentNode.setAttribute('aria-valuenow',pct);
    var board=document.getElementById('board');board.textContent='';
    ST.forEach(function(s){
      var col=RK.el('section','col');col.dataset.k=s.k;
      if(active!=='all'&&active!==s.k)col.hidden=true;
      var h=RK.el('h2');h.appendChild(RK.el('span','dot '+s.k));h.appendChild(RK.el('span',null,lab(s)));h.appendChild(RK.el('span','cnt',String(count[s.k])));
      col.appendChild(h);
      var items=data.filter(function(i){return i.status===s.k});
      if(!items.length)col.appendChild(RK.el('div','empty',RK.lang()==='en'?'Nothing here yet.':'Belum ada item.'));
      items.forEach(function(it){
        var c=RK.el('article','ritem');
        c.appendChild(RK.el('h3',null,RK.tx(it.title)));
        c.appendChild(RK.el('p',null,RK.tx(it.desc)));
        c.appendChild(track(it));
        var tags=[];if(it.version)tags.push(it.version);(it.tags||[]).forEach(function(t){tags.push(t)});
        if(tags.length){var tg=RK.el('div','rtags');tags.forEach(function(t){tg.appendChild(RK.el('span','chip',t))});c.appendChild(tg)}
        col.appendChild(c);
      });
      board.appendChild(col);
    });
  }
  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.fchip').forEach(function(b){
      b.addEventListener('click',function(){active=b.dataset.f;document.querySelectorAll('.fchip').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});render()});
    });
    render();
  });
  document.addEventListener('langchange',render);
})();

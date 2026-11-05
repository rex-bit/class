/* renders window.CHANGELOG (data/changelog.js) as a timeline */
(function(){
  var GROUPS=['added','improved','fixed','removed'];
  var NAMES={added:{en:'Added',id:'Ditambahkan'},improved:{en:'Improved',id:'Ditingkatkan'},fixed:{en:'Fixed',id:'Diperbaiki'},removed:{en:'Removed',id:'Dihapus'}};
  var filter='all';
  function fmt(d){try{var p=d.split('-');return new Date(Date.UTC(+p[0],+p[1]-1,+p[2])).toLocaleDateString(RK.lang()==='en'?'en-GB':'id-ID',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'})}catch(e){return d}}
  function render(){
    var box=document.getElementById('tl'),data=window.CHANGELOG||[];
    box.textContent='';
    if(!data.length){box.appendChild(RK.el('div','empty',RK.lang()==='en'?'No releases yet.':'Belum ada rilis.'));return}
    var shown=0;
    data.forEach(function(r,idx){
      var gs=GROUPS.filter(function(g){return r[g]&&r[g].length&&(filter==='all'||filter===g)});
      if(!gs.length)return;
      shown++;
      var a=RK.el('article','rel card'+(idx===0?' latest':''));
      var h=RK.el('header');
      h.appendChild(RK.el('span','ver',r.version));
      if(idx===0)h.appendChild(RK.el('span','chip',RK.lang()==='en'?'Latest':'Terbaru'));
      var t=RK.el('time','date',fmt(r.date));t.setAttribute('datetime',r.date);h.appendChild(t);
      a.appendChild(h);
      if(r.title)a.appendChild(RK.el('h3',null,RK.tx(r.title)));
      gs.forEach(function(g){
        var w=RK.el('div','grp');w.appendChild(RK.el('span','tag '+g,RK.tx(NAMES[g])));
        var ul=RK.el('ul');r[g].forEach(function(x){ul.appendChild(RK.el('li',null,RK.tx(x)))});
        w.appendChild(ul);a.appendChild(w);
      });
      box.appendChild(a);
    });
    if(!shown)box.appendChild(RK.el('div','empty',RK.lang()==='en'?'No entries of this type.':'Tidak ada entri untuk jenis ini.'));
  }
  function chips(){
    document.querySelectorAll('.fchip').forEach(function(b){
      b.addEventListener('click',function(){filter=b.dataset.f;document.querySelectorAll('.fchip').forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});render()});
    });
  }
  document.addEventListener('DOMContentLoaded',function(){chips();render()});
  document.addEventListener('langchange',render);
})();

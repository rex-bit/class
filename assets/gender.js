/* Gender guess shared with the app (copied from index.html; keep the two in sync if you edit the name lists). */
const FEM=new Set(('siti dewi ayu nadia putri rani salsa tika vina wulan yuni zahra citra bella fitri gita hana intan alya sri ani ana anisa aisyah aisha amelia anindya annisa aulia azzahra bunga cantika clara dina dinda elsa endang erna fani fara farah fatimah feby gina hani hesti indah indri irma jasmine juwita kartika keisha kirana laila lia lina lisa lestari maya melati mega mawar mira nabila nadya naila nia nina nurul novi nova olivia permata puspita rahma rara regina rina rosa safira sari sekar shinta sinta sofia sophia syifa tiara ulfa umi vera widya winda yanti yulia zalfa alika aurel ayunda balqis callista dhea echa ega fira hanifah kayla keysha khansa laras marsya nabilah nayla rahayu raisa safitri sabrina talitha thalia tuti titin wati lilis ratna rahmawati khadijah mutiara natasya amanda angel angelina anggun ariani cahya cindy devi diah desi eva evi fina febi friska hesty jessica jihan karina kezia lusi mei michelle monica selvi shafa tasya vanya vivi yasmin zara zulfa nabilla salma salwa alifa aqila bilqis chelsea dara fadia gladys hafsah ilma kamila lutfiah maharani nafisa qonita rafifah syakira tania vania wafa zulaikha').split(' '));
const MAL=new Set(('budi andi rizky fajar dimas bayu eko hadi iqbal joko kevin lutfi naufal oscar putra raka satria yoga zaki ahmad muhammad muhamad mohamad moh mohammad agus adi aditya afif agung ali alif alvin arif arya azka bagas bagus bambang daffa danu david deni dika dani dodi edo fahri fadli farhan fauzan fikri galih gilang haikal hafiz hasan hendra hendri ikhsan ilham imam indra irfan ivan jaya kenzo krisna lukman malik mario maulana nugroho panji pratama rafi rafael rama reza rendi ridho rio riko rudi ryan saputra surya taufik teguh tomi wahyu wawan yusuf zidan abdul abdullah rizal rian rifki rifky farel fachri fathur bima bintang daniel dennis dhani dzaky evan fadil fariz gading hanif hilmi ibnu ichsan ihsan jordan kholid kurnia leo nizar candra cahyo dwi fauzi gunawan haris heru jefri kemal bryan christian dafa deva fajri hakim hafidz kiki lintang mahendra naufan okta rey rifai samuel satya sultan tegar vito wildan yanuar zulkifli').split(' '));
const MARK=/\s*[\(\[,\-–\/|]\s*(laki-laki|laki|perempuan|cowok|cewek|cowo|cewe|female|male|girl|boy|lk|pr|l|p|m|f|b|g)\s*[\)\]]?\s*$/i;
const MALE_TAGS=['l','lk','laki','laki-laki','cowok','cowo','m','male','boy','b'];
function modelGuess(name){const R=window.RKN;if(!R)return null;
  if(!R.M){R.M=new Set(R.m.split(' '));R.F=new Set(R.f.split(' '))}
  let sc=0;name.toLowerCase().split(/[^a-z]+/).filter(Boolean).forEach((t,i)=>{const w=i?1:2;
    if(R.M.has(t))sc+=3*w;else if(R.F.has(t))sc-=3*w;
    else if(t.length>2)for(const L of[4,3,2])if(t.length>L&&R.s[t.slice(-L)]!=null){sc+=w*R.s[t.slice(-L)]*.6;break}});
  return sc>0?'M':sc<0?'F':null}
function guess(name){
  const toks=name.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  let f=0,m=0;
  toks.forEach((tk,i)=>{
    const w=i===0?2:1;
    if(FEM.has(tk))f+=w;
    else if(MAL.has(tk))m+=(tk==='muhammad'||tk==='ahmad'||tk==='moh'||tk==='muhamad'||tk==='mohamad'||tk==='mohammad')?3:w;
    else if(/(ullah|uddin|wan|syah|putra|pratama|anto|ianto|ndra|man)$/.test(tk))m+=1;
    else if(/(wati|ningsih|yanti|ningrum|sari|iah|ah|ati|ini|ina|ika|ita|ela)$/.test(tk))f+=1;
  });
  return f>m?'F':m>f?'M':modelGuess(name);
}
window.RKG=(function(){
  function classify(line,stripNumber){
    var raw=line.trim();if(!raw)return null;
    var nm=stripNumber?raw.replace(/^\d+\s*[\.\)]\s*/,''):raw;if(!nm)return null;
    var mk=null,m=nm.match(MARK);
    if(m){nm=nm.slice(0,m.index).trim();mk=MALE_TAGS.indexOf(m[1].toLowerCase())>=0?'M':'F'}
    if(!nm)return null;
    var g=mk,u=false,known=!!mk;
    if(!g){var r=guess(nm);if(r)g=r;else{g=/a$/i.test(nm.split(/\s+/)[0])?'F':'M';u=true}}
    return {name:nm,g:g,u:u,marked:known};
  }
  return {guess:guess,classify:classify};
})();

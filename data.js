const CONFIG = { firebase:{ apiKey:'AIzaSyC2g6vs2YfwwB8pf-jQbKVy-ySx1Uqxmdk', authDomain:'schoolbrain-dc9c3.firebaseapp.com', projectId:'schoolbrain-dc9c3', appId:'1:653063981287:web:37401e7bb832eeb6eb7a42' }, sessionKey:'schoolbrain.session', storeKey:'schoolbrain.db.v1' };
const DEMO={login:'school',password:'admin'};
const DAYS=['Mon','Tue','Wed','Thu','Fri'];
const PERIODS=[['09:00','09:50'],['10:00','10:50'],['11:10','12:00'],['13:00','13:50']];
const SUBJECTS=['Maths','English','Science','History'];
const PASS_MARK=55;
const STAFF=[['admin','Marcus Bell','admin',[]],['principal','Dr. Aisha Rahman','principal',[]],['security','Elena Vasquez','security',[]],['t.dube','Thandiwe Dube','teacher',['Science','Maths']],['r.kaur','Ravinder Kaur','teacher',['English','History']],['j.osei','Joseph Osei','teacher',['English','Maths']],['p.lind','Peter Lindqvist','teacher',['History','Science']]];
const ROLES={admin:{label:'Management',timetable:'edit',students:'edit'},principal:{label:'Principal',timetable:'view',students:'view'},security:{label:'Security',timetable:'none',students:'none'},teacher:{label:'Teacher',timetable:'own',students:'none'}};
const FIRST=['Amara','Bilal','Chen','Divya','Elias','Fatima','Gabriel','Hana','Isla','Jonas','Kofi','Lena','Mateo','Nadia','Omar','Priya','Quinn','Rosa','Samir','Tomas','Uma','Viktor','Wren','Yara'];
const LAST=['Okafor','Haddad','Wong','Sharma','Nowak','Diallo','Mendes','Sato'];
const CREDS = {
  admin:{id:'management@school.brain',pass:'admin123',staffKey:'admin',name:'Marcus Bell',role:'admin'},
  principal:{id:'principal@school.brain',pass:'principal123',staffKey:'principal',name:'Dr. Aisha Rahman',role:'principal'},
  security:{id:'security@school.brain',pass:'sec123',staffKey:'security',name:'Elena Vasquez',role:'security'}
};
let LIVE = true;
if(typeof window!=='undefined'&&window.firebase){ try{ window.firebase.initializeApp(CONFIG.firebase); LIVE=true; }catch(e){ console.warn('fb',e&&e.message); LIVE=true; } }
const dbFS = ()=>window.firebase.firestore();
const dbRT = ()=>window.firebase.database();
function stamp(v){ if(!v)return 0; if(typeof v==='number')return v; if(typeof v.toMillis==='function')return v.toMillis(); if(v&&v._seconds) return v._seconds*1000 + (v._nanoseconds||0)/1e6; const p=new Date(v).getTime(); return isNaN(p)?0:p; }
const emailFor=u=>{ const s=String(u||'').trim(); return s.includes('@')?s:s+'@northfield.edu'; };
const demoAccounts = () => STAFF.filter(([, ,r])=>r!=='teacher').map(([k,n,r])=>({key:k,name:n,role:r}));
function buildSeed(){ const staff=STAFF.map(([k,n,r,s])=>({key:k,name:n,role:r,subjects:s})); const classes=[1,2,3,4,5].map(n=>({id:n+'a',name:'Year '+n+'A',room:'R'+(100+n)})); const slots=[]; classes.forEach(c=>DAYS.forEach((d,di)=>PERIODS.forEach((_,pi)=>{ const sub=SUBJECTS[(di+pi+c.id.charCodeAt(0))%SUBJECTS.length]; const t=staff.find(s=>s.subjects.includes(sub)).key; slots.push({id:c.id+'__'+d+'__'+pi,classId:c.id,className:c.name,day:d,period:pi,subject:sub,teacherKey:t,room:c.room}); }))); const students=Array.from({length:30},(_,i)=>{ const cls=classes[i%classes.length]; const marks={}; SUBJECTS.forEach((sub,j)=>{marks[sub]=40+((i*7+j*13)%55)}); const v=Object.values(marks); const avg=Math.round(v.reduce((a,b)=>a+b,0)/v.length); const att=68+((i*11)%32); return {id:'s'+(i+1),name:FIRST[i]+' '+LAST[i%LAST.length],classId:cls.id,className:cls.name,marks,average:avg,attendance:att,lowMarks:avg<PASS_MARK||v.filter(m=>m<45).length>=2,lowAttendance:att<75}; }); return {staff,classes,slots,students,threads:{ mgmtsec:{id:'mgmtsec',title:'Management - Security',members:['admin','security'],observers:['principal'],messages:[]} }}; }
function readStore(){ const s=localStorage.getItem(CONFIG.storeKey); if(s){ try{ const p=JSON.parse(s); if(p.staff&&p.students&&p.students.length) return p; }catch(e){} } const f=buildSeed(); localStorage.setItem(CONFIG.storeKey,JSON.stringify(f)); return f; }
const chatSubs = {};
const store = {
  mode:'sim', session:null,
  async start(){ this.session = JSON.parse(localStorage.getItem(CONFIG.sessionKey)||'null'); if(this.session) this.session.caps = ROLES[this.session.role]||ROLES.teacher; else this.session=null; return this.session; },
  async signIn(id,p,role){ if(!id||!p) throw new Error('Enter ID and password'); let c=null; if(role && CREDS[role]) c=CREDS[role]; if(!c){ for(const k in CREDS){ if(CREDS[k].id===id && CREDS[k].pass===p){ c=CREDS[k]; break; } } } if(!c){ throw new Error('Wrong ID or password'); } return this.setSession({staffKey:c.staffKey,name:c.name,role:c.role}); },
  async setSession(pr){ this.session={...pr,caps:ROLES[pr.role]||ROLES.teacher,at:Date.now()}; localStorage.setItem(CONFIG.sessionKey,JSON.stringify(this.session)); return this.session; },
  signOut(){ this.session=null; localStorage.removeItem(CONFIG.sessionKey); },
  async staff(){ return readStore().staff; },
  async classes(){ return readStore().classes; },
  async slots(id){ const st=readStore(); return st.slots.filter(s=>s.classId===id); },
  async mySlots(){ const me=this.session&&this.session.staffKey; const st=readStore(); return me?st.slots.filter(s=>s.teacherKey===me):[]; },
  async students(){ const st=readStore(); return st.students; },
  async saveStudent(s){ const st=readStore(); const i=st.students.findIndex(x=>x.id===s.id); if(i>=0) st.students[i]=s; localStorage.setItem(CONFIG.storeKey,JSON.stringify(st)); },
  async threads(){ const me=this.session&&this.session.staffKey; if(!me) return []; const t=readStore().threads; return Object.values(t).filter(x=>x.members.includes(me)||x.observers.includes(me)).map(x=>({id:x.id,title:x.title,canPost:x.members.includes(me)})); },
  async messages(tid){ const st=readStore(); const t=st.threads[tid]; return t?t.messages.slice():[]; },
  async send(tid,txt){ const b=String(txt||'').trim(); if(!b) throw new Error('Type a message'); const me=this.session.staffKey; if(!me) throw new Error('Not signed in'); const now=Date.now(); const st=readStore(); if(st.threads[tid]){ st.threads[tid].messages.push({from:me,text:b,createdAt:now}); localStorage.setItem(CONFIG.storeKey,JSON.stringify(st)); } if(typeof window!=='undefined'&&window.firebase&&window.firebase.database){ try{ const ref=dbRT().ref('chats/'+tid+'/messages'); await ref.push({from:me,text:b,createdAt:firebase.database.ServerValue.TIMESTAMP}); }catch(e){ console.warn('rt send',e.message); } } },
  subscribeChat(tid, cb){ if(typeof window==='undefined'||!window.firebase||!window.firebase.database) return ()=>{}; const key='chats/'+tid+'/messages'; if(chatSubs[key]) return chatSubs[key].unsub; const ref=dbRT().ref(key).orderByChild('createdAt'); const handler=snap=>{ const v=snap.val()||{}; cb({id:snap.key, from:v.from||'', text:v.text||'', createdAt:v.createdAt||Date.now()}); }; ref.on('child_added', handler); const unsub=()=>{ ref.off('child_added',handler); delete chatSubs[key]; }; chatSubs[key]={ref,unsub}; return unsub; },
  unsubscribeChat(tid){ const key='chats/'+tid+'/messages'; if(chatSubs[key]){ chatSubs[key].unsub(); } },
  async seed(){ const f=buildSeed(); localStorage.setItem(CONFIG.storeKey,JSON.stringify(f)); }
};
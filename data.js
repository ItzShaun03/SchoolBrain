const CONFIG = {
  firebase: {
    apiKey: "AIzaSyC2g6vs2YfwwB8pf-jQbKVy-ySx1Uqxmdk",
    authDomain: "schoolbrain-dc9c3.firebaseapp.com",
    projectId: "schoolbrain-dc9c3",
    appId: "1:653063981287:web:37401e7bb832eeb6eb7a42"
  },
  sessionKey: "schoolbrain.session",
  storeKey: "schoolbrain.db.v1"
};
const DEMO = { login: "school", password: "admin" };
const DAYS = ["Mon","Tue","Wed","Thu","Fri"];
const PERIODS = [["09:00","09:50"],["10:00","10:50"],["11:10","12:00"],["13:00","13:50"]];
const SUBJECTS = ["Maths","English","Science","History"];
const PASS_MARK = 55;
const STAFF = [
  ["admin","Marcus Bell","admin",[]],
  ["principal","Dr. Aisha Rahman","principal",[]],
  ["security","Elena Vasquez","security",[]],
  ["t.dube","Thandiwe Dube","teacher",["Science","Maths"]],
  ["r.kaur","Ravinder Kaur","teacher",["English","History"]],
  ["j.osei","Joseph Osei","teacher",["English","Maths"]],
  ["p.lind","Peter Lindqvist","teacher",["History","Science"]]
];
const ROLES = {
  admin:{label:"Management",timetable:"edit",students:"edit"},
  principal:{label:"Principal",timetable:"view",students:"view"},
  security:{label:"Security",timetable:"none",students:"none"},
  teacher:{label:"Teacher",timetable:"own",students:"none"}
};
const FIRST = ["Amara","Bilal","Chen","Divya","Elias","Fatima","Gabriel","Hana","Isla","Jonas","Kofi","Lena","Mateo","Nadia","Omar","Priya","Quinn","Rosa","Samir","Tomas","Uma","Viktor","Wren","Yara"];
const LAST = ["Okafor","Haddad","Wong","Sharma","Nowak","Diallo","Mendes","Sato"];
let LIVE = false;
if (typeof window !== "undefined" && window.firebase) {
  try { window.firebase.initializeApp(CONFIG.firebase); LIVE = false; } catch (e) { console.error("fb", e.message); }
}
const db = () => window.firebase.firestore();
function stamp(v){ if(!v)return 0; if(typeof v==="number")return v; if(typeof v.toMillis==="function")return v.toMillis(); const p=new Date(v).getTime(); return isNaN(p)?0:p; }
const emailFor = u => { const s=String(u||"").trim(); return s.includes("@")?s:s+"@northfield.edu"; };
const demoAccounts = () => STAFF.filter(([, ,r])=>r!=="teacher").map(([k,n,r])=>({key:k,name:n,role:r}));
function buildSeed(){
  const staff=STAFF.map(([k,n,r,s])=>({key:k,name:n,role:r,subjects:s}));
  const classes=[1,2,3,4,5].map(n=>({id:n+"a",name:"Year "+n+"A",room:"R"+(100+n)}));
  const slots=[]; classes.forEach(c=>DAYS.forEach((d,di)=>PERIODS.forEach((_,pi)=>{
    const sub=SUBJECTS[(di+pi+c.id.charCodeAt(0))%SUBJECTS.length];
    const t=staff.find(s=>s.subjects.includes(sub)).key;
    slots.push({id:c.id+"__"+d+"__"+pi,classId:c.id,className:c.name,day:d,period:pi,subject:sub,teacherKey:t,room:c.room});
  })));
  const students=Array.from({length:30},(_,i)=>{
    const cls=classes[i%classes.length]; const marks={}; SUBJECTS.forEach((sub,j)=>{marks[sub]=40+((i*7+j*13)%55)});
    const v=Object.values(marks); const avg=Math.round(v.reduce((a,b)=>a+b,0)/v.length); const att=68+((i*11)%32);
    return {id:"s"+(i+1),name:FIRST[i]+" "+LAST[i%LAST.length],classId:cls.id,className:cls.name,marks,average:avg,attendance:att,lowMarks:avg<PASS_MARK||v.filter(m=>m<45).length>=2,lowAttendance:att<75};
  });
  return {staff,classes,slots,students,threads:{
    mgmtsec:{id:"mgmtsec",title:"Management - Security",members:["admin","security"],observers:["principal"],messages:[]}
  }};
}
function readStore(){
  const s=localStorage.getItem(CONFIG.storeKey); if(s){try{const p=JSON.parse(s); if(p.staff)return p}catch(e){}}
  const f=buildSeed(); localStorage.setItem(CONFIG.storeKey,JSON.stringify(f)); return f;
}
const store={
  mode: LIVE?"live":"demo", session:null,
  async start(){ this.session=JSON.parse(localStorage.getItem(CONFIG.sessionKey)||"null"); if(this.session)this.session.caps=ROLES[this.session.role]||ROLES.teacher; return this.session; },
  async signIn(u,p,role){
    if(!u||!p) throw new Error("Enter login and password");
    if(!LIVE){ const st=STAFF.find(([, ,sr])=>sr===role); if(u!==DEMO.login||p!==DEMO.password||!st) throw new Error("Use school/admin"); const [k,n,sr]=st; return this.setSession({staffKey:k,name:n,role:sr}); }
    const auth=window.firebase.auth(); const cred=await auth.signInWithEmailAndPassword(emailFor(u),p);
    const staffKey=emailFor(u).split("@")[0].toLowerCase();
    let staff=(await db().collection("staff").doc(staffKey).get()).data();
    if(!staff){ await auth.signOut(); throw new Error("Not in staff directory."); }
    await db().collection("users").doc(cred.user.uid).set({staffKey,role:staff.role});
    return this.setSession({staffKey,name:staff.name,role:staff.role});
  },
  async setSession(pr){ this.session={...pr,caps:ROLES[pr.role]||ROLES.teacher,at:Date.now()}; localStorage.setItem(CONFIG.sessionKey,JSON.stringify(this.session)); return this.session; },
  signOut(){ this.session=null; localStorage.removeItem(CONFIG.sessionKey); },
  async staff(){ if(!LIVE)return readStore().staff; const s=await db().collection("staff").get(); return s.docs.map(d=>({id:d.id,...d.data()})); },
  async classes(){ if(!LIVE)return readStore().classes; const s=await db().collection("classes").get(); return s.docs.map(d=>({id:d.id,...d.data()})); },
  async slots(id){ if(!LIVE)return readStore().slots.filter(s=>s.classId===id); const s=await db().collection("classes").doc(id).collection("slots").get(); return s.docs.map(d=>({id:d.id,...d.data()})); },
  async students(){ if(!LIVE)return readStore().students; const s=await db().collection("students").get(); return s.docs.map(d=>({id:d.id,...d.data()})); },
  async threads(){ const me=this.session.staffKey; if(!LIVE){ const t=readStore().threads; return Object.values(t).filter(x=>x.members.includes(me)||x.observers.includes(me)).map(x=>({id:x.id,title:x.title,canPost:x.members.includes(me)})); }
    const s=await db().collection("conversations").get(); return s.docs.map(d=>({id:d.id,...d.data()})).filter(t=>(t.participants||[]).includes(me)||t.members?.includes(me)||t.observers?.includes(me)).map(t=>({id:t.id||t.conversationId,title:t.title,canPost:(t.members||[]).includes(me)}));
  },
  async messages(tid){ if(!LIVE)return readStore().threads[tid].messages.slice(); const s=await db().collection("conversations").doc(tid).collection("messages").get(); return s.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>stamp(a.createdAt)-stamp(b.createdAt)).map(m=>({id:m.id,from:m.from,text:m.text,createdAt:m.createdAt})); },
  async send(tid,txt){ const b=String(txt||"").trim(); if(!b) throw new Error("Type a message"); if(!LIVE){ const st=readStore(); st.threads[tid].messages.push({from:this.session.staffKey,text:b,createdAt:Date.now()}); localStorage.setItem(CONFIG.storeKey,JSON.stringify(st)); return; }
    await db().collection("conversations").doc(tid).collection("messages").add({from:this.session.staffKey,text:b,createdAt:window.firebase.firestore.FieldValue.serverTimestamp()});
  },
  async setTeacher(c,s,t){ if(!LIVE){ const st=readStore(); const sl=st.slots.find(x=>x.id===s); if(sl)sl.teacherKey=t; localStorage.setItem(CONFIG.storeKey,JSON.stringify(st)); return; } await db().collection("classes").doc(c).collection("slots").doc(s).update({teacherKey:t}); },
  async seed(){ const data=buildSeed(); if(!LIVE){ localStorage.setItem(CONFIG.storeKey,JSON.stringify(data)); return; } const batch=db().batch(); const f=window.firebase.firestore.FieldValue.serverTimestamp(); data.staff.forEach(s=>batch.set(db().collection("staff").doc(s.key),s)); data.classes.forEach(c=>batch.set(db().collection("classes").doc(c.id),{name:c.name,room:c.room})); data.slots.forEach(s=>batch.set(db().collection("classes").doc(s.classId).collection("slots").doc(s.id),s)); data.students.forEach(s=>batch.set(db().collection("students").doc(s.id),s)); Object.values(data.threads).forEach(t=>{ batch.set(db().collection("conversations").doc(t.id),{title:t.title,members:t.members,observers:t.observers,participants:[...new Set([...t.members,...t.observers])]} ); t.messages.forEach(m=>batch.set(db().collection("conversations").doc(t.id).collection("messages").doc(),{...m,createdAt:f})); }); await batch.commit(); }
};
// School Brain: screens and events.

const state = {
  tab: "chat",
  classId: null,
  slotId: null,
  threadId: null,
  staff: [],
  classes: [],
  slots: [],
  students: [],
  threads: [],
  messages: [],
  filter: "all",
  editing: null,
};

const el = (id) => document.getElementById(id);
const esc = (v) => String(v == null ? "" : v).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const clock = (v) => {
  const ms = stamp(v);
  if (!ms) return "";
  const d = new Date(ms);
  return `${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
};

const nameOf = (key) => (state.staff.find((s) => s.key === key || s.id === key) || {}).name || key || "unknown";

function tabsFor(caps) {
  const tabs = [["chat", "Chat"]];
  if (caps.timetable !== "none") tabs.push(["timetable", "Timetable"]);
  if (caps.students !== "none") tabs.push(["students", "Students"]);
  return tabs;
}

async function boot() {
  el("app").innerHTML = `<p class="pad">Loading...</p>`;
  if (await store.start()) render();
  else renderLogin();
}

function renderLogin(message) {
  el("app").innerHTML = `
    <div class="signin">
      <h1>School Brain</h1>
      <p class="muted">Sign in to continue.</p>
      <form id="signin" class="stack">
        <label>${store.mode === "demo" ? "Login id" : "Email"}<input name="user" autocomplete="username" placeholder="${esc(store.mode === "demo" ? DEMO.login : "name@northfield.edu")}" required></label>
        <label>Password<input name="pass" type="password" autocomplete="current-password" required></label>
        ${store.mode === "demo" ? `<label>Sign in as<select name="role">${demoAccounts().map((s) =>
          `<option value="${s.role}">${ROLES[s.role].label}</option>`).join("")}</select></label>` : ""}
        <button class="primary" type="submit">Sign in</button>
      </form>
      ${message ? `<p class="error">${esc(message)}</p>` : ""}
      <p class="muted">Mode: <b>${store.mode}</b>${store.mode === "demo" ? ` &middot; id <b>${DEMO.login}</b> &middot; password <b>admin</b>` : ""}</p>
      <div class="demo-list">
        ${demoAccounts().map((s) => `<button data-demo="${s.role}">Sign in as ${ROLES[s.role].label}</button>`).join("")}
      </div>
    </div>`;
}

function render() {
  const me = store.session;
  if (!tabsFor(me.caps).some(([id]) => id === state.tab)) state.tab = "chat";
  el("app").innerHTML = `
    <header>
      <b>School Brain</b>
      <nav>${tabsFor(me.caps).map(([id, label]) =>
        `<button data-tab="${id}"${id === state.tab ? " aria-current=page" : ""}>${label}</button>`).join("")}</nav>
      <span class="grow"></span>
      <span class="muted">${esc(me.name)} &middot; ${me.caps.label}</span>
      ${me.caps.students === "edit" ? `<button data-seed>Seed data</button>` : ""}
      <button data-out>Sign out</button>
    </header>
    <main id="view"><p class="pad muted">Loading...</p></main>`;
  renderTab();
}

async function loadBase() {
  state.staff = await store.staff();
  state.classes = await store.classes();
  if (!state.classId && state.classes.length) state.classId = state.classes[0].id;
}

async function refresh() {
  await renderTab();
}

// Loads shared data, paints the active tab, and turns any backend failure into
// a readable line instead of a blank screen.
async function renderTab() {
  const view = el("view");
  if (!view) return;
  try {
    await loadBase();
    if (state.tab === "chat") await renderChat(view);
    else if (state.tab === "timetable") await renderTimetable(view);
    else await renderStudents(view);
  } catch (err) {
    view.innerHTML = `<p class="pad error">${esc(hint(err))}</p>`;
  }
}

const AUTH_ERRORS = {
  "auth/configuration-not-found": "Email/Password sign-in is not switched on. Firebase console > Authentication > Sign-in method > Email/Password > Enable.",
  "auth/operation-not-allowed": "Email/Password sign-in is not switched on. Firebase console > Authentication > Sign-in method > Email/Password > Enable.",
  "auth/invalid-credential": "Wrong email or password.",
  "auth/invalid-email": "That email address is not valid.",
  "auth/user-disabled": "That account has been disabled.",
  "auth/too-many-requests": "Too many attempts. Wait a minute and try again.",
  "auth/network-request-failed": "Cannot reach Firebase. Check your connection.",
  "auth/unauthorized-domain": "This domain is not allowed to sign in. Add it in Firebase console > Authentication > Settings > Authorised domains.",
};

const hint = (err) => {
  if (AUTH_ERRORS[err.code]) return AUTH_ERRORS[err.code];
  if (err.code === "unavailable" || err.code === "failed-precondition") {
    return "Cannot reach the database. Enable the Data Connect API for this project, then reload.";
  }
  if (err.code === "permission-denied") return "The database refused that request. Check your role, then reload.";
  if (err.code === "unauthenticated") return "Your session expired. Sign in again.";
  // Data Connect puts @check messages and CEL failures in the message, and
  // they are already written for a person to read.
  const detail = String(err.message || "");
  if (detail) return detail;
  return String(err);
};

async function renderChat(view) {
  state.threads = await store.threads();
  if (!state.threads.some((t) => t.id === state.threadId)) state.threadId = (state.threads[0] || {}).id || null;
  state.messages = state.threadId ? await store.messages(state.threadId) : [];
  const me = store.session.staffKey;
  const thread = state.threads.find((t) => t.id === state.threadId);

  view.innerHTML = `
    <div class="split">
      <aside class="side">
        <h2>Threads</h2>
        ${state.threads.map((t) => `<button class="thread${t.id === state.threadId ? " on" : ""}" data-thread="${esc(t.id)}">
            ${esc(t.title)} <span class="muted">${t.canPost ? "member" : "observing"}</span>
          </button>`).join("") || `<p class="pad muted">No threads for your account.</p>`}
      </aside>
      <section class="col">
        ${thread ? `
          <h2>${esc(thread.title)}${thread.canPost ? "" : " &middot; read only"}</h2>
          <div class="messages">
            ${state.messages.map((m) => `<div class="msg${m.from === me ? " mine" : ""}">
              <small>${esc(nameOf(m.from))} &middot; ${clock(m.createdAt)}</small><div>${esc(m.text)}</div>
            </div>`).join("") || `<p class="pad muted">No messages yet.</p>`}
          </div>
          ${thread.canPost
            ? `<form id="composer" class="row"><input name="text" placeholder="Write a message" required><button class="primary" type="submit">Send</button></form>`
            : `<p class="pad muted">You are an observer on this thread.</p>`}`
          : `<p class="pad muted">Pick a thread.</p>`}
      </section>
    </div>`;

  const box = view.querySelector(".messages");
  if (box) box.scrollTop = box.scrollHeight;
}

async function renderTimetable(view) {
  const caps = store.session.caps;
  state.slots = caps.timetable === "own" ? await store.mySlots() : await store.slots(state.classId);

  view.innerHTML = `
    <div class="row">
      <h2 class="grow">${caps.timetable === "own" ? "My lessons" : "Timetable"}</h2>
      ${caps.timetable === "edit" ? `<label>Class<select data-class>${state.classes.map((c) =>
        `<option value="${esc(c.id)}"${c.id === state.classId ? " selected" : ""}>${esc(c.name)}</option>`).join("")}</select></label>` : ""}
    </div>
    ${caps.timetable === "own" ? ownTimetable() : gridTimetable(caps)}`;
}

function ownTimetable() {
  const rows = DAYS.map((day) => {
    const lessons = state.slots.filter((s) => s.day === day).sort((a, b) => a.period - b.period);
    return `<tr><th>${day}</th><td>${lessons.map((s) => `${PERIODS[s.period][0]} ${esc(s.subject)} (${esc(s.room)})`).join(" &middot; ") || "&mdash;"}</td></tr>`;
  }).join("");
  return `<table class="grid"><tbody>${rows}</tbody></table>`;
}

function gridTimetable(caps) {
  const cell = (day, period) => {
    const slot = state.slots.find((s) => s.day === day && s.period === period);
    if (!slot) return `<td class="muted">&mdash;</td>`;
    const body = `<b>${esc(slot.subject)}</b><br><small>${esc(nameOf(slot.teacherKey))}</small><br><small class="muted">${esc(slot.room)}</small>`;
    return caps.timetable === "edit"
      ? `<td><button class="cell${state.slotId === slot.id ? " on" : ""}" data-slot="${esc(slot.id)}">${body}</button></td>`
      : `<td>${body}</td>`;
  };
  const rows = PERIODS.map(([, [start, end]], pi) =>
    `<tr><th>${start}&ndash;${end}</th>${DAYS.map((day) => cell(day, pi)).join("")}</tr>`).join("");

  const chosen = state.slots.find((s) => s.id === state.slotId);
  const eligible = chosen ? state.staff.filter((s) => (s.subjects || []).includes(chosen.subject)) : [];
  return `
    <table class="grid">
      <thead><tr><th>Time</th>${DAYS.map((d) => `<th>${d}</th>`).join("")}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${chosen ? `<form id="assign" class="row">
        <b class="grow">${esc(chosen.day)} ${PERIODS[chosen.period][0]} &middot; ${esc(chosen.subject)}</b>
        <label>Teacher<select name="teacher">${eligible.map((s) =>
          `<option value="${esc(s.key)}"${s.key === chosen.teacherKey ? " selected" : ""}>${esc(s.name)}</option>`).join("")}</select></label>
        <button class="primary" type="submit">Save</button>
        <button type="button" data-clear>Cancel</button>
      </form>` : `<p class="pad muted">Select a lesson to assign a teacher.</p>`}`;
}

async function renderStudents(view) {
  state.students = await store.students();
  const canEdit = store.session.caps.students === "edit";
  const rows = state.students.filter((s) =>
    state.filter === "marks" ? s.lowMarks : state.filter === "attendance" ? s.lowAttendance : true);

  view.innerHTML = `
    <div class="row">
      <h2 class="grow">Students <span class="muted">${state.students.filter((s) => s.lowMarks || s.lowAttendance).length} flagged</span></h2>
      <label>Show<select data-filter>
        <option value="all"${state.filter === "all" ? " selected" : ""}>All</option>
        <option value="marks"${state.filter === "marks" ? " selected" : ""}>Low marks</option>
        <option value="attendance"${state.filter === "attendance" ? " selected" : ""}>Low attendance</option>
      </select></label>
    </div>
    <table>
      <thead><tr><th>Student</th><th>Class</th>${SUBJECTS.map((s) => `<th>${s}</th>`).join("")}
        <th>Average</th><th>Attendance</th><th>Status</th></tr></thead>
      <tbody>${rows.map((s) => `<tr>
        <td>${canEdit ? `<button class="link" data-edit="${esc(s.id)}">${esc(s.name)}</button>` : esc(s.name)}</td>
        <td>${esc(s.className || s.classId)}</td>
        ${SUBJECTS.map((subject) => {
          const mark = s.marks ? s.marks[subject] : null;
          return `<td${mark != null && mark < 45 ? ' class="bad"' : ""}>${mark == null ? "&mdash;" : mark}</td>`;
        }).join("")}
        <td${s.lowMarks ? ' class="bad"' : ""}>${s.average == null ? "&mdash;" : s.average}</td>
        <td${s.lowAttendance ? ' class="bad"' : ""}>${s.attendance == null ? "&mdash;" : `${s.attendance}%`}</td>
        <td>${[s.lowMarks && "Low marks", s.lowAttendance && "Low attendance"].filter(Boolean).join(", ") || "OK"}</td>
      </tr>`).join("") || `<tr><td colspan="9" class="pad muted">No students match.</td></tr>`}</tbody>
    </table>
    ${state.editing ? editForm(state.students.find((s) => s.id === state.editing)) : ""}`;
}

function editForm(student) {
  return `<form id="edit" class="stack pad card">
    <b>Edit ${esc(student.name)}</b>
    <div class="row wrap">
      ${SUBJECTS.map((subject) =>
        `<label>${subject}<input name="${subject}" type="number" min="0" max="100" value="${student.marks[subject]}"></label>`).join("")}
      <label>Attendance<input name="attendance" type="number" min="0" max="100" value="${student.attendance}"></label>
    </div>
    <div class="row"><button class="primary" type="submit">Save</button><button type="button" data-cancel>Cancel</button></div>
  </form>`;
}

function applyStudentEdit(data) {
  const student = state.students.find((s) => s.id === state.editing);
  const marks = {};
  SUBJECTS.forEach((subject) => { marks[subject] = Number(data.get(subject)); });
  const attendance = Number(data.get("attendance"));
  const values = Object.values(marks);
  student.marks = marks;
  student.attendance = attendance;
  student.average = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  student.lowMarks = student.average < PASS_MARK || values.filter((m) => m < 45).length >= 2;
  student.lowAttendance = attendance < 75;
  state.editing = null;
  return student;
}

document.addEventListener("click", async (event) => {
  const target = event.target.closest("button, [data-student]");
  if (!target) return;
  const data = target.dataset;

  if (data.demo) {
    const form = el("signin");
    form.querySelector('[name="user"]').value = DEMO.login;
    form.querySelector('[name="pass"]').value = DEMO.password;
    form.querySelector('[name="role"]').value = data.demo;
    form.requestSubmit();
  } else if (target.hasAttribute("data-out")) {
    store.signOut();
    state.classId = state.threadId = null;
    renderLogin();
  } else if (data.tab) {
    state.tab = data.tab;
    state.editing = null;
    render();
  } else if (data.thread) {
    state.threadId = data.thread;
    renderTab();
  } else if (data.slot) {
    state.slotId = data.slot;
    renderTab();
  } else if (data.edit) {
    state.editing = data.edit;
    renderTab();
  } else if (target.hasAttribute("data-clear") || target.hasAttribute("data-cancel")) {
    state.slotId = state.editing = null;
    renderTab();
  } else if (target.hasAttribute("data-seed")) {
    // Bulk writes go through the Admin SDK, not the browser.
    await alert("Seeding is an admin task. Run:\n\n  node scripts/seed.mjs");
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target;
  event.preventDefault();
  const data = new FormData(form);
  try {
    if (form.id === "signin") {
      await store.signIn(data.get("user"), data.get("pass"), data.get("role"));
      state.classId = state.threadId = null;
      render();
    } else if (form.id === "composer") {
      await store.send(state.threadId, data.get("text"));
      form.querySelector('[name="text"]').value = "";
      await refresh();
    } else if (form.id === "assign") {
      await store.setTeacher(state.classId, state.slotId, data.get("teacher"));
      await refresh();
    } else if (form.id === "edit") {
      await store.saveStudent(applyStudentEdit(data));
      await refresh();
    }
  } catch (err) {
    if (form.id === "signin") renderLogin(hint(err));
    else alert(hint(err));
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-class]")) {
    state.classId = event.target.value;
    state.slotId = null;
    renderTab();
  } else if (event.target.matches("[data-filter]")) {
    state.filter = event.target.value;
    renderTab();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  boot();
  // refresh disabled in simple mode;
});
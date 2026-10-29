// ================= Data =================
const WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "it", "for", "not", "on", "with", "he",
  "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
  "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about",
  "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know",
  "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than",
  "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two",
  "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give",
  "day", "most", "us", "water", "house", "school", "family", "friend", "learn", "world", "small", "great",
  "place", "number", "letter", "mother", "father", "answer", "found", "study", "still", "should", "light",
  "keyboard", "finger", "speed", "practice", "simple", "market", "computer", "window", "garden", "music",
  "travel", "river", "mountain", "happy", "quick", "brown", "jump", "lazy", "power", "money", "story"
];

const PARAGRAPHS = [
  "Typing is a skill that improves with regular practice. Keep your fingers on the home row, look at the screen instead of the keyboard, and let each finger handle its own keys. Speed will come naturally once accuracy becomes a habit.",
  "The quick brown fox jumps over the lazy dog. This famous sentence contains every letter of the English alphabet, which is why it is often used to test typewriters, keyboards, and fonts all around the world.",
  "India is a land of many languages, cultures, and traditions. From the snowy mountains of the north to the sunny beaches of the south, every region has its own food, festivals, and way of life that makes the country unique.",
  "Computers have changed the way we work, learn, and communicate. Today, almost every job requires some basic knowledge of typing, email, and the internet. A good typing speed can save you hours of time every single week.",
  "Reading books is one of the best habits a person can develop. Books open the door to new ideas, places, and people. They improve our vocabulary, sharpen our thinking, and help us understand the world in a better way.",
  "Health is the greatest wealth. Eating fresh food, drinking enough water, sleeping well, and exercising daily can keep the body strong and the mind calm. Small healthy choices made every day lead to big results over time.",
  "Success does not come overnight. It is the result of hard work, patience, and learning from mistakes. Set clear goals, plan your steps, and keep moving forward even when things feel difficult or slow.",
  "Technology is growing faster than ever before. Artificial intelligence, mobile phones, and cloud computing are now part of daily life. Learning to use these tools well can open many new opportunities for students and workers."
];

const ALPHA_DRILLS = [
  "asdf", "jkl;", "fjfj", "dkdk", "slsl", "a;a;", "sad", "lad", "fall", "ask", "flask", "dash",
  "gh", "hag", "glad", "half", "qwer", "uiop", "were", "quit", "type", "pour", "rope", "tire",
  "zxcv", "nm,.", "zone", "cave", "move", "bank", "mix", "van", "abc", "xyz", "fgh", "rtyu", "vbnm"
];

// ================= Finger map =================
const FINGERS = {
  lp: "Left Pinky", lr: "Left Ring", lm: "Left Middle", li: "Left Index",
  ri: "Right Index", rm: "Right Middle", rr: "Right Ring", rp: "Right Pinky", th: "Thumb"
};

// Keyboard layout: [label, keyId, finger, widthClass]
const LAYOUT = [
  [["`","`","lp"],["1","1","lp"],["2","2","lr"],["3","3","lm"],["4","4","li"],["5","5","li"],["6","6","ri"],
   ["7","7","ri"],["8","8","rm"],["9","9","rr"],["0","0","rp"],["-","-","rp"],["=","=","rp"],["Back","Backspace","rp","w2"]],
  [["Tab","Tab","lp","w15"],["Q","q","lp"],["W","w","lr"],["E","e","lm"],["R","r","li"],["T","t","li"],["Y","y","ri"],
   ["U","u","ri"],["I","i","rm"],["O","o","rr"],["P","p","rp"],["[","[","rp"],["]","]","rp"],["\\","\\","rp","w15"]],
  [["Caps","CapsLock","lp","w175"],["A","a","lp"],["S","s","lr"],["D","d","lm"],["F","f","li"],["G","g","li"],["H","h","ri"],
   ["J","j","ri"],["K","k","rm"],["L","l","rr"],[";",";","rp"],["'","'","rp"],["Enter","Enter","rp","w225"]],
  [["Shift","ShiftLeft","lp","w225"],["Z","z","lp"],["X","x","lr"],["C","c","lm"],["V","v","li"],["B","b","li"],["N","n","ri"],
   ["M","m","ri"],[",",",","rm"],[".",".","rr"],["/","/","rp"],["Shift","ShiftRight","rp","w225"]],
  [["Space"," ","th","space"]]
];

const SHIFT_MAP = {
  "~":"`","!":"1","@":"2","#":"3","$":"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",
  "_":"-","+":"=","{":"[","}":"]","|":"\\",":":";","\"":"'","<":",",">":".","?":"/"
};

const KEY_FINGER = {};
const KEY_LABEL = {};
LAYOUT.flat().forEach(([label, id, finger]) => { KEY_FINGER[id] = finger; KEY_LABEL[id] = label; });

// Base key -> character produced with Shift
const SHIFT_OF = {};
Object.entries(SHIFT_MAP).forEach(([shifted, base]) => { SHIFT_OF[base] = shifted; });
"abcdefghijklmnopqrstuvwxyz".split("").forEach((c) => { SHIFT_OF[c] = c.toUpperCase(); });

// For a character, return { key, finger, shift } where shift is "ShiftLeft"/"ShiftRight"/null
function keyInfo(ch) {
  let key = ch;
  let needShift = false;
  if (ch >= "A" && ch <= "Z") { key = ch.toLowerCase(); needShift = true; }
  else if (SHIFT_MAP[ch]) { key = SHIFT_MAP[ch]; needShift = true; }
  const finger = KEY_FINGER[key] || null;
  let shift = null;
  if (needShift && finger) {
    // Use the shift key on the opposite hand
    shift = finger.startsWith("l") ? "ShiftRight" : "ShiftLeft";
  }
  return { key, finger, shift };
}

function describeKey(ch) {
  if (ch === " ") return "Space";
  return ch;
}

function fingerText(ch) {
  const info = keyInfo(ch);
  if (!info.finger) return "any finger";
  let text = FINGERS[info.finger];
  if (ch === " ") text = "Thumb (Space bar)";
  if (info.shift) text += ` + ${info.shift === "ShiftLeft" ? "Left" : "Right"} Pinky (Shift)`;
  return text;
}

// ================= State =================
const state = {
  name: "",
  lang: "en",
  type: "alphabets",
  minutes: 1,
  text: "",
  pos: 0,
  typed: [],          // true/false per position
  totalKeys: 0,
  correctKeys: 0,
  mistakes: {},       // expected char -> count
  started: false,
  finished: false,
  startTime: 0,
  timerId: null
};

// ================= DOM =================
const $ = (id) => document.getElementById(id);
const screens = { setup: $("setupScreen"), test: $("testScreen"), result: $("resultScreen") };
const textBox = $("textBox");
const mobileInput = $("mobileInput");
let spans = [];      // one span per segment
let segStart = [];   // first key index of each segment
let segEnd = [];     // key index after the last key of each segment
let keySeg = [];     // key index -> segment index

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
}

// ================= Setup screen =================
function setupOptionGroup(groupId, onSelect) {
  const group = $(groupId);
  group.addEventListener("click", (e) => {
    const btn = e.target.closest(".option");
    if (!btn) return;
    group.querySelectorAll(".option").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    onSelect(btn.dataset.value);
  });
}
setupOptionGroup("langOptions", (v) => { state.lang = v; });
setupOptionGroup("typeOptions", (v) => { state.type = v; });
setupOptionGroup("timeOptions", (v) => { state.minutes = Number(v); });

$("setupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("nameInput").value.trim();
  if (!name) { $("nameInput").focus(); return; }
  state.name = name;
  $("userBadge").innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg> ' + escapeHtml(name);
  $("userBadge").classList.remove("hidden");
  startTest();
});

// ================= Text generation =================
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Text is a list of segments: { u: what is shown, k: keys to type }.
// English: one segment per character. Hindi: one segment per akshara with its Kruti Dev keys.
const SPACE_SEG = { u: " ", k: " " };
const charSegments = (str) => [...str].map((c) => ({ u: c, k: c }));

function generateText() {
  const hi = state.lang === "hi";
  let items;
  if (state.type === "paragraph") {
    items = [...(hi ? HINDI.paragraphs : PARAGRAPHS)].sort(() => Math.random() - 0.5).slice(0, 2);
  } else {
    const pool = state.type === "alphabets"
      ? (hi ? HINDI.alpha : ALPHA_DRILLS)
      : (hi ? HINDI.words : WORDS);
    items = [];
    for (let i = 0; i < 60; i++) items.push(rand(pool));
  }
  const out = [];
  items.forEach((item, i) => {
    if (i) out.push(SPACE_SEG);
    out.push(...(hi ? item : charSegments(item)));
  });
  return out;
}

function appendText(segments) {
  if (state.text.length) segments = [SPACE_SEG, ...segments];
  const frag = document.createDocumentFragment();
  segments.forEach((seg) => {
    const span = document.createElement("span");
    span.textContent = seg.u;
    if (seg.u === " ") span.classList.add("space-char");
    const idx = spans.length;
    segStart.push(state.text.length);
    for (const c of seg.k) { state.text += c; keySeg.push(idx); }
    segEnd.push(state.text.length);
    spans.push(span);
    frag.appendChild(span);
  });
  textBox.appendChild(frag);
}

// Color a segment from the keys typed so far
function paintSeg(i) {
  const span = spans[i];
  if (!span) return;
  const start = segStart[i], end = segEnd[i];
  const done = state.typed.slice(start, Math.min(end, state.pos));
  span.classList.remove("correct", "wrong", "current");
  if (state.pos >= end) span.classList.add(done.every(Boolean) ? "correct" : "wrong");
  else if (state.pos >= start) {
    span.classList.add("current");
    if (done.includes(false)) span.classList.add("wrong");
  }
}

// ================= Keyboard rendering =================
const keyEls = {};
function buildKeyboard() {
  const kb = $("keyboard");
  kb.innerHTML = "";
  LAYOUT.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "kb-row";
    row.forEach(([label, id, finger, width]) => {
      const k = document.createElement("div");
      const isCharKey = id.length === 1;
      k.className = `key ${isCharKey ? "f-" + finger : "f-none"} ${width || ""}`;
      if (id === "ShiftLeft" || id === "ShiftRight") k.className = `key f-${finger} ${width}`;
      if (["f", "j"].includes(id)) k.classList.add("home");
      k.textContent = label;
      rowEl.appendChild(k);
      keyEls[id] = k;
    });
    kb.appendChild(rowEl);
  });
}

function highlightNext() {
  document.querySelectorAll(".key.target").forEach((k) => k.classList.remove("target"));
  const ch = state.text[state.pos];
  if (ch === undefined) return;
  const info = keyInfo(ch);
  updateKeyLabels(Boolean(info.shift));
  if (keyEls[info.key]) keyEls[info.key].classList.add("target");
  if (info.shift && keyEls[info.shift]) keyEls[info.shift].classList.add("target");
  $("nextKey").textContent = describeKey(ch);
  const hi = state.lang === "hi" && ch !== " ";
  if (hi) {
    const seg = keySeg[state.pos];
    const keys = state.text.slice(segStart[seg], segEnd[seg]).split("").join(" ");
    $("nextGlyph").textContent = `${glyphFor(ch)}  (${spans[seg].textContent} = ${keys})`;
  }
  $("nextGlyph").classList.toggle("hidden", !hi);
  $("nextFinger").textContent = fingerText(ch);
}

// English: letters follow the case of the next character.
// Hindi: each key shows the Hindi sign it types in Kruti Dev, with the English key in the corner.
function updateKeyLabels(shifted) {
  Object.entries(keyEls).forEach(([id, k]) => {
    if (id.length !== 1 || id === " ") return;
    const ch = shifted && SHIFT_OF[id] ? SHIFT_OF[id] : id;
    if (state.lang === "hi") {
      k.innerHTML = `<small>${escapeHtml(KEY_LABEL[id])}</small><span class="kd">${glyphFor(ch)}</span>`;
    } else {
      k.textContent = /^[a-z]$/.test(id) ? ch : KEY_LABEL[id];
    }
  });
}

function flashKey(ch, ok) {
  const info = keyInfo(ch);
  const el = keyEls[ch === "\b" ? "Backspace" : info.key];
  if (!el) return;
  el.classList.add(ok ? "pressed" : "pressed-wrong");
  setTimeout(() => el.classList.remove("pressed", "pressed-wrong"), 150);
}

// ================= Test logic =================
function startTest() {
  clearInterval(state.timerId);
  Object.assign(state, {
    text: "", pos: 0, typed: [], totalKeys: 0, correctKeys: 0, mistakes: {},
    started: false, finished: false, startTime: 0, timerId: null
  });
  spans = []; segStart = []; segEnd = []; keySeg = [];
  textBox.innerHTML = "";
  textBox.classList.toggle("hindi", state.lang === "hi");
  textBox.scrollTop = 0;
  appendText(generateText());
  paintSeg(0);

  $("timeLeft").textContent = formatTime(state.minutes * 60);
  $("liveWpm").textContent = "0";
  $("liveAcc").textContent = "100%";
  $("liveErr").textContent = "0";
  $("startHint").classList.remove("hidden");

  showScreen("test");
  highlightNext();
  focusInput();
}

function focusInput() {
  mobileInput.value = "";
  mobileInput.focus({ preventScroll: true });
}

function beginTimer() {
  state.started = true;
  state.startTime = Date.now();
  $("startHint").classList.add("hidden");
  state.timerId = setInterval(tick, 250);
}

function elapsedSeconds() {
  return state.started ? (Date.now() - state.startTime) / 1000 : 0;
}

function tick() {
  const total = state.minutes * 60;
  const left = Math.max(0, total - elapsedSeconds());
  $("timeLeft").textContent = formatTime(Math.ceil(left));
  updateLiveStats();
  if (left <= 0) finishTest();
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function calcStats() {
  const secs = Math.max(elapsedSeconds(), 1);
  const mins = secs / 60;
  const correctChars = state.typed.filter(Boolean).length;
  const wrongChars = state.typed.length - correctChars;
  const gross = (state.typed.length / 5) / mins;
  const net = Math.max(0, gross - wrongChars / mins);
  const accuracy = state.totalKeys ? (state.correctKeys / state.totalKeys) * 100 : 100;
  return {
    secs, correctChars, wrongChars,
    gross: Math.round(gross),
    net: Math.round(net),
    accuracy: Math.round(accuracy)
  };
}

function updateLiveStats() {
  const s = calcStats();
  $("liveWpm").textContent = s.net;
  $("liveAcc").textContent = s.accuracy + "%";
  $("liveErr").textContent = state.totalKeys - state.correctKeys;
}

function handleChar(ch) {
  if (state.finished) return;
  if (!state.started) beginTimer();

  const expected = state.text[state.pos];
  const ok = ch === expected;
  state.totalKeys++;
  if (ok) state.correctKeys++;
  else state.mistakes[expected] = (state.mistakes[expected] || 0) + 1;

  state.typed[state.pos] = ok;
  flashKey(ch, ok);

  state.pos++;
  if (state.pos > state.text.length - 80) appendText(generateText());
  paintSeg(keySeg[state.pos - 1]);
  paintSeg(keySeg[state.pos]);
  scrollToCurrent();
  highlightNext();
  updateLiveStats();
}

function handleBackspace() {
  if (state.finished || state.pos === 0) return;
  state.pos--;
  state.typed.pop();
  paintSeg(keySeg[state.pos + 1]);
  paintSeg(keySeg[state.pos]);
  flashKey("\b", true);
  scrollToCurrent();
  highlightNext();
  updateLiveStats();
}

function scrollToCurrent() {
  const span = spans[keySeg[state.pos]];
  const lineH = parseFloat(getComputedStyle(textBox).lineHeight);
  // keep current line as the 2nd visible line
  textBox.scrollTop = Math.max(0, span.offsetTop - lineH);
}

// Physical keyboard
document.addEventListener("keydown", (e) => {
  if (!screens.test.classList.contains("active") || state.finished) return;
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  if (e.key === "Backspace") {
    e.preventDefault();
    handleBackspace();
  } else if (e.key.length === 1) {
    e.preventDefault();
    handleChar(e.key);
  }
});

// Mobile / virtual keyboards (keydown key is often "Unidentified")
mobileInput.addEventListener("input", (e) => {
  const val = mobileInput.value;
  if (e.inputType === "deleteContentBackward") handleBackspace();
  else for (const ch of val) handleChar(ch);
  mobileInput.value = "";
});
// Prevent double-handling on desktop: keydown already handled it
mobileInput.addEventListener("keydown", (e) => {
  if (e.key.length === 1 || e.key === "Backspace") e.preventDefault();
});

textBox.addEventListener("click", focusInput);
$("restartBtn").addEventListener("click", startTest);
$("finishBtn").addEventListener("click", () => { if (state.started) finishTest(); });

// ================= Result =================
function finishTest() {
  if (state.finished) return;
  state.finished = true;
  clearInterval(state.timerId);
  const s = calcStats();

  $("resultTitle").textContent = `Well done, ${state.name}!`;
  const typeName = { alphabets: "Alphabets", words: "Random Words", paragraph: "Paragraph" }[state.type];
  const langName = state.lang === "hi" ? "Hindi" : "English";
  state.result = { ...s, langName, typeName };
  $("resultMeta").textContent = `${langName} • ${typeName} test • ${state.minutes} minute${state.minutes > 1 ? "s" : ""}`;

  $("resWpm").textContent = s.net;
  $("resGross").textContent = s.gross;
  $("resAcc").textContent = s.accuracy + "%";
  $("resCorrect").textContent = s.correctChars;
  $("resWrong").textContent = s.wrongChars;
  $("resKeys").textContent = state.totalKeys;
  $("resTime").textContent = formatTime(Math.round(s.secs));
  document.querySelector(".wpm-circle").style.setProperty("--pct", Math.min(100, (s.net / 80) * 100) + "%");

  renderLevel(s);
  renderWeakKeys();
  renderTips(s);
  showScreen("result");
}

function renderLevel(s) {
  let level, msg;
  if (s.net < 20) { level = "Beginner"; msg = "You are just getting started. Focus on using the correct finger and accuracy rather than speed."; }
  else if (s.net < 35) { level = "Average"; msg = "Good start! With 15-20 minutes of daily practice you can reach 40+ WPM."; }
  else if (s.net < 50) { level = "Good"; msg = "Great job! You are fast enough for everyday office work."; }
  else if (s.net < 70) { level = "Fast"; msg = "Excellent speed! Now practice punctuation and numbers."; }
  else { level = "Expert"; msg = "Outstanding! You are typing at a professional level."; }
  $("levelBox").innerHTML = `<b>Level: ${level}</b> — ${msg}`;
  state.result.level = level;
}

function renderWeakKeys() {
  const box = $("weakKeys");
  const entries = Object.entries(state.mistakes).sort((a, b) => b[1] - a[1]).slice(0, 8);
  if (!entries.length) {
    box.innerHTML = `<p class="no-errors"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg> No mistakes! You typed every key correctly.</p>`;
    return;
  }
  box.innerHTML = entries.map(([ch, count]) => {
    const info = keyInfo(ch);
    const label = ch === " " ? "␣" : ch;
    const row = rowHint(info.key);
    const hi = state.lang === "hi" && ch !== " ";
    return `
      <div class="weak-key">
        <div class="key f-${info.finger || "none"}">${hi ? `<span class="kd">${glyphFor(ch) || escapeHtml(label)}</span>` : escapeHtml(label)}</div>
        <div class="info">
          <b>${hi ? "Key: " : ""}${escapeHtml(describeKey(ch))}</b> — ${count} mistake${count > 1 ? "s" : ""}<br>
          Use: <b>${fingerText(ch)}</b><br>
          <span style="color:#6b7280">${row}</span>
        </div>
      </div>`;
  }).join("");
}

// Explain how to reach the key from the home row
function rowHint(key) {
  const home = { lp: "A", lr: "S", lm: "D", li: "F", ri: "J", rm: "K", rr: "L", rp: ";" };
  const finger = KEY_FINGER[key];
  if (!finger) return "";
  if (finger === "th") return "Keep both thumbs resting on the Space bar.";
  const homeKey = home[finger];
  if ("asdfghjkl;'".includes(key)) {
    if (key === "g") return "Stretch your index finger slightly right from F.";
    if (key === "h") return "Stretch your index finger slightly left from J.";
    if (key === "'") return "Stretch your pinky slightly right from ;.";
    return `Home row key — keep your finger resting on ${homeKey}.`;
  }
  if ("qwertyuiop[]\\".includes(key)) return `Reach up from ${homeKey} to the top row, then return to ${homeKey}.`;
  if ("zxcvbnm,./".includes(key)) return `Reach down from ${homeKey} to the bottom row, then return to ${homeKey}.`;
  return `Reach up from ${homeKey} to the number row, then return to ${homeKey}.`;
}

function renderTips(s) {
  const tips = [];
  if (s.accuracy < 90) tips.push("Your accuracy is below 90% — slow down. Be accurate first, speed will follow.");
  if (s.accuracy >= 95 && s.net < 40) tips.push("Your accuracy is good — now try to push your speed a little.");
  tips.push("Keep your fingers on the home row: left hand on A S D F, right hand on J K L ;. Feel the small bumps on F and J without looking.");
  tips.push("Don't look at the keyboard — keep your eyes on the screen (touch typing).");
  tips.push("Return your finger to the home row after every key press.");
  if (state.lang === "hi") {
    tips.push("In Hindi typing, the ि matra is typed first (F key), before the letter — e.g. कि = F then D.");
    tips.push("Half letters use Shift — e.g. Shift + D gives क्, Shift + L gives स्.");
    tips.push("The full stop । is Shift + A, and the comma is the ] key.");
    tips.push("The reph (र् on top, as in धर्म) is typed with Shift + Z after the letter and its matra — धर्म = / K E Shift+Z.");
  } else {
    tips.push("For capital letters, use the Shift key on the opposite hand (e.g. Right Shift for 'A').");
  }
  tips.push("Press the Space bar with your thumb and don't rest your wrists on the keyboard.");

  const weak = Object.entries(state.mistakes).sort((a, b) => b[1] - a[1]);
  if (weak.length) {
    const fingerCount = {};
    weak.forEach(([ch, c]) => {
      const f = keyInfo(ch).finger;
      if (f) fingerCount[f] = (fingerCount[f] || 0) + c;
    });
    const worst = Object.entries(fingerCount).sort((a, b) => b[1] - a[1])[0];
    if (worst) tips.unshift(`Most of your mistakes were on <b>${FINGERS[worst[0]]}</b> keys — practice those keys separately.`);
  }
  if (state.type === "alphabets" && s.accuracy >= 90) tips.push("Nice work on Alphabets — try the 'Random Words' test next.");
  if (state.type === "words" && s.accuracy >= 90) tips.push("Nice work on Words — try the 'Paragraph' test to practice punctuation.");

  $("tipsList").innerHTML = tips.map((t) => `<li>${t}</li>`).join("");
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
}

// ================= Certificate =================
function printCertificate() {
  const r = state.result;
  if (!r) return;
  const now = new Date();
  $("certName").textContent = state.name;
  $("certText").textContent =
    `for successfully completing the ${r.langName} ${r.typeName} typing test of ` +
    `${state.minutes} minute${state.minutes > 1 ? "s" : ""}.`;
  $("certWpm").textContent = r.net;
  $("certAcc").textContent = r.accuracy + "%";
  $("certGross").textContent = r.gross;
  $("certLevel").textContent = r.level;
  $("certDate").textContent = now.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  $("certId").textContent = "TT-" + now.getTime().toString(36).toUpperCase();
  window.print();
}

$("printBtn").addEventListener("click", printCertificate);
$("retryBtn").addEventListener("click", startTest);
$("newTestBtn").addEventListener("click", () => showScreen("setup"));

// ================= Init =================
buildKeyboard();

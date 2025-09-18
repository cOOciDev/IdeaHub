// --- Pure countdown splash (no redirects, no network, no buttons) ---

// Optional: wipe any old service worker that could hijack routing
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then(regs => regs.forEach(r => r.unregister()))
    .catch(() => {});
}

// Static date text in the card
const DEADLINE_TEXT = "۳۱ شهریور ۱۴۰۴";
const deadlineBox = document.getElementById("deadline-box");
if (deadlineBox) deadlineBox.textContent = DEADLINE_TEXT;

// Countdown target (example: 22 Sep 2025, 09:00 Tehran)
const START_AT = new Date("2025-09-22T09:00:00+03:30");

// Persian digits helper
const fa = v => String(v).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);

// Elements (all optional)
const elDays  = document.getElementById("cd-days");
const elHours = document.getElementById("cd-hours");
const elMins  = document.getElementById("cd-mins");
const elSecs  = document.getElementById("cd-secs");

// If you kept the progress bar markup, animate it locally (no relation to any ping)
const bar = document.getElementById("progress-bar");
const txt = document.getElementById("progress-text");
let progress = 0;
function setProgress(p){
  progress = Math.max(0, Math.min(100, p));
  if (bar) bar.style.width = progress + "%";
  if (txt) txt.textContent = fa(Math.round(progress)) + "٪";
}
// Gentle fake fill up to ~97%
setInterval(() => {
  if (progress < 90) setProgress(progress + Math.floor(Math.random()*6) + 2);
  else if (progress < 97) setProgress(progress + 1);
}, 700);

// Countdown tick
function updateCountdown() {
  if (!(START_AT instanceof Date) || isNaN(START_AT)) return;

  const now = new Date();
  const diffMs = START_AT.getTime() - now.getTime();

  const secTotal = Math.max(0, Math.floor(diffMs / 1000));
  const days  = Math.floor(secTotal / 86400);
  const hours = Math.floor((secTotal % 86400) / 3600);
  const mins  = Math.floor((secTotal % 3600) / 60);
  const secs  = secTotal % 60;

  elDays  && (elDays.textContent  = fa(days));
  elHours && (elHours.textContent = fa(hours));
  elMins  && (elMins.textContent  = fa(mins));
  elSecs  && (elSecs.textContent  = fa(secs));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// If there's a manual button in HTML, keep it inert
const manual = document.getElementById("manual-link");
if (manual) {
  manual.setAttribute("aria-disabled", "true");
  manual.addEventListener("click", e => e.preventDefault());
}

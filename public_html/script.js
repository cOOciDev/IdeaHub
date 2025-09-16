// -------------------- تنظیمات --------------------
const TARGET_URL = "/client/";            // مسیر مقصد؛ وقتی آماده شد همین می‌ره
const PING_FILE = "index.html";        // یک فایل مشخص را پینگ کن
const CHECK_INTERVAL_MS = 5000;        // هر چند ثانیه چک شود
const TIMEOUT_MS = 4000;               // تایم‌اوت هر بار چک

const DEADLINE_TEXT = "۳۱ شهریور ۱۴۰۴";
document.getElementById("deadline-box").textContent = DEADLINE_TEXT;

const bar = document.getElementById("progress-bar");
const txt = document.getElementById("progress-text");
const manualLink = document.getElementById("manual-link");
let progress = 0, ready = false;

function setProgress(p){
  progress = Math.max(0, Math.min(100, p));
  bar.style.width = progress + "%";
  txt.textContent = String(progress).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]) + "%";
}

// شبیه‌سازی نرم
setInterval(() => {
  if (ready) return;
  if (progress < 90) setProgress(progress + Math.floor(Math.random()*6)+2);
  else if (progress < 97) setProgress(progress + 1);
}, 700);

async function checkReady(){
  // از یک فایل مشخص با GET استفاده کن و کش را بشکن
  const url = new URL(TARGET_URL + PING_FILE, window.location.origin);
  url.searchParams.set("_", Date.now());

  // AbortController نگه می‌داریم ولی خطای ERR_ABORTED را لاگ نمی‌کنیم
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url.toString(), { method: "GET", cache: "no-store", signal: controller.signal });
    if (res.ok) {
      ready = true;
      setProgress(100);
      manualLink.removeAttribute("aria-disabled");
      manualLink.href = TARGET_URL;
      setTimeout(() => { window.location.href = TARGET_URL; }, 800);
    }
    // اگر 404 بود، فقط صبر کن؛ لاگ اضافه نکن
  } catch (_) {
    // سکوت: لاگ نکن تا کنسول تمیز بماند
  } finally {
    clearTimeout(timer);
  }
}

checkReady();
// setInterval(checkReady, CHECK_INTERVAL_MS);

// لینک دستی
manualLink.addEventListener("click", (e) => {
  if (manualLink.getAttribute("aria-disabled") === "true") e.preventDefault();
});

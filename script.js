// -------------------- تنظیمات --------------------
// مسیر مقصد؛ وقتی آماده شد همین می‌ره
const TARGET_URL = "/client/";
// یک فایل مشخص را پینگ کن (برای تشخیص آماده بودن سایت اصلی)
const PING_FILE = "index.html";
// هر چند ثانیه چک شود
const CHECK_INTERVAL_MS = 5000;
// تایم‌اوت هر بار چک
const TIMEOUT_MS = 4000;

// تاریخ نمایش در کارت (متن ثابت)
const DEADLINE_TEXT = "۳۱ شهریور ۱۴۰۴";
document.getElementById("deadline-box").textContent = DEADLINE_TEXT;

// ▼▼▼ تاریخ/ساعت شروع شمارش معکوس را اینجا تنظیم کن (نمونه: 22 Sep 2025 - 09:00 تهران) ▼▼▼
const START_AT = new Date("2025-09-22T09:00:00+03:30");
// اگر می‌خواهی در لحظه شروع—even if ping not ready—دکمه دستی فعال شود:
const UNLOCK_MANUAL_AT_START = true;

// -------------------- ابزار کمکی --------------------
const faDigits = (v) => String(v).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

// گرفتن المنت‌ها
const bar = document.getElementById("progress-bar");
const txt = document.getElementById("progress-text");
const manualLink = document.getElementById("manual-link");

// المان‌های شمارش‌گر (اگر در HTML نباشند، کد به‌صورت ایمن ادامه می‌دهد)
const elDays  = document.getElementById("cd-days");
const elHours = document.getElementById("cd-hours");
const elMins  = document.getElementById("cd-mins");
const elSecs  = document.getElementById("cd-secs");

let progress = 0, ready = false;

// -------------------- Progress Bar --------------------
function setProgress(p){
  progress = clamp(p, 0, 100);
  if (bar) bar.style.width = progress + "%";
  if (txt) txt.textContent = faDigits(Math.round(progress)) + "٪";
}

// شبیه‌سازی نرم تا نزدیک 97٪ (باقی‌مانده به آماده شدن واقعی وابسته است)
const simTimer = setInterval(() => {
  if (ready) return;
  if (progress < 90) setProgress(progress + Math.floor(Math.random()*6)+2);
  else if (progress < 97) setProgress(progress + 1);
}, 700);

// -------------------- Countdown --------------------
function updateCountdown() {
  if (!START_AT) return;

  const now = new Date();
  let diff = START_AT.getTime() - now.getTime();

  if (diff <= 0) {
    // به شروع رسیدیم
    if (elDays)  elDays.textContent  = faDigits(0);
    if (elHours) elHours.textContent = faDigits(0);
    if (elMins)  elMins.textContent  = faDigits(0);
    if (elSecs)  elSecs.textContent  = faDigits(0);

    // اگر خواستی در لحظه شروع دکمه دستی فعال شود
    if (UNLOCK_MANUAL_AT_START && manualLink) {
      manualLink.setAttribute("aria-disabled", "false");
      manualLink.href = TARGET_URL;
      manualLink.classList.add("btn--active");
    }

    return;
  }

  const sec = Math.floor(diff / 1000);
  const days  = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const mins  = Math.floor((sec % 3600) / 60);
  const secs  = sec % 60;

  if (elDays)  elDays.textContent  = faDigits(days);
  if (elHours) elHours.textContent = faDigits(hours);
  if (elMins)  elMins.textContent  = faDigits(mins);
  if (elSecs)  elSecs.textContent  = faDigits(secs);
}

// شروع و به‌روزرسانی هر ثانیه
updateCountdown();
const cdTimer = setInterval(() => {
  updateCountdown();
  if (new Date() >= START_AT) clearInterval(cdTimer);
}, 1000);

// -------------------- Ping to Ready --------------------
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
      if (manualLink) {
        manualLink.setAttribute("aria-disabled", "false");
        manualLink.href = TARGET_URL;
        manualLink.classList.add("btn--active");
      }
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
setInterval(checkReady, CHECK_INTERVAL_MS);

// لینک دستی
if (manualLink) {
  manualLink.addEventListener("click", (e) => {
    if (manualLink.getAttribute("aria-disabled") === "true") e.preventDefault();
  });
}

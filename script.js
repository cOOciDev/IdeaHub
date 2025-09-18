(function () {
  // remove any old service worker that could be auto-refreshing
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(regs => regs.forEach(r => r.unregister()))
      .catch(() => {});
  }

  // static date text
  const DEADLINE_TEXT = "۳۱ شهریور ۱۴۰۴";
  const db = document.getElementById("deadline-box");
  if (db) db.textContent = DEADLINE_TEXT;

  // countdown target (example: Tehran time)
  const START_AT = new Date("2025-09-22T09:00:00+03:30");
  const fa = v => String(v).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);

  const elD = document.getElementById("cd-days");
  const elH = document.getElementById("cd-hours");
  const elM = document.getElementById("cd-mins");
  const elS = document.getElementById("cd-secs");

  function tick() {
    if (!(START_AT instanceof Date) || isNaN(START_AT)) return;
    const diff = Math.max(0, START_AT - new Date());
    const s = Math.floor(diff / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;

    elD && (elD.textContent = fa(d));
    elH && (elH.textContent = fa(h));
    elM && (elM.textContent = fa(m));
    elS && (elS.textContent = fa(sec));
  }

  tick();
  setInterval(tick, 1000);
})();

import Countdown from '../ui/Countdown'
import { MILESTONES, RESULTS_DATE_ISO } from '../shared/dates.ts'

export default function Landing(){
  return (
    <main>
      <section className="container">
        <div className="card" style={{display:'grid',gridTemplateColumns:'1.3fr 1fr',gap:16,alignItems:'center'}}>
          <div>
            <h1>رویداد ملی سپر نوآوری</h1>
            <p>ایده‌پردازی ملی در حوزه تاب‌آوری، مدیریت بحران، دفاع غیرعامل و فناوری‌های هشدار سریع.</p>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              <a className="btn" href="/submit">ثبت ایده</a>
              <a className="btn outline" href="/committee">اعضا</a>
            </div>
          </div>
          <img src="/hero.jpg" alt="hero" style={{width:'100%',borderRadius:'16px'}}/>
        </div>
      </section>

      <section className="container" id="event-calendar" style={{marginTop:24}}>
        <h2>تقویم رویداد</h2>
        <div className="grid">
          {MILESTONES.map(m => (
            <div className="card" key={m.id}>
              <strong>{m.title}</strong>
              <div style={{marginTop:8,color:'var(--muted)'}}>{m.date}</div>
            </div>
          ))}
        </div>
        <div style={{marginTop:16}}>
          <Countdown target={RESULTS_DATE_ISO}/>
        </div>
      </section>

      <section className="container" id="resources" style={{marginTop:24}}>
        <h2>منابع</h2>
        <div className="card">راهنمای نگارش پروپوزال، فرمت ارسال PDF، نمونه فایل‌ها…</div>
      </section>

      <section className="container" id="contact" style={{marginTop:24}}>
        <h2>ارتباط</h2>
        <div className="card">ایمیل: info@separnoavari.ir — تلفن: 011-XXXX</div>
      </section>
    </main>
  )
}

const TRACKS=[
  { id:1, title:'تاب‌آوری و کاهش ریسک', slug:'resilience', blurb:'آمادگی جامعه و کاهش خطرپذیری' },
  { id:2, title:'فناوری‌های بحران و هشدار', slug:'crisis-tech', blurb:'حسگرها، داده، هوش مصنوعی' },
  { id:3, title:'زیرساخت و دفاع غیرعامل', slug:'passive-defense', blurb:'مقاوم‌سازی و طراحی ایمن' },
]
import { Link } from 'react-router-dom'

export default function TracksPage(){
  return (
    <div className="container">
      <h2>محورهای رویداد</h2>
      <div className="grid">
        {TRACKS.map(t=> (
          <div className="card" key={t.id}>
            <h3>{t.title}</h3>
            <p>{t.blurb}</p>
            <Link className="btn outline" to={`/tracks/${t.slug}`}>جزئیات</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

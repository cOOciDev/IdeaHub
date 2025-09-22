import { Link, NavLink, useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { useState, useEffect } from 'react'

export default function Header(){
  const [theme,setTheme]=useState(()=> localStorage.getItem('theme') || 'dark')
  const [lang,setLang]=useState(()=> localStorage.getItem('lang') || 'fa')
  const nav = useNavigate()

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('dir', lang==='fa'?'rtl':'ltr')
    document.documentElement.setAttribute('lang', lang==='fa'?'fa':'en')
    localStorage.setItem('lang', lang)
  },[theme,lang])

  const scrollTo = (id)=>{
    const el = document.getElementById(id)
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'})
    else nav('/#'+id)
  }

  return (
    <header className={styles.wrap}>
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="logo"/>
          <Link to="/"><strong>سپر نوآوری</strong></Link>
        </div>

        <div className={styles.links}>
          <NavLink to="/submit">ثبت ایده</NavLink>
          <NavLink to="/committee">اعضای هیئت علمی</NavLink>
          <a onClick={()=>scrollTo('event-calendar')}>تقویم رویداد</a>
          <a onClick={()=>scrollTo('resources')}>منابع</a>
          <a onClick={()=>scrollTo('contact')}>ارتباط</a>
          <NavLink to="/tracks">محورها</NavLink>
        </div>

        <div className={styles.ctas}>
          <button className="btn" onClick={()=>nav('/submit')}>+ ارسال ایده</button>
          <button className="btn outline" onClick={()=>setTheme(t=>t==='dark'?'light':'dark')}>
            {theme==='dark'?'☀️ روشن':'🌙 تیره'}
          </button>
          <button className={styles.lang} onClick={()=>setLang(l=>l==='fa'?'en':'fa')}>
            {lang==='fa'?'EN':'FA'}
          </button>
          <button className={styles.menu} onClick={()=>nav('/')} aria-label="menu">☰</button>
        </div>
      </nav>
    </header>
  )
}

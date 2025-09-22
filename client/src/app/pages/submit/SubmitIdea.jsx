import { useState } from 'react'
import { api } from '../../services/api'

export default function SubmitIdea(){
  const [title,setTitle]=useState('')
  const [track,setTrack]=useState('resilience')
  const [file,setFile]=useState(null)
  const [msg,setMsg]=useState('')

  const onSubmit = async (e)=>{
    e.preventDefault()
    try{
      const fd=new FormData()
      fd.append('title',title)
      fd.append('track',track)
      if(file) fd.append('file',file)
      await api.post('/ideas', fd, { headers:{ 'Content-Type':'multipart/form-data' }})
      setMsg('ارسال شد!')
    }catch(err){ setMsg('خطا در ارسال (API را وصل کنید)') }
  }

  return (
    <div className="container">
      <h2>ثبت ایده</h2>
      <form className="card" onSubmit={onSubmit} style={{display:'grid',gap:12}}>
        <label>عنوان ایده</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} required />

        <label>محور</label>
        <select value={track} onChange={e=>setTrack(e.target.value)}>
          <option value="resilience">تاب‌آوری و کاهش ریسک</option>
          <option value="crisis-tech">فناوری‌های بحران و هشدار</option>
          <option value="passive-defense">زیرساخت و دفاع غیرعامل</option>
        </select>

        <label>فایل پیوست (PDF)</label>
        <input type="file" accept="application/pdf" onChange={e=>setFile(e.target.files?.[0]||null)} />

        <button className="btn">ارسال</button>
        {msg && <div>{msg}</div>}
      </form>
    </div>
  )
}

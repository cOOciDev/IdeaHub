import { useState } from 'react'
import { api } from '../../services/api'
export default function SignupPage(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const submit=async(e)=>{e.preventDefault(); try{ await api.post('/auth/signup',{email,password}); alert('ثبت شد'); }catch{ alert('خطا') } }
  return (
    <div className="container">
      <h2>ثبت‌نام</h2>
      <form className="card" onSubmit={submit} style={{display:'grid',gap:12,maxWidth:420}}>
        <label>ایمیل</label><input value={email} onChange={e=>setEmail(e.target.value)} />
        <label>رمز</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn">ثبت‌نام</button>
      </form>
    </div>
  )
}

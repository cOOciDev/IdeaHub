import { useState } from 'react'
import { api } from '../../services/api'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage(){
  const [phone,setPhone]=useState('')
  const [code,setCode]=useState('')
  const [sent,setSent]=useState(false)
  const nav = useNavigate()

  const sendCode = async ()=>{
    try{ await api.post('/auth/sms/send',{ phone }); setSent(true) }
    catch{ alert('ارسال کد ناموفق') }
  }
  const verify = async ()=>{
    try{
      const { data } = await api.post('/auth/sms/verify',{ phone, code })
      localStorage.setItem('token', data.token)
      nav('/account')
    }catch{ alert('کد نادرست') }
  }

  return (
    <div className="container">
      <h2>ورود / ثبت‌نام (SMS)</h2>
      <div className="card" style={{display:'grid',gap:12,maxWidth:420}}>
        <label>شماره موبایل</label>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="09xxxxxxxxx"/>
        {!sent ? <button className="btn" onClick={sendCode}>ارسال کد</button> : (
          <>
            <label>کد یکبار مصرف</label>
            <input value={code} onChange={e=>setCode(e.target.value)} />
            <button className="btn" onClick={verify}>تایید</button>
          </>
        )}
        <small>حساب دارید؟ <Link to="/signup">ثبت‌نام با ایمیل</Link></small>
      </div>
    </div>
  )
}

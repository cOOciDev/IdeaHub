import { useParams } from 'react-router-dom'

export default function TrackDetail(){
  const { slug } = useParams()
  return (
    <div className="container">
      <h2>جزئیات محور</h2>
      <div className="card">در حال حاضر: <code>{slug}</code>. اینجا معیارها، نمونه‌ها و فرمت ارسال قرار می‌گیرد.</div>
    </div>
  )
}

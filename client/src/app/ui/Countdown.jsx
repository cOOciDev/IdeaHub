import { useEffect, useState } from 'react'

export default function Countdown({ target }){
  const [left,setLeft]=useState(()=> Math.max(0, new Date(target)-Date.now()))
  useEffect(()=>{
    const id=setInterval(()=> setLeft(Math.max(0, new Date(target)-Date.now())), 1000)
    return ()=>clearInterval(id)
  },[target])
  const d=Math.floor(left/86400000)
  const h=Math.floor((left%86400000)/3600000)
  const m=Math.floor((left%3600000)/60000)
  const s=Math.floor((left%60000)/1000)
  return <div className="card" style={{textAlign:'center'}}><strong>تا مهلت ارسال:</strong> {d}d {h}h {m}m {s}s</div>
}

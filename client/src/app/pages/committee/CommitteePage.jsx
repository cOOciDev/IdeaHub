import { COMMITTEE } from '../../data/committee.ts'
export default function CommitteePage(){
  return (
    <div className="container">
      <h2>اعضای هیئت علمی</h2>
      <div className="grid">
        {COMMITTEE.map(m=>(
          <div className="card" key={m.id} style={{display:'flex',gap:12,alignItems:'center'}}>
            <img src={m.photo} alt={m.name} width="72" height="72" style={{borderRadius:12,objectFit:'cover'}}/>
            <div>
              <strong>{m.name}</strong>
              <div style={{color:'var(--muted)'}}>{m.role} — {m.affiliation}</div>
              <p style={{marginTop:8}}>{m.shortBio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

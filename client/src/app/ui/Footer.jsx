export default function Footer(){
  return (
    <footer style={{marginTop:40,padding:'24px 0',borderTop:'1px solid rgba(255,255,255,.08)'}}>
      <div className="container" style={{display:'flex',gap:16,justifyContent:'space-between',flexWrap:'wrap'}}>
        <small>© {new Date().getFullYear()} سپر نوآوری</small>
        <small>Built with ❤️</small>
      </div>
    </footer>
  )
}

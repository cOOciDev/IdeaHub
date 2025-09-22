export default function AccountPage(){
  const email = 'user@example.com'
  return (
    <div className="container">
      <h2>حساب کاربری</h2>
      <div className="card">خوش آمدید، {email}</div>
    </div>
  )
}

export default function Login() {
  return (
      <div className="login-box">
          <div className="login">
              <h1 className="login-title">
              Medical Database
              </h1>
              <form className="login-form">
                  <input type="email" placeholder="Email Address" className="login-email" required></input>
                  <input type="password" placeholder="Password" className="login-password" required></input>
                  <button type = "submit" className = "submit-button">Sign In</button>
              </form>
          </div>
    </div>
  )
}

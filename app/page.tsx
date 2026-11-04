/*
Brief:
This is the main file for our application
*/
import Link from "next/link";

export default function Home() {
  return (
      <main className="home-container">
          <nav className="home-navbar">
              <h1 className="home-title">MYTHICorp</h1>
              <div className="home-links">
                  <a href="#about">About</a>
                  <a href="#features">Features</a>
                  <Link href="/login" className="home-login">Login</Link>

              </div>
          </nav>


          <section className="home-main-box">
              <div className="home-main-content">
                  <h2>Welcome to MYTHICorp</h2>
                  <p className="home-description">
                  A secure medical database where accessing your information has never been easier and simple.
                  </p>
              </div>
          </section>

          <section id="about" className="home-about">
              <h2>About MYTHICorp</h2>
              <p>MYTHICorp is focused on an organized and secured platform there is very simple and user-friendly for all to use.</p>

          </section>

          <section id="features" className="home-features">
              <h2>Our Features</h2>
              <div className="home-bottom-features">
                  <div className="home-feature-box">
                      <h3>Secure Authentication</h3>
                  <p>Secure sign in with either Google or Github with Supabase authentication.</p>
                  </div>

                  <div className="home-feature-box">
                  <h3>Database Management</h3>
                  <p>Medical data records stored with encryption and secured.</p>
                  </div>
              </div>
          </section>
      </main>
  );
}

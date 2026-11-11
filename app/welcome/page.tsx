
import Link from "next/link";

export default function Welcome() {
    return (
        <main className="home-container">
            
            <section className="home-main-box">
                <div className="home-main-content">
                    <h2>Welcome to MYTHICorp</h2>
                    <p className="home-description">
                        A secure medical database where accessing your
                        information has never been easier and simpler.
                    </p>
                </div>
            </section>

            <section id="about" className="home-about">
                <h2>About MYTHICorp</h2>
                <p>
                    MYTHICorp is focused on providing an organized,
                    secure, and user-friendly platform for everyone.
                </p>
            </section>

            <section id="features" className="home-features">
                <h2>Our Features</h2>
                <div className="home-bottom-features">
                    <div className="home-feature-box">
                        <h3>Secure Authentication</h3>
                        <p>
                            Secure sign in with either Google or GitHub
                            using Supabase authentication.
                        </p>
                    </div>

                    <div className="home-feature-box">
                        <h3>Database Management</h3>
                        <p>
                            Medical records stored securely with encryption.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

// ======================================
// 2️⃣ src/App.js
// ======================================
import portfolioimg from './portfolioimg.jpg';
function App() {
  return (
    <div className="app">

      <header className="header">
        <div className="header-inner">
          <img
            src={portfolioimg}
            alt="Muhammad Sohail"
            className="profile-img"
          />
          <div className="header-text">
            <h1>Muhammad Sohail</h1>
            <p>Software Engineering Student | Frontend Developer</p>
          </div>
        </div>
      </header>

      <nav className="nav">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I am a Software Engineering student in COMSATS University Islamabad with
          strong knowledge of Java, Python OOP and frontend development. I build
          responsive and user-friendly web applications using React,
          JavaScript, HTML, and CSS.
        </p>
      </section>

      <section id="skills" className="section">
        <h2>Skills</h2>
        <div className="skills">
          <span>Java,Python (OOP)</span>
          <span>JavaScript</span>
          <span>HTML</span>
          <span>CSS</span>
          <span>Frontend Development</span>
          <span>React.js (Basics)</span>
        </div>
      </section>

      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="projects">
          <div className="card">
            <h3>React Portfolio Website</h3>
            <p>Fully responsive portfolio built using React.js</p>
          </div>
          <div className="card">
            <h3>Student Management System</h3>
            <p>Java project implementing OOP and CRUD concepts</p>
          </div>
          <div className="card">
            <h3>JavaScript Mini Applications</h3>
            <p>Frontend mini apps using DOM manipulation</p>
          </div>
        </div>
      </section>

      {/* ✅ CLICKABLE CONTACT SECTION */}
      <section id="contact" className="section">
        <h2>Contact</h2>

        <p>
          Email:{" "}
          <a href="mailto:sohailwazir2004@gmail.com">
            sohailwazir2004@gmail.com
          </a>
        </p>

        <p>
          GitHub:{" "}
          <a
            href="https://github.com/sohailwazir2004"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/sohailwazir2004
          </a>
        </p>

        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/muhammad-sohail-2381592bb"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/muhammad-sohail-2381592bb
          </a>
        </p>
      </section>

      <footer className="footer">
        © 2025 Muhammad Sohail | React Portfolio
      </footer>

    </div>
  );
}

export default App;

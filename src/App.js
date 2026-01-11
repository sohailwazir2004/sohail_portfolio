import { useState } from 'react';
import portfolioimg from './portfolioimg.jpg';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const projects = [
    {
      id: 1,
      title: 'React Portfolio Website',
      description: 'A fully responsive personal portfolio showcasing projects and skills. Built with React with modern UI/UX design including dark mode toggle and smooth animations.',
      technologies: ['React', 'JavaScript', 'CSS3', 'Responsive Design'],
      github: 'https://github.com/sohailwazir2004/my-portfolio',
      demo: '#'
    },
    {
      id: 2,
      title: 'Student Management System',
      description: 'A desktop application built with Java implementing OOP principles and CRUD operations. Features include student registration, grade management, and data persistence.',
      technologies: ['Java', 'OOP', 'CRUD', 'File I/O'],
      github: 'https://github.com/sohailwazir2004',
      demo: null
    },
    {
      id: 3,
      title: 'JavaScript Mini Applications',
      description: 'Collection of interactive web applications demonstrating DOM manipulation, event handling, and vanilla JavaScript. Includes calculator, todo app, and weather widget.',
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'DOM API'],
      github: 'https://github.com/sohailwazir2004',
      demo: '#'
    }
  ];

  const skills = [
    { category: 'Programming Languages', items: ['Java', 'Python', 'JavaScript'] },
    { category: 'Frontend Development', items: ['React.js', 'HTML5', 'CSS3', 'Responsive Design', 'UI/UX Design'] },
    { category: 'Backend & Databases', items: ['SQL', 'MongoDB', 'APIs', 'CRUD Operations', 'File I/O'] },
    { category: 'Tools & Version Control', items: ['Git', 'GitHub', 'VS Code', 'Postman'] },
    { category: 'Core Concepts', items: ['OOP', 'Data Structures', 'DOM Manipulation', 'RESTful APIs'] }
  ];

  const certifications = [
    {
      id: 1,
      title: 'React - The Complete Guide',
      issuer: 'Udemy',
      link: 'https://www.udemy.com',
      year: '2024'
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      issuer: 'Coursera',
      link: 'https://www.coursera.org',
      year: '2024'
    },
    {
      id: 3,
      title: 'Web Development Bootcamp',
      issuer: 'Online Platform',
      link: '#',
      year: '2023'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Full-Stack Development Learner',
      description: 'Completed comprehensive courses in frontend and backend development with hands-on projects'
    },
    {
      id: 2,
      title: 'Open Source Contributor',
      description: 'Active contributor to open-source projects, focusing on frontend development and JavaScript'
    },
    {
      id: 3,
      title: 'Problem Solver',
      description: 'Strong problem-solving skills demonstrated through multiple projects implementing OOP and design patterns'
    }
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      {/* Dark Mode Toggle */}
      <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️' : '🌙'}
      </button>

      <header className="header">
        <div className="header-inner">
          <img
            src={portfolioimg}
            alt="Muhammad Sohail"
            className="profile-img"
          />
          <div className="header-text">
            <h1>Muhammad Sohail</h1>
            <p className="subtitle">Software Engineering Student | Frontend Developer</p>
            <p className="tagline">Crafting responsive web applications with React & JavaScript</p>
          </div>
        </div>
      </header>

      <nav className="nav">
        <a href="#about">About</a>
        <a href="#education">Education</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#certifications">Certifications</a>
        <a href="#achievements">Achievements</a>
        <a href="#contact">Contact</a>
      </nav>

      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I'm a passionate Software Engineering student at COMSATS University Islamabad with strong expertise in Java, Python OOP, and modern web development. I specialize in building responsive and user-friendly web applications using React, JavaScript, HTML, and CSS. I'm committed to writing clean, maintainable code and continuously learning emerging technologies to deliver impactful solutions.
        </p>
      </section>

      <section id="education" className="section">
        <h2>Education</h2>
        <div className="education-item">
          <h3>Bachelor of Science in Software Engineering</h3>
          <p className="university">COMSATS University Islamabad</p>
          <p className="duration">Currently Enrolled</p>
          <p className="details">Focus on full-stack development, OOP principles, and data structures</p>
        </div>
      </section>

      <section id="skills" className="section">
        <h2>Skills</h2>
        <div className="skills-container">
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="skill-group">
              <h3>{skillGroup.category}</h3>
              <div className="skills">
                {skillGroup.items.map((skill, i) => (
                  <span key={i} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="projects">
          {projects.map((project) => (
            <div key={project.id} className="card project-card">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-badge">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  View Code
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="certifications" className="section">
        <h2>Certifications</h2>
        <div className="certifications-grid">
          {certifications.map((cert) => (
            <div key={cert.id} className="certification-card">
              <div className="cert-header">
                <h3>{cert.title}</h3>
                <span className="cert-year">{cert.year}</span>
              </div>
              <p className="cert-issuer">📜 {cert.issuer}</p>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
                View Credential →
              </a>
            </div>
          ))}
        </div>
        <p className="cert-note">📝 Note: Click "View Credential" to see certificate details on the issuer's platform</p>
      </section>

      <section id="achievements" className="section">
        <h2>Achievements & Highlights</h2>
        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card">
              <div className="achievement-icon">⭐</div>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <h2>Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-links">
            <h3>Connect with me:</h3>
            <p>
              📧 Email:{" "}
              <a href="mailto:sohailwazir2004@gmail.com">
                sohailwazir2004@gmail.com
              </a>
            </p>
            <p>
              💻 GitHub:{" "}
              <a
                href="https://github.com/sohailwazir2004"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/sohailwazir2004
              </a>
            </p>
            <p>
              💼 LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/muhammad-sohail-2381592bb"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/muhammad-sohail-2381592bb
              </a>
            </p>
          </div>

          <div className="contact-form-container">
            <h3>Send me a message:</h3>
            <form onSubmit={handleFormSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                  placeholder="Your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                  rows="5"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        © 2025 Muhammad Sohail | React Portfolio
      </footer>

    </div>
  );
}

export default App;

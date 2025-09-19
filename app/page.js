"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
// Import React Icons
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { SiIndeed } from "react-icons/si";

// Pre-generated star data
const generateStars = () => {
  const stars = [];
  for (let i = 0; i < 100; i++) {
    const random = (seed) => {
      const x = Math.sin(i * 1000 + seed) * 10000;
      return parseFloat((x - Math.floor(x)).toFixed(5));
    };

    stars.push({
      id: i,
      size: random(1) * 2.5 + 0.5,
      left: random(2) * 100,
      top: random(3) * 100,
      opacity: random(4) * 0.6 + 0.2,
      duration: Math.floor(random(5) * 3) + 2
    });
  }
  return stars;
};

const STARS = generateStars();

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [activeProject, setActiveProject] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);


  const skills = [
    "JavaScript", "React", "Node.js", "MongoDB",
    "AI Integration", "REST API", "Next.js", "Tailwind CSS",
    "TypeScript", "GraphQL", "AWS", "Python"
  ];

  const projects = [
    {
      id: 1,
      title: "Portfolio Analyzer AI",
      description: "A sophisticated AI tool that uses Grok LLM to comprehensively scan GitHub repositories, developer profiles, and resumes to provide in-depth analysis of portfolio websites. The system generates detailed reports with actionable insights for improvement.",
      longDescription: "This project leverages cutting-edge natural language processing to evaluate technical portfolios. It analyzes code quality, project complexity, design patterns, and overall presentation. The AI provides personalized recommendations for enhancing visibility and impact.",
      tags: ["AI", "LLM", "GitHub API", "NLP", "Next.js", "Tailwind"],
      link: "#",
      image: "/project1.jpg"
    },
    {
      id: 2,
      title: "Petrion Clone",
      description: "A comprehensive payment platform designed for funding personal projects and creative endeavors. Features seamless RazorPay integration for secure transactions and a user-friendly dashboard for project management.",
      longDescription: "This fintech solution enables creators to showcase their projects and receive funding from supporters. It includes features like milestone-based funding, progress tracking, and transparent financial reporting. The platform ensures secure transactions with industry-standard encryption.",
      tags: ["Payment Gateway", "Fintech", "React", "Node.js", "MongoDB", "RazorPay"],
      link: "#",
      image: "/project2.jpg"
    },
    {
      id: 3,
      title: "Spotify Clone",
      description: "A fully functional music player built with vanilla JavaScript that replicates core Spotify features. Includes playlist creation, audio visualization, and a responsive interface that works across devices.",
      longDescription: "This music streaming application features a sleek, dark-themed interface with smooth animations. It includes advanced functionality like audio visualization, playlist management, search, and recommendations. The player supports various audio formats and offers customizable equalizer settings.",
      tags: ["JavaScript", "Web Audio API", "UI/UX", "HTML5", "CSS3"],
      link: "#",
      image: "/project3.jpg"
    }
  ];

  const practiceProjects = [
    {
      id: 4,
      title: "ToDo List App",
      description: "Simple CRUD task manager built with React + LocalStorage for efficient daily task management.",
      tags: ["React", "Hooks", "LocalStorage"]
    },
    {
      id: 5,
      title: "Password Manager",
      description: "Secure password storage with encryption in local browser DB to keep your credentials safe.",
      tags: ["JavaScript", "Crypto", "Security"]
    },
    {
      id: 6,
      title: "Swiggy Clone (Static)",
      description: "Food delivery landing page clone with TailwindCSS, featuring responsive UI design.",
      tags: ["HTML", "Tailwind", "Responsive"]
    },
    {
      id: 7,
      title: "Netflix Clone",
      description: "Streaming service UI clone with movie posters, categories, and hover effects.",
      tags: ["React", "CSS", "UI Design"]
    },
    {
      id: 8,
      title: "Blinktree Clone",
      description: "Link-in-bio tool clone for social media with analytics dashboard and customization.",
      tags: ["Next.js", "Analytics", "Social Media"]
    },
    {
      id: 9,
      title: "Animated Portfolio",
      description: "Creative portfolio website with animations and interactive elements for a client.",
      tags: ["Framer Motion", "GSAP", "Creative Design"]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error sending your message. Please try again.');
    } finally {
      setFormSubmitted(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
      {/* Social Media Icons - Top Right */}
      <motion.div
        className="fixed top-6 right-6 z-50 flex flex-col items-center space-y-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="gap-x-6 flex-col items-center ">
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaGithub size={26} />
          </motion.a>

          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#1DA1F2] transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaTwitter size={26} />
          </motion.a>

          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#0077B5] transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaLinkedin size={26} />
          </motion.a>

          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#E1306C] transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaInstagram size={26} />
          </motion.a>

          <motion.a
            href="https://indeed.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#2164F3] transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <SiIndeed size={26} />
          </motion.a>

          <motion.a
            href="mailto:your.email@example.com"
            className="text-gray-300 hover:text-[#EA4335] transition-colors"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaEnvelope size={26} />
          </motion.a>
        </div>

      </motion.div>

      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {STARS.map((star) => (
          <motion.div
            key={`star-${star.id}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: star.duration,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Nebula Effects */}
        <motion.div
          className="absolute rounded-full blur-3xl bg-purple-600/30"
          style={{
            width: "300px",
            height: "300px",
            left: "20%",
            top: "30%"
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute rounded-full blur-3xl bg-blue-600/30"
          style={{
            width: "400px",
            height: "400px",
            right: "15%",
            bottom: "20%"
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen w-full">
        {/* Main Content */}
        <div className="container mx-auto px-6 py-24 flex flex-col items-center justify-center min-h-screen">
          {/* Profile Section */}
          <motion.div
            ref={ref}
            className="flex flex-col items-center text-center w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="relative rounded-full border-4 border-white/20 hover:border-purple-400 transition-all duration-500 shadow-xl shadow-purple-500/20"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/WhatsApp Image 2025-08-08 at 11.46.09_85e61b6c.jpg"
                alt="Profile Picture"
                width={180}
                height={180}
                className="rounded-full object-cover"
                priority
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400/20 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            <motion.h1
              className="mt-8 text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                ADITYA BALI
              </span>
            </motion.h1>

            <motion.p
              className="mt-4 max-w-xl text-gray-300 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Building immersive web experiences with cutting-edge technologies and AI-powered solutions.
            </motion.p>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-12 max-w-3xl w-full"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {skills.map((skill, i) => {
              const rotation = (i % 5) - 2;
              const delay = i * 0.1;
              const duration = 5 + (i % 3);

              return (
                <motion.div
                  key={i}
                  className="px-5 py-2.5 bg-white/10 rounded-full shadow-lg backdrop-blur-sm hover:bg-white/20 transition-all"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.25)"
                  }}
                  animate={{
                    y: [0, -5, 0, 5, 0],
                    x: [0, 3, 0, -3, 0],
                    rotate: [0, rotation, 0]
                  }}
                  transition={{
                    duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay
                  }}
                >
                  <span className="font-medium">{skill}</span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Projects Showcase - Side by Side Layout */}
          <motion.div
            className="mt-16 w-full max-w-6xl"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300">
              Featured Projects
            </h2>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Project Cards List */}
              <div className="w-full lg:w-2/5 space-y-6">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    className={`p-6 rounded-xl backdrop-blur-md border cursor-pointer transition-all duration-300 ${activeProject === i
                      ? "bg-purple-900/30 border-purple-500/50 shadow-lg shadow-purple-500/20 scale-105"
                      : "bg-gray-800/30 border-white/10 hover:bg-gray-700/40 hover:border-white/20"
                      }`}
                    onClick={() => setActiveProject(i)}
                    whileHover={{
                      scale: activeProject === i ? 1.05 : 1.03,
                      transition: { duration: 0.2 }
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-3 h-3 rounded-full mt-2 ${activeProject === i ? "bg-purple-400" : "bg-white/40"
                        }`} />
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-300 text-sm">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-xs bg-gray-700/50 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Project Details */}
              <motion.div
                className="w-full lg:w-3/5 bg-gray-800/40 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                key={activeProject}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-purple-300 mb-4">
                    {projects[activeProject].title}
                  </h3>

                  <div className="h-48 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 极速20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-gray-300">Project Visualization</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-极速 leading-relaxed">
                    {projects[activeProject].longDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {projects[activeProject].tags.map(tag => (
                      <span key={tag} className="text-xs bg-purple-900/40 px-3 py-1.5 rounded-full border border-purple-700/30">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href={projects[activeProject].link}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-purple-500/30"
                    >
                      View Project
                      <svg xmlns="极速://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 极速00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Moving Projects Showcase */}
          <motion.div
            className="mt-24 w-full max-w-6xl overflow-hidden relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-300">
              Practice Projects
            </h2>

            <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
              {"These are some of my practice projects where I've honed my skills in various technologies and design patterns."}
            </p>

            <div className="relative h-96 w-full overflow-hidden rounded-xl border border-white/10 bg-gray-900/30 backdrop-blur-sm p-4">
              {practiceProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  className="absolute w-72 h-56 bg-gray-800/70 border border-gray-700 rounded-xl p-6 shadow-lg backdrop-blur-md"
                  initial={{ x: "100vw", opacity: 0 }}
                  animate={{
                    x: ["100vw", "-100%"],
                    opacity: [0, 1, 1, 0],
                    transition: {
                      duration: 20,
                      repeat: Infinity,
                      delay: i * 3,
                      ease: "linear",
                      times: [0, 0.1, 0.9, 1]
                    }
                  }}
                  style={{ top: `${(i % 3) * 80 + 20}px` }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-700/60 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>


          <motion.div
            className="mt-24 w-full max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-300">
              Get In Touch
            </h2>

            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-8 border border-white/10 shadow-xl">
              {formSubmitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">{"Thank you for reaching out. I'll get back to you soon."}</p>

                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                      placeholder="Your message here..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium text-white transition-all duration-300 shadow-lg shadow-purple-500/30"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}

              <div className="mt-8 pt-8 border-t border-gray-700/50">
                <h3 className="text-lg font-semibold text-white mb-4">Or reach me directly at:</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="mailto:your.email@example.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    baliaditya72@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
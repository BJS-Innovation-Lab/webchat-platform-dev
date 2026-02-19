'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'

// VULKN Axolotl Mascot — transparent background, hero-sized
const VulknAxolotl = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img 
    src="/vulkn-mascot.png" 
    alt="VULKN Axolotl" 
    className={className}
    style={{ objectFit: 'contain' }}
  />
)

// Floating bubbles for axolotl water effect
function Bubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
            left: `${10 + Math.random() * 80}%`,
            bottom: '-10%',
            background: `radial-gradient(circle, rgba(56, 189, 248, ${0.2 + Math.random() * 0.3}), transparent)`,
            animation: `bubble-rise ${8 + Math.random() * 12}s ease-in infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  )
}

// Animated counter
function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  useEffect(() => {
    if (!isInView) return
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, isInView])
  
  return <span ref={ref}>{count}{suffix}</span>
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Agents That Operate',
    description: "They don't just answer questions. They post content, send emails, write code, manage clients, and handle customer service — autonomously."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Memory That Lasts',
    description: 'Your agent remembers client preferences, past decisions, and what worked. It gets better over time — not worse.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Network Intelligence',
    description: 'When a solution works for one client, it becomes available to every similar business. Every new client makes the network smarter.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: 'One Agent, Every Channel',
    description: 'WhatsApp, Telegram, email, web — your agent lives where your clients are. No switching between 40 different tools.'
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Replaces Entire Roles',
    description: "A bakery owner shouldn't need to hire a social media manager, a developer, AND an accountant. One agent handles it all."
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Validated Skills',
    description: 'Every skill is tested with real businesses before deployment. No experiments on your dime — only proven solutions.'
  }
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    cardRef.current.style.setProperty('--mouse-x', `${x}%`)
    cardRef.current.style.setProperty('--mouse-y', `${y}%`)
  }
  
  return (
    <motion.div
      ref={cardRef}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover="hover"
      onMouseMove={handleMouseMove}
      className="feature-card group cursor-default"
    >
      <motion.div 
        className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#06B6D4]/10 flex items-center justify-center mb-5 text-slate-400 group-hover:text-[#2563EB] transition-all duration-300 border border-slate-100 group-hover:border-[#2563EB]/20"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {feature.icon}
      </motion.div>
      <h3 className="font-display text-xl mb-3 text-slate-800 group-hover:text-[#1E40AF] transition-colors">{feature.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">{feature.description}</p>
    </motion.div>
  )
}

function NetworkEffect() {
  return (
    <motion.div
      className="relative max-w-3xl mx-auto my-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <motion.div 
          className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm"
          whileHover={{ borderColor: 'rgba(37, 99, 235, 0.3)', y: -4, boxShadow: '0 8px 30px rgba(37, 99, 235, 0.08)' }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm text-[#2563EB] font-semibold mb-2">Client A — CDMX</div>
          <p className="text-xs text-slate-400">&quot;I need influencer negotiation&quot;</p>
          <div className="mt-3 text-xs text-slate-300">→ Skill built &amp; validated ✅</div>
        </motion.div>
        
        <motion.div 
          className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm"
          whileHover={{ borderColor: 'rgba(6, 182, 212, 0.3)', y: -4, boxShadow: '0 8px 30px rgba(6, 182, 212, 0.08)' }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm text-[#06B6D4] font-semibold mb-2">Client B — Monterrey</div>
          <p className="text-xs text-slate-400">Same need, deployed in 5 min</p>
          <div className="mt-3 text-xs text-slate-300">→ Day 1 value from A&apos;s learning</div>
        </motion.div>
        
        <motion.div 
          className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm"
          whileHover={{ borderColor: 'rgba(56, 189, 248, 0.3)', y: -4, boxShadow: '0 8px 30px rgba(56, 189, 248, 0.08)' }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm text-[#38BDF8] font-semibold mb-2">Client C — São Paulo</div>
          <p className="text-xs text-slate-400">Same skill, localized for Brazil</p>
          <div className="mt-3 text-xs text-slate-300">→ Network compounds 🐟</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const { scrollYProgress: pageScrollProgress } = useScroll()
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const navbarHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: elementPosition - navbarHeight, behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{
          scaleX: pageScrollProgress,
          background: 'linear-gradient(90deg, #2563EB, #06B6D4, #38BDF8)',
        }}
      />
      
      {/* Background — Subtle blue orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="gradient-orb absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#2563EB]/[0.04]" style={{ animationDelay: '0s' }} />
        <div className="gradient-orb absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-[#06B6D4]/[0.04]" style={{ animationDelay: '-10s' }} />
        <div className="gradient-orb absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-[#38BDF8]/[0.03]" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Bubbles */}
      <Bubbles />

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-nav' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div 
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] p-[1.5px] group-hover:shadow-lg group-hover:shadow-[#2563EB]/20 transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center">
                  <VulknAxolotl className="w-7 h-7" />
                </div>
              </motion.div>
              <span className="font-display text-xl tracking-wide text-slate-900">VULKN</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <motion.button onClick={() => scrollToSection('how-it-works')} className="nav-link text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium" whileHover={{ y: -2 }}>
                How It Works
              </motion.button>
              <motion.button onClick={() => scrollToSection('features')} className="nav-link text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium" whileHover={{ y: -2 }}>
                Features
              </motion.button>
              <motion.button onClick={() => scrollToSection('pricing')} className="nav-link text-sm text-slate-500 hover:text-slate-900 transition-colors font-medium" whileHover={{ y: -2 }}>
                Pricing
              </motion.button>
              <Link href="https://calendly.com/sable-vulkn-ai/15-min-meet" target="_blank" rel="noopener">
                <motion.span className="vulkn-btn text-sm py-2.5 px-6" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  Book a Demo
                </motion.span>
              </Link>
            </div>

            <motion.button 
              className="md:hidden p-2.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl"
            >
              <div className="px-6 py-4 space-y-4">
                <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left text-slate-600 hover:text-slate-900 py-2">How It Works</button>
                <button onClick={() => scrollToSection('features')} className="block w-full text-left text-slate-600 hover:text-slate-900 py-2">Features</button>
                <button onClick={() => scrollToSection('pricing')} className="block w-full text-left text-slate-600 hover:text-slate-900 py-2">Pricing</button>
                <Link href="https://calendly.com/sable-vulkn-ai/15-min-meet" target="_blank" rel="noopener" className="vulkn-btn text-center w-full block py-3">Book a Demo</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-32">
        <motion.div 
          className="max-w-6xl mx-auto text-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-blue-50 border border-blue-100 mb-10 badge-pulse"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-50"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2563EB]"></span>
            </span>
            <span className="text-sm text-[#1E40AF] font-medium">Now accepting beta partners</span>
          </motion.div>

          {/* Harvard Innovation Labs Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2.5 mb-6"
          >
            <img src="/harvard-shield.png" alt="Harvard" className="h-7 sm:h-8 object-contain opacity-70" />
            <span className="text-xs sm:text-sm text-slate-400 font-medium">Harvard Innovation Labs</span>
          </motion.div>

          {/* Axolotl Hero — floating, glowing */}
          <motion.div
            className="relative mx-auto mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
          >
            <motion.div
              className="relative z-10 mx-auto w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44"
              animate={{ y: [0, -15, -8, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src="/vulkn-mascot.png" 
                alt="VULKN Axolotl" 
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                style={{
                  animation: 'axolotl-glow 4s ease-in-out infinite',
                }}
              />
            </motion.div>
            {/* Glow ring behind axolotl */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-[#2563EB]/10 to-[#06B6D4]/10 blur-3xl" />
          </motion.div>

          {/* Main headline */}
          <motion.h1 
            className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1] mb-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span className="block mb-2 text-slate-900" variants={fadeInUp} transition={{ duration: 0.6 }}>
              Every Business That Joins
            </motion.span>
            <motion.span className="vulkn-gradient-text block" variants={fadeInUp} transition={{ duration: 0.6, delay: 0.1 }}>
              Makes Every Other Smarter
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            AI agents that run your daily operations — marketing, development, 
            customer service. They learn what works and share it across the network.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex flex-col items-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="https://calendly.com/sable-vulkn-ai/15-min-meet" target="_blank" rel="noopener">
                <motion.span className="vulkn-btn text-base py-4 px-8 w-full sm:w-auto inline-flex items-center justify-center" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  Book a Demo
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.span>
              </Link>
              <Link href="/chat">
                <motion.span className="vulkn-btn-secondary w-full sm:w-auto inline-flex items-center justify-center" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Try Chat Demo
                </motion.span>
              </Link>
            </div>
            
            <motion.div 
              className="flex items-center gap-2 text-slate-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Deploy in under a week</span>
              <span className="mx-1.5 text-slate-200">•</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Your data stays yours</span>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { value: 24, suffix: '/7', label: 'Always Operating' },
              { value: 40, suffix: '+', label: 'Tools Replaced' },
              { value: 5, suffix: 'min', label: 'Skill Deploy' },
              { value: 100, suffix: '%', label: 'Validated Skills' },
            ].map((stat, i) => (
              <motion.div key={i} className="stat-card text-center" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <div className="font-display text-2xl sm:text-3xl md:text-4xl vulkn-gradient-text mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={() => scrollToSection('how-it-works')}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600 transition-colors font-medium">
            See how it works
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-12 rounded-full border border-slate-200 group-hover:border-slate-300 flex items-start justify-center pt-2 transition-colors"
          >
            <motion.div 
              className="w-1.5 h-3 rounded-full bg-gradient-to-b from-[#2563EB]/60 to-[#06B6D4]/30"
              animate={{ y: [0, 6, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Tech Orbit — The Frontier Comes to You */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-white via-blue-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <motion.span className="inline-block text-sm font-semibold text-[#2563EB] uppercase tracking-wider mb-4">
              The Tech Stack
            </motion.span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight mb-6 text-slate-900">
              The Frontier Comes{' '}
              <span className="vulkn-gradient-text">To You</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              You talk to your agent. Your agent wields the entire technology frontier — AI models, platforms, APIs, creative tools — so you don&apos;t have to.
            </p>
          </motion.div>

          {/* Orbital Visualization — desktop */}
          <div className="relative hidden md:block overflow-visible mx-auto" style={{ width: '800px', maxWidth: '100%', height: '800px', transform: 'scale(var(--orbit-scale, 1))', transformOrigin: 'top center' }}>
            <style dangerouslySetInnerHTML={{ __html: `
              @media (max-width: 900px) { :root { --orbit-scale: 0.65; } }
              @media (min-width: 901px) and (max-width: 1100px) { :root { --orbit-scale: 0.8; } }
              @media (min-width: 1101px) { :root { --orbit-scale: 1; } }
            `}} />
            {/* Orbit rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[280px] h-[280px] rounded-full border border-blue-100/60" />
              <div className="absolute w-[460px] h-[460px] rounded-full border border-blue-100/40" />
              <div className="absolute w-[660px] h-[660px] rounded-full border border-blue-100/25" />
              <div className="absolute w-[790px] h-[790px] rounded-full border border-blue-50/20" />
            </div>

            {/* Center — Axolotl */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                className="relative"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute -inset-8 bg-gradient-to-br from-[#2563EB]/15 to-[#06B6D4]/15 rounded-full blur-2xl" />
                <div className="relative w-32 h-32 rounded-full bg-white shadow-xl shadow-blue-500/10 border border-blue-100 flex items-center justify-center">
                  <img src="/vulkn-mascot.png" alt="VULKN" className="w-24 h-24 object-contain" />
                </div>
              </motion.div>
            </div>

            {/* Tech logos orbiting — Inner ring (AI Models) */}
            {[
              { name: 'Claude', angle: 0, ring: 140, color: '#D97706',
                logo: <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M4.709 15.955l4.397-2.006-.413 3.184-3.984-1.178zm7.314-11.677L7.627 6.574l2.886 2.32-2.1 5.252L4.58 11.71.002 13.535l4.855 4.137-.238 1.83 5.187 1.535.252-1.938 5.263 4.487 1.07-3.86 3.563 1.054 4.045-10.09-3.563-1.054L21.506.001l-9.483 4.277zM13.07 5.528l5.863-2.645-.742 5.713-5.121-3.068zm6.983 5.142l-2.5 6.238-2.157-.638 2.16-5.397 2.497-.203zm-3.627-.295l-2.138 5.342-4.835-3.004 2.1-5.252 4.873 2.914z" fill="currentColor"/></svg> },
              { name: 'Gemini', angle: 60, ring: 140, color: '#4285F4',
                logo: <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M12 0C5.37 0 0 5.37 0 12c3.15-1.89 5.25-4.41 6.3-7.56C7.35 7.59 9.45 10.11 12 12c-2.55 1.89-4.65 4.41-5.7 7.56C7.35 16.41 9.45 13.89 12 12c2.55 1.89 4.65 4.41 5.7 7.56-1.05-3.15-3.15-5.67-5.7-7.56 2.55-1.89 4.65-4.41 5.7-7.56C16.65 7.59 14.55 10.11 12 12c2.55-1.89 4.65-4.41 5.7-7.56C18.75 7.59 20.85 10.11 24 12c-6.63 0-12-5.37-12-12z" fill="currentColor"/></svg> },
              { name: 'OpenAI', angle: 120, ring: 140, color: '#10A37F',
                logo: <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.282 9.821a5.985 5.985 0 00-.516-4.91 6.046 6.046 0 00-6.51-2.9A6.065 6.065 0 0011.694.013 6.048 6.048 0 005.47 4.2 6.036 6.036 0 001.49 7.82a6.023 6.023 0 00.738 7.071 5.98 5.98 0 00.51 4.911 6.044 6.044 0 006.516 2.9A6.06 6.06 0 0012.8 23.95a6.044 6.044 0 006.222-4.187 6.033 6.033 0 003.981-3.622 6.026 6.026 0 00-.722-6.32zM12.8 22.14a4.486 4.486 0 01-2.886-1.04l.143-.082 4.793-2.768a.78.78 0 00.394-.678v-6.76l2.026 1.17a.072.072 0 01.04.055v5.594a4.508 4.508 0 01-4.51 4.508zm-9.69-4.134a4.485 4.485 0 01-.537-3.015l.143.085 4.793 2.768a.782.782 0 00.787 0l5.854-3.38v2.34a.074.074 0 01-.03.063l-4.848 2.8a4.508 4.508 0 01-6.162-1.661zm-1.262-10.45A4.484 4.484 0 014.2 5.172v.165l-.001 5.535a.78.78 0 00.394.679l5.854 3.38-2.026 1.17a.072.072 0 01-.067.005l-4.848-2.8A4.508 4.508 0 011.848 7.556zm16.637 3.87l-5.854-3.38 2.026-1.17a.072.072 0 01.067-.005l4.848 2.8a4.507 4.507 0 01-.696 8.122v-5.69a.78.78 0 00-.391-.678zm2.016-3.03l-.143-.085-4.793-2.768a.782.782 0 00-.787 0l-5.854 3.38V6.583a.074.074 0 01.03-.063l4.848-2.8a4.508 4.508 0 016.699 4.676zm-12.68 4.166l-2.026-1.17a.072.072 0 01-.04-.055V5.744a4.508 4.508 0 017.4-3.466l-.144.082-4.793 2.768a.78.78 0 00-.394.678zm1.1-2.372l2.608-1.506 2.608 1.506v3.01l-2.608 1.506-2.608-1.506z" fill="currentColor"/></svg> },
              { name: 'Veo', angle: 180, ring: 140, color: '#EA4335',
                logo: <svg viewBox="0 0 24 24" className="w-5 h-5"><polygon points="5,3 19,12 5,21" fill="currentColor"/></svg> },
              { name: 'Midjourney', angle: 240, ring: 140, color: '#7C3AED',
                logo: <svg viewBox="0 0 24 24" className="w-5 h-5"><path d="M3 3l7.5 18L12 16.5 13.5 21 21 3h-4l-3.5 10L12 8.5 10.5 13 7 3H3z" fill="currentColor"/></svg> },
              { name: 'ElevenLabs', angle: 300, ring: 140, color: '#1A1A2E',
                logo: <svg viewBox="0 0 24 24" className="w-5 h-5"><rect x="7" y="3" width="3" height="18" rx="1.5" fill="currentColor"/><rect x="14" y="3" width="3" height="18" rx="1.5" fill="currentColor"/></svg> },
            ].map((tech, i) => {
              const rad = (tech.angle * Math.PI) / 180
              const x = Math.cos(rad) * tech.ring
              const y = Math.sin(rad) * tech.ring
              return (
                <motion.div
                  key={tech.name}
                  className="absolute z-10"
                  style={{ position: 'absolute', left: `${400 + x - 40}px`, top: `${400 + y - 28}px` }}
                  initial={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i, duration: 0.5, type: "spring" }}
                  whileHover={{ scale: 1.1, zIndex: 30 }}
                >
                  <div className="w-20 h-14 rounded-xl bg-white border border-slate-100/80 flex flex-col items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-shadow cursor-default">
                    <span style={{ color: tech.color }}>{tech.logo}</span>
                    <span className="text-[9px] font-bold text-slate-700 mt-0.5">{tech.name}</span>
                  </div>
                </motion.div>
              )
            })}

            {/* Middle ring (Platforms) */}
            {[
              { name: 'Supabase', angle: 20, ring: 235, color: '#3ECF8E',
                logo: <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M13.5 21.87c-.37.53-1.18.22-1.18-.44v-8.18H3.28c-.87 0-1.35-1.01-.8-1.68L13.02 2.13c.37-.53 1.18-.22 1.18.44v8.18h9.04c.87 0 1.35 1.01.8 1.68L13.5 21.87z" fill="currentColor"/></svg> },
              { name: 'Vercel', angle: 65, ring: 235, color: '#000000',
                logo: <svg viewBox="0 0 24 24" className="w-4 h-4"><polygon points="12,2 22,20 2,20" fill="currentColor"/></svg> },
              { name: 'Railway', angle: 110, ring: 235, color: '#7C3AED',
                logo: <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M.6 7h4.8v10H.6V7zm6 0h4.8v10H6.6V7zm6 0h4.8v10h-4.8V7zm6 0H24v10h-5.4V7z" fill="currentColor"/></svg> },
              { name: 'AWS', angle: 155, ring: 235, color: '#FF9900',
                logo: <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 01-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 01-.287-.375 6.18 6.18 0 01-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.392-.382-.591-.893-.591-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.032-.863.104-.296.072-.583.16-.862.272a2.287 2.287 0 01-.28.104.488.488 0 01-.127.024c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 01.224-.167c.279-.144.614-.264 1.005-.36A4.84 4.84 0 015.07 5.6c.766 0 1.325.174 1.687.52.355.347.535.878.535 1.59v2.326h-.03z" fill="currentColor"/><path d="M18.934 14.477c-.072-.064-.176-.096-.313-.096a3.35 3.35 0 00-.414.04l-.447.072a4.36 4.36 0 01-.695.056c-.454 0-.807-.096-1.061-.288-.255-.191-.383-.478-.383-.862 0-.383.16-.686.487-.91.328-.224.775-.335 1.357-.335.16 0 .335.016.519.04.183.024.375.064.567.112v-.335c0-.256-.063-.447-.191-.567-.128-.128-.36-.191-.695-.191-.24 0-.487.032-.743.096a5.9 5.9 0 00-.743.24c-.112.048-.191.072-.24.08a.39.39 0 01-.072.016c-.096 0-.144-.072-.144-.224V11c0-.112.016-.2.056-.255a.518.518 0 01.224-.152c.24-.112.527-.208.862-.288.335-.08.695-.12 1.077-.12.807 0 1.397.184 1.771.551.375.367.559.919.559 1.653v2.182h.024z" fill="currentColor"/></svg> },
              { name: 'WhatsApp', angle: 200, ring: 235, color: '#25D366',
                logo: <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/></svg> },
              { name: 'Mailchimp', angle: 245, ring: 235, color: '#FFE01B',
                logo: <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M18.356 6.456c-.334-.498-.788-.858-1.3-1.063.172-.468.176-.927.003-1.303-.253-.551-.826-.873-1.583-.873-.1 0-.205.006-.313.02A3.9 3.9 0 0012.79 1.77c-.913-.132-1.75.047-2.374.485-.625.44-1.025 1.12-1.1 1.88-.698.23-1.27.62-1.675 1.154-.52.689-.747 1.58-.636 2.507-.758.64-1.236 1.44-1.344 2.326-.13 1.068.21 2.12.96 2.96-.04.236-.062.477-.062.72 0 2.47 2.594 4.478 5.787 4.478 3.192 0 5.786-2.008 5.786-4.478 0-.18-.013-.358-.04-.534.88-.856 1.358-1.978 1.318-3.118-.031-.87-.363-1.69-.954-2.394z" fill="currentColor"/></svg> },
              { name: 'Cursor', angle: 290, ring: 235, color: '#000000',
                logo: <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M5.5 3L20 12L5.5 21V15L13 12L5.5 9V3z" fill="currentColor"/></svg> },
              { name: 'Adobe', angle: 335, ring: 235, color: '#FF0000',
                logo: <svg viewBox="0 0 24 24" className="w-4 h-4"><path d="M9.07 0H0v22.94L9.07 0zM14.93 0H24v22.94L14.93 0zM12 8.52l4.66 13.08h-3.2l-1.38-4.04H8.85L12 8.52z" fill="currentColor"/></svg> },
            ].map((tech, i) => {
              const rad = (tech.angle * Math.PI) / 180
              const x = Math.cos(rad) * tech.ring
              const y = Math.sin(rad) * tech.ring
              return (
                <motion.div
                  key={tech.name}
                  className="absolute z-10"
                  style={{ position: 'absolute', left: `${400 + x - 36}px`, top: `${400 + y - 24}px` }}
                  initial={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 * i + 0.3, duration: 0.5, type: "spring" }}
                  whileHover={{ scale: 1.12, zIndex: 30 }}
                >
                  <div className="w-[72px] h-12 rounded-lg bg-white border border-slate-100/80 flex flex-col items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.07)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.11)] transition-shadow cursor-default">
                    <span style={{ color: tech.color }}>{tech.logo}</span>
                    <span className="text-[8px] font-bold text-slate-600 mt-0.5">{tech.name}</span>
                  </div>
                </motion.div>
              )
            })}

            {/* Outer ring (Tools & Channels) */}
            {[
              { name: 'TikTok', angle: 10, ring: 340, color: '#000000',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" fill="currentColor"/></svg> },
              { name: 'Instagram', angle: 40, ring: 340, color: '#E4405F',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" fill="currentColor"/></svg> },
              { name: 'Google', angle: 70, ring: 340, color: '#4285F4',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09A6.97 6.97 0 015.5 12c0-.72.13-1.43.35-2.09V7.07H2.18A11.97 11.97 0 001 12c0 1.93.46 3.76 1.18 5.39l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
              { name: 'Oracle', angle: 100, ring: 340, color: '#C74634',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M7.2 17.1c-2.8 0-5.1-2.3-5.1-5.1S4.4 6.9 7.2 6.9h9.7c2.8 0 5.1 2.3 5.1 5.1s-2.3 5.1-5.1 5.1H7.2zm9.4-2.5c1.4 0 2.6-1.2 2.6-2.6S18 9.4 16.6 9.4H7.4c-1.4 0-2.6 1.2-2.6 2.6s1.2 2.6 2.6 2.6h9.2z" fill="currentColor"/></svg> },
              { name: 'Power BI', angle: 130, ring: 340, color: '#F2C811',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><rect x="4" y="10" width="3.5" height="10" rx="1" fill="currentColor"/><rect x="10" y="6" width="3.5" height="14" rx="1" fill="currentColor"/><rect x="16" y="2" width="3.5" height="18" rx="1" fill="currentColor"/></svg> },
              { name: 'Looker', angle: 160, ring: 340, color: '#4285F4',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2.5"/><line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg> },
              { name: 'CapCut', angle: 190, ring: 340, color: '#000000',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" fill="currentColor"/></svg> },
              { name: 'APIs', angle: 220, ring: 340, color: '#2563EB',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M14 12l-2 2-2-2 2-2 2 2zm-2-6l2 2 4-4-4-4-2 2-2-2-4 4 4 4 2-2zm0 12l-2-2-4 4 4 4 2-2 2 2 4-4-4-4-2 2z" fill="currentColor"/></svg> },
              { name: 'ML', angle: 250, ring: 340, color: '#06B6D4',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><circle cx="12" cy="5" r="2.5" fill="currentColor"/><circle cx="5" cy="19" r="2.5" fill="currentColor"/><circle cx="19" cy="19" r="2.5" fill="currentColor"/><line x1="12" y1="7.5" x2="5" y2="16.5" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="7.5" x2="19" y2="16.5" stroke="currentColor" strokeWidth="1.5"/><line x1="5" y1="19" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5"/></svg> },
              { name: 'Analytics', angle: 280, ring: 340, color: '#F59E0B',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M3 20h18v2H3v-2zm2-7h2v5H5v-5zm4-3h2v8H9v-8zm4-4h2v12h-2V6zm4-3h2v15h-2V3z" fill="currentColor"/></svg> },
              { name: 'Calendar', angle: 310, ring: 340, color: '#4285F4',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" fill="currentColor"/></svg> },
              { name: 'Drive', angle: 340, ring: 340, color: '#0066DA',
                logo: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M8.27 2.04L1.34 14.04h6.93l6.93-12H8.27z" fill="#0066DA"/><path d="M22.66 14.04H8.8l-3.47 6h13.86l3.47-6z" fill="#00AC47"/><path d="M15.2 2.04l6.93 12-3.47 6-6.93-12 3.47-6z" fill="#EA4335"/></svg> },
            ].map((tech, i) => {
              const rad = (tech.angle * Math.PI) / 180
              const x = Math.cos(rad) * tech.ring
              const y = Math.sin(rad) * tech.ring
              return (
                <motion.div
                  key={tech.name}
                  className="absolute z-10"
                  style={{ position: 'absolute', left: `${400 + x - 28}px`, top: `${400 + y - 20}px` }}
                  initial={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.06 * i + 0.6, duration: 0.4, type: "spring" }}
                  whileHover={{ scale: 1.15, zIndex: 30 }}
                >
                  <div className="w-14 h-10 rounded-lg bg-white border border-slate-100/80 flex flex-col items-center justify-center shadow-[0_3px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:border-blue-200 transition-all cursor-default">
                    <span style={{ color: tech.color }}>{tech.logo}</span>
                    <span className="text-[7px] font-semibold text-slate-500">{tech.name}</span>
                  </div>
                </motion.div>
              )
            })}

            {/* Connecting lines (subtle) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-400 -400 800 800">
              {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                const rad = (angle * Math.PI) / 180
                const x1 = Math.cos(rad) * 70
                const y1 = Math.sin(rad) * 70
                const x2 = Math.cos(rad) * 140
                const y2 = Math.sin(rad) * 140
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#techLine)" strokeWidth="1" opacity="0.3" />
                )
              })}
              <defs>
                <linearGradient id="techLine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.1" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile/tablet fallback — grid for smaller screens */}
          <div className="md:hidden mt-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-white shadow-lg shadow-blue-500/10 border border-blue-100 flex items-center justify-center">
                <img src="/vulkn-mascot.png" alt="VULKN" className="w-14 h-14 object-contain" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { name: 'Claude', color: '#D97706' }, { name: 'Gemini', color: '#4285F4' },
                { name: 'OpenAI', color: '#10A37F' }, { name: 'Vercel', color: '#000' },
                { name: 'Supabase', color: '#3ECF8E' }, { name: 'WhatsApp', color: '#25D366' },
                { name: 'Adobe', color: '#FF0000' }, { name: 'TikTok', color: '#000' },
                { name: 'AWS', color: '#FF9900' }, { name: 'Google', color: '#4285F4' },
                { name: 'Railway', color: '#7C3AED' }, { name: 'APIs', color: '#2563EB' },
              ].map((t) => (
                <div key={t.name} className="flex flex-col items-center p-2.5 rounded-xl bg-white border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <div className="w-2 h-2 rounded-full mb-1.5" style={{ backgroundColor: t.color }} />
                  <span className="text-[9px] font-bold text-slate-600">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <motion.span className="inline-block text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              The Network Effect
            </motion.span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight mb-6 text-slate-900">
              One Client Learns,{' '}
              <span className="vulkn-gradient-text">Everyone Benefits</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              We build skills once, validate them with real data, and deploy them across the network.
            </p>
          </motion.div>
          <NetworkEffect />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-32 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <motion.span className="inline-block text-sm font-semibold text-[#2563EB] uppercase tracking-wider mb-4" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              Not Another Chatbot
            </motion.span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight mb-6 text-slate-900">
              Agents That Actually Work
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              Persistent AI that operates your business — not a search engine with personality.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-sm font-semibold text-[#06B6D4] uppercase tracking-wider mb-4">Pricing</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight mb-6 text-slate-900">Simple, Transparent Pricing</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg mb-12">
              One agent, one price. No per-seat fees, no hidden costs.
            </p>
            <motion.div className="p-8 rounded-2xl border border-slate-100 bg-white shadow-sm" whileHover={{ borderColor: 'rgba(37, 99, 235, 0.2)', boxShadow: '0 8px 30px rgba(37, 99, 235, 0.06)' }}>
              <p className="text-slate-500 text-lg">
                Custom pricing available for beta partners.
                <br />
                <Link href="https://calendly.com/sable-vulkn-ai/15-min-meet" target="_blank" rel="noopener" className="text-[#2563EB] hover:text-[#1E40AF] transition-colors font-medium">
                  Book a demo to learn more →
                </Link>
              </p>
            </motion.div>
            
            {/* Mini product card */}
            <motion.div 
              className="mt-8 p-6 rounded-2xl border border-pink-100 bg-gradient-to-r from-pink-50 to-cyan-50 hover:shadow-lg transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.01 }}
            >
              <Link href="/mini" className="flex items-center gap-6">
                <img src="/vulkn-mini.png" alt="VULKN Mini" className="w-16 h-16 object-contain" />
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900">VULKN Mini</h3>
                    <span className="text-xs font-medium text-pink-500 bg-pink-100 px-2 py-0.5 rounded-full">NEW</span>
                  </div>
                  <p className="text-slate-500 text-sm">One versatile agent for dev, marketing, finance & ops. The all-in-one teammate for growing businesses.</p>
                  <span className="text-sm font-medium text-pink-500 mt-1 inline-block">Learn more →</span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#06B6D4]"></div>
            
            <div className="relative p-10 md:p-16 text-center">
              {/* Mini axolotl in CTA */}
              <motion.div
                className="mx-auto mb-6 w-20 h-20"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="/vulkn-mascot.png" alt="" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
              </motion.div>
              
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-tight mb-6 text-white">
                  Join the Network.
                  <br />
                  <span className="text-cyan-200">Get Smarter Every Day.</span>
                </h2>
                <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">
                  Every business that joins VULKN makes the entire ecosystem 
                  more valuable. Be part of the intelligence network.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="https://calendly.com/sable-vulkn-ai/15-min-meet" target="_blank" rel="noopener">
                    <motion.span 
                      className="inline-flex items-center justify-center text-base py-4 px-10 bg-white text-[#1E40AF] font-bold rounded-xl hover:shadow-xl hover:shadow-white/20 transition-all"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Book Your Demo
                    </motion.span>
                  </Link>
                  <Link 
                    href="mailto:hello@vulkn.ai" 
                    className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    <span className="relative">
                      or email us directly
                      <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
                    </span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] p-[1px] shadow-lg shadow-[#2563EB]/20 hover:shadow-xl hover:shadow-[#2563EB]/30 transition-shadow duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <motion.svg 
                className="w-5 h-5 text-[#2563EB] group-hover:text-[#1E40AF] transition-colors" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </motion.svg>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative border-t border-slate-100 py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#06B6D4] p-[1px]">
                <div className="w-full h-full rounded-[7px] bg-white flex items-center justify-center">
                  <VulknAxolotl className="w-5 h-5" />
                </div>
              </div>
              <span className="font-display text-base tracking-wide text-slate-900">VULKN</span>
            </motion.div>
            
            <div className="flex items-center gap-8 text-sm text-slate-400">
              <button onClick={() => scrollToSection('how-it-works')} className="nav-link hover:text-slate-900 transition-colors font-medium">How It Works</button>
              <button onClick={() => scrollToSection('features')} className="nav-link hover:text-slate-900 transition-colors font-medium">Features</button>
              <Link href="https://calendly.com/sable-vulkn-ai/15-min-meet" target="_blank" rel="noopener" className="nav-link hover:text-slate-900 transition-colors font-medium">Book Demo</Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <img src="/harvard-shield.png" alt="Harvard" className="h-5 object-contain opacity-50" />
                <span className="text-xs text-slate-400">Harvard i-lab</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                © 2026 BJS Labs. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// LANGUAGE SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

const languages = [
  { code: 'es', label: 'ES', name: 'Español', flag: '🇲🇽' },
  { code: 'en', label: 'EN', name: 'English', flag: '🇺🇸' },
]

const content = {
  es: {
    headline_static: 'El agente AI que',
    headline_words: ['construye tu negocio', 'ejecuta tus ideas', 'escala tu empresa', 'automatiza todo'],
    subtitle: 'No es un chatbot. Es el arquitecto digital que opera tu empresa mientras duermes.',
    cta_primary: 'Comenzar ahora',
    cta_secondary: 'Ver en acción',
    trust_deploy: 'Deploy en 5 min',
    trust_data: '100% tu data',
    trust_uptime: '99.9% uptime',
  },
  en: {
    headline_static: 'The AI agent that',
    headline_words: ['builds your business', 'executes your ideas', 'scales your company', 'automates everything'],
    subtitle: "Not a chatbot. It's the digital architect that runs your business while you sleep.",
    cta_primary: 'Get started',
    cta_secondary: 'See it in action',
    trust_deploy: '5 min deploy',
    trust_data: '100% your data',
    trust_uptime: '99.9% uptime',
  },
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED BACKGROUND - Particles & Floating Lights
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a1628] to-[#0f172a]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/15 blur-[100px] animate-pulse-slower" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-indigo-500/10 blur-[150px] animate-breathe" />
      
      {/* Floating particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [null, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 10,
          }}
        />
      ))}
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)"/%3E%3C/svg%3E")' }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROTATING WORDS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function RotatingWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span className="relative inline-block min-w-[300px] md:min-w-[500px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute left-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      {/* Invisible text for spacing */}
      <span className="invisible">{words.reduce((a, b) => a.length > b.length ? a : b)}</span>
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// LANGUAGE SELECTOR
// ═══════════════════════════════════════════════════════════════════════════════

function LanguageSelector({ 
  currentLang, 
  onChangeLang 
}: { 
  currentLang: 'es' | 'en'
  onChangeLang: (lang: 'es' | 'en') => void 
}) {
  const [isOpen, setIsOpen] = useState(false)
  const current = languages.find(l => l.code === currentLang)
  
  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 backdrop-blur-sm transition-all duration-300 text-white/80 hover:text-white group"
      >
        <span className="text-base">{current?.flag}</span>
        <span className="font-medium text-sm">{current?.label}</span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-4 h-4 text-white/50 group-hover:text-white/80" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-[#0a1628]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
            >
              {languages.map((lang, i) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    onChangeLang(lang.code as 'es' | 'en')
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-white/[0.06] transition-all duration-200 flex items-center gap-3 ${
                    currentLang === lang.code ? 'text-cyan-400 bg-cyan-400/5' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {currentLang === lang.code && (
                    <motion.svg 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 ml-auto" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED BUTTON
// ═══════════════════════════════════════════════════════════════════════════════

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-500" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      </div>
      
      {/* Text */}
      <span className="relative z-10 text-white flex items-center gap-2">
        {children}
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </motion.button>
  )
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative px-8 py-4 rounded-xl font-medium text-lg overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.05] transition-colors duration-300" />
      
      {/* Text */}
      <span className="relative z-10 text-white/70 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
        </svg>
        {children}
      </span>
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRUST BAR
// ═══════════════════════════════════════════════════════════════════════════════

function TrustBar({ t }: { t: typeof content.es }) {
  const items = [
    { icon: '⚡', text: t.trust_deploy },
    { icon: '🔒', text: t.trust_data },
    { icon: '✓', text: t.trust_uptime },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative z-10 border-t border-white/[0.06]"
    >
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + i * 0.1 }}
              className="flex items-center gap-3 text-white/40 hover:text-white/60 transition-colors duration-300 group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
              <span className="text-sm font-medium tracking-wide">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function Home() {
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const [mounted, setMounted] = useState(false)
  const t = content[lang]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-[#030712] overflow-hidden">
      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
        @keyframes breathe {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.15; transform: translate(-50%, -50%) scale(1.05); }
        }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 12s ease-in-out infinite; }
        .animate-breathe { animation: breathe 10s ease-in-out infinite; }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════════════
          BLOQUE 1 — HERO
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col">
        
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Navbar */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-20 py-6"
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <span className="text-white font-bold text-xl">V</span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 blur-lg opacity-50" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">VULKN</span>
          </motion.div>
          
          {/* Language Selector */}
          <LanguageSelector currentLang={lang} onChangeLang={setLang} />
        </motion.nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 pb-32">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-4"
            >
              {t.headline_static}
              <br />
              <RotatingWords words={t.headline_words} />
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-lg md:text-xl lg:text-2xl text-white/50 max-w-2xl mx-auto mb-12"
            >
              {t.subtitle}
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <PrimaryButton>{t.cta_primary}</PrimaryButton>
              <SecondaryButton>{t.cta_secondary}</SecondaryButton>
            </motion.div>
          </div>
        </div>

        {/* Trust Bar */}
        <TrustBar t={t} />
      </section>
    </main>
  )
}

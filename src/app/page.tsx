'use client'

import { useState, useEffect } from 'react'
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
// ANIMATED BACKGROUND - More dramatic
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#020617]" />
      
      {/* Main glow - center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.20) 0%, rgba(59, 130, 246, 0.10) 40%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Secondary glow - left */}
      <motion.div
        className="absolute top-0 -left-[200px] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 60%)',
        }}
        animate={{
          y: [0, 50, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Secondary glow - right */}
      <motion.div
        className="absolute bottom-0 -right-[200px] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.20) 0%, transparent 60%)',
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Floating orbs - more visible */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 150 + i * 30,
            height: 150 + i * 30,
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(6, 182, 212, 0.08)' : 'rgba(139, 92, 246, 0.08)'} 0%, transparent 70%)`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -30 - i * 5, 0],
            x: [0, 15 - i * 3, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Stars / particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#020617] to-transparent" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROTATING WORDS - Bigger and more dramatic
// ═══════════════════════════════════════════════════════════════════════════════

function RotatingWords({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -40, filter: 'blur(8px)' }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-block bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
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
    <div className="relative z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-colors"
      >
        <span className="text-lg">{current?.flag}</span>
        <span className="text-white font-medium">{current?.label}</span>
        <motion.svg 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-white/70" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute right-0 mt-2 w-44 rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  onClick={() => {
                    onChangeLang(lang.code as 'es' | 'en')
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                    currentLang === lang.code ? 'text-cyan-400 bg-cyan-400/10' : 'text-white/80'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                  {currentLang === lang.code && (
                    <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
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
// BUTTONS - More alive
// ═══════════════════════════════════════════════════════════════════════════════

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative px-8 py-4 rounded-full font-semibold text-lg text-white overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.3)]"
    >
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500" />
      
      {/* Animated shine */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400" />
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <motion.span
          className="inline-block"
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          →
        </motion.span>
      </span>
    </motion.button>
  )
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, borderColor: 'rgba(6,182,212,0.5)' }}
      whileTap={{ scale: 0.95 }}
      className="group px-8 py-4 rounded-full font-medium text-lg text-white/80 hover:text-white border border-white/20 hover:border-cyan-400/50 hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
    >
      <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>
      {children}
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent"
    >
      <div className="max-w-3xl mx-auto px-6 py-5">
        <div className="flex items-center justify-center gap-10 md:gap-16">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.15 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-white/50 hover:text-white/70 transition-colors cursor-default"
            >
              <span className="text-cyan-400">{item.icon}</span>
              <span className="text-sm font-medium">{item.text}</span>
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

  if (!mounted) return <div className="min-h-screen bg-[#020617]" />

  return (
    <main className="min-h-screen bg-[#020617] overflow-hidden">
      {/* ════════════════════════════════════════════════════════════════════════
          BLOQUE 1 — HERO
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-screen flex flex-col">
        
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Navbar */}
        <motion.nav 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-20 flex items-center justify-between px-6 md:px-12 lg:px-20 py-6"
        >
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 blur-xl opacity-50" />
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">VULKN</span>
          </motion.div>
          
          {/* Language Selector */}
          <LanguageSelector currentLang={lang} onChangeLang={setLang} />
        </motion.nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6">
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/60 text-sm font-medium">Arquitectura AI de nueva generación</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-8"
            >
              {t.headline_static}
              <br />
              <RotatingWords words={t.headline_words} />
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-white/50 max-w-2xl mx-auto mb-12"
            >
              {t.subtitle}
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
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

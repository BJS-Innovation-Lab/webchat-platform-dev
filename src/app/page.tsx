'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// LANGUAGE SYSTEM - 4 Languages
// ═══════════════════════════════════════════════════════════════════════════════

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇲🇽' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

const content = {
  en: {
    nav: { how: 'How It Works', features: 'Features', pricing: 'Pricing', demo: 'Book a Demo' },
    badge: 'Now accepting beta partners',
    headline1: 'Your entire business.',
    headline2: 'One AI agent.',
    subtitle: 'VULKN builds, operates, and scales your digital company — so you can focus on what matters.',
    cta1: 'Start Building',
    cta2: 'Watch Demo',
    trust1: 'Deploy in under a week',
    trust2: 'Your data stays yours',
    trust3: '99.9% uptime guaranteed',
  },
  es: {
    nav: { how: 'Cómo Funciona', features: 'Características', pricing: 'Precios', demo: 'Agendar Demo' },
    badge: 'Aceptando socios beta',
    headline1: 'Tu empresa completa.',
    headline2: 'Un solo agente AI.',
    subtitle: 'VULKN construye, opera y escala tu empresa digital — para que te enfoques en lo que importa.',
    cta1: 'Comenzar',
    cta2: 'Ver Demo',
    trust1: 'Deploy en menos de una semana',
    trust2: 'Tus datos son tuyos',
    trust3: '99.9% uptime garantizado',
  },
  pt: {
    nav: { how: 'Como Funciona', features: 'Recursos', pricing: 'Preços', demo: 'Agendar Demo' },
    badge: 'Aceitando parceiros beta',
    headline1: 'Sua empresa inteira.',
    headline2: 'Um agente de IA.',
    subtitle: 'VULKN constrói, opera e escala sua empresa digital — para você focar no que importa.',
    cta1: 'Começar',
    cta2: 'Ver Demo',
    trust1: 'Deploy em menos de uma semana',
    trust2: 'Seus dados são seus',
    trust3: '99.9% uptime garantido',
  },
  fr: {
    nav: { how: 'Comment ça marche', features: 'Fonctionnalités', pricing: 'Tarifs', demo: 'Réserver une Démo' },
    badge: 'Partenaires bêta acceptés',
    headline1: 'Votre entreprise entière.',
    headline2: 'Un seul agent IA.',
    subtitle: 'VULKN construit, opère et fait évoluer votre entreprise digitale — pour que vous vous concentriez sur l\'essentiel.',
    cta1: 'Commencer',
    cta2: 'Voir la Démo',
    trust1: 'Déploiement en moins d\'une semaine',
    trust2: 'Vos données restent les vôtres',
    trust3: '99.9% de disponibilité garantie',
  },
}

type LangCode = keyof typeof content

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#0a0f1a]" />
      
      {/* Corner glows */}
      <motion.div
        className="absolute -top-[300px] -left-[300px] w-[800px] h-[800px] rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 60%)' }}
        animate={{ 
          x: [0, 30, 0], 
          y: [0, 20, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-[300px] -right-[300px] w-[800px] h-[800px] rounded-full opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 60%)' }}
        animate={{ 
          x: [0, -20, 0], 
          y: [0, -30, 0],
          scale: [1, 1.15, 1] 
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full opacity-40"
        style={{ background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.08) 0%, transparent 60%)' }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.5, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Floating particles */}
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -100],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════════════════

function Navbar({ lang, setLang, t }: { lang: LangCode; setLang: (l: LangCode) => void; t: typeof content.en }) {
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const currentLang = languages.find(l => l.code === lang)!

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div className="flex items-center gap-2.5" whileHover={{ scale: 1.02 }}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-white font-semibold text-xl tracking-tight">VULKN</span>
          </motion.div>

          {/* Center links - hidden on mobile */}
          <div className="hidden md:flex items-center gap-8">
            {[t.nav.how, t.nav.features, t.nav.pricing].map((item, i) => (
              <motion.a
                key={i}
                href="#"
                className="text-white/60 hover:text-white text-sm font-medium transition-colors"
                whileHover={{ y: -1 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setLangOpen(!langOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
              >
                <span className="text-base">{currentLang.flag}</span>
                <span className="text-white/80 text-sm font-medium hidden sm:inline">{currentLang.name}</span>
                <motion.svg
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-4 text-white/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0d1321]/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
                    >
                      {languages.map((l) => (
                        <motion.button
                          key={l.code}
                          onClick={() => { setLang(l.code as LangCode); setLangOpen(false) }}
                          whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                          className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                            lang === l.code ? 'text-blue-400 bg-blue-400/10' : 'text-white/70'
                          }`}
                        >
                          <span className="text-lg">{l.flag}</span>
                          <span className="font-medium">{l.name}</span>
                          {lang === l.code && (
                            <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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

            {/* Book a Demo Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-500/25"
            >
              {t.nav.demo}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HARVARD BADGE
// ═══════════════════════════════════════════════════════════════════════════════

function HarvardBadge({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8"
    >
      {/* Beta Badge */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
        <motion.span
          className="w-2 h-2 rounded-full bg-blue-400"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-white/70 text-sm font-medium">{text}</span>
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-px h-6 bg-white/20" />

      {/* Harvard Badge */}
      <div className="flex items-center gap-2.5">
        {/* Harvard Shield SVG */}
        <svg className="w-7 h-8" viewBox="0 0 30 36" fill="none">
          <path d="M15 0L0 6v12c0 9.94 6.4 19.24 15 22 8.6-2.76 15-12.06 15-22V6L15 0z" fill="#A51C30"/>
          <path d="M15 2.5L2.5 7.5v10c0 8.5 5.5 16.5 12.5 19 7-2.5 12.5-10.5 12.5-19v-10L15 2.5z" fill="#A51C30"/>
          <text x="15" y="24" textAnchor="middle" fill="white" fontSize="16" fontFamily="serif" fontWeight="bold">H</text>
        </svg>
        <div className="flex flex-col">
          <span className="text-white/90 text-sm font-semibold leading-tight">Harvard</span>
          <span className="text-white/50 text-xs leading-tight">Innovation Labs</span>
        </div>
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN BUTTONS
// ═══════════════════════════════════════════════════════════════════════════════

function PrimaryButton({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group relative px-8 py-4 rounded-xl font-semibold text-lg text-white overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400" />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </motion.button>
  )
}

function SecondaryButton({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, borderColor: 'rgba(59, 130, 246, 0.5)' }}
      whileTap={{ scale: 0.97 }}
      className="px-8 py-4 rounded-xl font-semibold text-lg text-white/80 hover:text-white border border-white/15 hover:border-blue-500/50 hover:bg-white/5 transition-all flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z"/>
      </svg>
      {children}
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRUST BAR
// ═══════════════════════════════════════════════════════════════════════════════

function TrustBar({ t }: { t: typeof content.en }) {
  const items = [
    { icon: '🚀', text: t.trust1 },
    { icon: '🔒', text: t.trust2 },
    { icon: '✓', text: t.trust3 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.9 }}
      className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-black/20 backdrop-blur-sm"
    >
      <div className="max-w-4xl mx-auto px-6 py-5">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
              className="flex items-center gap-2 text-white/50"
            >
              <span className="text-blue-400">{item.icon}</span>
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
  const [lang, setLang] = useState<LangCode>('en')
  const [mounted, setMounted] = useState(false)
  const t = content[lang]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="min-h-screen bg-[#0a0f1a]" />

  return (
    <main className="min-h-screen bg-[#0a0f1a] overflow-hidden">
      {/* ════════════════════════════════════════════════════════════════════════
          BLOQUE 1 — HERO
          ════════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col">
        
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Navbar */}
        <Navbar lang={lang} setLang={setLang} t={t} />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-24 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Harvard Badge - NON-NEGOTIABLE */}
            <HarvardBadge text={t.badge} />
            
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-8"
            >
              <span className="text-white">{t.headline1}</span>
              <br />
              <motion.span
                className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto]"
                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                {t.headline2}
              </motion.span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl lg:text-2xl text-white/50 max-w-2xl mx-auto mb-12"
            >
              {t.subtitle}
            </motion.p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <PrimaryButton delay={0.6}>{t.cta1}</PrimaryButton>
              <SecondaryButton delay={0.7}>{t.cta2}</SecondaryButton>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <TrustBar t={t} />
      </section>
    </main>
  )
}

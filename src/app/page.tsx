'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const languages = [
  { code: 'en', name: 'EN', full: 'English' },
  { code: 'es', name: 'ES', full: 'Español' },
  { code: 'pt', name: 'PT', full: 'Português' },
  { code: 'fr', name: 'FR', full: 'Français' },
]

const content = {
  en: {
    nav: { how: 'How It Works', features: 'Features', pricing: 'Pricing', demo: 'Request Demo' },
    badge: 'Limited spots for Q1 2025',
    headline1: 'Deploy in 6 days',
    headline2: 'what takes others 6 months.',
    subtitle: 'VULKN is the autonomous AI platform that builds, operates, and scales your entire digital business — while your competitors are still hiring.',
    cta1: 'Start Your Transformation',
    cta2: 'Watch Platform Demo',
    stats: [
      { value: '$2.4M', label: 'Average annual savings' },
      { value: '47%', label: 'Efficiency increase' },
      { value: '6 days', label: 'To full deployment' },
    ],
  },
  es: {
    nav: { how: 'Cómo Funciona', features: 'Características', pricing: 'Precios', demo: 'Solicitar Demo' },
    badge: 'Cupos limitados Q1 2025',
    headline1: 'Despliega en 6 días',
    headline2: 'lo que a otros les toma 6 meses.',
    subtitle: 'VULKN es la plataforma de IA autónoma que construye, opera y escala todo tu negocio digital — mientras tu competencia sigue contratando.',
    cta1: 'Inicia Tu Transformación',
    cta2: 'Ver Demo de Plataforma',
    stats: [
      { value: '$2.4M', label: 'Ahorro anual promedio' },
      { value: '47%', label: 'Aumento en eficiencia' },
      { value: '6 días', label: 'Para implementación' },
    ],
  },
  pt: {
    nav: { how: 'Como Funciona', features: 'Recursos', pricing: 'Preços', demo: 'Solicitar Demo' },
    badge: 'Vagas limitadas Q1 2025',
    headline1: 'Implante em 6 dias',
    headline2: 'o que outros levam 6 meses.',
    subtitle: 'VULKN é a plataforma de IA autônoma que constrói, opera e escala todo o seu negócio digital — enquanto sua concorrência ainda está contratando.',
    cta1: 'Inicie Sua Transformação',
    cta2: 'Ver Demo da Plataforma',
    stats: [
      { value: '$2.4M', label: 'Economia anual média' },
      { value: '47%', label: 'Aumento em eficiência' },
      { value: '6 dias', label: 'Para implementação' },
    ],
  },
  fr: {
    nav: { how: 'Fonctionnement', features: 'Fonctionnalités', pricing: 'Tarifs', demo: 'Demander Démo' },
    badge: 'Places limitées Q1 2025',
    headline1: 'Déployez en 6 jours',
    headline2: 'ce qui prend 6 mois aux autres.',
    subtitle: 'VULKN est la plateforme IA autonome qui construit, opère et fait évoluer toute votre entreprise digitale — pendant que vos concurrents recrutent encore.',
    cta1: 'Démarrez Votre Transformation',
    cta2: 'Voir Démo Plateforme',
    stats: [
      { value: '$2.4M', label: 'Économies annuelles' },
      { value: '47%', label: 'Gain d\'efficacité' },
      { value: '6 jours', label: 'Pour déploiement' },
    ],
  },
}

type Lang = keyof typeof content

// ═══════════════════════════════════════════════════════════════════════════════
// LIVING BACKGROUND - Animated gradients + particles
// ═══════════════════════════════════════════════════════════════════════════════

function LivingBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep base */}
      <div className="absolute inset-0 bg-[#000208]" />
      
      {/* Animated gradient orb - top left */}
      <motion.div
        className="absolute -top-[40%] -left-[20%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Animated gradient orb - right */}
      <motion.div
        className="absolute top-[10%] -right-[15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />
      
      {/* Animated gradient orb - bottom */}
      <motion.div
        className="absolute -bottom-[30%] left-[20%] w-[70vw] h-[50vw] max-w-[900px] max-h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 60%)',
          filter: 'blur(100px)',
        }}
        animate={{
          x: [0, 30, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 8 }}
      />
      
      {/* Floating particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 4 === 0 ? 'rgba(6,182,212,0.6)' : 'rgba(255,255,255,0.3)',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// VULKN LOGO - Refined
// ═══════════════════════════════════════════════════════════════════════════════

function VulknLogo() {
  return (
    <motion.div 
      className="flex items-center gap-2.5"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      <svg className="h-8 w-8" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="v-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path d="M6 8L16 26L26 8" stroke="url(#v-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <motion.circle 
          cx="16" cy="26" r="2" 
          fill="#06b6d4"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
      <span className="text-xl font-semibold tracking-[-0.02em] text-white">VULKN</span>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// REFINED LANGUAGE SELECTOR
// ═══════════════════════════════════════════════════════════════════════════════

function LanguageSelector({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false)
  const current = languages.find(l => l.code === lang)!

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-white/50 hover:text-white/80 hover:bg-white/[0.04] transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="font-medium">{current.name}</span>
        <motion.svg 
          className="w-3.5 h-3.5" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>
      
      <AnimatePresence>
        {open && (
          <>
            <motion.div 
              className="fixed inset-0 z-40" 
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="absolute right-0 mt-2 py-1.5 rounded-xl bg-[#0a0e18]/95 backdrop-blur-xl border border-white/[0.06] shadow-2xl shadow-black/50 z-50 min-w-[140px]"
            >
              {languages.map((l, i) => (
                <motion.button
                  key={l.code}
                  onClick={() => { setLang(l.code as Lang); setOpen(false) }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between transition-all duration-200 ${
                    lang === l.code 
                      ? 'text-cyan-400 bg-cyan-400/[0.06]' 
                      : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <span>{l.full}</span>
                  {lang === l.code && (
                    <motion.div 
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      layoutId="lang-indicator"
                    />
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
// PREMIUM BUTTON - $40K/month quality
// ═══════════════════════════════════════════════════════════════════════════════

function PremiumButton({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) {
  if (primary) {
    return (
      <motion.button
        className="group relative px-8 py-4 rounded-full overflow-hidden"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 bg-[length:200%_100%]"
          animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 blur-xl" />
        </div>
        
        {/* Inner highlight */}
        <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
        
        {/* Text */}
        <span className="relative z-10 text-[15px] font-semibold text-white flex items-center gap-2">
          {children}
          <motion.svg 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2.5}
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </span>
        
        {/* Shadow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 -z-10" />
      </motion.button>
    )
  }
  
  return (
    <motion.button
      className="group relative px-8 py-4 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-[15px] font-medium text-white/60 group-hover:text-white transition-colors flex items-center gap-2">
        <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
        {children}
      </span>
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════════════════

function Navbar({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: typeof content.en }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#000208]/80 backdrop-blur-2xl border-b border-white/[0.04]' : ''
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <VulknLogo />

          {/* Center links with stagger animation */}
          <div className="hidden md:flex items-center gap-10">
            {[t.nav.how, t.nav.features, t.nav.pricing].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="relative text-[15px] text-white/40 hover:text-white transition-colors duration-300 group"
              >
                {item}
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector lang={lang} setLang={setLang} />
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
            >
              {t.nav.demo}
            </motion.button>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════

function Hero({ t }: { t: typeof content.en }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center pt-20">
      <motion.div style={{ opacity, y }} className="relative z-10 w-full max-w-[1100px] mx-auto px-6 py-20">
        
        {/* Badge + Harvard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap items-center justify-center gap-5 mb-12"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-500/[0.08] border border-cyan-500/20">
            <motion.span
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-cyan-300/90 font-medium tracking-wide">{t.badge}</span>
          </div>
          
          <div className="flex items-center gap-2.5">
            <svg className="w-6 h-7" viewBox="0 0 30 36" fill="none">
              <path d="M15 0L0 6v12c0 9.94 6.4 19.24 15 22 8.6-2.76 15-12.06 15-22V6L15 0z" fill="#A51C30"/>
              <text x="15" y="22" textAnchor="middle" fill="white" fontSize="13" fontFamily="serif" fontWeight="bold">H</text>
            </svg>
            <span className="text-sm text-white/40 tracking-wide">Harvard Innovation Labs</span>
          </div>
        </motion.div>

        {/* Headline - UNTOUCHED */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-8"
        >
          <h1 className="text-[clamp(2.8rem,7vw,5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            <span className="text-white">{t.headline1}</span>
            <br />
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              {t.headline2}
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="text-center text-lg md:text-xl text-white/35 max-w-2xl mx-auto mb-14 leading-relaxed tracking-wide"
        >
          {t.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <PremiumButton primary>{t.cta1}</PremiumButton>
          <PremiumButton>{t.cta2}</PremiumButton>
        </motion.div>

        {/* Stats - UNTOUCHED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20 lg:gap-28"
        >
          {t.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-2 tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </div>
              <div className="text-sm text-white/25 uppercase tracking-[0.15em]">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center p-2"
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-cyan-400"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [mounted, setMounted] = useState(false)
  const t = content[lang]

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="min-h-screen bg-[#000208]" />

  return (
    <main className="min-h-screen bg-[#000208] text-white antialiased selection:bg-cyan-500/30">
      <LivingBackground />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
    </main>
  )
}
// Force deploy Thu Feb 19 17:30:43 CST 2026

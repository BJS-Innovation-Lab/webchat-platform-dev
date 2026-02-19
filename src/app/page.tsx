'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

const content = {
  en: {
    nav: { platform: 'Platform', solutions: 'Solutions', enterprise: 'Enterprise', resources: 'Resources', demo: 'Request Demo' },
    badge: 'Limited spots for Q1 2025',
    headline1: 'Deploy in 6 days',
    headline2: 'what takes others 6 months.',
    subtitle: 'VULKN is the autonomous AI platform that builds, operates, and scales your entire digital business — while your competitors are still hiring.',
    cta1: 'Claim Your Spot',
    cta2: 'See It Work',
    stats: [
      { value: '$2.4M', label: 'Average annual savings' },
      { value: '47%', label: 'Efficiency increase' },
      { value: '6 days', label: 'To full deployment' },
    ],
    scroll: 'Explore',
  },
  es: {
    nav: { platform: 'Plataforma', solutions: 'Soluciones', enterprise: 'Empresas', resources: 'Recursos', demo: 'Solicitar Demo' },
    badge: 'Cupos limitados Q1 2025',
    headline1: 'Despliega en 6 días',
    headline2: 'lo que a otros les toma 6 meses.',
    subtitle: 'VULKN es la plataforma de IA autónoma que construye, opera y escala todo tu negocio digital — mientras tu competencia sigue contratando.',
    cta1: 'Reserva Tu Lugar',
    cta2: 'Ver en Acción',
    stats: [
      { value: '$2.4M', label: 'Ahorro anual promedio' },
      { value: '47%', label: 'Aumento en eficiencia' },
      { value: '6 días', label: 'Para implementación' },
    ],
    scroll: 'Explorar',
  },
  pt: {
    nav: { platform: 'Plataforma', solutions: 'Soluções', enterprise: 'Empresas', resources: 'Recursos', demo: 'Solicitar Demo' },
    badge: 'Vagas limitadas Q1 2025',
    headline1: 'Implante em 6 dias',
    headline2: 'o que outros levam 6 meses.',
    subtitle: 'VULKN é a plataforma de IA autônoma que constrói, opera e escala todo o seu negócio digital — enquanto sua concorrência ainda está contratando.',
    cta1: 'Reserve Seu Lugar',
    cta2: 'Ver em Ação',
    stats: [
      { value: '$2.4M', label: 'Economia anual média' },
      { value: '47%', label: 'Aumento em eficiência' },
      { value: '6 dias', label: 'Para implementação' },
    ],
    scroll: 'Explorar',
  },
  fr: {
    nav: { platform: 'Plateforme', solutions: 'Solutions', enterprise: 'Entreprise', resources: 'Ressources', demo: 'Demander Démo' },
    badge: 'Places limitées Q1 2025',
    headline1: 'Déployez en 6 jours',
    headline2: 'ce qui prend 6 mois aux autres.',
    subtitle: 'VULKN est la plateforme IA autonome qui construit, opère et fait évoluer toute votre entreprise digitale — pendant que vos concurrents recrutent encore.',
    cta1: 'Réservez Votre Place',
    cta2: 'Voir en Action',
    stats: [
      { value: '$2.4M', label: 'Économies annuelles moyennes' },
      { value: '47%', label: 'Gain d\'efficacité' },
      { value: '6 jours', label: 'Pour déploiement' },
    ],
    scroll: 'Explorer',
  },
}

type Lang = keyof typeof content

// ═══════════════════════════════════════════════════════════════════════════════
// VULKN LOGO
// ═══════════════════════════════════════════════════════════════════════════════

function VulknLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 32" fill="none">
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <path d="M4 6L16 26L28 6" stroke="url(#logo-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M10 6L16 18L22 6" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
      <circle cx="16" cy="26" r="2.5" fill="#06b6d4"/>
      <text x="40" y="22" fill="white" fontSize="18" fontWeight="600" fontFamily="system-ui, sans-serif" letterSpacing="-0.02em">VULKN</text>
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// BREATHING BACKGROUND - Diffuse lights, no particles
// ═══════════════════════════════════════════════════════════════════════════════

function BreathingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#040506]" />
      
      {/* Top-left cyan glow */}
      <motion.div
        className="absolute -top-[400px] -left-[400px] w-[1000px] h-[1000px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, rgba(6, 182, 212, 0.05) 30%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.6, 0.9, 0.6],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Top-right blue glow */}
      <motion.div
        className="absolute -top-[300px] -right-[300px] w-[900px] h-[900px]"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.10) 0%, rgba(59, 130, 246, 0.04) 35%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      
      {/* Bottom center glow */}
      <motion.div
        className="absolute -bottom-[500px] left-1/2 -translate-x-1/2 w-[1200px] h-[800px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.08) 0%, rgba(59, 130, 246, 0.04) 40%, transparent 65%)',
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#040506_70%)]" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════════════════

function Navbar({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: typeof content.en }) {
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const current = languages.find(l => l.code === lang)!

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#040506]/80 backdrop-blur-2xl border-b border-white/[0.04]' : ''
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <VulknLogo className="h-7" />

          <div className="hidden lg:flex items-center gap-10">
            {[t.nav.platform, t.nav.solutions, t.nav.enterprise, t.nav.resources].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-[15px] text-white/40 hover:text-white transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
              >
                <span>{current.flag}</span>
                <span className="hidden sm:inline">{current.name}</span>
                <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-3 w-44 py-2 rounded-xl bg-[#0a0c10] border border-white/[0.06] shadow-2xl z-50"
                    >
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code as Lang); setLangOpen(false) }}
                          className={`w-full px-4 py-2.5 flex items-center gap-3 text-sm transition-colors ${
                            lang === l.code ? 'text-cyan-400 bg-cyan-400/5' : 'text-white/50 hover:text-white hover:bg-white/[0.02]'
                          }`}
                        >
                          <span>{l.flag}</span>
                          <span>{l.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden sm:block px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-lg transition-all shadow-lg shadow-cyan-500/20"
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
// HERO SECTION - Everything centered
// ═══════════════════════════════════════════════════════════════════════════════

function HeroSection({ t }: { t: typeof content.en }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center pt-20">
      <motion.div style={{ opacity, y }} className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-12 py-16">
        
        {/* Badge + Harvard - CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-12"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <motion.span
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm text-cyan-300 font-medium">{t.badge}</span>
          </div>
          
          <div className="flex items-center gap-2.5">
            <svg className="w-6 h-7" viewBox="0 0 30 36" fill="none">
              <path d="M15 0L0 6v12c0 9.94 6.4 19.24 15 22 8.6-2.76 15-12.06 15-22V6L15 0z" fill="#A51C30"/>
              <text x="15" y="22" textAnchor="middle" fill="white" fontSize="13" fontFamily="serif" fontWeight="bold">H</text>
            </svg>
            <span className="text-sm text-white/40">Harvard Innovation Labs</span>
          </div>
        </motion.div>

        {/* Headline - CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
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

        {/* Subtitle - CENTERED */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t.subtitle}
        </motion.p>

        {/* CTAs - CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.35)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-4 text-[15px] font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl transition-all"
          >
            {t.cta1}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-4 text-[15px] font-medium text-white/60 hover:text-white border border-white/10 hover:border-cyan-500/50 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            {t.cta2}
          </motion.button>
        </motion.div>

        {/* STATS - MASSIVE PROMINENCE - CENTERED */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20 lg:gap-28"
        >
          {t.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-2">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </div>
              <div className="text-sm sm:text-base text-white/30 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator - CENTERED */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-white/20 uppercase tracking-[0.2em]">{t.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-cyan-400"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURES - Consistent modern icons
// ═══════════════════════════════════════════════════════════════════════════════

function FeaturesSection() {
  const features = [
    { 
      title: 'Autonomous Operations', 
      desc: 'AI agents that execute complex business processes 24/7 without human intervention.',
    },
    { 
      title: 'Enterprise Security', 
      desc: 'SOC 2 Type II compliant. Your data never leaves your infrastructure.',
    },
    { 
      title: 'Rapid Deployment', 
      desc: 'Full integration with your existing stack in under one week.',
    },
  ]

  // Consistent modern icon - all use the same style
  const ModernIcon = ({ index }: { index: number }) => (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id={`icon-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="24" height="24" rx="6" stroke={`url(#icon-grad-${index})`} strokeWidth="1.5" fill="none" />
      <rect x="10" y="10" width="12" height="12" rx="3" fill={`url(#icon-grad-${index})`} opacity="0.2" />
      <rect x="12" y="12" width="8" height="8" rx="2" fill={`url(#icon-grad-${index})`} opacity="0.5" />
    </svg>
  )

  return (
    <section className="relative py-32 border-t border-white/[0.03]">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <span className="text-sm text-cyan-400 font-medium uppercase tracking-wider mb-4 block">Why VULKN</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
            Built for the enterprise
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(6, 182, 212, 0.2)' }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-6">
                <ModernIcon index={i} />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">{f.title}</h3>
              <p className="text-white/35 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
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
  if (!mounted) return <div className="min-h-screen bg-[#040506]" />

  return (
    <main className="min-h-screen bg-[#040506] text-white antialiased">
      <BreathingBackground />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <HeroSection t={t} />
      <FeaturesSection />
    </main>
  )
}

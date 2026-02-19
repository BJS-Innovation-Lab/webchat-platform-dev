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
    headline1: 'Stop managing.',
    headline2: 'Start scaling.',
    subtitle: 'While your competitors hire teams, VULKN runs your entire digital operation autonomously. The companies moving fastest already made the switch.',
    cta1: 'Claim Your Spot',
    cta2: 'See It Work',
    stats: [
      { value: '$2.4M', label: 'Average savings / year' },
      { value: '47%', label: 'Efficiency increase' },
      { value: '6 days', label: 'To full deployment' },
    ],
    scroll: 'Explore',
  },
  es: {
    nav: { platform: 'Plataforma', solutions: 'Soluciones', enterprise: 'Empresas', resources: 'Recursos', demo: 'Solicitar Demo' },
    badge: 'Cupos limitados Q1 2025',
    headline1: 'Deja de administrar.',
    headline2: 'Empieza a escalar.',
    subtitle: 'Mientras tu competencia contrata equipos, VULKN opera toda tu operación digital de forma autónoma. Las empresas que más rápido crecen ya hicieron el cambio.',
    cta1: 'Reserva Tu Lugar',
    cta2: 'Ver en Acción',
    stats: [
      { value: '$2.4M', label: 'Ahorro promedio / año' },
      { value: '47%', label: 'Aumento en eficiencia' },
      { value: '6 días', label: 'Para implementación' },
    ],
    scroll: 'Explorar',
  },
  pt: {
    nav: { platform: 'Plataforma', solutions: 'Soluções', enterprise: 'Empresas', resources: 'Recursos', demo: 'Solicitar Demo' },
    badge: 'Vagas limitadas Q1 2025',
    headline1: 'Pare de gerenciar.',
    headline2: 'Comece a escalar.',
    subtitle: 'Enquanto seus concorrentes contratam equipes, VULKN opera toda sua operação digital de forma autônoma. As empresas que mais crescem já fizeram a mudança.',
    cta1: 'Reserve Seu Lugar',
    cta2: 'Ver em Ação',
    stats: [
      { value: '$2.4M', label: 'Economia média / ano' },
      { value: '47%', label: 'Aumento em eficiência' },
      { value: '6 dias', label: 'Para implementação' },
    ],
    scroll: 'Explorar',
  },
  fr: {
    nav: { platform: 'Plateforme', solutions: 'Solutions', enterprise: 'Entreprise', resources: 'Ressources', demo: 'Demander Démo' },
    badge: 'Places limitées Q1 2025',
    headline1: 'Arrêtez de gérer.',
    headline2: 'Commencez à scaler.',
    subtitle: 'Pendant que vos concurrents embauchent, VULKN gère toute votre opération digitale de manière autonome. Les entreprises les plus rapides ont déjà fait le changement.',
    cta1: 'Réservez Votre Place',
    cta2: 'Voir en Action',
    stats: [
      { value: '$2.4M', label: 'Économies moyennes / an' },
      { value: '47%', label: 'Gain d\'efficacité' },
      { value: '6 jours', label: 'Pour déploiement' },
    ],
    scroll: 'Explorer',
  },
}

type Lang = keyof typeof content

// ═══════════════════════════════════════════════════════════════════════════════
// VULKN LOGO - Full Icon
// ═══════════════════════════════════════════════════════════════════════════════

function VulknLogo({ className = "h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 140 32" fill="none">
      {/* Icon - Abstract V with energy/spark */}
      <defs>
        <linearGradient id="vulkn-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <g>
        {/* V shape with energy lines */}
        <path d="M4 6L16 26L28 6" stroke="url(#vulkn-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M10 6L16 18L22 6" stroke="url(#vulkn-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/>
        {/* Energy spark */}
        <circle cx="16" cy="26" r="2" fill="#06b6d4"/>
        <circle cx="16" cy="26" r="4" fill="#06b6d4" opacity="0.3"/>
      </g>
      {/* Text */}
      <text x="40" y="23" fill="white" fontSize="20" fontWeight="600" fontFamily="Inter, system-ui, sans-serif" letterSpacing="-0.02em">VULKN</text>
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED BACKGROUND - Particles + Moving Gradients
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number; size: number; duration: number; delay: number}>>([])
  
  useEffect(() => {
    setParticles(Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
    })))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#050608]" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[1000px] h-[1000px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 50%)',
          left: '-20%',
          top: '-20%',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
          right: '-15%',
          top: '20%',
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
          left: '30%',
          bottom: '-10%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: 'rgba(6, 182, 212, 0.6)',
            boxShadow: '0 0 6px rgba(6, 182, 212, 0.4)',
          }}
          animate={{
            y: [0, -150],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
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
        scrolled ? 'bg-[#050608]/80 backdrop-blur-2xl border-b border-white/[0.04]' : ''
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
            <VulknLogo className="h-7" />
          </motion.div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {[t.nav.platform, t.nav.solutions, t.nav.enterprise, t.nav.resources].map((item, i) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-[15px] text-white/40 hover:text-white transition-colors duration-200"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
              >
                <span>{current.flag}</span>
                <span className="hidden sm:inline">{current.name}</span>
                <svg className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-44 py-2 rounded-xl bg-[#0c0e12] border border-white/[0.06] shadow-2xl z-50"
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

            {/* Demo Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:block px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/20"
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
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function HeroSection({ t }: { t: typeof content.en }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -80])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center pt-20">
      <motion.div style={{ opacity, y }} className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12 py-20">
        
        {/* Badge with Harvard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10"
        >
          {/* Urgency Badge */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <motion.span
              className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-sm text-cyan-300 font-medium">{t.badge}</span>
          </div>
          
          {/* Harvard */}
          <div className="flex items-center gap-2.5">
            <svg className="w-6 h-7" viewBox="0 0 30 36" fill="none">
              <path d="M15 0L0 6v12c0 9.94 6.4 19.24 15 22 8.6-2.76 15-12.06 15-22V6L15 0z" fill="#A51C30"/>
              <text x="15" y="22" textAnchor="middle" fill="white" fontSize="13" fontFamily="serif" fontWeight="bold">H</text>
            </svg>
            <span className="text-sm text-white/40">Harvard Innovation Labs</span>
          </div>
        </motion.div>

        {/* Headline */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] mb-2"
          >
            <span className="text-white">{t.headline1}</span>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
          >
            <motion.span
              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-[length:200%_auto] bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              {t.headline2}
            </motion.span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-center text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(6, 182, 212, 0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-4 text-[15px] font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl transition-all duration-300"
          >
            {t.cta1}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, borderColor: 'rgba(6, 182, 212, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-4 text-[15px] font-medium text-white/60 hover:text-white border border-white/10 hover:border-cyan-500/40 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            {t.cta2}
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-16"
        >
          {t.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-semibold text-white mb-1">
                <span className="text-cyan-400">{stat.value}</span>
              </div>
              <div className="text-sm text-white/30">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-white/20 uppercase tracking-[0.2em]">{t.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-cyan-400"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURES SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function FeaturesSection() {
  const features = [
    { 
      icon: '◆', 
      title: 'Autonomous Operations', 
      desc: 'AI agents that execute complex business processes 24/7 without human intervention.',
      color: 'cyan'
    },
    { 
      icon: '◇', 
      title: 'Enterprise Security', 
      desc: 'SOC 2 Type II compliant. Your data never leaves your infrastructure.',
      color: 'blue'
    },
    { 
      icon: '○', 
      title: 'Rapid Deployment', 
      desc: 'Full integration with your existing stack in under one week.',
      color: 'indigo'
    },
  ]

  return (
    <section className="relative py-32 border-t border-white/[0.03]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
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
              className="p-8 rounded-2xl bg-white/[0.01] border border-white/[0.04] transition-all duration-300"
            >
              <div className={`text-2xl mb-5 ${f.color === 'cyan' ? 'text-cyan-400' : f.color === 'blue' ? 'text-blue-400' : 'text-indigo-400'}`}>
                {f.icon}
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
  if (!mounted) return <div className="min-h-screen bg-[#050608]" />

  return (
    <main className="min-h-screen bg-[#050608] text-white antialiased">
      <AnimatedBackground />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <HeroSection t={t} />
      <FeaturesSection />
    </main>
  )
}

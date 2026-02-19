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
    badge: 'Now accepting enterprise partners',
    headline: 'Enterprise AI that operates your business',
    subtitle: 'VULKN is the autonomous business platform trusted by industry leaders to build, operate, and scale digital operations without limits.',
    cta1: 'Schedule Consultation',
    cta2: 'View Case Studies',
    stats: [
      { value: '$2.4M', label: 'Average annual savings' },
      { value: '47%', label: 'Operational efficiency gain' },
      { value: '< 7 days', label: 'Time to deployment' },
    ],
    scroll: 'Discover the platform',
  },
  es: {
    nav: { platform: 'Plataforma', solutions: 'Soluciones', enterprise: 'Empresas', resources: 'Recursos', demo: 'Solicitar Demo' },
    badge: 'Aceptando socios empresariales',
    headline: 'IA empresarial que opera tu negocio',
    subtitle: 'VULKN es la plataforma autónoma de negocios en la que confían líderes de la industria para construir, operar y escalar operaciones digitales sin límites.',
    cta1: 'Agendar Consulta',
    cta2: 'Ver Casos de Éxito',
    stats: [
      { value: '$2.4M', label: 'Ahorro anual promedio' },
      { value: '47%', label: 'Ganancia en eficiencia' },
      { value: '< 7 días', label: 'Tiempo de implementación' },
    ],
    scroll: 'Descubre la plataforma',
  },
  pt: {
    nav: { platform: 'Plataforma', solutions: 'Soluções', enterprise: 'Empresas', resources: 'Recursos', demo: 'Solicitar Demo' },
    badge: 'Aceitando parceiros empresariais',
    headline: 'IA empresarial que opera seu negócio',
    subtitle: 'VULKN é a plataforma autônoma de negócios confiada por líderes da indústria para construir, operar e escalar operações digitais sem limites.',
    cta1: 'Agendar Consulta',
    cta2: 'Ver Casos de Sucesso',
    stats: [
      { value: '$2.4M', label: 'Economia anual média' },
      { value: '47%', label: 'Ganho em eficiência' },
      { value: '< 7 dias', label: 'Tempo de implementação' },
    ],
    scroll: 'Descubra a plataforma',
  },
  fr: {
    nav: { platform: 'Plateforme', solutions: 'Solutions', enterprise: 'Entreprise', resources: 'Ressources', demo: 'Demander une Démo' },
    badge: 'Partenaires entreprise acceptés',
    headline: 'IA d\'entreprise qui gère votre business',
    subtitle: 'VULKN est la plateforme d\'affaires autonome à laquelle font confiance les leaders de l\'industrie pour construire, opérer et développer des opérations digitales sans limites.',
    cta1: 'Planifier une Consultation',
    cta2: 'Voir les Études de Cas',
    stats: [
      { value: '$2.4M', label: 'Économies annuelles moyennes' },
      { value: '47%', label: 'Gain d\'efficacité' },
      { value: '< 7 jours', label: 'Délai de déploiement' },
    ],
    scroll: 'Découvrir la plateforme',
  },
}

type Lang = keyof typeof content

// ═══════════════════════════════════════════════════════════════════════════════
// PREMIUM BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════════

function PremiumBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#08090d]" />
      
      {/* Subtle gradient mesh */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(30,58,138,0.15),transparent_70%)]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(30,64,175,0.1),transparent_70%)]" />
      </div>
      
      {/* Noise texture for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '120px 120px',
        }}
      />
      
      {/* Bottom gradient for scroll hint */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#08090d] to-transparent" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVBAR - Enterprise Level
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#08090d]/90 backdrop-blur-2xl border-b border-white/[0.04]' : ''
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">V</span>
            </div>
            <span className="text-white font-medium text-lg tracking-tight">VULKN</span>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {[t.nav.platform, t.nav.solutions, t.nav.enterprise, t.nav.resources].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[15px] text-white/50 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5">
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-sm"
              >
                <span>{current.flag}</span>
                <span className="hidden sm:inline">{current.name}</span>
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                      className="absolute right-0 mt-3 w-44 py-2 rounded-lg bg-[#12141a] border border-white/[0.06] shadow-2xl z-50"
                    >
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code as Lang); setLangOpen(false) }}
                          className={`w-full px-4 py-2.5 flex items-center gap-3 text-sm transition-colors ${
                            lang === l.code ? 'text-white bg-white/[0.04]' : 'text-white/60 hover:text-white hover:bg-white/[0.02]'
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
            <button className="hidden sm:block px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-200">
              {t.nav.demo}
            </button>
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
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center pt-20">
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12 py-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-6 mb-12"
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm text-white/60">{t.badge}</span>
          </div>
          
          <div className="hidden sm:flex items-center gap-2.5 text-white/40">
            <svg className="w-6 h-7" viewBox="0 0 30 36" fill="none">
              <path d="M15 0L0 6v12c0 9.94 6.4 19.24 15 22 8.6-2.76 15-12.06 15-22V6L15 0z" fill="#A51C30"/>
              <text x="15" y="23" textAnchor="middle" fill="white" fontSize="14" fontFamily="serif" fontWeight="bold">H</text>
            </svg>
            <span className="text-sm">Harvard Innovation Labs</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-white mb-8"
        >
          {t.headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-center text-lg md:text-xl text-white/40 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          {t.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button className="w-full sm:w-auto px-8 py-4 text-[15px] font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/20">
            {t.cta1}
          </button>
          <button className="w-full sm:w-auto px-8 py-4 text-[15px] font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200">
            {t.cta2}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
        >
          {t.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-semibold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-white/30 uppercase tracking-widest">{t.scroll}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURES PREVIEW (Interactive scroll section)
// ═══════════════════════════════════════════════════════════════════════════════

function FeaturesPreview() {
  return (
    <section className="relative py-32 border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-sm text-blue-400 font-medium uppercase tracking-wider mb-4 block">Platform Overview</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-6">
            Built for enterprise scale
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto">
            A unified platform that handles everything from customer acquisition to operational management.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Autonomous Operations', desc: 'AI agents that execute complex business processes without human intervention.', icon: '◈' },
            { title: 'Enterprise Security', desc: 'SOC 2 Type II compliant with end-to-end encryption and data residency controls.', icon: '◇' },
            { title: 'Seamless Integration', desc: 'Connect with your existing stack through 200+ native integrations.', icon: '○' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
            >
              <div className="text-2xl text-blue-400 mb-5">{feature.icon}</div>
              <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SOCIAL PROOF
// ═══════════════════════════════════════════════════════════════════════════════

function SocialProof() {
  return (
    <section className="py-20 border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-white/30 uppercase tracking-wider mb-12"
        >
          Trusted by industry leaders
        </motion.p>
        
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-40">
          {['ENTERPRISE', 'GLOBAL CORP', 'TECH LEADER', 'INNOVATE CO', 'FUTURE INC'].map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-xl font-semibold text-white/60 tracking-wider"
            >
              {name}
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
  if (!mounted) return <div className="min-h-screen bg-[#08090d]" />

  return (
    <main className="min-h-screen bg-[#08090d] text-white antialiased">
      <PremiumBackground />
      <Navbar lang={lang} setLang={setLang} t={t} />
      <HeroSection t={t} />
      <FeaturesPreview />
      <SocialProof />
    </main>
  )
}

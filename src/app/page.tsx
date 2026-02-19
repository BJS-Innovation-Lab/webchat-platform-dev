'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
  { code: 'fr', label: 'FR' },
]

const content = {
  en: {
    nav: ['How It Works', 'Features', 'Pricing'],
    demo: 'Request Demo',
    badge: 'Limited spots for Q1 2025',
    h1a: 'Deploy in 6 days',
    h1b: 'what takes others 6 months.',
    sub: 'VULKN is the autonomous AI platform that builds, operates, and scales your entire digital business — while your competitors are still hiring.',
    cta1: 'Start Your Transformation',
    cta2: 'Watch Demo',
    s1: { v: '$2.4M', l: 'AVERAGE ANNUAL SAVINGS' },
    s2: { v: '47%', l: 'EFFICIENCY INCREASE' },
    s3: { v: '6 days', l: 'TO FULL DEPLOYMENT' },
  },
  es: {
    nav: ['Cómo Funciona', 'Características', 'Precios'],
    demo: 'Solicitar Demo',
    badge: 'Cupos limitados Q1 2025',
    h1a: 'Despliega en 6 días',
    h1b: 'lo que a otros les toma 6 meses.',
    sub: 'VULKN es la plataforma de IA autónoma que construye, opera y escala todo tu negocio digital — mientras tu competencia sigue contratando.',
    cta1: 'Inicia Tu Transformación',
    cta2: 'Ver Demo',
    s1: { v: '$2.4M', l: 'AHORRO ANUAL PROMEDIO' },
    s2: { v: '47%', l: 'AUMENTO EN EFICIENCIA' },
    s3: { v: '6 días', l: 'PARA IMPLEMENTACIÓN' },
  },
  pt: {
    nav: ['Como Funciona', 'Recursos', 'Preços'],
    demo: 'Solicitar Demo',
    badge: 'Vagas limitadas Q1 2025',
    h1a: 'Implante em 6 dias',
    h1b: 'o que outros levam 6 meses.',
    sub: 'VULKN é a plataforma de IA autônoma que constrói, opera e escala todo o seu negócio digital — enquanto sua concorrência ainda está contratando.',
    cta1: 'Inicie Sua Transformação',
    cta2: 'Ver Demo',
    s1: { v: '$2.4M', l: 'ECONOMIA ANUAL MÉDIA' },
    s2: { v: '47%', l: 'AUMENTO EM EFICIÊNCIA' },
    s3: { v: '6 dias', l: 'PARA IMPLEMENTAÇÃO' },
  },
  fr: {
    nav: ['Fonctionnement', 'Fonctionnalités', 'Tarifs'],
    demo: 'Demander Démo',
    badge: 'Places limitées Q1 2025',
    h1a: 'Déployez en 6 jours',
    h1b: 'ce qui prend 6 mois aux autres.',
    sub: 'VULKN est la plateforme IA autonome qui construit, opère et fait évoluer toute votre entreprise digitale — pendant que vos concurrents recrutent.',
    cta1: 'Démarrez Votre Transformation',
    cta2: 'Voir Démo',
    s1: { v: '$2.4M', l: 'ÉCONOMIES ANNUELLES' },
    s2: { v: '47%', l: "GAIN D'EFFICACITÉ" },
    s3: { v: '6 jours', l: 'POUR DÉPLOIEMENT' },
  },
}

type Lang = keyof typeof content

// ═══════════════════════════════════════════════════════════════════════════════
// PREMIUM BACKGROUND - VISIBLE DEPTH
// ═══════════════════════════════════════════════════════════════════════════════

function PremiumBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Pure black base */}
      <div className="absolute inset-0 bg-black" />
      
      {/* VISIBLE cyan glow - top left */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.05) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* VISIBLE blue glow - right */}
      <motion.div
        className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      
      {/* VISIBLE purple glow - bottom */}
      <motion.div
        className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[40vw] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />
      
      {/* Grid overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
      
      {/* Floating particles - VISIBLE */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 2,
            height: Math.random() * 3 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? 'rgba(6,182,212,0.8)' : 'rgba(255,255,255,0.5)',
            boxShadow: i % 2 === 0 ? '0 0 10px rgba(6,182,212,0.5)' : 'none',
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HARVARD SHIELD - REAL DESIGN
// ═══════════════════════════════════════════════════════════════════════════════

function HarvardShield() {
  return (
    <svg className="w-8 h-10" viewBox="0 0 40 50" fill="none">
      {/* Shield shape */}
      <path 
        d="M20 0C8.954 0 0 4 0 4v26c0 12 20 20 20 20s20-8 20-20V4S31.046 0 20 0z" 
        fill="#A41034"
      />
      {/* Inner border */}
      <path 
        d="M20 3C10.5 3 3 6 3 6v23c0 10 17 17 17 17s17-7 17-17V6S29.5 3 20 3z" 
        fill="none"
        stroke="#FFD700"
        strokeWidth="0.5"
        opacity="0.3"
      />
      {/* VERITAS text arranged in books */}
      <text x="20" y="18" textAnchor="middle" fill="white" fontSize="6" fontFamily="serif" fontWeight="bold" letterSpacing="0.5">VE RI TAS</text>
      {/* Three books */}
      <rect x="8" y="22" width="8" height="6" rx="0.5" fill="#FFD700" opacity="0.2" stroke="white" strokeWidth="0.3"/>
      <rect x="16" y="22" width="8" height="6" rx="0.5" fill="#FFD700" opacity="0.2" stroke="white" strokeWidth="0.3"/>
      <rect x="24" y="22" width="8" height="6" rx="0.5" fill="#FFD700" opacity="0.2" stroke="white" strokeWidth="0.3"/>
      {/* Book text */}
      <text x="12" y="26.5" textAnchor="middle" fill="white" fontSize="4" fontFamily="serif">VE</text>
      <text x="20" y="26.5" textAnchor="middle" fill="white" fontSize="4" fontFamily="serif">RI</text>
      <text x="28" y="26.5" textAnchor="middle" fill="white" fontSize="4" fontFamily="serif">TAS</text>
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PREMIUM BUTTON
// ═══════════════════════════════════════════════════════════════════════════════

function PremiumButton({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) {
  if (primary) {
    return (
      <motion.button
        className="relative group"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Glow layer - VISIBLE */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-70 blur-lg group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Button */}
        <div className="relative px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 overflow-hidden">
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          
          {/* Inner glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10" />
          
          <span className="relative z-10 text-white font-semibold text-lg flex items-center gap-3">
            {children}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </span>
        </div>
      </motion.button>
    )
  }
  
  return (
    <motion.button
      className="group px-10 py-5 rounded-xl border-2 border-white/20 hover:border-cyan-400/50 bg-white/5 hover:bg-white/10 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-white/70 group-hover:text-white font-medium text-lg flex items-center gap-3">
        <span className="text-cyan-400">▶</span>
        {children}
      </span>
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [langOpen, setLangOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const t = content[lang]

  useEffect(() => { setMounted(true) }, [])
  
  if (!mounted) return <div className="min-h-screen bg-black" />

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <PremiumBackground />
      
      {/* ═══════════════════════════════════════════════════════════════════════
          NAVBAR
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-cyan-400/50 blur-xl opacity-50" />
            </div>
            <span className="text-2xl font-semibold tracking-tight">VULKN</span>
          </motion.div>
          
          {/* Center links */}
          <div className="hidden md:flex items-center gap-12">
            {t.nav.map((item, i) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                className="text-white/50 hover:text-white transition-colors text-[15px] font-medium"
              >
                {item}
              </motion.a>
            ))}
          </div>
          
          {/* Right */}
          <div className="flex items-center gap-6">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium"
              >
                {lang.toUpperCase()}
                <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-3 py-2 rounded-xl bg-black/90 border border-white/10 backdrop-blur-xl z-50"
                    >
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLang(l.code as Lang); setLangOpen(false) }}
                          className={`w-full px-6 py-2 text-left text-sm ${lang === l.code ? 'text-cyan-400' : 'text-white/60 hover:text-white'}`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            
            {/* Demo button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="hidden sm:block px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-sm font-medium transition-all"
            >
              {t.demo}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20">
        <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
          
          {/* Badge + Harvard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-6 mb-12"
          >
            {/* Badge */}
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
              <motion.span
                className="w-2.5 h-2.5 rounded-full bg-cyan-400"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-cyan-300 text-sm font-medium">{t.badge}</span>
            </div>
            
            {/* Harvard */}
            <div className="flex items-center gap-3">
              <HarvardShield />
              <span className="text-white/40 text-sm font-medium">Harvard Innovation Labs</span>
            </div>
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8"
          >
            <span className="text-white">{t.h1a}</span>
            <br />
            <span 
              className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
              style={{
                backgroundSize: '200% auto',
                animation: 'gradient-shift 4s ease infinite',
              }}
            >
              {t.h1b}
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-white/40 max-w-3xl mx-auto mb-14 leading-relaxed"
          >
            {t.sub}
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
          >
            <PremiumButton primary>{t.cta1}</PremiumButton>
            <PremiumButton>{t.cta2}</PremiumButton>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-16 sm:gap-24"
          >
            {[t.s1, t.s2, t.s3].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-6xl md:text-7xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.v}
                  </span>
                </div>
                <div className="text-xs text-white/30 tracking-[0.2em] uppercase">{stat.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 rounded-full bg-cyan-400"
            />
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}

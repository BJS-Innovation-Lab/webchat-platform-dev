'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

const content = {
  en: {
    badge: 'Now accepting enterprise partners',
    h1a: 'Deploy in 6 days',
    h1b: 'what takes others 6 months.',
    sub: 'VULKN is the autonomous AI platform that builds, operates, and scales your entire digital business — while your competitors are still hiring.',
    cta: 'Get Started',
    cta2: 'Book a demo',
    s1: { v: '$2.4M', l: 'Avg. annual savings' },
    s2: { v: '47%', l: 'Efficiency gain' },
    s3: { v: '6 days', l: 'To deployment' },
  },
  es: {
    badge: 'Aceptando socios empresariales',
    h1a: 'Despliega en 6 días',
    h1b: 'lo que a otros les toma 6 meses.',
    sub: 'VULKN es la plataforma de IA autónoma que construye, opera y escala todo tu negocio digital — mientras tu competencia sigue contratando.',
    cta: 'Comenzar',
    cta2: 'Agendar demo',
    s1: { v: '$2.4M', l: 'Ahorro anual prom.' },
    s2: { v: '47%', l: 'Ganancia eficiencia' },
    s3: { v: '6 días', l: 'Para implementar' },
  },
}

type Lang = 'en' | 'es'

// ═══════════════════════════════════════════════════════════════════════════════
// MINIMAL BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════════

function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[#09090b]" />
      
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
      
      {/* Grid */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
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
  if (!mounted) return null

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <Background />
      
      {/* ═══════════════════════════════════════════════════════════════════════
          NAVBAR - Ultra minimal like Linear
          ═══════════════════════════════════════════════════════════════════════ */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo - simple text */}
          <span className="text-lg font-semibold tracking-tight">VULKN</span>
          
          {/* Right - just language toggle */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="text-sm text-white/40 hover:text-white/80 transition-colors"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          
          {/* Badge + Harvard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 mb-10"
          >
            <span className="text-sm text-white/40">{t.badge}</span>
            <span className="text-white/20">·</span>
            <span className="text-sm text-white/40">Harvard Innovation Labs</span>
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.04em] leading-[1.1] mb-8"
          >
            <span className="text-white">{t.h1a}</span>
            <br />
            <span className="text-white/40">{t.h1b}</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t.sub}
          </motion.p>
          
          {/* CTAs - Clean, minimal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mb-20"
          >
            {/* Primary - solid white */}
            <button className="px-6 py-3 bg-white text-black text-sm font-medium rounded-lg hover:bg-white/90 transition-colors">
              {t.cta}
            </button>
            
            {/* Secondary - outline */}
            <button className="px-6 py-3 text-white/60 text-sm font-medium hover:text-white transition-colors">
              {t.cta2} →
            </button>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex items-center justify-center gap-12 sm:gap-20"
          >
            {[t.s1, t.s2, t.s3].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">{stat.v}</div>
                <div className="text-xs text-white/30 mt-1 uppercase tracking-wider">{stat.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

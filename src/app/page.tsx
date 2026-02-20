'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

const content = {
  en: {
    tagline: 'The Future of Enterprise',
    h1: 'Deploy in 6 days\nwhat takes others\n6 months.',
    sub: 'VULKN is the autonomous AI platform that builds, operates, and scales your entire digital business.',
    cta: 'Begin Your Journey',
    cta2: 'Schedule a Conversation',
    stats: [
      { value: '$2.4M', label: 'Average Annual Savings' },
      { value: '47%', label: 'Efficiency Improvement' },
      { value: '6 Days', label: 'To Full Deployment' },
    ],
    trusted: 'Trusted by Harvard Innovation Labs',
  },
  es: {
    tagline: 'El Futuro Empresarial',
    h1: 'Despliega en 6 días\nlo que a otros les toma\n6 meses.',
    sub: 'VULKN es la plataforma de IA autónoma que construye, opera y escala todo tu negocio digital.',
    cta: 'Comienza Tu Viaje',
    cta2: 'Agenda una Conversación',
    stats: [
      { value: '$2.4M', label: 'Ahorro Anual Promedio' },
      { value: '47%', label: 'Mejora en Eficiencia' },
      { value: '6 Días', label: 'Para Implementación' },
    ],
    trusted: 'Respaldado por Harvard Innovation Labs',
  },
}

type Lang = 'en' | 'es'

// ═══════════════════════════════════════════════════════════════════════════════
// ELEGANT BACKGROUND - Subtle, sophisticated
// ═══════════════════════════════════════════════════════════════════════════════

function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#0C0C0C]" />
      
      {/* Subtle warm gradient - top */}
      <div 
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1400px] h-[1400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(201,169,98,0.04) 0%, transparent 60%)',
        }}
      />
      
      {/* Very subtle side accents */}
      <div 
        className="absolute top-1/3 -left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,245,243,0.015) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HARVARD SHIELD - Elegant, subtle
// ═══════════════════════════════════════════════════════════════════════════════

function HarvardShield({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} fill="none">
      <path 
        d="M16 0L32 6.5V25C32 32 24 38 16 40C8 38 0 32 0 25V6.5L16 0Z" 
        fill="#A51C30"
      />
      {/* Books simplified but proper */}
      <rect x="5" y="10" width="9" height="7" rx="0.5" fill="#F5F5F3"/>
      <rect x="18" y="10" width="9" height="7" rx="0.5" fill="#F5F5F3"/>
      <rect x="11.5" y="20" width="9" height="7" rx="0.5" fill="#F5F5F3"/>
      {/* VERITAS text */}
      <text x="9.5" y="15.5" fill="#A51C30" fontSize="3.5" fontWeight="600" fontFamily="serif">VE</text>
      <text x="22.5" y="15.5" fill="#A51C30" fontSize="3.5" fontWeight="600" fontFamily="serif" textAnchor="middle">RI</text>
      <text x="16" y="25.5" fill="#A51C30" fontSize="3.5" fontWeight="600" fontFamily="serif" textAnchor="middle">TAS</text>
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVBAR - Minimal, refined
// ═══════════════════════════════════════════════════════════════════════════════

function Navbar({ lang, setLang }: { lang: Lang, setLang: (l: Lang) => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 reveal-1">
      <div className="max-w-6xl mx-auto px-8 h-24 flex items-center justify-between">
        {/* Logo - Simple, elegant */}
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wide">VULKN</span>
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="text-sm text-[#6B6B69] hover:text-[#A8A8A6] transition-colors duration-500"
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </button>
          
          <button className="text-sm text-[#A8A8A6] hover:text-[#F5F5F3] transition-colors duration-500">
            Contact
          </button>
        </div>
      </div>
    </nav>
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
  
  if (!mounted) {
    return <div className="min-h-screen bg-[#0C0C0C]" />
  }

  // Split headline for styling
  const lines = t.h1.split('\n')

  return (
    <main className="min-h-screen relative">
      <Background />
      <div className="noise" />
      <Navbar lang={lang} setLang={setLang} />
      
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO - Elegant, premium, Steve Jobs approved
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Tagline */}
          <div className="mb-8 reveal-2">
            <span className="text-sm tracking-[0.3em] uppercase text-[#C9A962]">
              {t.tagline}
            </span>
          </div>
          
          {/* Divider */}
          <div className="divider mx-auto mb-16 reveal-2" />
          
          {/* HEADLINE - The star, elegant serif */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-0.02em] leading-[1.1] mb-16 reveal-3">
            {lines.map((line, i) => (
              <span key={i} className="block">
                {line.includes('6') ? (
                  // Emphasize the numbers
                  line.split(/(\d+\s*\w+)/).map((part, j) => (
                    part.match(/\d/) ? (
                      <span key={j} className="text-[#C9A962]">{part}</span>
                    ) : (
                      <span key={j} className={i === 2 ? 'text-[#6B6B69]' : ''}>{part}</span>
                    )
                  ))
                ) : (
                  <span className={i === 1 ? 'text-[#A8A8A6]' : ''}>{line}</span>
                )}
              </span>
            ))}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#6B6B69] max-w-xl mx-auto mb-16 leading-relaxed reveal-4">
            {t.sub}
          </p>
          
          {/* CTAs - Refined, premium */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24 reveal-5">
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.cta}
            </motion.button>
            
            <motion.button 
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.cta2}
            </motion.button>
          </div>
          
          {/* Stats - Clean, minimal */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16 max-w-3xl mx-auto mb-20 reveal-6">
            {t.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-[#F5F5F3] mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-[#6B6B69] uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Harvard - Subtle, prestigious */}
          <div className="flex items-center justify-center gap-4 reveal-7">
            <HarvardShield className="w-6 h-8 opacity-60" />
            <span className="text-sm text-[#6B6B69] tracking-wide">
              {t.trusted}
            </span>
          </div>
        </div>
        
        {/* Scroll hint - Very subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-gradient-to-b from-[#6B6B69] to-transparent"
          />
        </motion.div>
      </section>
    </main>
  )
}

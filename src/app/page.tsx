'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// Language options
const languages = [
  { code: 'es', label: 'ES', name: 'Español' },
  { code: 'en', label: 'EN', name: 'English' },
]

// Content translations
const content = {
  es: {
    headline: 'Construye tu empresa digital completa con un solo agente',
    subtitle: 'VULKN ejecuta, automatiza y escala — mientras tú diriges.',
    cta_primary: 'Comenzar ahora',
    cta_secondary: 'Ver demostración',
    trust_deploy: 'Deploy en 5 minutos',
    trust_data: 'Tus datos, tu control',
    trust_uptime: '99.9% disponibilidad',
  },
  en: {
    headline: 'Build your entire digital business with one agent',
    subtitle: 'VULKN executes, automates and scales — while you lead.',
    cta_primary: 'Get started',
    cta_secondary: 'Watch demo',
    trust_deploy: '5-minute deploy',
    trust_data: 'Your data, your control',
    trust_uptime: '99.9% uptime',
  },
}

// Language Selector Component
function LanguageSelector({ 
  currentLang, 
  onChangeLang 
}: { 
  currentLang: 'es' | 'en'
  onChangeLang: (lang: 'es' | 'en') => void 
}) {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-200 text-white/90 hover:text-white"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
        <span className="font-medium">{languages.find(l => l.code === currentLang)?.label}</span>
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-40 rounded-xl border border-white/20 bg-[#0a1628]/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onChangeLang(lang.code as 'es' | 'en')
                setIsOpen(false)
              }}
              className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center justify-between ${
                currentLang === lang.code ? 'text-cyan-400' : 'text-white/80'
              }`}
            >
              <span>{lang.name}</span>
              {currentLang === lang.code && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default function Home() {
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const t = content[lang]

  return (
    <main className="min-h-screen bg-[#0a1628]">
      {/* ══════════════════════════════════════════════════════════════════════
          BLOQUE 1 — HERO
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1d35] to-[#0a1628] pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Navbar */}
        <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 lg:px-20 py-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">VULKN</span>
          </div>
          
          {/* Language Selector - Most important element */}
          <LanguageSelector currentLang={lang} onChangeLang={setLang} />
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              {t.headline}
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/60 max-w-2xl mx-auto mb-10">
              {t.subtitle}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 w-full sm:w-auto"
              >
                {t.cta_primary}
              </motion.button>
              
              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 font-medium text-lg transition-all duration-300 w-full sm:w-auto"
              >
                {t.cta_secondary}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 border-t border-white/10"
        >
          <div className="max-w-5xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
              {/* Trust Point 1 - Deploy Time */}
              <div className="flex items-center gap-3 text-white/50">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium">{t.trust_deploy}</span>
              </div>
              
              {/* Divider */}
              <div className="hidden md:block w-px h-4 bg-white/20" />
              
              {/* Trust Point 2 - Data Ownership */}
              <div className="flex items-center gap-3 text-white/50">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span className="text-sm font-medium">{t.trust_data}</span>
              </div>
              
              {/* Divider */}
              <div className="hidden md:block w-px h-4 bg-white/20" />
              
              {/* Trust Point 3 - Uptime */}
              <div className="flex items-center gap-3 text-white/50">
                <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">{t.trust_uptime}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

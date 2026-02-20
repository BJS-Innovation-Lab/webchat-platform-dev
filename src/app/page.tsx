'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

const content = {
  en: {
    badge: 'Limited spots for Q1 2025',
    h1a: 'Deploy in',
    h1b: '6 days',
    h1c: 'what takes others',
    h1d: '6 months',
    sub: 'VULKN is the autonomous AI platform that builds, operates, and scales your entire digital business — while your competitors are still hiring.',
    cta: 'Start Your Transformation',
    cta2: 'Book a Demo',
    stats: [
      { value: '$2.4M', label: 'Avg. annual savings' },
      { value: '47%', label: 'Efficiency gain' },
      { value: '6', label: 'Days to deploy', suffix: 'days' },
    ],
  },
  es: {
    badge: 'Plazas limitadas para Q1 2025',
    h1a: 'Despliega en',
    h1b: '6 días',
    h1c: 'lo que a otros les toma',
    h1d: '6 meses',
    sub: 'VULKN es la plataforma de IA autónoma que construye, opera y escala todo tu negocio digital — mientras tu competencia sigue contratando.',
    cta: 'Inicia Tu Transformación',
    cta2: 'Agendar Demo',
    stats: [
      { value: '$2.4M', label: 'Ahorro anual prom.' },
      { value: '47%', label: 'Ganancia eficiencia' },
      { value: '6', label: 'Días para implementar', suffix: 'días' },
    ],
  },
}

type Lang = 'en' | 'es'

// ═══════════════════════════════════════════════════════════════════════════════
// GRADIENT MESH BACKGROUND - Linear style
// ═══════════════════════════════════════════════════════════════════════════════

function GradientMesh() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base void */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Main gradient orb - top center */}
      <motion.div 
        className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary orb - left */}
      <motion.div 
        className="absolute top-1/4 -left-[20%] w-[800px] h-[800px] animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 60%)',
          filter: 'blur(100px)',
          animationDelay: '2s',
        }}
      />
      
      {/* Tertiary orb - right bottom */}
      <motion.div 
        className="absolute -bottom-[10%] -right-[10%] w-[700px] h-[700px] animate-morph"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.1) 0%, rgba(255,107,53,0.05) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle center glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 50%)',
          filter: 'blur(60px)',
        }}
      />
      
      {/* Grid overlay - very subtle */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// FLOATING PARTICLES
// ═══════════════════════════════════════════════════════════════════════════════

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 15,
    delay: Math.random() * 5,
    glow: i % 4 === 0,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.glow ? 'rgba(0,240,255,0.8)' : 'rgba(255,255,255,0.2)',
            boxShadow: p.glow ? '0 0 15px rgba(0,240,255,0.5)' : 'none',
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HARVARD VERITAS SHIELD - Proper design
// ═══════════════════════════════════════════════════════════════════════════════

function HarvardShield({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} fill="none">
      {/* Shield shape */}
      <path 
        d="M20 0L40 8V28C40 38 30 46 20 48C10 46 0 38 0 28V8L20 0Z" 
        fill="#A51C30"
      />
      {/* Inner border */}
      <path 
        d="M20 2L38 9V28C38 36.5 29 44 20 46C11 44 2 36.5 2 28V9L20 2Z" 
        fill="none"
        stroke="#C41E3A"
        strokeWidth="0.5"
      />
      {/* Three books */}
      {/* Top left book */}
      <rect x="6" y="12" width="12" height="9" rx="1" fill="#FFF" fillOpacity="0.95"/>
      <line x1="12" y1="12" x2="12" y2="21" stroke="#A51C30" strokeWidth="0.5"/>
      <text x="12" y="18" textAnchor="middle" fill="#A51C30" fontSize="5" fontWeight="bold" fontFamily="Georgia, serif">VE</text>
      
      {/* Top right book */}
      <rect x="22" y="12" width="12" height="9" rx="1" fill="#FFF" fillOpacity="0.95"/>
      <line x1="28" y1="12" x2="28" y2="21" stroke="#A51C30" strokeWidth="0.5"/>
      <text x="28" y="18" textAnchor="middle" fill="#A51C30" fontSize="5" fontWeight="bold" fontFamily="Georgia, serif">RI</text>
      
      {/* Bottom book */}
      <rect x="14" y="24" width="12" height="9" rx="1" fill="#FFF" fillOpacity="0.95"/>
      <line x1="20" y1="24" x2="20" y2="33" stroke="#A51C30" strokeWidth="0.5"/>
      <text x="20" y="30" textAnchor="middle" fill="#A51C30" fontSize="5" fontWeight="bold" fontFamily="Georgia, serif">TAS</text>
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════════════════════

function Navbar({ lang, setLang }: { lang: Lang, setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 reveal-1 ${
      scrolled ? 'backdrop-blur-2xl bg-black/60 border-b border-white/5' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#00B4D8] flex items-center justify-center animate-glow-pulse">
              <span className="font-display font-bold text-black text-lg">V</span>
            </div>
          </div>
          <span className="font-display text-2xl font-bold tracking-tight">VULKN</span>
        </div>
        
        {/* Center nav */}
        <div className="hidden lg:flex items-center gap-10">
          {['How It Works', 'Features', 'Pricing', 'Case Studies'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-sm text-[#888] hover:text-white transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#00F0FF] to-transparent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-5">
          {/* Language */}
          <button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="text-sm text-[#666] hover:text-white transition-colors font-medium"
          >
            {lang.toUpperCase()}
          </button>
          
          {/* CTA */}
          <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-all hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED STAT
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedStat({ value, label, suffix, delay }: { value: string, label: string, suffix?: string, delay: number }) {
  const [count, setCount] = useState(0)
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
  const hasM = value.includes('M')
  const hasPercent = value.includes('%') || suffix === '%'
  const hasDollar = value.includes('$')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 2000
      const steps = 60
      const increment = numericValue / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setCount(numericValue)
          clearInterval(timer)
        } else {
          setCount(current)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [numericValue, delay])

  const displayValue = hasM 
    ? `${count.toFixed(1)}M`
    : Math.round(count).toString()

  return (
    <div className="text-center group">
      <div className="relative">
        <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight gradient-text-cyan text-glow">
          {hasDollar && '$'}{displayValue}{hasPercent && '%'}{suffix && !hasPercent && ` ${suffix}`}
        </span>
      </div>
      <div className="text-xs sm:text-sm text-[#555] mt-3 uppercase tracking-[0.25em] font-medium">
        {label}
      </div>
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
  
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#00B4D8] animate-pulse" />
      </div>
    )
  }

  return (
    <main className="min-h-screen relative">
      <GradientMesh />
      <Particles />
      <div className="noise" />
      <Navbar lang={lang} setLang={setLang} />
      
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO - The Impact Zone
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          
          {/* Badge Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 reveal-2">
            {/* Status badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#00F0FF]/5 border border-[#00F0FF]/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
              </span>
              <span className="text-sm text-[#00F0FF] font-medium tracking-wide">{t.badge}</span>
            </div>
            
            {/* Harvard badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-sm">
              <HarvardShield className="w-5 h-6" />
              <span className="text-sm text-[#888]">Harvard Innovation Labs</span>
            </div>
          </div>
          
          {/* HEADLINE - The star of the show */}
          <h1 className="font-display font-extrabold tracking-[-0.04em] leading-[0.95] mb-10">
            {/* Line 1 */}
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#888] reveal-3">
              {t.h1a}
            </span>
            {/* Line 2 - THE IMPACT */}
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] gradient-text-cyan text-glow reveal-scale mt-2">
              {t.h1b}
            </span>
            {/* Line 3 */}
            <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#555] reveal-4 mt-4">
              {t.h1c}
            </span>
            {/* Line 4 */}
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white reveal-5 mt-2">
              {t.h1d}<span className="text-[#333]">.</span>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#777] max-w-2xl mx-auto mb-14 leading-relaxed font-body reveal-5">
            {t.sub}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24 reveal-6">
            <button className="btn-epic">
              {t.cta}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <button className="btn-ghost">
              {t.cta2}
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-16 max-w-4xl mx-auto reveal-6">
            {t.stats.map((stat, i) => (
              <AnimatedStat 
                key={i}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={1.2 + i * 0.2}
              />
            ))}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-7 h-12 rounded-full border-2 border-white/10 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 rounded-full bg-[#00F0FF]" />
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}

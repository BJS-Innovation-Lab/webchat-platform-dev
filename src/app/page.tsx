'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

const content = {
  en: {
    badge: 'Limited spots for Q1 2025',
    harvard: 'Harvard Innovation Labs',
    h1a: 'Deploy in 6 days',
    h1b: 'what takes others 6 months.',
    sub: 'VULKN is the autonomous AI platform that builds, operates, and scales your entire digital business — while your competitors are still hiring.',
    cta: 'Start Your Transformation',
    cta2: 'Book a Demo',
    stats: [
      { value: '$2.4M', label: 'Avg. annual savings', suffix: '' },
      { value: '47', label: 'Efficiency gain', suffix: '%' },
      { value: '6', label: 'Days to deployment', suffix: ' days' },
    ],
  },
  es: {
    badge: 'Plazas limitadas para Q1 2025',
    harvard: 'Harvard Innovation Labs',
    h1a: 'Despliega en 6 días',
    h1b: 'lo que a otros les toma 6 meses.',
    sub: 'VULKN es la plataforma de IA autónoma que construye, opera y escala todo tu negocio digital — mientras tu competencia sigue contratando.',
    cta: 'Inicia Tu Transformación',
    cta2: 'Agendar Demo',
    stats: [
      { value: '$2.4M', label: 'Ahorro anual promedio', suffix: '' },
      { value: '47', label: 'Ganancia en eficiencia', suffix: '%' },
      { value: '6', label: 'Días para implementar', suffix: ' días' },
    ],
  },
}

type Lang = 'en' | 'es'

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED BACKGROUND - Gradient Orbs + Particles
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* Gradient orbs - breathing animation */}
      <motion.div 
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full animate-breathe"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full animate-breathe"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDelay: '2s',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      
      {/* Floating particles */}
      <Particles />
    </div>
  )
}

function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.id % 3 === 0 ? 'rgba(0,229,255,0.6)' : 'rgba(255,255,255,0.3)',
            boxShadow: p.id % 3 === 0 ? '0 0 10px rgba(0,229,255,0.4)' : 'none',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// GRAIN OVERLAY
// ═══════════════════════════════════════════════════════════════════════════════

function Grain() {
  return <div className="grain" />
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAGNETIC BUTTON
// ═══════════════════════════════════════════════════════════════════════════════

function MagneticButton({ children, className = '', onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedStat({ value, label, suffix, delay }: { value: string, label: string, suffix: string, delay: number }) {
  const [displayValue, setDisplayValue] = useState('0')
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
  const prefix = value.includes('$') ? '$' : ''

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0
      const end = numericValue
      const duration = 2000
      const increment = end / (duration / 16)
      
      const counter = setInterval(() => {
        start += increment
        if (start >= end) {
          setDisplayValue(value.replace('$', ''))
          clearInterval(counter)
        } else {
          const formatted = value.includes('M') 
            ? start.toFixed(1) + 'M'
            : Math.floor(start).toString()
          setDisplayValue(formatted)
        }
      }, 16)
      
      return () => clearInterval(counter)
    }, delay * 1000)
    
    return () => clearTimeout(timer)
  }, [numericValue, value, delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay + 0.5 }}
      className="text-center group"
    >
      <div className="relative inline-block">
        <span className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#00B8D4] text-glow-cyan">
          {prefix}{displayValue}{suffix}
        </span>
        {/* Glow effect on hover */}
        <motion.div 
          className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(0,229,255,0.2) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      </div>
      <div className="text-xs sm:text-sm text-[#71717A] mt-2 uppercase tracking-[0.2em] font-medium">
        {label}
      </div>
    </motion.div>
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
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-[#050505]/80 border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#00B8D4] flex items-center justify-center">
            <span className="font-display font-bold text-black text-sm">V</span>
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">VULKN</span>
        </motion.div>
        
        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {['How It Works', 'Features', 'Pricing'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-sm text-[#A1A1AA] hover:text-white transition-colors relative group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00E5FF] group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <motion.button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="relative w-16 h-8 rounded-full bg-white/5 border border-white/10 text-xs font-medium overflow-hidden"
            whileHover={{ borderColor: 'rgba(0,229,255,0.3)' }}
          >
            <motion.div
              className="absolute inset-0 flex items-center"
              animate={{ x: lang === 'en' ? 0 : 32 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <span className="w-8 flex justify-center text-white">EN</span>
              <span className="w-8 flex justify-center text-white">ES</span>
            </motion.div>
            <motion.div
              className="absolute top-1 left-1 w-6 h-6 rounded-full bg-[#00E5FF]"
              animate={{ x: lang === 'en' ? 0 : 32 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          </motion.button>
          
          {/* CTA */}
          <MagneticButton className="hidden sm:block btn-secondary text-sm px-5 py-2.5">
            Contact
          </MagneticButton>
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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm"
    >
      {/* Harvard Shield */}
      <div className="w-5 h-6 relative">
        <svg viewBox="0 0 24 30" fill="none" className="w-full h-full">
          <path d="M12 0L24 8V22L12 30L0 22V8L12 0Z" fill="#A51C30"/>
          <text x="12" y="11" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" fontFamily="serif">VE</text>
          <text x="12" y="17" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" fontFamily="serif">RI</text>
          <text x="12" y="23" textAnchor="middle" fill="white" fontSize="4" fontWeight="bold" fontFamily="serif">TAS</text>
        </svg>
      </div>
      <span className="text-sm text-[#A1A1AA]">{text}</span>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')
  const [mounted, setMounted] = useState(false)
  const t = content[lang]

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <Grain />
      <Navbar lang={lang} setLang={setLang} />
      
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Badge row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            {/* Pulse badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5FF]"></span>
              </span>
              <span className="text-sm text-[#00E5FF] font-medium">{t.badge}</span>
            </div>
            
            <HarvardBadge text={t.harvard} />
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[1.05] mb-8"
          >
            <motion.span 
              className="block text-white"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t.h1a}
            </motion.span>
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-[#52525B] to-[#71717A]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {t.h1b}
            </motion.span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-12 leading-relaxed font-body"
          >
            {t.sub}
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <MagneticButton className="btn-primary text-base font-semibold">
              {t.cta}
              <span className="ml-2">→</span>
            </MagneticButton>
            
            <MagneticButton className="btn-secondary text-base">
              {t.cta2}
            </MagneticButton>
          </motion.div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-3xl mx-auto">
            {t.stats.map((stat, i) => (
              <AnimatedStat 
                key={i}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={0.8 + i * 0.2}
              />
            ))}
          </div>
          
          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 rounded-full bg-[#00E5FF]" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

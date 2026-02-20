'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

const content = {
  en: {
    tagline: 'The Future of Enterprise',
    h1_line1: 'Deploy in',
    h1_emphasis: '6 days',
    h1_line2: 'what takes others',
    h1_line3: '6 months',
    sub: 'VULKN is the autonomous AI platform that builds, operates, and scales your entire digital business.',
    cta: 'Begin Your Journey',
    cta2: 'Schedule a Conversation',
    stats: [
      { value: 2.4, prefix: '$', suffix: 'M', label: 'Average Annual Savings' },
      { value: 47, prefix: '', suffix: '%', label: 'Efficiency Improvement' },
      { value: 6, prefix: '', suffix: ' Days', label: 'To Full Deployment' },
    ],
    trusted: 'Trusted by Harvard Innovation Labs',
  },
  es: {
    tagline: 'El Futuro Empresarial',
    h1_line1: 'Despliega en',
    h1_emphasis: '6 días',
    h1_line2: 'lo que a otros les toma',
    h1_line3: '6 meses',
    sub: 'VULKN es la plataforma de IA autónoma que construye, opera y escala todo tu negocio digital.',
    cta: 'Comienza Tu Viaje',
    cta2: 'Agenda una Conversación',
    stats: [
      { value: 2.4, prefix: '$', suffix: 'M', label: 'Ahorro Anual Promedio' },
      { value: 47, prefix: '', suffix: '%', label: 'Mejora en Eficiencia' },
      { value: 6, prefix: '', suffix: ' Días', label: 'Para Implementación' },
    ],
    trusted: 'Respaldado por Harvard Innovation Labs',
  },
}

type Lang = 'en' | 'es'

// ═══════════════════════════════════════════════════════════════════════════════
// INTERACTIVE BACKGROUND - Mouse-following gradient
// ═══════════════════════════════════════════════════════════════════════════════

function InteractiveBackground() {
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 30 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth)
      mouseY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const gradientX = useTransform(smoothX, [0, 1], ['20%', '80%'])
  const gradientY = useTransform(smoothY, [0, 1], ['20%', '80%'])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#0C0C0C]" />
      
      {/* Mouse-following gradient */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: useTransform(
            [gradientX, gradientY],
            ([x, y]) => `radial-gradient(800px circle at ${x} ${y}, rgba(201,169,98,0.07), transparent 60%)`
          ),
        }}
      />
      
      {/* Subtle geometric grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,169,98,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,98,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
        }}
      />
      
      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#C9A962]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#C9A962]/3 to-transparent" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED TEXT REVEAL
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedText({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) {
  const words = text.split(' ')
  
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATED COUNTER
// ═══════════════════════════════════════════════════════════════════════════════

function AnimatedCounter({ value, prefix, suffix, label, delay }: { 
  value: number, prefix: string, suffix: string, label: string, delay: number 
}) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
          const increment = value / steps
          let current = 0
          
          const timer = setInterval(() => {
            current += increment
            if (current >= value) {
              setCount(value)
              clearInterval(timer)
            } else {
              setCount(current)
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  const displayValue = suffix.includes('M') || prefix.includes('$') && suffix.includes('M')
    ? count.toFixed(1)
    : Math.round(count).toString()

  return (
    <motion.div 
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-[#F5F5F3] mb-3">
        {prefix}{displayValue}{suffix}
      </div>
      <div className="text-xs text-[#6B6B69] uppercase tracking-[0.2em]">
        {label}
      </div>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// HARVARD SHIELD - Refined
// ═══════════════════════════════════════════════════════════════════════════════

function HarvardShield({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} fill="none">
      <path 
        d="M16 0L32 6.5V25C32 32 24 38 16 40C8 38 0 32 0 25V6.5L16 0Z" 
        fill="#A51C30"
      />
      <rect x="5" y="10" width="9" height="7" rx="0.5" fill="#F5F5F3"/>
      <rect x="18" y="10" width="9" height="7" rx="0.5" fill="#F5F5F3"/>
      <rect x="11.5" y="20" width="9" height="7" rx="0.5" fill="#F5F5F3"/>
      <text x="9.5" y="15.5" fill="#A51C30" fontSize="3.5" fontWeight="600" fontFamily="Georgia, serif">VE</text>
      <text x="22.5" y="15.5" fill="#A51C30" fontSize="3.5" fontWeight="600" fontFamily="Georgia, serif" textAnchor="middle">RI</text>
      <text x="16" y="25.5" fill="#A51C30" fontSize="3.5" fontWeight="600" fontFamily="Georgia, serif" textAnchor="middle">TAS</text>
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAGNETIC BUTTON
// ═══════════════════════════════════════════════════════════════════════════════

function MagneticButton({ children, primary = false, onClick }: { 
  children: React.ReactNode, primary?: boolean, onClick?: () => void 
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springX = useSpring(x, { stiffness: 200, damping: 20 })
  const springY = useSpring(y, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.1)
    y.set((e.clientY - centerY) * 0.1)
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={primary 
        ? "relative overflow-hidden inline-flex items-center justify-center gap-3 px-10 py-5 font-medium text-[15px] tracking-wide text-[#0C0C0C] bg-[#F5F5F3] rounded-full transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(245,245,243,0.15)]"
        : "inline-flex items-center justify-center gap-3 px-10 py-5 font-medium text-[15px] tracking-wide text-[#A8A8A6] bg-transparent border border-[#2A2A2A] rounded-full transition-all duration-500 hover:text-[#F5F5F3] hover:border-[#404040] hover:bg-white/[0.02]"
      }
    >
      {primary && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'backdrop-blur-xl bg-[#0C0C0C]/80' : ''
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-6xl mx-auto px-8 h-24 flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-display text-2xl tracking-wide">VULKN</span>
        </motion.div>
        
        {/* Center nav - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-10">
          {['Solutions', 'Company', 'Resources'].map((item, i) => (
            <motion.a
              key={item}
              href="#"
              className="text-sm text-[#6B6B69] hover:text-[#F5F5F3] transition-colors duration-500 relative group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A962] group-hover:w-full transition-all duration-500" />
            </motion.a>
          ))}
        </div>
        
        {/* Right side */}
        <div className="flex items-center gap-6">
          <motion.button 
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="text-sm text-[#6B6B69] hover:text-[#A8A8A6] transition-colors duration-500"
            whileHover={{ scale: 1.05 }}
          >
            {lang === 'en' ? 'ES' : 'EN'}
          </motion.button>
          
          <motion.button 
            className="hidden sm:block text-sm text-[#A8A8A6] hover:text-[#F5F5F3] transition-colors duration-500"
            whileHover={{ scale: 1.02 }}
          >
            Contact
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// FLOATING DECORATIVE ELEMENTS
// ═══════════════════════════════════════════════════════════════════════════════

function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating orb 1 */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-2 h-2 rounded-full bg-[#C9A962]/30"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating orb 2 */}
      <motion.div
        className="absolute top-1/3 right-[15%] w-1.5 h-1.5 rounded-full bg-[#F5F5F3]/20"
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      {/* Floating orb 3 */}
      <motion.div
        className="absolute bottom-1/3 left-[20%] w-1 h-1 rounded-full bg-[#C9A962]/40"
        animate={{
          y: [0, -25, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NOISE OVERLAY
// ═══════════════════════════════════════════════════════════════════════════════

function Noise() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
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
      <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-[#C9A962]/30 border-t-[#C9A962] rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <InteractiveBackground />
      <FloatingElements />
      <Noise />
      <Navbar lang={lang} setLang={setLang} />
      
      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-24">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Tagline */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm tracking-[0.3em] uppercase text-[#C9A962]">
              {t.tagline}
            </span>
          </motion.div>
          
          {/* Divider */}
          <motion.div 
            className="w-16 h-px mx-auto mb-16 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
          
          {/* HEADLINE */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-0.02em] leading-[1.1] mb-16">
            {/* Line 1 */}
            <span className="block text-[#A8A8A6]">
              <AnimatedText text={t.h1_line1} delay={0.5} />
            </span>
            
            {/* Line 2 - Emphasis */}
            <motion.span 
              className="block text-[#C9A962] mt-2"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.h1_emphasis}
            </motion.span>
            
            {/* Line 3 */}
            <span className="block text-[#6B6B69] mt-4">
              <AnimatedText text={t.h1_line2} delay={0.9} />
            </span>
            
            {/* Line 4 */}
            <motion.span 
              className="block text-[#F5F5F3] mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.h1_line3}
              <span className="text-[#3A3A3A]">.</span>
            </motion.span>
          </h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-lg sm:text-xl text-[#6B6B69] max-w-xl mx-auto mb-16 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {t.sub}
          </motion.p>
          
          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticButton primary>
              {t.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
            
            <MagneticButton>
              {t.cta2}
            </MagneticButton>
          </motion.div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-20 max-w-4xl mx-auto mb-20">
            {t.stats.map((stat, i) => (
              <AnimatedCounter 
                key={i}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                delay={1.8 + i * 0.15}
              />
            ))}
          </div>
          
          {/* Harvard badge */}
          <motion.div 
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.4 }}
          >
            <HarvardShield className="w-6 h-8 opacity-50 hover:opacity-70 transition-opacity duration-500" />
            <span className="text-sm text-[#6B6B69] tracking-wide">
              {t.trusted}
            </span>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 3 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#6B6B69]">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#6B6B69] to-transparent" />
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Animated SVG Icons (replace emojis) ── */

const IconDev = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" opacity="0.5" />
  </svg>
)

const IconMarketing = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const IconFinance = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <line x1="2" y1="9" x2="22" y2="9" />
    <line x1="10" y1="3" x2="10" y2="9" />
  </svg>
)

const IconOps = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const IconArrow = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconTarget = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const IconSwitch = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 014-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 01-4 4H3" />
  </svg>
)

const IconRocket = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

/* ── Category Data ── */

const categories = [
  {
    id: 'dev',
    Icon: IconDev,
    title: 'Desarrollo',
    subtitle: 'Tu departamento de tecnología',
    color: 'from-blue-500 to-cyan-400',
    borderColor: 'border-blue-200 hover:border-blue-300',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    features: [
      'Aplicaciones web completas desde cero',
      'Bases de datos y servidores en la nube (Supabase, Railway, Vercel)',
      'APIs e integraciones con tus herramientas actuales',
      'Tu sitio web profesional, responsive y rápido',
      'Automatizaciones y flujos de trabajo internos',
      'Mantenimiento, actualizaciones y soporte técnico continuo',
    ],
  },
  {
    id: 'marketing',
    Icon: IconMarketing,
    title: 'Marketing',
    subtitle: 'Tu equipo de crecimiento',
    color: 'from-pink-500 to-rose-400',
    borderColor: 'border-pink-200 hover:border-pink-300',
    bgColor: 'bg-pink-50',
    textColor: 'text-pink-600',
    iconBg: 'bg-pink-100',
    features: [
      'Contenido para redes sociales — creación y programación',
      'Producción y edición de video para tus plataformas',
      'Seguimiento de métricas: cada post, cada campaña, cada resultado',
      'SEO, keywords y posicionamiento en Google',
      'Email marketing y campañas automatizadas',
      'Análisis de competencia e investigación de mercado',
    ],
  },
  {
    id: 'finance',
    Icon: IconFinance,
    title: 'Finanzas',
    subtitle: 'Tu contador virtual',
    color: 'from-emerald-500 to-teal-400',
    borderColor: 'border-emerald-200 hover:border-emerald-300',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    iconBg: 'bg-emerald-100',
    features: [
      'Facturación y seguimiento de cobros (compatible CFDI/SAT)',
      'Categorización de gastos y reportes financieros claros',
      'Flujo de caja: análisis y proyecciones',
      'Apoyo en preparación de impuestos y documentación',
      'Nómina, cálculos y documentos de personal',
      'Registros organizados y listos para auditoría',
    ],
  },
  {
    id: 'ops',
    Icon: IconOps,
    title: 'Operaciones',
    subtitle: 'Tu back-office completo',
    color: 'from-amber-500 to-orange-400',
    borderColor: 'border-amber-200 hover:border-amber-300',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    features: [
      'Atención a clientes por WhatsApp, Telegram y web — 24/7',
      'Agenda de citas y manejo de calendario automático',
      'Inventario, alertas de reorden y control de stock',
      'CRM: seguimiento de clientes y oportunidades',
      'Automatización de procesos repetitivos',
      'Soporte bilingüe: español, inglés y más',
    ],
  },
]

export default function MiniPage() {
  const [activeCategory, setActiveCategory] = useState('dev')
  const active = categories.find(c => c.id === activeCategory)!

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/vulkn-mascot.png" alt="VULKN" className="w-8 h-8 object-contain" />
            <span className="font-bold text-slate-900">VULKN</span>
            <span className="text-xs font-medium text-cyan-500 bg-cyan-50 px-2 py-0.5 rounded-full">mini</span>
          </Link>
          <Link
            href="https://calendly.com/sable-vulkn-ai/15-min-meet"
            target="_blank"
            rel="noopener"
          >
            <motion.span 
              className="text-sm font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#06B6D4] px-5 py-2 rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Quiero mi Mini <IconArrow className="w-3.5 h-3.5" />
            </motion.span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/30 to-white pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Baby axolotl — transparent */}
          <motion.div
            className="mx-auto mb-8 w-44 h-44 sm:w-56 sm:h-56"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="/vulkn-mini.png"
              alt="VULKN Mini"
              className="w-full h-full object-contain drop-shadow-[0_10px_40px_rgba(236,72,153,0.2)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-slate-900 mb-6">
              Tu equipo completo.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">Un solo agente.</span>
            </h1>
            <p className="text-slate-500 text-lg sm:text-xl max-w-2xl mx-auto mb-4">
              Diseñado para negocios de 1 a 50 personas que necesitan hacer más 
              con menos — sin contratar un departamento entero de tecnología, 
              marketing o administración.
            </p>
            <p className="text-slate-400 text-base max-w-xl mx-auto mb-12">
              Mini es un agente de IA que trabaja contigo todos los días. Programa tu sitio web, 
              maneja tus redes, lleva tus números y atiende a tus clientes. 
              Todo desde una sola herramienta.
            </p>
          </motion.div>

          {/* Category selector */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  activeCategory === cat.id
                    ? `${cat.bgColor} ${cat.borderColor} ${cat.textColor}`
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
              >
                <cat.Icon className="w-4 h-4" />
                <span>{cat.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Feature card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className={`rounded-2xl border ${active.borderColor} ${active.bgColor} p-8 sm:p-10 text-left transition-colors`}>
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className={`p-2.5 rounded-xl ${active.iconBg}`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <active.Icon className={`w-6 h-6 ${active.textColor}`} />
                  </motion.div>
                  <div>
                    <h3 className={`text-xl font-bold ${active.textColor}`}>{active.title}</h3>
                    <p className="text-slate-400 text-sm">{active.subtitle}</p>
                  </div>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {active.features.map((feat, i) => (
                    <motion.li
                      key={feat}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-2.5 text-slate-600 text-sm group"
                    >
                      <motion.span 
                        className={`mt-0.5 ${active.textColor} flex-shrink-0`}
                        whileHover={{ scale: 1.3 }}
                      >
                        <IconCheck className="w-4 h-4" />
                      </motion.span>
                      <span className="group-hover:text-slate-900 transition-colors">{feat}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* For whom */}
      <section className="py-20 px-6 bg-slate-50/50">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-slate-900 mb-4">
            Para negocios que hacen mucho con poco
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Si tu negocio tiene entre 1 y 50 personas y tú te encargas de todo — 
            Mini es el refuerzo que necesitas. No es un lujo. Es multiplicar tu capacidad.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6">
          {[
            {
              title: 'Emprendedores solos',
              desc: 'Haces todo: vendes, cobras, publicas, contestas. Mini te quita la mitad de la carga.',
              Icon: IconTarget,
            },
            {
              title: 'Equipos de 5-20',
              desc: 'Ya tienes gente, pero no un equipo de TI ni de marketing. Mini cubre esos huecos.',
              Icon: IconSwitch,
            },
            {
              title: 'Negocios creciendo',
              desc: 'Estás listo para escalar pero no para contratar 10 personas más. Mini crece contigo.',
              Icon: IconRocket,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-2xl p-7 border border-slate-100 hover:border-cyan-200 hover:shadow-md transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4 }}
            >
              <motion.div 
                className="mb-4 text-cyan-500 group-hover:text-cyan-600 transition-colors"
                whileHover={{ rotate: 5, scale: 1.1 }}
              >
                <item.Icon className="w-8 h-8" />
              </motion.div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-slate-900 mb-4">
              Así de simple funciona
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Sin instalaciones complicadas. Sin curva de aprendizaje. Le dices qué necesitas y empieza a trabajar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Cuéntale sobre tu negocio',
                desc: 'Tu industria, tus clientes, tus problemas. Mini aprende tu contexto y se convierte en tu especialista.',
                Icon: IconTarget,
              },
              {
                step: '02',
                title: 'Elige tus prioridades',
                desc: '¿Primero el sitio web? ¿Una campaña de marketing? ¿Ordenar las finanzas? Mini ataca lo más urgente y luego sigue con lo demás.',
                Icon: IconSwitch,
              },
              {
                step: '03',
                title: 'Observa los resultados',
                desc: 'Mini programa, publica, lleva cuentas y atiende clientes. Tú te enfocas en hacer crecer el negocio.',
                Icon: IconRocket,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -3 }}
              >
                <motion.div 
                  className="text-slate-300 group-hover:text-cyan-400 transition-colors mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <item.Icon className="w-8 h-8" />
                </motion.div>
                <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider">Paso {item.step}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Difference */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-slate-900 mb-4">
              No es un chatbot.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500">Es tu compañero de trabajo.</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              La mayoría de herramientas de IA contestan preguntas. Mini hace el trabajo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              { bad: 'Los chatbots contestan preguntas', good: 'Mini te construye el sitio web' },
              { bad: 'Las herramientas de IA sugieren ideas', good: 'Mini crea y lanza la campaña' },
              { bad: 'Los dashboards muestran datos', good: 'Mini analiza y te dice qué hacer' },
              { bad: 'Las plantillas ahorran tiempo', good: 'Mini hace todo el trabajo' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-5 rounded-xl bg-white border border-slate-100 hover:border-cyan-200 transition-all group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <p className="text-slate-300 text-sm line-through mb-1.5 group-hover:text-slate-400 transition-colors">{item.bad}</p>
                <p className="text-slate-900 text-sm font-semibold flex items-center gap-2">
                  <IconCheck className="w-3.5 h-3.5 text-cyan-500 flex-shrink-0" />
                  {item.good}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-cyan-500" />
            <div className="relative p-10 md:p-16 text-center">
              <motion.div
                className="mx-auto mb-6 w-24 h-24"
                animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img src="/vulkn-mini.png" alt="Mini" className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
              </motion.div>
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-white mb-4">
                ¿Listo para conocer a tu nuevo equipo?
              </h2>
              <p className="text-white/80 max-w-lg mx-auto mb-8">
                15 minutos. Sin compromiso. Te mostramos cómo Mini puede transformar la 
                operación de tu negocio desde el primer día.
              </p>
              <Link
                href="https://calendly.com/sable-vulkn-ai/15-min-meet"
                target="_blank"
                rel="noopener"
              >
                <motion.span
                  className="inline-flex items-center justify-center gap-2 text-base py-4 px-10 bg-white text-pink-600 font-bold rounded-xl hover:shadow-xl hover:shadow-white/20 transition-all"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Agendar demo <IconArrow className="w-4 h-4" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/vulkn-mascot.png" alt="VULKN" className="w-6 h-6 object-contain" />
            <span className="text-sm text-slate-400">VULKN © 2026 · Powered by BJS Labs</span>
          </div>
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1.5">
            <IconArrow className="w-3 h-3 rotate-180" /> Volver a VULKN
          </Link>
        </div>
      </footer>
    </div>
  )
}

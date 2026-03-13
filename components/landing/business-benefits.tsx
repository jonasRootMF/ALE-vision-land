'use client'

import { motion } from 'framer-motion'
import { VideoOff, Globe, TrendingUp, ScanSearch, Timer, MapPin, Plug, BarChart2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const benefits = [
  {
    Icon: VideoOff,
    title: 'Menos revisión manual de video',
    description: 'Supervisa más sin ver más video. El sistema evalúa automáticamente y te notifica solo cuando algo cambia.',
    highlight: 'Supervisa más sin ver más video',
  },
  {
    Icon: Globe,
    title: 'Supervisión remota escalable',
    description: 'Monitorea sucursales con menos esfuerzo operativo, desde cualquier lugar, en tiempo real.',
    highlight: 'Monitorea desde cualquier lugar',
  },
  {
    Icon: TrendingUp,
    title: 'Más consistencia operativa',
    description: 'Estandariza revisiones visuales y garantiza que cada ubicación opere bajo los mismos criterios.',
    highlight: 'Estandariza revisiones visuales',
  },
  {
    Icon: ScanSearch,
    title: 'Detección visual de desviaciones',
    description: 'Detecta cambios que importan: objetos fuera de lugar, áreas desordenadas, incumplimientos de protocolo.',
    highlight: 'Detecta cambios que importan',
  },
  {
    Icon: Timer,
    title: 'Respuesta más rápida a cambios',
    description: 'Las alertas llegan en minutos. Actúa antes de que un problema operativo se convierta en un incidente mayor.',
    highlight: 'Alertas en minutos',
  },
  {
    Icon: MapPin,
    title: 'Control en múltiples ubicaciones',
    description: 'Un solo dashboard para todas tus sucursales, almacenes o plantas. Sin importar cuántas sean.',
    highlight: 'Un dashboard para todo',
  },
  {
    Icon: Plug,
    title: 'Usa la infraestructura existente',
    description: 'No necesitas cámaras nuevas ni instalaciones complejas. ALE Visión trabaja con lo que ya tienes.',
    highlight: 'Sin hardware adicional',
  },
  {
    Icon: BarChart2,
    title: 'Resultados fáciles de interpretar',
    description: 'El IAG es un número de 0 a 100. Cualquier persona en tu equipo —operativo o directivo— lo entiende de inmediato.',
    highlight: 'Claro para operación y dirección',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function BusinessBenefits() {
  return (
    <section id="beneficios" className="relative py-24 bg-secondary/10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/12 border border-primary/25 mb-5">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Valor de negocio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
            Menos esfuerzo. Más control visual.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            ALE Visión convierte supervisión manual en monitoreo visual automatizado, con impacto directo en tus operaciones.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-card border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-primary/30 transition-colors duration-300 cursor-default"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                <benefit.Icon className="w-5 h-5 text-primary" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-bold text-foreground leading-snug">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>

              {/* Highlight pill */}
              <div className="mt-auto">
                <span className="inline-flex items-center text-[10px] font-semibold text-primary bg-primary/8 border border-primary/15 px-2 py-1 rounded-md">
                  {benefit.highlight}
                </span>
              </div>

              {/* Subtle corner gradient on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-center"
        >
          <p className="text-lg sm:text-xl font-semibold text-foreground/70 italic max-w-2xl mx-auto">
            "Ya entendí. Esto me puede servir para supervisar mis espacios sin tener que revisar cámaras todo el tiempo."
          </p>
          <p className="text-sm text-muted-foreground mt-3">— La reacción que buscamos en cada visitante</p>
        </motion.div>
      </div>
    </section>
  )
}

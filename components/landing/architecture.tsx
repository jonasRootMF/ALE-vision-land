'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Camera, Zap, Brain, BarChart2, Bell, Wifi, MonitorSmartphone, Server } from 'lucide-react'
import { cn } from '@/lib/utils'

const nodes = [
  {
    id: 'camara',
    label: 'Cámara',
    sublabel: 'IP · Webcam · Red local',
    Icon: Camera,
    detail: 'Compatible con cualquier cámara que transmita vía RTSP, HTTP o agente local en Raspberry Pi / Linux',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/25',
  },
  {
    id: 'captura',
    label: 'Captura',
    sublabel: 'Periódica o manual',
    Icon: Zap,
    detail: 'El sistema toma imágenes a intervalos configurados: cada hora, turno, día o en tiempo real según el caso',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/25',
  },
  {
    id: 'ia',
    label: 'IA Visual',
    sublabel: 'Comparación + criterios',
    Icon: Brain,
    detail: 'El modelo de visión compara la captura contra la imagen de referencia aplicando los criterios en lenguaje natural',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/25',
  },
  {
    id: 'iag',
    label: 'IAG 0–100',
    sublabel: 'Verde · Amarillo · Rojo',
    Icon: BarChart2,
    detail: 'El resultado es un índice numérico con semáforo visual que refleja el nivel de cumplimiento en esa escena',
    color: 'text-[--iag-green]',
    bg: 'bg-[--iag-green]/10',
    border: 'border-[--iag-green]/25',
  },
  {
    id: 'alerta',
    label: 'Alerta / Historial',
    sublabel: 'Email · Slack · Webhook',
    Icon: Bell,
    detail: 'Cuando el IAG cae bajo el umbral definido, se disparan alertas automáticas y la evaluación queda en el historial',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/25',
  },
]

const inputSources = [
  { label: 'Cámara IP', Icon: Camera },
  { label: 'Webcam', Icon: MonitorSmartphone },
  { label: 'Agente local', Icon: Server },
]

function PulseDot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_2px_oklch(0.6_0.22_278/0.5)]"
      animate={{ x: ['0%', '100%'] }}
      transition={{ duration: 1.8, delay, repeat: Infinity, ease: 'linear' }}
      style={{ top: '50%', transform: 'translateY(-50%)' }}
    />
  )
}

export function Architecture() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeNode, setActiveNode] = useState<number | null>(null)

  // Auto-cycle active node highlight
  useEffect(() => {
    if (!inView) return
    let i = 0
    const interval = setInterval(() => {
      setActiveNode(i % nodes.length)
      i++
    }, 1600)
    return () => clearInterval(interval)
  }, [inView])

  return (
    <section id="arquitectura" className="relative py-24 bg-secondary/20 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/12 border border-primary/25 mb-5">
            <Wifi className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Cómo opera internamente</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
            Un flujo simple. Una inteligencia potente.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            ALE Visión conecta tus cámaras con IA visual en un pipeline limpio y confiable, sin complejidad técnica visible para el usuario.
          </p>
        </motion.div>

        {/* Input sources */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center gap-3 mb-10"
        >
          {inputSources.map(({ label, Icon }) => (
            <div key={label} className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground">
              <Icon className="w-4 h-4 text-primary" />
              {label}
            </div>
          ))}
        </motion.div>

        {/* Flow nodes — desktop horizontal, mobile vertical */}
        <div ref={ref} className="relative">
          {/* Desktop layout */}
          <div className="hidden md:flex items-stretch gap-0">
            {nodes.map((node, i) => (
              <div key={node.id} className="flex items-center flex-1 min-w-0">
                {/* Node card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setActiveNode(i)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={cn(
                    'flex-1 rounded-xl border p-4 flex flex-col gap-3 cursor-default transition-all duration-300',
                    activeNode === i
                      ? cn(node.bg, node.border, 'shadow-lg scale-[1.02]')
                      : 'bg-card border-border'
                  )}
                >
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center border', node.bg, node.border)}>
                    <node.Icon className={cn('w-5 h-5', node.color)} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{node.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{node.sublabel}</p>
                  </div>
                  <motion.p
                    animate={{ opacity: activeNode === i ? 1 : 0, height: activeNode === i ? 'auto' : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-muted-foreground leading-relaxed overflow-hidden"
                  >
                    {node.detail}
                  </motion.p>
                  {/* Step number */}
                  <div className="mt-auto">
                    <span className={cn('text-xs font-black', node.color)}>0{i + 1}</span>
                  </div>
                </motion.div>

                {/* Connector */}
                {i < nodes.length - 1 && (
                  <div className="relative w-8 shrink-0 h-0.5 bg-border mx-1 overflow-visible">
                    {inView && (
                      <>
                        <PulseDot delay={0} />
                        <PulseDot delay={0.6} />
                        <PulseDot delay={1.2} />
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile layout — vertical */}
          <div className="flex md:hidden flex-col gap-0">
            {nodes.map((node, i) => (
              <div key={node.id} className="flex gap-0">
                {/* Left: connector line + dot */}
                <div className="flex flex-col items-center w-10 shrink-0">
                  <div className={cn('w-8 h-8 rounded-lg border flex items-center justify-center shrink-0', node.bg, node.border)}>
                    <node.Icon className={cn('w-4 h-4', node.color)} />
                  </div>
                  {i < nodes.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border my-1 min-h-[24px]" />
                  )}
                </div>

                {/* Right: content */}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 pl-3 pb-6"
                >
                  <span className={cn('text-[10px] font-black', node.color)}>0{i + 1}</span>
                  <p className="text-sm font-bold text-foreground">{node.label}</p>
                  <p className="text-xs text-muted-foreground">{node.sublabel}</p>
                  <p className="text-xs text-muted-foreground/70 mt-1.5 leading-relaxed">{node.detail}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-primary shrink-0" />
            <span>Agente local disponible para redes sin acceso a internet (Linux / Raspberry Pi)</span>
          </div>
          <span className="hidden sm:inline text-border">·</span>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary shrink-0" />
            <span>La primera captura establece la imagen base de referencia automáticamente</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

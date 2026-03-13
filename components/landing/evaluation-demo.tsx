'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertTriangle, XCircle, Camera, Clock, Eye, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type SceneState = 'optimo' | 'atencion' | 'alerta'

const scenes: Record<SceneState, {
  label: string
  iag: number
  badge: string
  color: string
  glowClass: string
  textColor: string
  bgColor: string
  borderColor: string
  Icon: typeof CheckCircle
  description: string
  criteria: { text: string; ok: boolean }[]
  observation: string
  anomalies: { x: string; y: string; w: string; h: string; label: string }[]
}> = {
  optimo: {
    label: 'ÓPTIMO',
    iag: 92,
    badge: 'Estado correcto',
    color: 'iag-green',
    glowClass: 'iag-glow-green',
    textColor: 'text-[--iag-green]',
    bgColor: 'bg-[--iag-green]/10',
    borderColor: 'border-[--iag-green]/30',
    Icon: CheckCircle,
    description: 'Turno matutino — Gasolinera Sucursal Norte',
    criteria: [
      { text: 'Bombas libres y sin vehículos detenidos', ok: true },
      { text: 'Área de islas despejada y limpia', ok: true },
      { text: 'Señalización visible en buen estado', ok: true },
      { text: 'Zona de acceso sin obstáculos', ok: true },
    ],
    observation: 'La escena cumple todos los criterios definidos. Las bombas están libres, el área está limpia y la señalización es visible y correcta.',
    anomalies: [],
  },
  atencion: {
    label: 'ATENCIÓN',
    iag: 67,
    badge: 'Revisar',
    color: 'iag-yellow',
    glowClass: 'iag-glow-yellow',
    textColor: 'text-[--iag-yellow]',
    bgColor: 'bg-[--iag-yellow]/10',
    borderColor: 'border-[--iag-yellow]/30',
    Icon: AlertTriangle,
    description: 'Turno vespertino — Retail, hora pico',
    criteria: [
      { text: 'Estantes completos con producto visible', ok: false },
      { text: 'Pasillos libres de cajas o obstáculos', ok: true },
      { text: 'Señalización de precios vigente', ok: true },
      { text: 'Área de acceso despejada', ok: false },
    ],
    observation: 'Se detectan estantes con producto faltante en zona central y un obstáculo parcial en el área de acceso. Se recomienda revisión antes del siguiente turno.',
    anomalies: [
      { x: '10%', y: '20%', w: '30%', h: '40%', label: 'Estante incompleto' },
    ],
  },
  alerta: {
    label: 'ALERTA',
    iag: 34,
    badge: 'Acción requerida',
    color: 'iag-red',
    glowClass: 'iag-glow-red',
    textColor: 'text-[--iag-red]',
    bgColor: 'bg-[--iag-red]/10',
    borderColor: 'border-[--iag-red]/30',
    Icon: XCircle,
    description: 'Zona de carga — Almacén Central',
    criteria: [
      { text: 'Pasillos libres para tránsito de montacargas', ok: false },
      { text: 'Pallets en posición marcada correctamente', ok: false },
      { text: 'Señalización de seguridad visible', ok: false },
      { text: 'Zona de emergencia despejada', ok: true },
    ],
    observation: 'Desviación crítica detectada. Pasillos bloqueados con pallets fuera de posición y señalización cubierta. Se requiere acción inmediata antes de continuar operaciones.',
    anomalies: [
      { x: '5%', y: '10%', w: '40%', h: '50%', label: 'Pasillo bloqueado' },
      { x: '55%', y: '30%', w: '38%', h: '35%', label: 'Pallet fuera de posición' },
    ],
  },
}

const stateOrder: SceneState[] = ['optimo', 'atencion', 'alerta']
const stateLabels: Record<SceneState, string> = {
  optimo: 'Óptimo',
  atencion: 'Atención',
  alerta: 'Alerta',
}

function SceneImageMock({ state, isReference }: { state: SceneState; isReference: boolean }) {
  const scene = scenes[state]
  const gridRows = isReference ? 3 : scene.iag > 80 ? 3 : scene.iag > 60 ? 2 : 1

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-secondary/40 border border-border/60">
      {/* Simulated camera grid */}
      <div className="absolute inset-0 grid grid-cols-3 gap-0.5 p-2 opacity-20">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-muted-foreground/20 rounded-sm" />
        ))}
      </div>

      {/* Floor lines perspective */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 225" preserveAspectRatio="none">
        <line x1="200" y1="60" x2="0" y2="225" stroke="currentColor" strokeWidth="1" />
        <line x1="200" y1="60" x2="133" y2="225" stroke="currentColor" strokeWidth="1" />
        <line x1="200" y1="60" x2="266" y2="225" stroke="currentColor" strokeWidth="1" />
        <line x1="200" y1="60" x2="400" y2="225" stroke="currentColor" strokeWidth="1" />
        <line x1="0" y1="150" x2="400" y2="150" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="187" x2="400" y2="187" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      {/* Shelf/content blocks */}
      {isReference ? (
        <>
          <div className="absolute left-[8%] top-[20%] w-[28%] h-[55%] bg-primary/15 border border-primary/20 rounded-sm flex flex-col gap-1 p-1">
            {Array.from({ length: gridRows }).map((_, i) => (
              <div key={i} className="flex-1 bg-primary/20 rounded-xs" />
            ))}
          </div>
          <div className="absolute right-[8%] top-[20%] w-[28%] h-[55%] bg-primary/15 border border-primary/20 rounded-sm flex flex-col gap-1 p-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-1 bg-primary/20 rounded-xs" />
            ))}
          </div>
          <div className="absolute left-[40%] bottom-[15%] w-[20%] h-[25%] bg-primary/10 border border-primary/15 rounded-sm" />
        </>
      ) : (
        <>
          <div className="absolute left-[8%] top-[20%] w-[28%] h-[55%] bg-primary/15 border border-primary/20 rounded-sm flex flex-col gap-1 p-1">
            {Array.from({ length: gridRows }).map((_, i) => (
              <div key={i} className="flex-1 bg-primary/20 rounded-xs" />
            ))}
            {gridRows < 3 && (
              <div className="flex-1 bg-muted/30 rounded-xs border border-dashed border-muted-foreground/20" />
            )}
          </div>
          <div className="absolute right-[8%] top-[20%] w-[28%] h-[55%] bg-primary/15 border border-primary/20 rounded-sm flex flex-col gap-1 p-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-1 bg-primary/20 rounded-xs" />
            ))}
          </div>
          {!isReference && state !== 'optimo' && (
            <div className="absolute left-[37%] bottom-[10%] w-[26%] h-[20%] bg-muted/50 border border-muted-foreground/30 rounded-sm" />
          )}
        </>
      )}

      {/* Anomaly highlight boxes */}
      {!isReference && scene.anomalies.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.15 }}
          className={cn('absolute border-2 rounded-sm', scene.borderColor)}
          style={{ left: a.x, top: a.y, width: a.w, height: a.h }}
        >
          <span className={cn('absolute -top-5 left-0 text-[9px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap', scene.bgColor, scene.textColor)}>
            {a.label}
          </span>
        </motion.div>
      ))}

      {/* Camera label */}
      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-background/70 backdrop-blur-sm px-2 py-1 rounded-md">
        <Camera className="w-3 h-3 text-muted-foreground" />
        <span className="text-[10px] font-medium text-muted-foreground">
          {isReference ? 'Imagen de referencia' : 'Captura actual'}
        </span>
      </div>

      {/* Timestamp (only for current) */}
      {!isReference && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-background/70 backdrop-blur-sm px-2 py-1 rounded-md">
          <Clock className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">hace 3 min</span>
        </div>
      )}
    </div>
  )
}

export function EvaluationDemo() {
  const [activeState, setActiveState] = useState<SceneState>('optimo')
  const [isAnimating, setIsAnimating] = useState(false)
  const scene = scenes[activeState]

  // Auto-cycle through states
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveState(prev => {
        const idx = stateOrder.indexOf(prev)
        return stateOrder[(idx + 1) % stateOrder.length]
      })
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleStateChange = (state: SceneState) => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveState(state)
    setTimeout(() => setIsAnimating(false), 400)
  }

  const iagPercent = (scene.iag / 100) * 100
  const circumference = 2 * Math.PI * 36

  return (
    <section id="evaluacion" className="relative py-24 bg-background overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Subtle grid bg */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

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
            <Eye className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Así se ve una evaluación</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
            Referencia vs. realidad, en segundos
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            ALE Visión compara cada captura contra la imagen base y genera un resultado inmediato con criterios claros.
          </p>
        </motion.div>

        {/* State selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center gap-2 mb-8"
        >
          {stateOrder.map((state) => {
            const s = scenes[state]
            return (
              <button
                key={state}
                onClick={() => handleStateChange(state)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-200',
                  activeState === state
                    ? cn(s.bgColor, s.textColor, s.borderColor)
                    : 'bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground'
                )}
              >
                IAG {s.iag} — {stateLabels[state]}
              </button>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
        >
          {/* Scene description bar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeState + '-bar'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={cn('flex items-center gap-3 px-5 py-3 border-b', scene.bgColor, scene.borderColor)}
            >
              <scene.Icon className={cn('w-4 h-4 shrink-0', scene.textColor)} />
              <span className={cn('text-sm font-medium', scene.textColor)}>{scene.description}</span>
              <ChevronRight className="w-3.5 h-3.5 ml-auto text-muted-foreground/50" />
            </motion.div>
          </AnimatePresence>

          <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Images */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Base de referencia</p>
                <SceneImageMock state={activeState} isReference={true} />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Captura actual</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeState + '-current'}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SceneImageMock state={activeState} isReference={false} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* IAG Panel */}
            <div className="flex flex-col gap-4">
              {/* IAG Score */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeState + '-score'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className={cn('rounded-xl border p-4 text-center', scene.bgColor, scene.borderColor, scene.glowClass)}
                >
                  {/* Circular progress */}
                  <div className="relative inline-flex items-center justify-center mb-3">
                    <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
                      <circle cx="48" cy="48" r="36" fill="none" stroke="currentColor" strokeWidth="6" className="text-border" />
                      <motion.circle
                        cx="48" cy="48" r="36" fill="none" strokeWidth="6"
                        strokeLinecap="round"
                        className={scene.textColor}
                        style={{ stroke: 'currentColor' }}
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: circumference - (circumference * scene.iag) / 100 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <motion.span
                        key={scene.iag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className={cn('text-2xl font-black', scene.textColor)}
                      >
                        {scene.iag}
                      </motion.span>
                      <span className="text-[9px] text-muted-foreground font-semibold tracking-wide">IAG</span>
                    </div>
                  </div>
                  <div className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold', scene.bgColor, scene.textColor)}>
                    <scene.Icon className="w-3 h-3" />
                    {scene.badge}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Criteria */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeState + '-criteria'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-secondary/30 rounded-xl border border-border/60 p-4"
                >
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Criterios evaluados</p>
                  <div className="space-y-2">
                    {scene.criteria.map((c, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.3 }}
                        className="flex items-start gap-2"
                      >
                        {c.ok ? (
                          <CheckCircle className="w-3.5 h-3.5 text-[--iag-green] shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-[--iag-red] shrink-0 mt-0.5" />
                        )}
                        <span className={cn('text-xs leading-snug', c.ok ? 'text-foreground/80' : 'text-foreground/60 line-through decoration-1')}>{c.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* AI Observation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeState + '-obs'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-secondary/20 rounded-xl border border-border/40 p-4"
                >
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Observación IA</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{scene.observation}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

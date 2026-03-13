'use client'

import { useEffect, useState } from 'react'
import { motion, useAnimationFrame } from 'framer-motion'
import { ArrowRight, Camera, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

// IAG indicator component
function IAGIndicator({ value, label }: { value: number; label: string }) {
  const getColor = (v: number) => {
    if (v >= 80) return { text: 'text-iag-green', ring: 'border-iag-green', glow: 'iag-glow-green', bg: 'bg-iag-green/10', label: 'ÓPTIMO' }
    if (v >= 50) return { text: 'text-iag-yellow', ring: 'border-iag-yellow', glow: 'iag-glow-yellow', bg: 'bg-iag-yellow/10', label: 'ATENCIÓN' }
    return { text: 'text-iag-red', ring: 'border-iag-red', glow: 'iag-glow-red', bg: 'bg-iag-red/10', label: 'ALERTA' }
  }
  const c = getColor(value)
  const circumference = 2 * Math.PI * 36
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative w-28 h-28 rounded-full ${c.glow} transition-all duration-700`}>
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r="36" fill="none" stroke="currentColor" strokeWidth="5" className="text-border" />
          <circle
            cx="44" cy="44" r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${c.text} transition-all duration-700`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl font-bold ${c.text} transition-colors duration-500`}>{value}</span>
          <span className="text-xs text-muted-foreground font-medium">IAG</span>
        </div>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-bold ${c.text} ${c.bg} border ${c.ring} border-opacity-40`}>
        {c.label}
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

// Animated dashboard mockup
function DashboardMockup() {
  const [iagValues, setIagValues] = useState([92, 67, 31])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIagValues((prev) =>
        prev.map((v, i) => {
          const delta = (Math.random() - 0.5) * 12
          const next = Math.max(5, Math.min(99, Math.round(v + delta)))
          return next
        })
      )
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const cameras = [
    { name: 'Entrada principal', location: 'Zona A' },
    { name: 'Estanterías pasillo 3', location: 'Zona B' },
    { name: 'Área de carga', location: 'Zona C' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-xl mx-auto"
    >
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-primary/8 rounded-3xl blur-2xl" />

      {/* Dashboard window */}
      <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
        {/* Window bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/40">
          <div className="w-3 h-3 rounded-full bg-iag-red/70" />
          <div className="w-3 h-3 rounded-full bg-iag-yellow/70" />
          <div className="w-3 h-3 rounded-full bg-iag-green/70" />
          <span className="ml-3 text-xs text-muted-foreground font-mono">ALE Visión — Dashboard</span>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-iag-green animate-pulse" />
            <span className="text-xs text-iag-green font-medium">En vivo</span>
          </div>
        </div>

        {/* Dashboard header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Monitoreo en tiempo real</h3>
            <p className="text-xs text-muted-foreground">Última captura: hace 4 min</p>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/25">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-xs text-primary font-semibold">IA Activa</span>
          </div>
        </div>

        {/* IAG indicators row */}
        <div className="flex items-start justify-around px-5 py-4 gap-2">
          {cameras.map((cam, i) => (
            <IAGIndicator key={cam.name} value={iagValues[i]} label={cam.name} />
          ))}
        </div>

        {/* Camera feed grid */}
        <div className="grid grid-cols-3 gap-2 px-5 pb-4">
          {cameras.map((cam, i) => {
            const getColorClass = (v: number) => v >= 80 ? 'border-iag-green/50' : v >= 50 ? 'border-iag-yellow/50' : 'border-iag-red/60'
            const getBgClass = (v: number) => v >= 80 ? 'bg-iag-green/5' : v >= 50 ? 'bg-iag-yellow/5' : 'bg-iag-red/5'
            return (
              <div
                key={cam.name}
                className={`relative rounded-lg border ${getColorClass(iagValues[i])} ${getBgClass(iagValues[i])} aspect-video overflow-hidden transition-colors duration-500`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-muted-foreground/40" />
                </div>
                <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between">
                  <span className="text-[9px] text-muted-foreground font-mono">{cam.location}</span>
                  <span className={`text-[9px] font-bold ${iagValues[i] >= 80 ? 'text-iag-green' : iagValues[i] >= 50 ? 'text-iag-yellow' : 'text-iag-red'}`}>
                    {iagValues[i]}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Alert bar */}
        <motion.div
          animate={{ opacity: iagValues[2] < 50 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="mx-5 mb-4 px-3 py-2 rounded-lg bg-iag-red/10 border border-iag-red/40 flex items-center gap-2"
        >
          <Shield className="w-3.5 h-3.5 text-iag-red flex-shrink-0" />
          <span className="text-xs text-iag-red font-medium">Alerta: Zona C — IAG bajo el umbral mínimo</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Radial glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/12 border border-primary/25 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary tracking-wide uppercase">
                Monitoreo visual con IA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight text-balance"
            >
              Convierte tus cámaras en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                supervisión visual con IA
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              ALE Visión captura, compara y evalúa automáticamente el estado visual de tus instalaciones. Cada cámara genera un{' '}
              <strong className="text-foreground font-semibold">Índice de Apego General (IAG)</strong>{' '}
              de 0 a 100 que mide qué tan bien se respeta la referencia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold btn-glow transition-all"
                asChild
              >
                <a href="#contacto">
                  Solicitar demo gratis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-secondary text-foreground font-semibold"
                asChild
              >
                <a href="#como-funciona">Ver cómo funciona</a>
              </Button>
            </motion.div>

            {/* Social proof pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              {[
                { icon: Camera, label: 'Compatible con cualquier cámara IP' },
                { icon: Shield, label: 'Sin hardware adicional' },
                { icon: Zap, label: 'Resultados en minutos' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="w-3.5 h-3.5 text-primary/70" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — dashboard mockup */}
          <div className="flex items-center justify-center">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, Mail, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function IAGDemoWidget() {
  const scenarios = [
    { label: 'Gasolinera — turno matutino', iag: 92, status: 'ÓPTIMO', color: 'green' },
    { label: 'Retail — hora pico', iag: 67, status: 'ATENCIÓN', color: 'yellow' },
    { label: 'Almacén — zona de carga', iag: 38, status: 'ALERTA', color: 'red' },
  ]

  const colorMap = {
    green: {
      text: 'text-iag-green',
      border: 'border-iag-green/40',
      bg: 'bg-iag-green/8',
      glow: 'iag-glow-green',
      bar: 'bg-iag-green',
      badge: 'bg-iag-green/10 border-iag-green/30 text-iag-green',
    },
    yellow: {
      text: 'text-iag-yellow',
      border: 'border-iag-yellow/40',
      bg: 'bg-iag-yellow/8',
      glow: 'iag-glow-yellow',
      bar: 'bg-iag-yellow',
      badge: 'bg-iag-yellow/10 border-iag-yellow/30 text-iag-yellow',
    },
    red: {
      text: 'text-iag-red',
      border: 'border-iag-red/40',
      bg: 'bg-iag-red/8',
      glow: 'iag-glow-red',
      bar: 'bg-iag-red',
      badge: 'bg-iag-red/10 border-iag-red/30 text-iag-red',
    },
  }

  return (
    <div className="flex flex-col gap-3">
      {scenarios.map((s) => {
        const c = colorMap[s.color as keyof typeof colorMap]
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`flex items-center gap-4 p-3 rounded-xl border ${c.border} ${c.bg}`}
          >
            <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 ${c.border} ${c.glow}`}>
              <span className={`text-lg font-black ${c.text}`}>{s.iag}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs text-muted-foreground truncate">{s.label}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${c.badge} flex-shrink-0`}>{s.status}</span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.iag}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                  className={`h-full rounded-full ${c.bar}`}
                />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export function FinalCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <>
      {/* Final CTA section */}
      <section id="contacto" className="relative py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/4 to-background pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left — copy */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/12 border border-primary/25 w-fit">
                <Eye className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary tracking-wide uppercase">Solicita tu demo</span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-[1.1] tracking-tight text-balance">
                Tus cámaras ya ven.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Ahora pueden evaluar.
                </span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Agenda una demo personalizada y ve cómo ALE Visión transforma tus cámaras en herramientas
                de supervisión inteligente en menos de 15 minutos.
              </p>

              {/* Form */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
                  <Input
                    type="email"
                    placeholder="tu@empresa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
                  />
                  <Button
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold btn-glow flex-shrink-0"
                  >
                    Solicitar
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-iag-green/10 border border-iag-green/30 max-w-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-iag-green flex-shrink-0" />
                  <p className="text-sm text-iag-green font-medium">
                    Recibido. Te contactaremos en menos de 24 h.
                  </p>
                </motion.div>
              )}

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary/60" />
                  Sin tarjeta de crédito
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary/60" />
                  Demo en 15 minutos
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary/60" />
                  Sin compromiso
                </span>
              </div>
            </motion.div>

            {/* Right — IAG demo widget */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col gap-4"
            >
              <div className="bg-card border border-border rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full bg-iag-green animate-pulse" />
                  <span className="text-sm font-semibold text-foreground">Vista previa de IAG en tiempo real</span>
                </div>
                <IAGDemoWidget />
                <div className="mt-5 pt-4 border-t border-border grid grid-cols-3 gap-2 text-center">
                  {[
                    { label: 'Cámaras activas', value: '3' },
                    { label: 'IAG promedio', value: '65.7' },
                    { label: 'Alertas hoy', value: '1' },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Datos de ejemplo. Tu dashboard real se actualiza con cada captura.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-primary/15 border border-primary/30">
                <Eye className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                ALE <span className="text-primary">Visión</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Monitoreo visual con IA para cámaras de seguridad &mdash; {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Mail className="w-3.5 h-3.5" />
              <a href="mailto:hola@alevision.ai" className="hover:text-foreground transition-colors">
                hola@alevision.ai
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

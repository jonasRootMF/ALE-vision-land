'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'

const rows = [
  {
    feature: 'Requiere personal humano para revisar',
    cctv: true,
    ale: false,
    description: 'CCTV tradicional depende de vigilantes activos',
  },
  {
    feature: 'Evaluación continua y automática',
    cctv: false,
    ale: true,
    description: 'ALE captura y evalúa sin intervención humana',
  },
  {
    feature: 'Resultados en lenguaje natural',
    cctv: false,
    ale: true,
    description: 'Descripción textual de las desviaciones detectadas',
  },
  {
    feature: 'Índice cuantitativo de cumplimiento',
    cctv: false,
    ale: true,
    description: 'El IAG (0–100) mide exactamente el nivel de apego',
  },
  {
    feature: 'Alertas proactivas por desviaciones',
    cctv: false,
    ale: true,
    description: 'Notificaciones automáticas cuando el IAG baja del umbral',
  },
  {
    feature: 'Compatible con cámaras existentes',
    cctv: true,
    ale: true,
    description: 'No requiere cambiar hardware instalado',
  },
  {
    feature: 'Criterios personalizados por escena',
    cctv: false,
    ale: true,
    description: 'Define qué evaluar con texto en lenguaje natural',
  },
  {
    feature: 'Dashboard centralizado multi-sitio',
    cctv: false,
    ale: true,
    description: 'Todos tus locales en una sola pantalla',
  },
  {
    feature: 'Historial y tendencias IAG',
    cctv: false,
    ale: true,
    description: 'Analítica temporal del desempeño visual por cámara',
  },
  {
    feature: 'Integración via API / Webhook',
    cctv: false,
    ale: true,
    description: 'Conecta con tu sistema actual fácilmente',
  },
]

function StatusIcon({ value, positive }: { value: boolean; positive: boolean }) {
  const isGood = (value && positive) || (!value && !positive)
  return value ? (
    <div className={`flex items-center justify-center w-7 h-7 rounded-full ${isGood ? 'bg-iag-green/15 border border-iag-green/30' : 'bg-iag-red/15 border border-iag-red/30'}`}>
      <Check className={`w-3.5 h-3.5 ${isGood ? 'text-iag-green' : 'text-iag-red'}`} />
    </div>
  ) : (
    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted border border-border">
      <X className="w-3.5 h-3.5 text-muted-foreground/40" />
    </div>
  )
}

export function Comparison() {
  return (
    <section id="comparacion" className="relative py-24 bg-secondary/20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/12 border border-primary/25 mb-5">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Comparación</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
            CCTV tradicional vs ALE Visión
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            La misma infraestructura de cámaras, un resultado completamente diferente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Header row */}
          <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] gap-0">
            <div className="px-5 py-4 border-b border-border" />
            <div className="px-4 py-4 border-b border-border border-l bg-secondary/40 text-center">
              <div className="text-sm font-semibold text-muted-foreground">CCTV Tradicional</div>
            </div>
            <div className="px-4 py-4 border-b border-border border-l bg-primary/8 text-center">
              <div className="text-sm font-bold text-primary">ALE Visión</div>
              <div className="w-full h-0.5 bg-gradient-to-r from-primary/60 to-accent/60 rounded-full mt-1" />
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className={`grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_140px_140px] gap-0 group hover:bg-secondary/20 transition-colors ${i < rows.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="px-5 py-3.5 flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">{row.feature}</span>
                <span className="text-xs text-muted-foreground hidden sm:block">{row.description}</span>
              </div>
              <div className="px-4 py-3.5 border-l border-border bg-secondary/20 flex items-center justify-center">
                <StatusIcon value={row.cctv} positive={false} />
              </div>
              <div className="px-4 py-3.5 border-l border-border bg-primary/4 flex items-center justify-center">
                <StatusIcon value={row.ale} positive={true} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

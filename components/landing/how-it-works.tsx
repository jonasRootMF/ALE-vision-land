'use client'

import { motion } from 'framer-motion'
import {
  Plug,
  ImageIcon,
  FileText,
  Clock,
  Cpu,
  BarChart3,
  Bell,
} from 'lucide-react'

const steps = [
  {
    icon: Plug,
    number: '01',
    title: 'Conecta la cámara',
    description: 'Agrega la URL RTSP o HTTP de tu cámara IP. Compatible con la mayoría de marcas del mercado.',
    color: 'from-primary/20 to-primary/5',
    border: 'border-primary/30',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/15',
  },
  {
    icon: ImageIcon,
    number: '02',
    title: 'Define la referencia',
    description: 'Sube o captura la imagen que representa el estado ideal de la escena: orden, limpieza, productos, personas.',
    color: 'from-accent/20 to-accent/5',
    border: 'border-accent/30',
    iconColor: 'text-accent',
    iconBg: 'bg-accent/15',
  },
  {
    icon: FileText,
    number: '03',
    title: 'Criterios en texto',
    description: 'Escribe en lenguaje natural qué evaluar: "Los estantes deben estar llenos", "No debe haber personas en la caja".',
    color: 'from-primary/20 to-primary/5',
    border: 'border-primary/30',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/15',
  },
  {
    icon: Clock,
    number: '04',
    title: 'Capturas automáticas',
    description: 'El sistema captura imágenes en los intervalos configurados: cada hora, turno, día o a demanda.',
    color: 'from-accent/20 to-accent/5',
    border: 'border-accent/30',
    iconColor: 'text-accent',
    iconBg: 'bg-accent/15',
  },
  {
    icon: Cpu,
    number: '05',
    title: 'IA compara',
    description: 'La inteligencia artificial compara la captura contra la referencia aplicando los criterios definidos.',
    color: 'from-primary/20 to-primary/5',
    border: 'border-primary/30',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/15',
  },
  {
    icon: BarChart3,
    number: '06',
    title: 'Genera el IAG',
    description: 'Se calcula el Índice de Apego General (0–100) con una descripción detallada de las desviaciones encontradas.',
    color: 'from-iag-green/15 to-iag-green/5',
    border: 'border-iag-green/30',
    iconColor: 'text-iag-green',
    iconBg: 'bg-iag-green/15',
  },
  {
    icon: Bell,
    number: '07',
    title: 'Alertas automáticas',
    description: 'Si el IAG cae bajo el umbral configurado, se disparan alertas por correo, Slack, WhatsApp o webhook.',
    color: 'from-iag-red/15 to-iag-red/5',
    border: 'border-iag-red/30',
    iconColor: 'text-iag-red',
    iconBg: 'bg-iag-red/15',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 bg-secondary/20">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/12 border border-primary/25 mb-5">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Cómo funciona</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
            7 pasos para supervisión inteligente
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Desde conectar tu primera cámara hasta recibir alertas en tiempo real, todo el flujo está
            diseñado para funcionar sin fricción.
          </p>
        </motion.div>

        {/* Timeline — desktop: horizontal, mobile: vertical */}
        <div className="relative">
          {/* Horizontal connector line (desktop) */}
          <div className="hidden lg:block absolute top-14 left-[calc(100%/14)] right-[calc(100%/14)] h-px bg-gradient-to-r from-transparent via-border to-transparent z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Mobile vertical line */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden absolute top-full left-1/2 -translate-x-1/2 w-px h-6 bg-border z-0" />
                )}

                {/* Icon circle */}
                <div
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${step.color} border ${step.border} mb-3 group-hover:scale-110 transition-transform duration-200 shadow-lg`}
                >
                  <step.icon className={`w-5 h-5 ${step.iconColor}`} />
                  {/* Number badge */}
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center">
                    <span className="text-[9px] font-bold text-muted-foreground">{step.number}</span>
                  </div>
                </div>

                <h3 className="text-xs font-semibold text-foreground mb-1 leading-tight">{step.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-snug hidden lg:block">{step.description}</p>
                <p className="text-xs text-muted-foreground leading-relaxed lg:hidden max-w-[280px]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

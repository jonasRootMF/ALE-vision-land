'use client'

import { motion } from 'framer-motion'
import { Camera, GitCompare, Brain } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

const cards = [
  {
    icon: Camera,
    step: '01',
    title: 'Captura periódica',
    description:
      'ALE Visión toma capturas automáticas de tus cámaras IP en intervalos configurables: cada hora, turno o frecuencia que necesites. Sin interrumpir el flujo de trabajo.',
    highlight: 'Captura automática',
  },
  {
    icon: GitCompare,
    step: '02',
    title: 'Comparación contra referencia',
    description:
      'Cada captura se compara con una imagen de referencia aprobada que define el estado "ideal" de la escena, usando criterios expresados en lenguaje natural.',
    highlight: 'Referencia visual',
  },
  {
    icon: Brain,
    step: '03',
    title: 'Resultado con IA',
    description:
      'La IA genera un IAG (0–100) y una descripción textual de las desviaciones detectadas. Verde = óptimo, Amarillo = atención, Rojo = alerta crítica.',
    highlight: 'IAG con IA',
  },
]

export function WhatIs() {
  return (
    <section id="que-es" className="relative py-24 overflow-hidden">
      {/* Top separator glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-border to-transparent" />

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
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Qué es ALE Visión</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
            Inteligencia visual para tus instalaciones
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            Un SaaS que conecta con tus cámaras existentes y las convierte en herramientas de supervisión inteligente,
            sin hardware adicional ni complicadas instalaciones.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="group relative"
            >
              {/* Connector line between cards */}
              {i < cards.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-3 w-6 h-px bg-gradient-to-r from-border to-transparent z-10" />
              )}

              <div className="relative h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/5 overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                {/* Step number */}
                <div className="absolute top-4 right-4 text-6xl font-black text-muted-foreground/5 select-none leading-none">
                  {card.step}
                </div>

                <div className="relative">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 border border-primary/25 mb-5 group-hover:bg-primary/20 transition-colors">
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>

                  {/* Highlight badge */}
                  <div className="mt-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-xs font-semibold text-primary">{card.highlight}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import {
  Camera,
  Brain,
  BarChart3,
  Bell,
  Globe,
  Shield,
  Clock,
  Webhook,
  FileBarChart,
  Sliders,
} from 'lucide-react'

const features = [
  {
    icon: Camera,
    title: 'Compatible con cualquier cámara IP',
    description: 'Conecta vía RTSP, HTTP o integración directa con los principales fabricantes del mercado.',
  },
  {
    icon: Brain,
    title: 'Motor de IA multimodal',
    description: 'Utiliza modelos de visión de última generación para comparar imágenes con precisión contextual.',
  },
  {
    icon: BarChart3,
    title: 'IAG en tiempo real',
    description: 'Índice de Apego General (0–100) actualizado en cada captura con historial y tendencias.',
  },
  {
    icon: Bell,
    title: 'Alertas configurables',
    description: 'Notificaciones por correo, Slack, WhatsApp Business o webhook cuando el IAG cae bajo el umbral.',
  },
  {
    icon: Globe,
    title: 'Dashboard multi-sitio',
    description: 'Centraliza el monitoreo de toda tu red de locales en un único panel de control.',
  },
  {
    icon: Shield,
    title: 'Criterios en lenguaje natural',
    description: 'Define qué evaluar escribiendo en español normal, sin configuraciones técnicas complejas.',
  },
  {
    icon: Clock,
    title: 'Capturas programadas',
    description: 'Configura la frecuencia por cámara: horaria, por turno, diaria o a demanda manual.',
  },
  {
    icon: Webhook,
    title: 'API y Webhooks',
    description: 'Integra ALE Visión con tu ERP, BI o sistema de gestión mediante nuestra API REST.',
  },
  {
    icon: FileBarChart,
    title: 'Reportes automáticos',
    description: 'Genera reportes PDF o CSV de cumplimiento diario/semanal/mensual por cámara, zona o sitio.',
  },
  {
    icon: Sliders,
    title: 'Umbrales por zona',
    description: 'Define niveles de tolerancia distintos para cada cámara, zona o tipo de establecimiento.',
  },
]

export function Features() {
  return (
    <section id="caracteristicas" className="relative py-24">
      <div className="absolute inset-0 grid-bg opacity-25" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/12 border border-primary/25 mb-5">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Características</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
            Todo lo que necesitas para supervisar a escala
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            ALE Visión está diseñado para ser potente en funcionalidades y simple en operación.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />

              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/22 transition-colors">
                  <feat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-2 leading-tight">{feat.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

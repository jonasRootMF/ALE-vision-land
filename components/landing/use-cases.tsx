'use client'

import { motion } from 'framer-motion'
import { Fuel, ShoppingCart, Package, Building2, Factory, Wifi } from 'lucide-react'

const cases = [
  {
    icon: Fuel,
    title: 'Gasolineras',
    description:
      'Verifica que la imagen de marca esté presente: limpieza de isla, señalización correcta, dispensadores sin daños y uniforme del personal.',
    iag: 94,
    criteria: ['Limpieza de isla', 'Señalización correcta', 'Uniforme del personal', 'Dispensadores operativos'],
  },
  {
    icon: ShoppingCart,
    title: 'Retail',
    description:
      'Controla que los planogramas se respeten, los estantes estén llenos, los precios visibles y la zona de cajas ordenada.',
    iag: 78,
    criteria: ['Planograma correcto', 'Estantes llenos', 'Precios visibles', 'Caja ordenada'],
  },
  {
    icon: Package,
    title: 'Almacenes',
    description:
      'Supervisa la organización del almacén: zonas señalizadas, pasillos despejados, SKUs en su lugar y condiciones de seguridad.',
    iag: 62,
    criteria: ['Zonas señalizadas', 'Pasillos libres', 'SKUs correctos', 'EPP visible'],
  },
  {
    icon: Building2,
    title: 'Sucursales',
    description:
      'Asegura la imagen institucional en toda la red: banners, áreas de espera, mostradores y cumplimiento de protocolo visual.',
    iag: 88,
    criteria: ['Imagen institucional', 'Área de espera', 'Mostrador limpio', 'Material POP'],
  },
  {
    icon: Factory,
    title: 'Plantas industriales',
    description:
      'Monitorea líneas de producción, zonas de seguridad, señalética de emergencia y correcta posición de maquinaria.',
    iag: 71,
    criteria: ['Zonas de seguridad', 'Señalética activa', 'Maquinaria en posición', 'Sin obstrucciones'],
  },
  {
    icon: Wifi,
    title: 'Red de locales',
    description:
      'Unifica el monitoreo de toda tu red en un solo dashboard. Compara el desempeño IAG entre sucursales y detecta outliers.',
    iag: 83,
    criteria: ['Vista unificada', 'Comparativa de red', 'Detección de outliers', 'Reportes automáticos'],
  },
]

function IAGBadge({ value }: { value: number }) {
  const color = value >= 80 ? 'text-iag-green border-iag-green/40 bg-iag-green/10' : value >= 50 ? 'text-iag-yellow border-iag-yellow/40 bg-iag-yellow/10' : 'text-iag-red border-iag-red/40 bg-iag-red/10'
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${color}`}>
      <span>IAG {value}</span>
    </div>
  )
}

export function UseCases() {
  return (
    <section id="casos-de-uso" className="relative py-24">
      {/* Background accent */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/12 border border-primary/25 mb-5">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Casos de uso</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
            Adaptado a tu industria
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            ALE Visión se adapta a cualquier entorno donde el orden visual y el cumplimiento de estándares
            sean críticos para el negocio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/35 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-transparent to-accent/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <IAGBadge value={item.iag} />
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>

                {/* Criteria pills */}
                <div className="flex flex-wrap gap-1.5">
                  {item.criteria.map((c) => (
                    <span
                      key={c}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground font-medium"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

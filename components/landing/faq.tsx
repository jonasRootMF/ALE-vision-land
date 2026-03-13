'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: '¿Necesito cambiar mis cámaras o instalar hardware nuevo?',
    a: 'No. ALE Visión se conecta a tus cámaras IP existentes vía RTSP o HTTP. No se requiere hardware adicional ni reemplazar la infraestructura actual. Si tu cámara puede transmitir video, ALE Visión puede trabajar con ella.',
  },
  {
    q: '¿Qué es exactamente el IAG y cómo se calcula?',
    a: 'El Índice de Apego General (IAG) es un número de 0 a 100 que mide qué tan bien el estado actual de una escena se apega a la referencia ideal. Se calcula mediante un modelo de visión por IA que compara la captura contra la imagen de referencia aplicando los criterios en texto que tú defines. Verde (80–100) = óptimo, Amarillo (50–79) = atención, Rojo (0–49) = alerta.',
  },
  {
    q: '¿Cómo defino los criterios de evaluación?',
    a: 'Simplemente escribes en lenguaje natural lo que quieres evaluar. Por ejemplo: "Los estantes deben estar completos con producto", "No debe haber cajas en el pasillo", "El uniforme del personal debe ser el correcto". No necesitas conocimientos técnicos ni configuraciones complejas.',
  },
  {
    q: '¿Con qué frecuencia puede capturar imágenes el sistema?',
    a: 'La frecuencia es configurable por cámara. Puede ser cada hora, cada turno, una vez al día, o incluso en intervalos de minutos si el caso de uso lo requiere. También puedes solicitar capturas manuales en cualquier momento desde el dashboard.',
  },
  {
    q: '¿Cómo funciona el sistema de alertas?',
    a: 'Cuando el IAG de una cámara cae por debajo del umbral que configuraste, ALE Visión dispara alertas automáticas. Puedes recibir notificaciones por correo electrónico, Slack, WhatsApp Business o mediante webhooks para integrar con tus sistemas actuales.',
  },
  {
    q: '¿Puedo monitorear múltiples sucursales desde un solo lugar?',
    a: 'Sí. El dashboard de ALE Visión está diseñado para gestión multi-sitio. Puedes ver todas tus cámaras y sucursales en una sola pantalla, filtrar por zona o sitio, y comparar el desempeño IAG entre locales para identificar outliers.',
  },
  {
    q: '¿Los datos e imágenes son seguros y privados?',
    a: 'Absolutamente. Las imágenes capturadas se procesan y almacenan con cifrado en reposo y en tránsito. Tienes control total sobre las retenciones de datos y podemos operar bajo acuerdos NDA. También ofrecemos despliegue en nube privada para clientes enterprise.',
  },
  {
    q: '¿ALE Visión puede integrarse con mi ERP o sistema de gestión?',
    a: 'Sí. Ofrecemos una API REST documentada y soporte para webhooks para que puedas conectar ALE Visión con tu ERP, sistema de BI, plataforma de operaciones o cualquier herramienta que utilices actualmente.',
  },
  {
    q: '¿Cuánto tiempo tarda en configurarse el sistema?',
    a: 'Una cámara puede estar operativa en menos de 10 minutos: conectas la URL, subes la imagen de referencia, escribes los criterios y listo. La implementación completa de una red de 50+ cámaras típicamente se hace en un día con ayuda de nuestro equipo de onboarding.',
  },
  {
    q: '¿Tienen planes para pequeñas empresas o solo para grandes corporativos?',
    a: 'Tenemos planes para todos los tamaños. Desde negocios con una sola sucursal hasta redes con cientos de locales. Contáctanos para una demo personalizada y te ayudamos a encontrar el plan que mejor se adapte a tus necesidades y presupuesto.',
  },
  {
    q: '¿Puedo usar una cámara dentro de mi red local sin acceso a internet?',
    a: 'Sí. ALE Visión ofrece un agente local que se instala en un equipo Linux o Raspberry Pi dentro de tu red. Este agente captura imágenes desde cámaras locales y las envía de forma segura a la plataforma para su evaluación, sin necesidad de exponer las cámaras a internet.',
  },
  {
    q: '¿ALE Visión reemplaza a mi sistema de videovigilancia (CCTV)?',
    a: 'No. ALE Visión es una capa adicional de inteligencia sobre las cámaras existentes. Tu CCTV sigue grabando como siempre; ALE Visión añade evaluación automática, un índice de cumplimiento y alertas proactivas. Son complementarios, no excluyentes.',
  },
  {
    q: '¿Qué pasa con la primera imagen que toma el sistema?',
    a: 'La primera captura —o la imagen que tú subas manualmente— se establece como imagen de referencia. Todas las capturas siguientes se comparan contra esa base aplicando los criterios que definiste. Puedes actualizar la referencia en cualquier momento desde el dashboard.',
  },
  {
    q: '¿Necesito conocimientos técnicos para configurarlo?',
    a: 'No. La configuración está diseñada para que cualquier persona pueda hacerla: conectas la URL de tu cámara, subes o tomas la imagen de referencia y escribes en texto libre lo que quieres evaluar. No se requiere programación ni conocimientos técnicos especiales. Nuestro equipo te acompaña en el proceso de onboarding.',
  },
]

export function FAQ() {
  return (
    <section id="faq" className="relative py-24 bg-secondary/20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/12 border border-primary/25 mb-5">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Preguntas frecuentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
            Resolvemos tus dudas
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            ¿Tienes más preguntas?{' '}
            <a
              href="https://wa.me/5212222067664"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Escríbenos por WhatsApp
            </a>{' '}
            y te respondemos en minutos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-5 overflow-hidden data-[state=open]:border-primary/35 transition-colors duration-200"
              >
                <AccordionTrigger className="text-sm font-semibold text-foreground text-left py-4 hover:no-underline hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

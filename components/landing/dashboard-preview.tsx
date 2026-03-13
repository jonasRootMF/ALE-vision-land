'use client'

import { motion } from 'framer-motion'
import { Camera, CheckCircle, AlertTriangle, XCircle, Clock, Settings, ChevronRight, Activity, Pause, Play, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

type IagLevel = 'green' | 'yellow' | 'red'

function getLevel(iag: number): IagLevel {
  if (iag >= 80) return 'green'
  if (iag >= 50) return 'yellow'
  return 'red'
}

function IagBadge({ iag, size = 'sm' }: { iag: number; size?: 'sm' | 'lg' }) {
  const level = getLevel(iag)
  const styles: Record<IagLevel, string> = {
    green: 'bg-[--iag-green]/15 text-[--iag-green] border-[--iag-green]/30',
    yellow: 'bg-[--iag-yellow]/15 text-[--iag-yellow] border-[--iag-yellow]/30',
    red: 'bg-[--iag-red]/15 text-[--iag-red] border-[--iag-red]/30',
  }
  const glowStyles: Record<IagLevel, string> = {
    green: 'iag-glow-green',
    yellow: 'iag-glow-yellow',
    red: 'iag-glow-red',
  }
  return (
    <span className={cn(
      'inline-flex items-center font-bold border rounded-md',
      size === 'lg' ? 'px-3 py-1.5 text-base gap-1.5' : 'px-2 py-0.5 text-xs gap-1',
      styles[level],
      level === 'red' && glowStyles[level],
    )}>
      IAG {iag}
    </span>
  )
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span className={cn(
      'inline-flex w-2 h-2 rounded-full shrink-0',
      active ? 'bg-[--iag-green] shadow-[0_0_6px_1px_oklch(0.7_0.2_145/0.6)]' : 'bg-muted-foreground/40'
    )} />
  )
}

const sessions = [
  {
    name: 'Sucursal Norte',
    camera: 'Bomba 1',
    active: true,
    iag: 91,
    lastCapture: 'hace 5 min',
    alertMin: 70,
    criteria: 'Validar que el área esté libre de vehículos y sin personas',
  },
  {
    name: 'Tienda Centro',
    camera: 'Pasillo 3',
    active: true,
    iag: 67,
    lastCapture: 'hace 2 min',
    alertMin: 75,
    criteria: 'Estantes completos con producto visible y señalización en orden',
  },
  {
    name: 'Almacén Oriente',
    camera: 'Zona de carga',
    active: true,
    iag: 34,
    lastCapture: 'hace 1 min',
    alertMin: 60,
    criteria: 'Pasillos libres, pallets en zona marcada, señalización de emergencia visible',
  },
  {
    name: 'Oficina Matriz',
    camera: 'Entrada principal',
    active: false,
    iag: 88,
    lastCapture: 'hace 2 h',
    alertMin: 70,
    criteria: 'Área de recepción ordenada, acceso despejado, señalización visible',
  },
]

const iconByLevel: Record<IagLevel, typeof CheckCircle> = {
  green: CheckCircle,
  yellow: AlertTriangle,
  red: XCircle,
}

const textByLevel: Record<IagLevel, string> = {
  green: 'text-[--iag-green]',
  yellow: 'text-[--iag-yellow]',
  red: 'text-[--iag-red]',
}

export function DashboardPreview() {
  return (
    <section id="dashboard" className="relative py-24 bg-background overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" />

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
            <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Interfaz del producto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance mb-4">
            Todo bajo control en un solo lugar
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            Gestiona cámaras, revisa el historial y monitorea el IAG de cada ubicación desde un dashboard claro y operativo.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-secondary/40 border-b border-border">
            <span className="w-3 h-3 rounded-full bg-[--iag-red]/60" />
            <span className="w-3 h-3 rounded-full bg-[--iag-yellow]/60" />
            <span className="w-3 h-3 rounded-full bg-[--iag-green]/60" />
            <div className="flex-1 mx-4 bg-background/50 rounded-md px-3 py-1 text-xs text-muted-foreground/50 text-center">
              app.alevision.ai/dashboard
            </div>
          </div>

          <div className="flex min-h-[480px]">
            {/* Sidebar */}
            <div className="w-14 sm:w-48 border-r border-border bg-secondary/20 flex flex-col gap-1 p-2">
              {[
                { label: 'Dashboard', Icon: LayoutDashboard, active: true },
                { label: 'Cámaras', Icon: Camera, active: false },
                { label: 'Historial', Icon: Activity, active: false },
                { label: 'Ajustes', Icon: Settings, active: false },
              ].map(({ label, Icon, active }) => (
                <div
                  key={label}
                  className={cn(
                    'flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors cursor-default',
                    active
                      ? 'bg-primary/15 text-primary font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  )}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{label}</span>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 sm:p-5 flex flex-col gap-4 min-w-0">
              {/* Summary bar */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Cámaras activas', value: '3', sub: 'de 4 totales', color: 'text-[--iag-green]' },
                  { label: 'IAG promedio', value: '70.2', sub: 'últimas 24h', color: 'text-[--iag-yellow]' },
                  { label: 'Alertas hoy', value: '1', sub: 'por debajo del umbral', color: 'text-[--iag-red]' },
                ].map(({ label, value, sub, color }) => (
                  <div key={label} className="bg-secondary/30 border border-border/60 rounded-xl p-3">
                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                    <p className={cn('text-xl font-black', color)}>{value}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>

              {/* Session list */}
              <div className="bg-secondary/20 border border-border/60 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 border-b border-border/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Sesiones de monitoreo</span>
                  <span className="text-xs text-muted-foreground">{sessions.length} cámaras</span>
                </div>

                <div className="divide-y divide-border/40">
                  {sessions.map((s, i) => {
                    const level = getLevel(s.iag)
                    const LevelIcon = iconByLevel[level]
                    const isAlert = s.active && s.iag < s.alertMin
                    return (
                      <motion.div
                        key={s.name}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-20px' }}
                        transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors cursor-default',
                          isAlert && 'bg-[--iag-red]/5'
                        )}
                      >
                        {/* Status dot */}
                        <StatusDot active={s.active} />

                        {/* Camera icon */}
                        <div className="w-7 h-7 rounded-lg bg-secondary/60 border border-border/60 flex items-center justify-center shrink-0">
                          <Camera className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-foreground truncate">{s.name}</p>
                            {isAlert && (
                              <span className="text-[10px] font-bold text-[--iag-red] bg-[--iag-red]/10 border border-[--iag-red]/25 px-1.5 py-0.5 rounded shrink-0">
                                ALERTA
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{s.camera} · {s.criteria.slice(0, 40)}…</p>
                        </div>

                        {/* IAG + time */}
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <div className="flex items-center gap-1.5">
                            <LevelIcon className={cn('w-3.5 h-3.5', textByLevel[level])} />
                            <IagBadge iag={s.iag} />
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                            <Clock className="w-2.5 h-2.5" />
                            {s.lastCapture}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5 ml-1 shrink-0">
                          {s.active ? (
                            <Pause className="w-3.5 h-3.5 text-muted-foreground/40 hover:text-muted-foreground cursor-pointer" />
                          ) : (
                            <Play className="w-3.5 h-3.5 text-muted-foreground/40 hover:text-muted-foreground cursor-pointer" />
                          )}
                          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/30" />
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Detail panel — Bomba 1 */}
              <div className="bg-secondary/20 border border-border/60 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">Sesión activa</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">Sucursal Norte — Bomba 1</p>
                  </div>
                  <IagBadge iag={91} size="lg" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {[
                    { label: 'Estado', value: 'Activo', color: 'text-[--iag-green]' },
                    { label: 'Última captura', value: 'hace 5 min', color: 'text-foreground' },
                    { label: 'Umbral de alerta', value: 'IAG < 70', color: 'text-foreground' },
                    { label: 'Intervalo', value: 'Cada 15 min', color: 'text-foreground' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="bg-background/40 rounded-lg p-2.5 border border-border/40">
                      <p className="text-muted-foreground/60 mb-0.5">{label}</p>
                      <p className={cn('font-semibold', color)}>{value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 bg-background/30 rounded-lg border border-border/40 p-3">
                  <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wide font-semibold mb-1">Criterio configurado</p>
                  <p className="text-xs text-muted-foreground">"Validar que el área esté libre de vehículos y sin personas. Bombas accesibles y señalización visible."</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

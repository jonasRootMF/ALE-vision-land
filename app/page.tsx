import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { WhatIs } from '@/components/landing/what-is'
import { HowItWorks } from '@/components/landing/how-it-works'
import { UseCases } from '@/components/landing/use-cases'
import { EvaluationDemo } from '@/components/landing/evaluation-demo'
import { Comparison } from '@/components/landing/comparison'
import { Features } from '@/components/landing/features'
import { Architecture } from '@/components/landing/architecture'
import { DashboardPreview } from '@/components/landing/dashboard-preview'
import { BusinessBenefits } from '@/components/landing/business-benefits'
import { FAQ } from '@/components/landing/faq'
import { FinalCTA } from '@/components/landing/final-cta'

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhatIs />
      <HowItWorks />
      <UseCases />
      <EvaluationDemo />
      <Comparison />
      <Features />
      <Architecture />
      <DashboardPreview />
      <BusinessBenefits />
      <FAQ />
      <FinalCTA />
    </main>
  )
}

'use client'

import React, { useMemo, useState } from 'react'

import { FadeIn } from '@/components/FadeIn'
import { NHButton } from '@/blocks/shared/ui'

export default function CalculatorPage() {
  const [clients, setClients] = useState(5)
  const [avgProject, setAvgProject] = useState(5000)
  const [margin, setMargin] = useState(30)

  const results = useMemo(() => {
    const monthlyRevenue = clients * avgProject
    const monthlyProfit = monthlyRevenue * (margin / 100)
    const annualProfit = monthlyProfit * 12
    return { monthlyRevenue, monthlyProfit, annualProfit }
  }, [clients, avgProject, margin])

  return (
    <div className="pb-16 pt-28">
      <div className="container max-w-3xl">
        <FadeIn>
          <h1 className="mb-4">Agency Profitability Calculator</h1>
          <p className="mb-10 text-black/70">
            Estimate your agency&apos;s revenue and profit with white-label delivery.
          </p>

          <div className="space-y-8 rounded-2xl border border-black/10 bg-white p-8">
            <div>
              <label className="mb-2 block font-medium">Clients per month: {clients}</label>
              <input
                className="w-full"
                max={50}
                min={1}
                type="range"
                value={clients}
                onChange={(e) => setClients(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="mb-2 block font-medium">
                Average project value: ${avgProject.toLocaleString()}
              </label>
              <input
                className="w-full"
                max={50000}
                min={1000}
                step={500}
                type="range"
                value={avgProject}
                onChange={(e) => setAvgProject(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="mb-2 block font-medium">Profit margin: {margin}%</label>
              <input
                className="w-full"
                max={80}
                min={10}
                type="range"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
              />
            </div>

            <div className="grid gap-4 border-t border-black/10 pt-8 md:grid-cols-3">
              <div className="rounded-xl bg-nh-blue-light p-4 text-center">
                <div className="text-sm text-black/60">Monthly Revenue</div>
                <div className="text-2xl font-medium text-nh-blue">
                  ${results.monthlyRevenue.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-nh-blue-light p-4 text-center">
                <div className="text-sm text-black/60">Monthly Profit</div>
                <div className="text-2xl font-medium text-nh-blue">
                  ${results.monthlyProfit.toLocaleString()}
                </div>
              </div>
              <div className="rounded-xl bg-nh-blue-light p-4 text-center">
                <div className="text-sm text-black/60">Annual Profit</div>
                <div className="text-2xl font-medium text-nh-blue">
                  ${results.annualProfit.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <NHButton href="https://calendly.com/hellonotionhive/30min">Book a Strategy Call</NHButton>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

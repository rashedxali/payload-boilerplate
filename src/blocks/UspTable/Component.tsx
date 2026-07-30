'use client'

import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { Section } from '@/blocks/shared/ui'

type AnyBlock = Record<string, any>

export const UspTableBlock: React.FC<AnyBlock> = (props) => {
  const columns = (props.columns as Array<{ label?: string }>) || []
  const rows =
    (props.rows as Array<{
      feature?: string
      notionhive?: string
      inhouse?: string
      freelancers?: string
    }>) || []

  return (
    <Section>
      <FadeIn>
        <h2 className="nh-section-title mb-8">{props.tableTitle as string}</h2>
        <div className="overflow-x-auto rounded-2xl border border-black/10">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-nh-blue-light">
              <tr>
                {columns.map((col, i) => (
                  <th key={i} className="px-6 py-4 font-medium">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-black/10">
                  <td className="px-6 py-4 font-medium">{row.feature}</td>
                  <td className="px-6 py-4">{row.notionhive}</td>
                  <td className="px-6 py-4">{row.inhouse}</td>
                  <td className="px-6 py-4">{row.freelancers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </Section>
  )
}

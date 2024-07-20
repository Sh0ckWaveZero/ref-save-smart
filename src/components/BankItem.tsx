'use client'
import React from 'react'
import Image from 'next/image'
import { Bank } from '~/interfaces/Bank'
import { formatCurrency } from '~/utils/formatCurrency'

interface BankItemProps {
  bankCalculator: Bank[]
  index: number
  summary: any
  isShowInput: boolean
}

// individual bank item
const BankItemRow = ({ summary }: { summary: Bank }) => (
  <div className='border border-[#DFDFDF] p-4 bg-white rounded-lg flex gap-3'>
    <div>
      <Image src={summary.logo} width={40} height={40} alt='' className='rounded-lg' />
    </div>
    <div className='flex justify-between flex-1'>
      <div className='flex flex-col gap-0.5'>
        <div className='flex items-center gap-1 text-sm'>
          <p className='font-bold'>{summary.name}</p>
          <div className='hidden min-[375px]:block'>
            <span className='p-0.5 px-1 rounded-lg text-[10px] font-bold bg-green-300'>{Number(summary.interest * 100).toFixed(2)}%</span>
          </div>
        </div>
        <p className='text-[#A1A1A1] text-xs'>{summary.bank}</p>
      </div>
      <div className='flex flex-col gap-0.5'>
        <p className='text-sm font-bold text-right'>{formatCurrency(summary.saving)}</p>
        <p className='text-[#A1A1A1] text-xs text-right'>
          <span>
            ดอกเบี้ย
            {formatCurrency(summary.totalInterest)}
          </span>
        </p>
      </div>
    </div>
  </div>
)

const BankItem: React.FC<BankItemProps> = ({ bankCalculator, index, summary, isShowInput }) => {
  return (
    <>
      {bankCalculator.map((summary, index) =>
        index !== 4 && (summary.saving > 0 || isShowInput) ? <BankItemRow key={index} summary={summary} /> : null
      )}
    </>
  )
}

export default BankItem

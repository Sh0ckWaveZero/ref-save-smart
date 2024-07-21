import React from 'react'
import { type Bank } from '~/interfaces/Bank'
import Image from 'next/image'
import { formatCurrency } from '~/utils/formatCurrency'

interface BankItemProps {
  index: number
  summary: Bank
  isShowInput: boolean
}

const BankItem: React.FC<BankItemProps> = ({ index, summary, isShowInput }) => {
  if (index === 4 || (summary.saving <= 0 && !isShowInput)) {
    return null
  }

  return (
    <div className='border border-[#DFDFDF] p-4 bg-white rounded-lg flex gap-3'>
      <div>
        <Image src={summary.logo} alt='Bank Logo' width={40} height={40} className='rounded-lg' />
      </div>
      <div className='flex justify-between flex-1'>
        <div className='flex flex-col gap-0.5'>
          <div className='flex items-center gap-1 text-sm'>
            <p className='font-bold'>{summary.name}</p>
            <div className='hidden min-[375px]:block'>
              <span className='p-0.5 px-1 rounded-lg text-[10px] font-bold bg-green-300'>{(summary.interest * 100).toFixed(2)}%</span>
            </div>
          </div>
          <p className='text-[#A1A1A1] text-xs'>{summary.bank}</p>
        </div>
        <div className='flex flex-col gap-0.5'>
          <p className='text-sm font-bold text-right'>{formatCurrency(summary.saving)}</p>
          <p className='text-[#A1A1A1] text-xs text-right'>
            <span>ดอกเบี้ย {formatCurrency(summary.totalInterest)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default BankItem

'use client'
import React from 'react'
import { formatCurrency } from '~/utils/formatCurrency'

type ResultDisplayProps = {
  saving: number
  canSavingMore2Years: boolean
  onShowInput: () => void
}

const ResultDisplay = ({ saving, canSavingMore2Years, onShowInput }: ResultDisplayProps) => {
  return (
    <div className='container px-4 mx-auto'>
      <div className='bg-white rounded-lg -mt-20 p-4 flex flex-col gap-4 border border-[#EDEDED]'>
        <div className='flex flex-col gap-1'>
          <label className='text-[#A1A1A1] text-center'>จำนวนเงินออม</label>
          <h2 className='text-4xl font-bold text-center'>{formatCurrency(Number(saving))}</h2>
        </div>
        <p className={`text-center ${!canSavingMore2Years ? 'block' : 'hidden'}`}>ฝากสั้น ไม่ถึง 2 ปี</p>
        <p className={`text-center ${canSavingMore2Years ? 'block' : 'hidden'}`}>ฝากยาว มากกว่า 2 ปี</p>
        <button className='border border-[#2969FF] py-3 text-[#2969FF] rounded-lg' onClick={onShowInput}>
          คำนวณใหม่
        </button>
      </div>
    </div>
  )
}

export default ResultDisplay

'use client'
import React, { useState } from 'react'

interface MoneyInputProps {
  saving: number
  setSaving: React.Dispatch<React.SetStateAction<number>>
  canSavingMore2Years: boolean
  setCanSavingMore2Years: React.Dispatch<React.SetStateAction<boolean>>
  calculate: () => void
}

const MoneyInput = ({ saving, setSaving, canSavingMore2Years, setCanSavingMore2Years, calculate }: MoneyInputProps) => {
  return (
    <div className='container px-4 mx-auto'>
      <div className='bg-white rounded-lg -mt-20 p-4 flex flex-col gap-4 border border-[#EDEDED]'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='saving' className='text-[#A1A1A1]'>
            จำนวนเงินออม (บาท)
          </label>
          <input
            value={saving}
            onChange={(e) => setSaving(e.target.valueAsNumber)}
            placeholder='100000'
            type='number'
            className='border border-[#DFDFDF] py-3 px-4 w-full focus:outline-none focus:border-[#2969FF] rounded-lg'
          />
        </div>
        <label htmlFor='more2years' className='flex items-center gap-1 cursor-pointer select-none'>
          <input
            id='more2years'
            checked={canSavingMore2Years}
            onChange={(e) => setCanSavingMore2Years(e.target.checked)}
            type='checkbox'
            className='h-4 w-4 rounded border-gray-300 text-[#2969FF] focus:ring-[#2969FF]'
          />
          สามารถฝากเงินได้เกิน 2 ปี
        </label>
        <button className='bg-[#2969FF] py-3 text-white rounded-lg' onClick={calculate}>
          คำนวณ
        </button>
      </div>
    </div>
  )
}

export default MoneyInput

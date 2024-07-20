'use client'
import React, { useCallback, useEffect, useState } from 'react'

import BankItem from '~/components/BankItem'
import Footer from '~/components/Footer'
import MoneyInput from '~/components/MoneyInput'
import ResultDisplay from '~/components/ResultDisplay'
import { banks } from '~/data/banks'
import type { Bank } from '~/interfaces/Bank'
import { formatCurrency } from '~/utils/formatCurrency'

const initialBank: Bank[] = JSON.parse(JSON.stringify(banks)) as Bank[]

const Home = () => {
  const [saving, setSaving] = useState<number>(0)
  const [canSavingMore2Years, setCanSavingMore2Years] = useState<boolean>(false)
  const [isShowInput, setIsShowInput] = useState<boolean>(true)
  const [bankCalculator, setBankCalculator] = useState<Bank[]>(initialBank)
  const [sumTotalInterest, setSumTotalInterest] = useState<number>(0)

  const resetBanksValue = useCallback(() => {
    setBankCalculator(JSON.parse(JSON.stringify(initialBank)))
    setSumTotalInterest(0)
  }, [])

  // Calculate total interest for each bank
  const calculateTotalInterest = useCallback((bank: Bank): number => {
    return bank.saving * bank.interest
  }, [])

  // Show input and reset banks value
  const showInput = useCallback(() => {
    setIsShowInput(true)
    resetBanksValue()
  }, [resetBanksValue])

  // Main calculation function
  const calculate = useCallback(() => {
    setIsShowInput(false)

    const saveDime = 10000
    const saveTTBME = 5833
    const saveKKP = 10000
    const saveChillD = 100000
    const saveTTBMEStep2 = 100000
    const saveKKPStep2 = 40000
    const saveAlpha = 500000
    const saveHL = 1000000

    let remainSaving = saving
    const updatedBankCalculator = bankCalculator.map((bank, index) => {
      if (remainSaving <= 0) return { ...bank, saving: 0, ratio: 0, totalInterest: 0 }

      let allocation = 0
      switch (index) {
        case 0:
          allocation = Math.min(remainSaving, saveDime)
          break
        case 1:
          allocation = Math.min(remainSaving, saveTTBME)
          break
        case 2:
          allocation = Math.min(remainSaving, saveKKP)
          break
        case 3:
          allocation = Math.min(remainSaving, saveChillD)
          break
        case 4:
          allocation = Math.min(remainSaving, saveTTBMEStep2)
          break
        case 5:
          allocation = Math.min(remainSaving, saveKKPStep2)
          break
        case 6:
          allocation = Math.min(remainSaving, saveAlpha)
          break
        case 7:
          allocation = Math.min(remainSaving, saveHL)
          break
        case 8:
          allocation = canSavingMore2Years ? Math.min(remainSaving, 971000) : Math.min(remainSaving, 385000)
          break
        case 9:
          allocation = remainSaving
          break
        default:
          allocation = 0
      }

      remainSaving -= allocation
      const ratio = (allocation / saving) * 100
      const totalInterest = calculateTotalInterest({ ...bank, saving: allocation })

      return {
        ...bank,
        saving: allocation,
        ratio,
        totalInterest,
      }
    })

    // Update bank calculator and then calculate total interest
    setBankCalculator(updatedBankCalculator)
  }, [saving, bankCalculator, canSavingMore2Years, calculateTotalInterest])

  const calculateSumTotalInterest = useCallback(() => {
    // Calculate the total interest across all banks
    const totalInterest = bankCalculator.reduce((acc, bank) => acc + bank.totalInterest, 0)
    // Update the state with the total interest
    setSumTotalInterest(totalInterest)
  }, [bankCalculator])

  // Effect to calculate sum total interest after bankCalculator updates
  useEffect(() => {
    calculateSumTotalInterest()
  }, [bankCalculator, calculateSumTotalInterest])

  return (
    <>
      <div className='bg-[#2969FF] h-52'>
        <div className='flex flex-col gap-1 py-4 pt-10 text-center text-white'>
          <h1 className='text-2xl font-bold'>ฝากเงินที่ไหนดี ?</h1>
          <p className='text-sm'>มิดซีลี x MSL</p>
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        {isShowInput ? (
          <MoneyInput
            saving={saving}
            setSaving={setSaving}
            canSavingMore2Years={canSavingMore2Years}
            setCanSavingMore2Years={setCanSavingMore2Years}
            calculate={calculate}
          />
        ) : (
          <ResultDisplay saving={saving} canSavingMore2Years={canSavingMore2Years} onShowInput={showInput} />
        )}
        <div className='container px-4 mx-auto'>
          <div className='mb-2'>
            <h2 className='text-lg font-bold'>ฝากที่ไหนบ้าง</h2>
            <div className='text-xs text-[#A1A1A1] bg-[#f5f5f5] p-2 rounded-lg'>
              <p>Disclaimer</p>
              <p className='text-red-300'>***ข้อมูลที่ได้รับมาจากการคำนวณเป็นเพียงการประมาณการเท่านั้น ***</p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            {bankCalculator.map((summary, index) => (
              <BankItem key={index} index={index} summary={summary} isShowInput={isShowInput} />
            ))}
          </div>
        </div>
        <div className='container px-4 pb-4 mx-auto'>
          <h2 className='mb-1 text-lg font-bold'>ดอกเบี้ยที่จะได้รับโดยประมาณ</h2>
          <div className='border border-[#DFDFDF] p-4 bg-white rounded-lg flex gap-3'>
            <div className='flex justify-between flex-1'>
              <div className='flex flex-col gap-0.5'>
                <p className='text-sm font-bold'>ดอกเบี้ยรวมทุกธนาคาร</p>
                <p className='text-[#A1A1A1] text-xs'>ดอกเบี้ยรวมทุกธนาคารหากฝากเงิน 1 ปี</p>
              </div>
              <div className='flex flex-col gap-0.5'>
                <p className='text-sm font-bold text-right'>{formatCurrency(sumTotalInterest)}</p>
                <p className='text-[#A1A1A1] text-xs text-right'></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home

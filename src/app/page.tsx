'use client'
import React, { useState } from 'react'

import BankItem from '~/components/BankItem'
import Footer from '~/components/Footer'
import MoneyInput from '~/components/MoneyInput'
import ResultDisplay from '~/components/ResultDisplay'
import { banks } from '~/data/banks'
import type { Bank } from '~/interfaces/Bank'
import { formatCurrency } from '~/utils/formatCurrency'

const Home = () => {
  const [saving, setSaving] = useState(0)
  const [canSavingMore2Years, setCanSavingMore2Years] = useState(false)
  const [isShowInput, setIsShowInput] = useState(true)
  const [bankCalculator, setBankCalculator] = useState<Bank[]>(banks)
  const [sumTotalInterest, setSumTotalInterest] = useState(0)

  const showInput = () => {
    setSumTotalInterest(0)
    setIsShowInput(true)
  }

  const calculateSumTotalInterest = () => {
    const totalInterest = bankCalculator.reduce((acc, bank) => acc + bank.totalInterest, 0)
    setSumTotalInterest(totalInterest)
  }

  const calculateTotalInterest = (bank: (typeof banks)[0]) => bank.saving * bank.interest

  const calculate = () => {
    setIsShowInput(false)
    const updatedBankCalculator: any = bankCalculator.map((bank) => ({
      ...bank,
      saving: 0,
      ratio: 0,
      totalInterest: 0,
    }))
    const saveDime = 10000
    const saveTTBME = 5833
    const saveKKP = 10000
    const saveChillD = 100000
    const saveTTBMEStep2 = 100000
    const saveKKPStep2 = 40000
    const saveAlpha = 500000
    const saveHL = 1000000

    const updateBankCalculator = (index: number, amount: number) => {
      updatedBankCalculator[index].saving += amount
      updatedBankCalculator[index].ratio = (updatedBankCalculator[index].saving / saving) * 100
      updatedBankCalculator[index].totalInterest = calculateTotalInterest(updatedBankCalculator[index])
    }

    let remainSaving = saving

    if (remainSaving < saveDime) {
      updateBankCalculator(0, remainSaving)
      calculateSumTotalInterest()
      setBankCalculator(updatedBankCalculator)
      return
    }

    updateBankCalculator(0, saveDime)
    remainSaving -= saveDime

    if (remainSaving < saveTTBME) {
      updateBankCalculator(1, remainSaving)
      calculateSumTotalInterest()
      setBankCalculator(updatedBankCalculator)
      return
    }

    updateBankCalculator(1, saveTTBME)
    remainSaving -= saveTTBME

    if (remainSaving < saveKKP) {
      updateBankCalculator(2, remainSaving)
      calculateSumTotalInterest()
      setBankCalculator(updatedBankCalculator)
      return
    }

    updateBankCalculator(2, saveKKP)
    remainSaving -= saveKKP

    if (remainSaving < saveChillD) {
      updateBankCalculator(1, remainSaving)
      calculateSumTotalInterest()
      setBankCalculator(updatedBankCalculator)
      return
    }

    updateBankCalculator(3, saveChillD)
    remainSaving -= saveChillD

    if (remainSaving < saveTTBMEStep2) {
      updateBankCalculator(1, remainSaving)
      calculateSumTotalInterest()
      setBankCalculator(updatedBankCalculator)
      return
    }

    updateBankCalculator(1, saveTTBMEStep2)
    remainSaving -= saveTTBMEStep2

    if (remainSaving < saveKKPStep2) {
      updateBankCalculator(2, remainSaving)
      calculateSumTotalInterest()
      setBankCalculator(updatedBankCalculator)
      return
    }

    updateBankCalculator(2, saveKKPStep2)
    remainSaving -= saveKKPStep2

    if (remainSaving < saveAlpha) {
      updateBankCalculator(5, remainSaving)
      calculateSumTotalInterest()
      setBankCalculator(updatedBankCalculator)
      return
    }

    updateBankCalculator(5, saveAlpha)
    remainSaving -= saveAlpha

    if (remainSaving < 971000 && canSavingMore2Years) {
      updateBankCalculator(6, remainSaving)
      calculateSumTotalInterest()
      setBankCalculator(updatedBankCalculator)
      return
    }

    if (remainSaving > saveHL) {
      updateBankCalculator(7, saveHL)
      remainSaving -= saveHL
    } else {
      updateBankCalculator(7, remainSaving)
      calculateSumTotalInterest()
      setBankCalculator(updatedBankCalculator)
      return
    }

    if (canSavingMore2Years) {
      updateBankCalculator(6, remainSaving)
      calculateSumTotalInterest()
      setBankCalculator(updatedBankCalculator)
      return
    }

    if (remainSaving < 385000) {
      updateBankCalculator(8, remainSaving)
    } else {
      updateBankCalculator(9, remainSaving)
    }

    calculateSumTotalInterest()
    setBankCalculator(updatedBankCalculator)
  }

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
          <ResultDisplay saving={saving} canSavingMore2Years={canSavingMore2Years} isShowInput={isShowInput} onShowInput={showInput} />
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
              <BankItem bankCalculator={bankCalculator} key={index} index={index} summary={summary} isShowInput={isShowInput} />
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

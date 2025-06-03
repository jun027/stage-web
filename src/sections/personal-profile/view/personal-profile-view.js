'use client'

import { memo, useMemo, useState, useEffect, use } from 'react'
import InfoBlock from '../info-block'
import BaseInfoBlock from '../base-info-block'
import AccountSecurityBlock from '../account-security-block'
import BettingRecordBlock from '../betting-record-block'
import { startOfToday, endOfToday } from 'date-fns'
import { useAuthContext } from '@/auth/hooks'
import { parseISO, format } from 'date-fns'
import { useTranslations } from 'next-intl'
import { SEX_CONFIG } from '../config/sex-config'
import betRecordsAPI from '@/services/member/betRecords'
import { paths } from '@/routes/paths'
import { useRouter } from '@/navigation'

function useSumTodayBetRecords() {
  const initialData = {
    真人: { totalEffectBet: 0, totalWinLose: 0 },
    体育: { totalEffectBet: 0, totalWinLose: 0 },
    彩票: { totalEffectBet: 0, totalWinLose: 0 },
    电子: { totalEffectBet: 0, totalWinLose: 0 },
  }

  const [records, setRecords] = useState([])
  const [sumary, setSumary] = useState(initialData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      const payload = {
        game_type: null,
        start_date: format(startOfToday(), 'yyyy-MM-dd HH:mm:ss'),
        end_date: format(endOfToday(), 'yyyy-MM-dd HH:mm:ss'),
      }

      try {
        setLoading(true)
        const data = await betRecordsAPI(payload)()
        setRecords(data)
      } catch (error) {
        console.error('Error fetching bet records:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRecords()
  }, [])

  useEffect(() => {
    if (Array.isArray(records) && records.length > 0) {
      const aggregatedData = records.reduce(
        (acc, record) => {
          const { game_type, effect_bet, win_lose } = record
          const effectBetValue = Number(effect_bet) || 0
          const winLoseValue = Number(win_lose) || 0
          if (acc[game_type]) {
            acc[game_type].totalEffectBet = Number(
              (acc[game_type].totalEffectBet + effectBetValue).toFixed(10)
            )
            acc[game_type].totalWinLose = Number(
              (acc[game_type].totalWinLose + winLoseValue).toFixed(10)
            )
          }
          return acc
        },
        { ...initialData }
      )
      setSumary(aggregatedData)
    }
  }, [records])

  return { sumary, loading }
}

function PersonalProfileView() {
  const { user } = useAuthContext()
  const tSidebar = useTranslations('Dashboard.PersonalProfile.Sidebar')
  const { sumary, loading } = useSumTodayBetRecords()

  const router = useRouter()

  const infoBlockCheckList = useMemo(
    () => [
      {
        id: 1, // 基本資料
        check: false,
      },
      {
        id: 2, // 手機號碼
        check: !!user?.phone,
      },
      {
        id: 3, // 電子信箱
        check: !!user?.email,
      },
      {
        id: 4, // 銀行資料
        check: false,
      },
    ],
    [user?.email, user?.phone]
  )

  return (
    <div className="flex gap-x-4">
      <div className="flex-1 flex flex-col gap-y-4">
        <InfoBlock checkList={infoBlockCheckList} />
        <BaseInfoBlock
          username={user?.username}
          name={user?.name || ''}
          nickName={user?.nickname || ''}
          sex={user?.gender || SEX_CONFIG.Male.value}
          birthday={user?.birthday || parseISO(`${new Date().getFullYear()}-01-01`)}
          email={user?.email}
          lineId={user?.lineId}
          registerDate={user?.registerDate}
        />
        <AccountSecurityBlock phone={user?.phone} email={user?.email} />
      </div>
      <div className="flex-1 flex flex-col gap-y-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <BettingRecordBlock
            title={tSidebar('TodayBettingRecord')}
            list={sumary}
            onClick={() => router.push(paths.dashboard.bettingHistory)}
          />
        )}
      </div>
    </div>
  )
}

export default memo(PersonalProfileView)

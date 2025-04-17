import {
  format,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns'
import { ru } from 'date-fns/locale'

export function formatPostDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()

  const minutes = differenceInMinutes(now, date)
  const hours = differenceInHours(now, date)
  const days = differenceInDays(now, date)

  if (minutes < 60) {
    return `${minutes} ${getMinuteWord(minutes)} назад`
  }

  if (hours < 24) {
    return `${hours} ${getHourWord(hours)} назад`
  }

  if (days < 7) {
    return `${days} ${getDayWord(days)} назад`
  }

  return format(date, 'dd/MM/yyyy', { locale: ru })
}

function getMinuteWord(minutes: number): string {
  if (minutes % 10 === 1 && minutes !== 11) return 'минута'
  if ([2, 3, 4].includes(minutes % 10) && ![12, 13, 14].includes(minutes)) return 'минуты'
  return 'минут'
}

function getHourWord(hours: number): string {
  if (hours % 10 === 1 && hours !== 11) return 'час'
  if ([2, 3, 4].includes(hours % 10) && ![12, 13, 14].includes(hours)) return 'часа'
  return 'часов'
}

function getDayWord(days: number): string {
  if (days === 1) return 'день'
  if (days >= 2 && days <= 4) return 'дня'
  return 'дней'
}

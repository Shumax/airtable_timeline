import { format, eachDayOfInterval, eachMonthOfInterval, isFirstDayOfMonth } from "date-fns"

interface TimelineHeaderProps {
  startDate: Date
  endDate: Date
  dayWidth: number
}

export default function TimelineHeader({ startDate, endDate, dayWidth }: TimelineHeaderProps) {
  const days = eachDayOfInterval({ start: startDate, end: endDate })
  const months = eachMonthOfInterval({ start: startDate, end: endDate })

  return (
    <div className="sticky top-0 z-10 bg-background pb-2">
      <div className="flex h-8 ">
        {months.map((month, i) => {
          const monthStart = i === 0 ? startDate : month
          const monthEnd = i === months.length - 1 ? endDate : new Date(month.getFullYear(), month.getMonth() + 1, 0)

          const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
          const width = daysInMonth.length * dayWidth

          return (
            <div
              key={i}
              className="flex-shrink-0 border-r font-medium px-3 flex items-center"
              style={{ width: `${width}px` }}
            >
              {format(month, "MMM yyyy")}
            </div>
          )
        })}
      </div>
      <div className="flex h-6 border-b">
        {days.map((day, i) => (
          <div
            key={i}
            className={`flex-shrink-0 text-xs flex flex-col items-center justify-center border-r`}
            style={{ width: `${dayWidth}px` }}
          >
            <div className="text-xs text-zinc-400">{format(day, "d")}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


"use client"

import { useState, useRef, useEffect } from "react"

import { Tooltip } from "@mui/material"
import EditItem from "./modal/edit-item"

import type { TimelineItemType } from "@/types/timeline"
import type React from "react"

interface TimelineItemProps {
  item: TimelineItemType
  startDate: Date
  dayWidth: number
  getPositionForDate: (date: string) => number
  onDragEnd: (itemId: number, daysDelta: number) => void
}

export default function TimelineItem({
  item,
  startDate,
  dayWidth,
  getPositionForDate,
  onDragEnd,
}: TimelineItemProps) {
  const [itemWidth, setItemWidth] = useState(0)
  const [itemLeft, setItemLeft] = useState(0)
  const [minTextWidth, setMinTextWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)

  const textMeasureRef = useRef<HTMLSpanElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const left = getPositionForDate(item.start)
    const right = getPositionForDate(item.end)
    const width = right - left + dayWidth

    setItemLeft(left)
    setItemWidth(width)
  }, [item, startDate, dayWidth, getPositionForDate])

  useEffect(() => {
    if (textMeasureRef.current) {
      const width = textMeasureRef.current.offsetWidth
      setMinTextWidth(width)
    }
  }, [item.name])

  const colors = [
    "bg-blue-100 border-blue-300",
    "bg-green-100 border-green-300",
    "bg-yellow-100 border-yellow-300",
    "bg-purple-100 border-purple-300",
    "bg-pink-100 border-pink-300",
  ]

  const colorIndex = item.id % colors.length
  const colorClass = colors[colorIndex]

  function handleDragStart(e: React.DragEvent) {
    setIsDragging(true)
    setDragStartX(e.clientX)

    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect()
      e.dataTransfer.setDragImage(itemRef.current, rect.width / 2, rect.height / 2)
    }

    e.dataTransfer.setData("text/plain", item.id.toString())
    e.dataTransfer.effectAllowed = "move"
  }

  function handleDragEnd(e: React.DragEvent) {
    setIsDragging(false)

    const deltaX = e.clientX - dragStartX
    const daysDelta = Math.round(deltaX / dayWidth)

    if (daysDelta !== 0) onDragEnd(item.id, daysDelta)
  }
  
  return (
    <>
      <div
        ref={itemRef}
        className={`absolute rounded-md border p-2 cursor-grab ${colorClass} hover:shadow-md transition-shadow ${isDragging ? "opacity-70" : ""}`}
        style={{
          left: `${itemLeft}px`,
          width: `${itemWidth}px`,
          minWidth: `${minTextWidth}px`,
          height: "40px",
          top: "5px",
        }}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Tooltip title={item.name} arrow followCursor>
          <div className="px-2 truncate text-sm">
            <div>{item.name}</div>
          </div>
        </Tooltip>
      </div>

      <span
        ref={textMeasureRef}
        className="absolute opacity-0 pointer-events-none whitespace-nowrap"
        style={{ visibility: "hidden" }}
      >
        {item.name}
      </span>
    </>
  )
}

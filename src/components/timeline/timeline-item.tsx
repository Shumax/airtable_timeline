"use client"

import { useState, useRef, useEffect } from "react"

import { Tooltip } from "@mui/material"
import EditItem from "./modal/edit-item"
import { Pencil } from "lucide-react"

import type { TimelineItemType } from "@/types/timeline"
import type React from "react"

interface TimelineItemProps {
  item: TimelineItemType
  startDate: Date
  dayWidth: number
  getPositionForDate: (date: string) => number
  onDragEnd: (itemId: number, daysDelta: number) => void
  onNameUpdate?: (itemId: number, newName: string) => void
  onTouchDragStart?: (ref: boolean) => void
  onTouchDragEnd?: (ref: boolean) => void
}

export default function TimelineItem({
  item,
  startDate,
  dayWidth,
  getPositionForDate,
  onDragEnd,
  onNameUpdate,
  onTouchDragStart,
  onTouchDragEnd
}: TimelineItemProps) {
  const [itemWidth, setItemWidth] = useState(0)
  const [itemLeft, setItemLeft] = useState(0)
  const [minTextWidth, setMinTextWidth] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [editModalOpen, setEditModalOpen] = useState(false)

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
  
  function handleEditName(newName: string) {
    setEditModalOpen(false)
    
    if (onNameUpdate) onNameUpdate(item.id, newName)
  }

  function handleTouchStart(e: React.TouchEvent) {
    setIsDragging(true)
    setDragStartX(e.touches[0].clientX)
    if (onTouchDragStart) onTouchDragStart(true)
  }

  function handleTouchMove(e: React.TouchEvent) {
    onTouchDragStart?.(true)
    if (isDragging) return false
  }

  function handleTouchEnd(e: React.TouchEvent) {
    setIsDragging(false)
    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - dragStartX
    const daysDelta = Math.round(deltaX / dayWidth)
    if (daysDelta !== 0) onDragEnd(item.id, daysDelta)
    if (onTouchDragEnd) onTouchDragEnd(false)
  }

  return (
    <>
      <div
        ref={itemRef}
        className={`
          absolute 
          rounded-md 
          border 
          p-1 
          md:p-2 
          cursor-grab 
          ${colorClass} 
          hover:shadow-md 
          transition-shadow 
          ${isDragging ? "opacity-70" : ""}
          flex
          items-center
          h-8 
          md:h-10  
        `}
        style={{
          left: `${itemLeft}px`,
          width: `${itemWidth}px`,
          minWidth: `${minTextWidth}px`,
          top: "5px",
        }}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDoubleClick={() => setEditModalOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Tooltip title={item.name} arrow followCursor>
          <div className="px-1 md:px-2 truncate text-xs md:text-sm flex-1">
            <div>{item.name}</div>
          </div>
        </Tooltip>

        <button
          type="button"
          className="ml-2 p-1 rounded hover:bg-blue-100 focus:outline-none"
          aria-label="Edit name"
          onClick={(e) => {
            e.stopPropagation()
            setEditModalOpen(true)
          }}
        >
          <Pencil className="w-4 h-4 text-orange-300" />
        </button>
      </div>

      <EditItem 
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleEditName}
        defaultName={item.name}
      />

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

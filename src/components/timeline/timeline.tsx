"use client"
import { useState } from "react"

import { differenceInDays, parseISO, addDays } from "date-fns"
import { ZoomIn, ZoomOut } from "lucide-react"

import TimelineItem from "./timeline-item"
import TimelineHeader from "./timeline-header"

import { assignLanes } from "@/utils/assignLanes"

import type { TimelineItemType } from "@/types/timeline"
import type React from "react"

interface TimelineProps {
  items: TimelineItemType[]
  onItemUpdate?: (updatedItem: TimelineItemType) => void
}

export default function Timeline({ items: initialItems, onItemUpdate }: TimelineProps) {
  const [items, setItems] = useState<TimelineItemType[]>(initialItems)
  const lanes = assignLanes(items)

  const [zoomLevel, setZoomLevel] = useState(1)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const earliest = new Date( Math.min(...items.map(item => parseISO(item.start).getTime())))
  const latest = new Date(Math.max(...items.map(item => parseISO(item.end).getTime())))
  
  const startDate = new Date(earliest.getFullYear(), earliest.getMonth(), 1)
  const endDate = new Date(latest.getFullYear(), latest.getMonth() + 1, 0)

  const dayWidth = 20 * zoomLevel
  const totalDays = differenceInDays(endDate, startDate) + 1

  function getPositionForDate(date: string) {
    const dateObj = parseISO(date)
    const days = differenceInDays(dateObj, startDate)
    return days * dayWidth
  }

  function handleZoom(type: string) {
    if (type === "ZoomIn") {
      if (zoomLevel * 50 < 100) setZoomLevel((prev) => Math.min(prev + 0.2, 3))
    }

    if (type === "ZoomOut") setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))
  }

  function handleItemDragEnd(itemId: number, daysDelta: number) {
    if (daysDelta === 0) return

    setItems((prevItems) => {
      const updatedItems = prevItems.map((item) => {
        if (item.id === itemId) {
          const startDate = parseISO(item.start)
          const endDate = parseISO(item.end)

          const newStartDate = addDays(startDate, daysDelta)
          const newEndDate = addDays(endDate, daysDelta)
          
          const updatedItem = {
            ...item,
            start: newStartDate.toISOString().split("T")[0],
            end: newEndDate.toISOString().split("T")[0],
          }

          if (onItemUpdate) onItemUpdate(updatedItem)
            
          return updatedItem
        }
        return item
      })

      return updatedItems
    })
  }
  
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDraggingOver(true)
    e.dataTransfer.dropEffect = "move"
  }

  function handleDragLeave() {
    setIsDraggingOver(false)
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      <div className="custom-calendar p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2"></div>

          <div className="flex items-center gap-2">
            <button onClick={() => handleZoom("ZoomOut")}>
              <ZoomOut className="h-4 w-4" />
            </button>
            <div className="w-12 flex justify-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${zoomLevel * 50}%`, maxWidth: "100%" }}
                ></div>
              </div>
            </div>
            <button onClick={() => handleZoom("ZoomIn")}>
              <ZoomIn className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div
            className={`relative ${isDraggingOver ? "bg-gray-50" : ""}`}
            style={{ width: `${totalDays * dayWidth}px`, minHeight: `${lanes.length * 50}px` }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <TimelineHeader startDate={startDate} endDate={endDate} dayWidth={dayWidth} />

            {lanes.map((lane, index) => (
              <div key={index} className="relative" style={{ height: "50px" }}>
                {lane.map((item) => (
                  <TimelineItem
                    key={item.id}
                    item={item}
                    startDate={startDate}
                    dayWidth={dayWidth}
                    getPositionForDate={getPositionForDate}
                    onDragEnd={handleItemDragEnd}
                  />                  
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

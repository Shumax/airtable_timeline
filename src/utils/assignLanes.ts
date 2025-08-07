import type { TimelineItemType } from "@/types/timeline"

export function assignLanes(items: TimelineItemType[]) {
  const sortedItems = [...items].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

  const lanes: TimelineItemType[][] = []

  function assignItemToLane(item: TimelineItemType) {
    for (const lane of lanes) {
      if (new Date(lane[lane.length - 1].end) < new Date(item.start)) {
        lane.push(item)
        return
      }
    }
    lanes.push([item])
  }

  for (const item of sortedItems) {
    assignItemToLane(item)
  }

  return lanes
}


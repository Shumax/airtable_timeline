import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react"
import TimelineItem from "../timeline-item"

const mockItem = {
  id: 1,
  name: "Test Item",
  start: "2025-08-01",
  end: "2025-08-03"
}

test("Renders TimelineItem and allows editing name", () => {
  const handleNameUpdate = jest.fn()
  render(
    <TimelineItem
      item={mockItem}
      startDate={new Date("2025-08-01")}
      dayWidth={20}
      getPositionForDate={() => 0}
      onDragEnd={() => {}}
      onNameUpdate={handleNameUpdate}
    />
  )

  expect(screen.getByText("Test Item", { selector: 'div' })).toBeInTheDocument()
  fireEvent.click(screen.getByLabelText("Edit name"))
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "New Name" } })
  fireEvent.click(screen.getByText("Save"))
  expect(handleNameUpdate).toHaveBeenCalledWith(1, "New Name")
})
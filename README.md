# Interactive Timeline Component

A timeline component that visualizes items in horizontal lanes with a compact layout.

## Features

- **Automatic Lane Assignment**: Items are algorithmically placed in compact horizontal lanes to prevent visual overlap and maximize vertical space.
- **Zoom Functionality**: Dynamically zoom in and out of the timeline to view details at a daily level or see a multi-month overview.
- **Drag & Drop Date Adjustment**: Intuitively change an item's start and end dates by dragging it horizontally along the timeline.
- **Modal-Based Editing**: Double-click or use the dedicated pencil icon on an item to open a Material-UI dialog for renaming.
- **Dynamic Color-Coding**: Items are automatically assigned one of five distinct color schemes for easy visual differentiation.
- **Item Tooltips**: Hover over truncated item names to see the full name in a tooltip, ensuring readability at any zoom level.
- **Responsive Design**: A fluid layout that works effectively on various screen sizes.

## Technologies Used Requirements

- **Framework**: Next.js 15.4.6
- **Language**: TypeScript ^5
- **UI Library**: React ^19.1.0
- **Styling**: Tailwind CSS ^4
- **UI Components**: Material-UI (for Modals and Tooltips)
- **Date & Time**: date-fns ^4.1.0
- **Icons**: Lucide React
- **Testing**: Jest and React Testing Library

## What I Like About This Implementation

- **Efficient Space Usage**: The implementation uses the provided `assignLanes` function to arrange items in a compact way, ensuring that the timeline doesn't waste vertical space.
- **Interactive Features**: The ability to zoom and drag items makes the timeline interactive and user-friendly.
- **Visual Clarity**: The month and day headers provide clear context, and the color-coding helps distinguish between different items.
- **Modular Architecture**: The code is organized into reusable components, making it easy to maintain and extend.

## What I Would Change

- **Smooth Drag and Drop**: The timeline drag and drop items can be more friendly with a shadow autoscroll, this realy can be helpful mainly on mobile version.
- **Edition persistence**: I would like to implement a feature to persiste the name changes that user made, state management can be an approach.
- **State Management**: I would use a more robust state management solution like Redux or React Context to handle updates to timeline items.
- **Date Search feature**: Date range selection to navigate through different time periods.
- **Accessibility**: I would enhance keyboard navigation and screen reader support for better accessibility.

## Design Decisions

My design was inspired by several popular timeline implementations:

1. **Google Calendar**: For the day/month header structure and the ability to navigate through time periods.
2. **Gantt Charts**: For the horizontal bar representation of timeline items and the compact lane arrangement.
3. **Trello**: For the drag-and-drop interaction pattern.

I chose to use a card-based design for the items to make them visually distinct and to provide clear boundaries for interaction. The color-coding helps users quickly identify different items, and the drag handles on the edges make it clear that items can be resized.

The zoom functionality was added to allow users to focus on specific time periods or get a broader overview, depending on their needs.

## 🧪 Testing Strategy

This project is configured with a testing strategy to ensure reliability and maintainability:

1.  **Unit Tests (Jest)**: To validate core business logic, such as the `assignLanes` utility and date calculations.
2.  **Component Tests (React Testing Library)**: To verify that individual components render correctly and handle user interactions, such as the zoom controls and the edit modal.

## 🏃 How to Run Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/Shumax/airtable_timeline
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

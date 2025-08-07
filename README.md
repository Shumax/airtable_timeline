# Interactive Timeline Component

A timeline component that visualizes items in horizontal lanes with a compact layout.

## Features

- Compact lane arrangement that efficiently uses vertical space
- Zoom in/out functionality to adjust the timeline scale
- Drag and drop functionality to adjust item start and end dates
- Name edition functionality to adjust the name of items inline
- Color-coded items for better visual distinction

## What I Like About This Implementation

- **Efficient Space Usage**: The implementation uses the provided `assignLanes` function to arrange items in a compact way, ensuring that the timeline doesn't waste vertical space.
- **Interactive Features**: The ability to zoom and drag items makes the timeline interactive and user-friendly.
- **Visual Clarity**: The month and day headers provide clear context, and the color-coding helps distinguish between different items.
- **Modular Architecture**: The code is organized into reusable components, making it easy to maintain and extend.

## What I Would Change

- **Responsive Design**: The timeline would adapts well to different screen sizes.
- **Date Search feature**: Date range selection to navigate through different time periods.
- **Performance Optimization**: For large datasets, I would implement virtualization to only render visible items, improving performance.
- **State Management**: For a production app, I would use a more robust state management solution like Redux or React Context to handle updates to timeline items.
- **Accessibility**: I would enhance keyboard navigation and screen reader support for better accessibility.
- **Custom Styling Options**: I would add more customization options for colors, item heights, and other visual aspects.
- **Conflict Resolution**: I would implement better handling for overlapping items and header days that can't be resolved by the lane assignment algorithm.

## Design Decisions

My design was inspired by several popular timeline implementations:

1. **Google Calendar**: For the day/month header structure and the ability to navigate through time periods.
2. **Gantt Charts**: For the horizontal bar representation of timeline items and the compact lane arrangement.
3. **Trello**: For the drag-and-drop interaction pattern.

I chose to use a card-based design for the items to make them visually distinct and to provide clear boundaries for interaction. The color-coding helps users quickly identify different items, and the drag handles on the edges make it clear that items can be resized.

The zoom functionality was added to allow users to focus on specific time periods or get a broader overview, depending on their needs.

## Testing Approach

If I had more time, I would implement the following tests:

1. **Unit Tests**:
   - Test the `assignLanes` function with various input scenarios
   - Test date calculations and formatting
   - Test the drag-and-drop logic

2. **Component Tests**:
   - Test rendering of timeline items
   - Test zoom functionality
   - Test date navigation

3. **Integration Tests**:
   - Test the interaction between components
   - Test state updates when items are modified

4. **End-to-End Tests**:
   - Test the complete user flow
   - Test responsiveness on different screen sizes

5. **Accessibility Tests**:
   - Test keyboard navigation
   - Test screen reader compatibility
   - Test color contrast

I would use Jest and React Testing Library for unit and component tests, and Cypress for end-to-end tests.

## How to Run

1. Clone the repository
2. Install dependencies: 
```bash
  npm install
  # or
  yarn install
```
3. Run the development server: 
```bash
  npm run dev
  # or
  yarn dev
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used Requirements

- Next.js 15.4.6
- React ^19.1.0
- TypeScript ^5
- Tailwind CSS ^4
- date-fns for date manipulation ^4.1.0
- Material UI ^7.0.1
- Lucide React to icons ^0.487.0

import { assignLanes } from '../assignLanes';
import type { TimelineItemType } from '@/types/timeline';

describe('assignLanes', () => {
  it('Should place non-overlapping items in the lane', () => {
    const items: TimelineItemType[] = [
      { id: 1, name: 'A', start: '2025-01-01', end: '2025-01-05' },
      { id: 2, name: 'B', start: '2025-01-06', end: '2025-01-10' },
    ];
    const lanes = assignLanes(items);
    expect(lanes).toHaveLength(1); 
    expect(lanes[0]).toHaveLength(2);
  });

  it('Should place an overlapping item in a new lane', () => {
    const items: TimelineItemType[] = [
      { id: 1, name: 'A', start: '2025-01-01', end: '2025-01-05' },
      { id: 2, name: 'B', start: '2025-01-04', end: '2025-01-10' }, 
    ];
    const lanes = assignLanes(items);
    expect(lanes).toHaveLength(2); 
    expect(lanes[0][0].name).toBe('A');
    expect(lanes[1][0].name).toBe('B');
  });

  it('Should handle an empty array', () => {
    const items: TimelineItemType[] = [];
    const lanes = assignLanes(items);
    expect(lanes).toHaveLength(0);
  });

  it('Should correctly sort items by start date before assigning lanes', () => {
    const items: TimelineItemType[] = [
      { id: 2, name: 'B', start: '2025-01-06', end: '2025-01-10' },
      { id: 1, name: 'A', start: '2025-01-01', end: '2025-01-05' },
    ];
    const lanes = assignLanes(items);
    expect(lanes).toHaveLength(1);
    expect(lanes[0][0].name).toBe('A');
    expect(lanes[0][1].name).toBe('B');
  });
});
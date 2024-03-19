import { CalendarEvent } from "../pages/api/types";

/**
 *
 * @param events Event[]
 * @returns Event[][]
 *
 * Returns an array of grouped events.
 * We decided to use a greedy algorithm to group events.
 * This is a simple algorithm that should produce optimal solution for scheduling problems.
 */
export const getGroupedEvents = (eventsData: CalendarEvent[]) => {
  const events = [...eventsData].sort(
    (a, b) => a.startTime - b.startTime
  );
  const groups: CalendarEvent[][] = [];

  while (events.length > 0) {
    const event = events.shift();
    for (let j = 0; j <= groups.length; j++) {
      if (!groups[j]) {
        groups[j] = [event];
        break;
      } else if (event.startTime >= groups[j].at(-1).endTime) {
        groups[j].push(event);
        break;
      }
    }
  }

  return groups;
};

import { Event } from "../pages/api/types";

/**
 *
 * @param events Event[]
 * @returns Event[][]
 *
 * Returns an array of grouped events.
 * We decided to use a greedy algorithm to group events.
 * This is a simple algorithm that should produce optimal solution for scheduling problems.
 */
export const getGroupedEvents = (eventsData: Event[]) => {
  let events = [...eventsData];
  const groups: Event[][] = [];

  while (events.length > 0) {
    const event = events.shift();
    for (let j = 0; j <= groups.length; j++) {
      if (!groups[j]) {
        groups[j] = [event];
        break;
      } else if (event.start >= groups[j].at(-1).end) {
        groups[j].push(event);
        break;
      }
    }
  }

  return groups;
};

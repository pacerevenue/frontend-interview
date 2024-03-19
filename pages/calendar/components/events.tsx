import { FunctionComponent } from "react";
import { getGroupedEvents } from "../../../utils";
import { CalendarEvent } from "../../api/types";

type EventsProps = {
  events: CalendarEvent[];
};

type EventProps = {
  event: CalendarEvent;
  column: number;
};

const EventComponent: FunctionComponent<EventProps> = ({
  event: { id, title, startTime, endTime },
  column,
}) => {
  return (
    <div
      key={id}
      className={`grid row-start-1 col-start-${column} col-end-${column + 1}`}
      style={{ height: endTime - startTime, marginTop: startTime }}
    >
      <div
        className={`
          rounded-lg
          text-xs
          leading-5
          bg-blue-50
          h-full
          p-1
          border
          font-semibold text-blue-700
        `}
      >
        {title}
      </div>
    </div>
  );
};

export const Events: FunctionComponent<EventsProps> = ({ events }) => {
  const eventGroups = getGroupedEvents(events);

  return (
    <div
      className={`col-start-1 col-end-2 row-start-1 relative grid grid-cols-${eventGroups.length} grid-rows-1`}
    >
      {eventGroups
        .map((group, groupIndex) =>
          group.map((event) => (
            <EventComponent
              key={event.id}
              column={groupIndex + 1}
              event={event}
            />
          ))
        )
        .flat()}
    </div>
  );
};

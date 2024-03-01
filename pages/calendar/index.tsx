import { useState } from "react";
import { Calendar, Layout } from "./components/calendar";
import { Events } from "./components/events";
import { useEventData } from "./hooks/useEventList";
import { NewEventForm } from "./components/newEventForm";

export default function CalendarPage() {
  const { data, error } = useEventData();
  const [showAddEventPopup, setShowAddEventPopup] = useState(false);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { events } = data;
  const eventsList = events.sort((a, b) => a.start - b.start);

  return (
    <>
      {showAddEventPopup && (
        <NewEventForm onClose={() => setShowAddEventPopup(false)} />
      )}
      <div className="flex justify-end mt-1 mr-20">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          onClick={() => setShowAddEventPopup(!showAddEventPopup)}
        >
          New Event
        </button>
      </div>
      <Layout>
        <Calendar>
          <Events events={eventsList} />
        </Calendar>
      </Layout>
    </>
  );
}

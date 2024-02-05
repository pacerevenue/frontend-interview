import { Calendar, Layout } from "./components/calendar";
import { Events } from "./components/events";
import { useEventData } from "./hooks/useEventList";

export default function CalendarPage() {
  const { data, error } = useEventData();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { events } = data;
  const eventsList = events.sort((a, b) => a.start - b.start);

  return (
    <Layout>
      <Calendar>
        <Events events={eventsList} />
      </Calendar>
    </Layout>
  );
}

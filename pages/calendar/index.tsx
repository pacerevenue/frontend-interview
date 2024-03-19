import { Calendar, Layout } from "./components/calendar";
import { Events } from "./components/events";
import { useEventData } from "./hooks/useEventList";

export default function CalendarPage() {
  const { data, error } = useEventData();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { events } = data;

  return (
    <Layout>
      <Calendar>
        <Events events={events} />
      </Calendar>
    </Layout>
  );
}

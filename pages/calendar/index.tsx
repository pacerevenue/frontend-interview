import { useRef, useState } from "react";
import useSWR from "swr";
import { Event } from "../api/types";
import { Calendar, Layout } from "./components/calendar";
import { Events } from "./components/events";

const fetcher = (query: string) =>
  fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default function CalendarPage() {
  const { data, error } = useSWR<{ events: Event[] }>(
    "{ events { id, title, start, end } }",
    fetcher
  );

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

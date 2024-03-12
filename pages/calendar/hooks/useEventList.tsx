import { useEffect, useState } from "react";
import { Event } from "../../api/types";
import { client } from "./client";

const GET_EVENT_QUERY = `
  query GetEventList{
    events {
      id
      title
      startTime
      endTime
    }
  }
`;

export const useEventData = () => {
  const [data, setData] = useState<{ events: Event[] } | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchEventData = async () => {
    try {
      const response = await client(GET_EVENT_QUERY);

      if (!response.data) {
        throw new Error("Failed to fetch data");
      }

      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  return { data, error };
};

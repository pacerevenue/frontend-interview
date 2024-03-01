import { useState } from "react";
import { mutate } from "swr";
import { client } from "./client";

const SAVE_EVENT_MUTATION = `
  mutation SaveEvent($inputEvent: InputEvent!) {
    addEvent(inputEvent: $inputEvent)
  }
`;

export const useSaveEvent = () => {
  const [loading, setLoading] = useState(false);

  const saveEvent = async (formData) => {
    try {
      setLoading(true);

      const result = await client(SAVE_EVENT_MUTATION, {
        inputEvent: formData,
      });

      await mutate(SAVE_EVENT_MUTATION, (cachedData) => ({
        saveEvent: { ...cachedData.saveEvent, ...result.data.saveEvent },
      }));

      return result.data.saveEvent;
    } catch (error) {
      throw new Error(`Error saving data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { saveEvent, loading };
};

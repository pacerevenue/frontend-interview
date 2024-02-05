export const client = async (query: string, variables?: any) => {
  return await fetch("/api/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: variables ?? undefined,
    }),
  }).then((response) => response.json());
};

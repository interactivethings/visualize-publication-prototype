import { createClient } from "urql";

export const getClient = () => {
  return createClient({
    url: process.env.NEXT_PUBLIC_DATOCMS_API_ENDPOINT,
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
      },
    },
  });
};

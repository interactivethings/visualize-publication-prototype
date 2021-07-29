import { ReactNode } from "react";
import { createClient, Provider } from "urql";

export const client = createClient({
  url: process.env.NEXT_PUBLIC_DATOCMS_API_ENDPOINT,
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
    },
  },
});

export const GraphqlProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={client}>{children}</Provider>;
};

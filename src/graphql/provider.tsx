import { ReactNode } from "react";
import { Provider } from "urql";
import { getClient } from "./urql-client";

const client = getClient();

export const GraphqlProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={client}>{children}</Provider>;
};

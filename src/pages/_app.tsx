import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { GraphqlProvider } from "../graphql/provider";

function MyApp({ Component, pageProps }) {
  return (
    <GraphqlProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </GraphqlProvider>
  );
}

export default MyApp;

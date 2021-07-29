import {
  Alert,
  AlertIcon,
  Box,
  Center,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { Hero } from "../components/hero";
import { TypeSwitch } from "../components/type-switch";
import { useAllGraphicsQuery } from "../graphql/dato-queries";

export default function Graphics() {
  const [query] = useAllGraphicsQuery();

  console.log(query.data);

  return (
    <VStack spacing="10">
      <Hero title="Hello" lead="World" />
      <TypeSwitch />
      <Box w="100%" px="4">
        {query.fetching ? (
          <Spinner />
        ) : query.error ? (
          <Alert status="error">
            <AlertIcon />
            Ein Fehler ist aufgetreten!
          </Alert>
        ) : query.data && query.data.allVisualizeGraphics.length > 0 ? (
          <SimpleGrid minChildWidth="20rem" spacing="2rem">
            {query.data.allVisualizeGraphics.map((d) => {
              return (
                <Box
                  boxShadow="lg"
                  bg="white"
                  rounded="lg"
                  borderWidth="1px"
                  key={d.id}
                >
                  <Box p="5">
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                    >
                      {d.title}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        ) : (
          <Alert status="info">
            <AlertIcon />
            Keine Daten
          </Alert>
        )}
      </Box>
    </VStack>
  );
}

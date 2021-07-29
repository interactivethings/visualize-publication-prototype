import { Box, Button, ButtonGroup, VStack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { RouteLink } from "./link";

type Types = "chapters" | "graphics" | "tables";

export const TypeSwitch = ({}) => {
  const { pathname } = useRouter();

  return (
    <VStack spacing="4">
      <Box>Anzeigen:</Box>
      <ButtonGroup variant="outline" size="md">
        <RouteLink href={`/`}>
          <Button
            as="a"
            colorScheme="green"
            variant={pathname === "/" ? "solid" : "outline"}
            rounded="full"
            boxShadow="md"
          >
            Kapitel
          </Button>
        </RouteLink>
        <RouteLink href={`/graphics`}>
          <Button
            as="a"
            colorScheme="green"
            variant={pathname === "/graphics" ? "solid" : "outline"}
            rounded="full"
            boxShadow="md"
          >
            Grafiken
          </Button>
        </RouteLink>
        {/* <RouteLink href={`/tables`}>
        <Button as="a" variant={pathname === "/tables" ? "solid" : "outline"}>
          Tabellen
        </Button>
      </RouteLink> */}
      </ButtonGroup>{" "}
    </VStack>
  );
};

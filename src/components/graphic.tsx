import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { RouteLink } from "./link";

export const GraphicHeader = ({ title }: { title: string }) => {
  return (
    <VStack
      bg="green.500"
      p="6"
      color="white"
      w="100%"
      alignItems="flex-start"
      spacing="6"
    >
      <Box>
        <RouteLink href={`/graphics`}>
          <Link>
            <ArrowBackIcon /> Grafiken
          </Link>
        </RouteLink>
      </Box>

      <Heading>
        <Text as="span" fontWeight="normal">
          Grafik
        </Text>{" "}
        {title}
      </Heading>
    </VStack>
  );
};

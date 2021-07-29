import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { RouteLink } from "./link";

export const ChapterHeader = ({
  title,
  number,
}: {
  title: string;
  number: number;
}) => {
  return (
    <VStack
      bg="green.400"
      p="6"
      color="white"
      w="100%"
      alignItems="flex-start"
      spacing="6"
    >
      <Box>
        <RouteLink href={`/`}>
          <Link>
            <ArrowBackIcon /> Kapitel
          </Link>
        </RouteLink>
      </Box>

      <Heading>
        <Text as="span" fontWeight="normal">
          {number}
        </Text>{" "}
        {title}
      </Heading>
    </VStack>
  );
};

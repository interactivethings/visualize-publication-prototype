import { Box, Center, Container, Heading, VStack } from "@chakra-ui/react";

export const Hero = ({ title, lead }: { title: string; lead: string }) => {
  return (
    <Center w="100%" bg="green.400" py="40" color="white">
      <Container maxW="64rem">
        <VStack>
          <Heading size="2xl">{title}</Heading>
          <Box>{lead}</Box>
        </VStack>
      </Container>
    </Center>
  );
};

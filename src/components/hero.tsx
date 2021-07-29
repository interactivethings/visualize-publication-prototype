import {
  Box,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

export const Hero = ({ title, lead }: { title: string; lead: string }) => {
  return (
    <Center w="100%" bg="green.400" py="40" color="white">
      <Container maxW="64rem">
        <VStack spacing="6">
          <Heading size="3xl">{title}</Heading>
          <Text fontSize="lg" textAlign="center">
            {lead}
          </Text>
        </VStack>
      </Container>
    </Center>
  );
};

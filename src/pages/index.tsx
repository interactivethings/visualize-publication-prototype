import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Hero } from "../components/hero";
import { RouteLink } from "../components/link";
import { TypeSwitch } from "../components/type-switch";
import {
  SiteInfoDocument,
  SiteInfoQuery,
  useAllChaptersQuery,
} from "../graphql/dato-queries";
import { getClient } from "../graphql/urql-client";
import { PageMeta } from "../types";

export const getServerSideProps: GetServerSideProps<PageMeta> = async () => {
  const siteInfo = await getClient()
    .query<SiteInfoQuery>(SiteInfoDocument)
    .toPromise();

  return {
    props: {
      meta: {
        title: siteInfo.data?._site?.globalSeo?.siteName,
        description: siteInfo.data?._site?.globalSeo?.fallbackSeo?.description,
      },
    },
  };
};

export default function Home(props: PageMeta) {
  const [query] = useAllChaptersQuery();

  return (
    <VStack spacing="10" pb="24">
      <Hero title={props.meta.title} lead={props.meta.description} />
      <TypeSwitch />
      <Box w="100%" px="4">
        {query.fetching ? (
          <Spinner />
        ) : query.error ? (
          <Alert status="error">
            <AlertIcon />
            Ein Fehler ist aufgetreten!
          </Alert>
        ) : query.data && query.data.allChapters.length > 0 ? (
          <SimpleGrid minChildWidth="20rem" spacing="4">
            {query.data.allChapters.map((d) => {
              return (
                <LinkBox
                  boxShadow="lg"
                  bg="white"
                  rounded="lg"
                  borderWidth="1px"
                  key={d.id}
                >
                  <Box p="5" minH="64">
                    <Heading as="h2" size="xl" pb="6">
                      <Text
                        color="green.500"
                        fontSize="5xl"
                        fontWeight="normal"
                      >
                        {d.position}
                      </Text>
                      <RouteLink href={`/chapter/${d.slug}`}>
                        <LinkOverlay>{d.title}</LinkOverlay>
                      </RouteLink>
                    </Heading>
                  </Box>
                </LinkBox>
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

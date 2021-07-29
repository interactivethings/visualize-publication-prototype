import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Hero } from "../components/hero";
import { Link } from "../components/link";
import { TypeSwitch } from "../components/type-switch";
import {
  SiteInfoDocument,
  SiteInfoQuery,
  useAllChaptersQuery,
} from "../graphql/dato-queries";
import { client } from "../graphql/provider";
import { PageMeta } from "../types";

export const getServerSideProps: GetServerSideProps<PageMeta> = async () => {
  const siteInfo = await client
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
    <VStack spacing="10">
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
            {query.data.allChapters.map((d, i) => {
              return (
                <LinkBox
                  boxShadow="lg"
                  bg="white"
                  rounded="lg"
                  borderWidth="1px"
                  key={d.id}
                >
                  <Box p="5">
                    <Heading as="h2" size="xl" pb="6">
                      <Text
                        color="green.400"
                        fontSize="5xl"
                        fontWeight="normal"
                      >
                        {i + 1}
                      </Text>
                      <Link href={`/chapter/${d.slug}`}>
                        <LinkOverlay>{d.title}</LinkOverlay>
                      </Link>
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

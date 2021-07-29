import {
  Alert,
  AlertIcon,
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Hero } from "../components/hero";
import { RouteLink } from "../components/link";
import { TypeSwitch } from "../components/type-switch";
import { VisualizePreview } from "../components/visualize-preview";
import {
  SiteInfoDocument,
  SiteInfoQuery,
  useAllGraphicsQuery,
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

export default function Graphics(props: PageMeta) {
  const [query] = useAllGraphicsQuery();

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
        ) : query.data && query.data.allVisualizeGraphics.length > 0 ? (
          <SimpleGrid minChildWidth="20rem" spacing="4">
            {query.data.allVisualizeGraphics.map((d) => {
              return (
                <LinkBox
                  boxShadow="lg"
                  bg="white"
                  rounded="lg"
                  borderWidth="1px"
                  key={d.id}
                >
                  <Box p="5">
                    <Heading size="md">
                      <RouteLink href={`/graphic/${d.slug}`}>
                        <LinkOverlay>{d.title}</LinkOverlay>
                      </RouteLink>
                    </Heading>
                    <VisualizePreview chartId={d.visualizeChartId} />
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

import {
  Alert,
  AlertIcon,
  Box,
  Center,
  SimpleGrid,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { Hero } from "../components/hero";
import { TypeSwitch } from "../components/type-switch";
import {
  SiteInfoDocument,
  SiteInfoQuery,
  useAllGraphicsQuery,
} from "../graphql/dato-queries";
import { client } from "../graphql/provider";

interface Props {
  meta: {
    title: string | undefined;
    description: string | undefined;
  };
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
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

export default function Graphics(props: Props) {
  const [query] = useAllGraphicsQuery();

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
        ) : query.data && query.data.allVisualizeGraphics.length > 0 ? (
          <SimpleGrid minChildWidth="20rem" spacing="4">
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

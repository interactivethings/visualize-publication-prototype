import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Code,
  Container,
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
import { ChapterContent, ChapterHeader } from "../../components/chapter";
import { GraphicHeader } from "../../components/graphic";
import { Hero } from "../../components/hero";
import { RouteLink } from "../../components/link";
import { TypeSwitch } from "../../components/type-switch";
import { VisualizePreview } from "../../components/visualize-preview";
import {
  ChapterDocument,
  ChapterQuery,
  GraphicDocument,
  GraphicQuery,
  SiteInfoDocument,
  SiteInfoQuery,
  useAllChaptersQuery,
  useChapterQuery,
} from "../../graphql/dato-queries";
import { getClient } from "../../graphql/urql-client";
import { PageMeta } from "../../types";

interface PageProps extends PageMeta {
  chartId: string;
  title: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params: { slug },
}) => {
  const siteInfo = await getClient()
    .query<GraphicQuery>(GraphicDocument, { slug })
    .toPromise();

  if (!siteInfo.data?.visualizeGraphic) {
    return {
      notFound: true,
    };
  }

  const { visualizeGraphic } = siteInfo.data;

  return {
    props: {
      meta: {
        title: siteInfo.data._site?.globalSeo?.siteName,
        description: siteInfo.data._site?.globalSeo?.fallbackSeo?.description,
      },
      title: visualizeGraphic.title,
      chartId: visualizeGraphic.visualizeChartId,
    },
  };
};

export default function Chapter({ title, chartId }: PageProps) {
  return (
    <VStack spacing="10" pb="24">
      <GraphicHeader title={title} />
      <Container maxW="100ch">
        <Box>
          <VisualizePreview chartId={chartId} />
          {/* <pre>
            <Code>{JSON.stringify(content.value, null, 2)}</Code>
          </pre> */}
        </Box>
      </Container>
    </VStack>
  );
}

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
import { ChapterHeader } from "../../components/chapter";
import { Hero } from "../../components/hero";
import { RouteLink } from "../../components/link";
import { TypeSwitch } from "../../components/type-switch";
import {
  ChapterDocument,
  ChapterQuery,
  SiteInfoDocument,
  SiteInfoQuery,
  useAllChaptersQuery,
  useChapterQuery,
} from "../../graphql/dato-queries";
import { client } from "../../graphql/provider";
import { PageMeta } from "../../types";

interface PageProps extends PageMeta {
  slug: string;
  title: string;
  number: number;
  content: ChapterQuery["chapter"]["content"];
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  params: { slug },
}) => {
  const siteInfo = await client
    .query<ChapterQuery>(ChapterDocument, { slug })
    .toPromise();

  if (!siteInfo.data?.chapter) {
    return {
      notFound: true,
    };
  }

  const { chapter } = siteInfo.data;

  return {
    props: {
      slug: slug.toString(),
      meta: {
        title: siteInfo.data._site?.globalSeo?.siteName,
        description: siteInfo.data._site?.globalSeo?.fallbackSeo?.description,
      },
      title: chapter.title,
      content: chapter.content,
      number: chapter.position,
    },
  };
};

export default function Chapter({ content, title, number }: PageProps) {
  return (
    <VStack spacing="10">
      <ChapterHeader title={title} number={number} />
      <Container maxW="100ch">
        <Box>
          <Code>{JSON.stringify(content.value, null, 2)}</Code>
        </Box>
      </Container>
    </VStack>
  );
}

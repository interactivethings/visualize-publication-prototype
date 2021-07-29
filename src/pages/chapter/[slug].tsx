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
import { Hero } from "../../components/hero";
import { Link } from "../../components/link";
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
    },
  };
};

export default function Chapter({ content, title }: PageProps) {
  return (
    <VStack spacing="10">
      <Container maxW="100ch">
        <Box>
          <Heading>{title}</Heading>
          <Code>{JSON.stringify(content.value, null, 2)}</Code>
        </Box>
      </Container>
    </VStack>
  );
}
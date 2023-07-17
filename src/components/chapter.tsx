import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Heading, Link, Text, VStack, AspectRatio } from "@chakra-ui/react";
import { StructuredText } from "react-datocms";
import { ChapterModelContentField } from "../graphql/dato-queries";
import { RouteLink } from "./link";
import { VisualizePreview } from "./visualize-preview";

export const ChapterHeader = ({
  title,
  number,
}: {
  title: string;
  number: number;
}) => {
  return (
    <VStack
      bg="green.500"
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

export const ChapterContent = ({ content }: { content: any }) => {
  return (
    <Box
      sx={{
        "&": {
          "h1,h2": {
            fontFamily: "heading",
            fontWeight: "bold",
            fontSize: ["2xl", null, "3xl"],
            lineHeight: [1.33, null, 1.2],
            mt: 6,
          },
          h3: {
            fontFamily: "heading",
            fontWeight: "bold",
            fontSize: "xl",
            lineHeight: 1.2,
            mt: 6,
          },
          "h4,h5,h6": {
            fontFamily: "heading",
            fontWeight: "bold",
            fontSize: "md",
            lineHeight: 1.2,
            mt: 6,
          },
          p: {
            mt: 6,
          },
        },
      }}
    >
      <StructuredText
        data={content}
        renderBlock={({ record }) => {
          switch (record.__typename) {
            case "VisualizeGraphicBlockRecord":
              return (
                <Box mt="6">
                  <VisualizePreview
                    chartId={(record.graphic as any)?.visualizeChartId}
                  />
                </Box>
              );
            case "EmbeddedHtmlBlockRecord":
              // TODO: sanitize html (e.g. DOMPurify)
              // TODO: add style="flex-grow:1;height: 100%;" to iframe container div in Datocms
              return (
                <AspectRatio mt="6" w="100%" ratio={16 / 9}>
                  <div dangerouslySetInnerHTML={{__html: record.html as string}} />
                </AspectRatio>
              );
            default:
              return null;
          }
        }}
        renderInlineRecord={({ record }) => {
          switch (record.__typename) {
            case "ChapterRecord":
              return (
                <RouteLink href={`/chapter/${record.slug}`}>
                  <Link color="green.500">Kapitel {record.title}</Link>
                </RouteLink>
              );
            default:
              return null;
          }
        }}
      />
    </Box>
  );
};

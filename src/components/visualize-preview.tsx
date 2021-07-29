import { Box } from "@chakra-ui/react";

export const VisualizePreview = ({
  chartId,
  locale = "de",
}: {
  chartId: string;
  locale?: string;
}) => (
  <Box>
    <Box
      as="iframe"
      src={`https://dev.visualize.admin.ch/${locale}/embed/${chartId}`}
      sx={{
        border: "1px solid #f0f0f0",
        width: "100%",
        aspectRatio: "4 / 3",
      }}
      name="visualize.admin.ch"
      scrolling="no"
      frameBorder="1"
      marginHeight={0}
      marginWidth={0}
    ></Box>
  </Box>
);

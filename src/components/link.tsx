import NextLink, { LinkProps } from "next/link";
import { ReactNode } from "react";

export const Link = (props: LinkProps & { children: ReactNode }) => {
  return <NextLink {...props} passHref />;
};

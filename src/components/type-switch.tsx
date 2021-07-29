import { Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { RouteLink } from "./link";

type Types = "chapters" | "graphics" | "tables";

export const TypeSwitch = ({}) => {
  const { pathname } = useRouter();

  return (
    <ButtonGroup variant="outline" isAttached size="md">
      <RouteLink href={`/`}>
        <Button as="a" variant={pathname === "/" ? "solid" : "outline"}>
          Kapitel
        </Button>
      </RouteLink>
      <RouteLink href={`/graphics`}>
        <Button as="a" variant={pathname === "/graphics" ? "solid" : "outline"}>
          Grafiken
        </Button>
      </RouteLink>
      <RouteLink href={`/tables`}>
        <Button as="a" variant={pathname === "/tables" ? "solid" : "outline"}>
          Tabellen
        </Button>
      </RouteLink>
    </ButtonGroup>
  );
};

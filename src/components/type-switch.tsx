import { Button, ButtonGroup } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { Link } from "./link";

type Types = "chapters" | "graphics" | "tables";

export const TypeSwitch = ({}) => {
  const { pathname } = useRouter();

  return (
    <ButtonGroup variant="outline" isAttached size="md">
      <Link href={`/`}>
        <Button as="a" variant={pathname === "/" ? "solid" : "outline"}>
          Kapitel
        </Button>
      </Link>
      <Link href={`/graphics`}>
        <Button as="a" variant={pathname === "/graphics" ? "solid" : "outline"}>
          Grafiken
        </Button>
      </Link>
      <Link href={`/tables`}>
        <Button as="a" variant={pathname === "/tables" ? "solid" : "outline"}>
          Tabellen
        </Button>
      </Link>
    </ButtonGroup>
  );
};

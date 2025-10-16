import type { HTMLProps, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLProps<HTMLDivElement> & {
  direction?: "row" | "column";
};

function Flex({ direction = "row", ...props }: PropsWithChildren<Props>) {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        props.className,
      )}
      {...props}
    />
  );
}

export { Flex };

import type { HTMLProps, PropsWithChildren } from "react";
import { Box } from "@/components/base/box";
import { cn } from "@/lib/utils";

type Props = HTMLProps<HTMLDivElement> & {
  direction?: "row" | "column";
};

function Flex({
  children,
  className,
  direction = "row",
  ...props
}: PropsWithChildren<Props>) {
  return (
    <Box
      className={cn(
        "flex",
        {
          "flex-row": direction === "row",
          "flex-col": direction === "column",
        },
        className,
      )}
      {...props}
    >
      {children}
    </Box>
  );
}

export { Flex };

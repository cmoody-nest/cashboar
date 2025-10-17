import type { HTMLProps, PropsWithChildren } from "react";

type Props = HTMLProps<HTMLDivElement>;

function Box({ children, className, ...props }: PropsWithChildren<Props>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export { Box };

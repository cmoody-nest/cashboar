import type { HTMLProps, PropsWithChildren } from "react";

type Props = HTMLProps<HTMLDivElement>;

function Box({ children, ...props }: PropsWithChildren<Props>) {
  return (
    <div className={props.className} {...props}>
      {children}
    </div>
  );
}

export { Box };

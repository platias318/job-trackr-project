import type { SVGProps } from "react";

interface ISvgIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  children: React.ReactNode;
}

export const SvgIcon = ({
  size = 24,
  width,
  height,
  children,
  ...props
}: ISvgIconProps) => (
  <svg
    width={width ?? size}
    height={height ?? size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);

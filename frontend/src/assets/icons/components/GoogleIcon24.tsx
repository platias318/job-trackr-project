import type { SVGProps } from "react";

import googleSvg from "../svgs/google-icon.svg";

export const GoogleIcon24 = ({
  width = 24,
  height = 24,
}: SVGProps<SVGSVGElement>) => (
  <img src={googleSvg} width={width} height={height} alt="Google" />
);

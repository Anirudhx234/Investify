import { extendTailwindMerge } from "tailwind-merge";
import { withFluid } from "@fluid-tailwind/tailwind-merge";

/* twMerge with applied plugins */
export const twMerge = extendTailwindMerge(withFluid);

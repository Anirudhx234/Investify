import { extendTailwindMerge } from "tailwind-merge";
import { withFluid } from "@fluid-tailwind/tailwind-merge";

/* twMerge with applied plugins */
const twMerge = extendTailwindMerge(withFluid);

export default twMerge;

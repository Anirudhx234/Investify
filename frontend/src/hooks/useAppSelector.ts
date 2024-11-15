import type { RootState } from "../app/store";
import { useSelector } from "react-redux";

/* typed selector */
export const useAppSelector = useSelector.withTypes<RootState>();

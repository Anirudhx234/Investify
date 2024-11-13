import type { RootState } from "../app/store";
import { useSelector } from "react-redux";

/* typed selector */
const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;

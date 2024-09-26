import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

/* Typed selector */
const useAppSelector = useSelector.withTypes<RootState>();

export default useAppSelector;

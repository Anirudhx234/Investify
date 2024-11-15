import type { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";

/* typed dispatch */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

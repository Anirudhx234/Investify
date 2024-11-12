import type { AppDispatch } from "../app/store";
import { useDispatch } from "react-redux";

/* typed dispatch */
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;

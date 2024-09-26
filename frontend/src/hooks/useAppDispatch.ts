import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

/* Typed dispatch */
const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;

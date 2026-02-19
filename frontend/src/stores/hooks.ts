import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "./store";

// Generally used hooks for redux
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

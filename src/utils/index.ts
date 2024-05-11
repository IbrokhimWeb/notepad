export { usePagination } from "./hooks";
export { cn, ERROR, RES } from "./helpers";
export { useMousePosition } from "./hooks";
export { localeDatabase } from "./helpers/localeStorage";
export { setId, setCompleted, setTitle, setContent } from "./store/noteSlice";

export {
  setPage,
  setSearch,
  setPageSize,
  setIsCompleted,
} from "./store/paramsSlice";

export type {
  NoteState,
  PaginationProps,
  NoteType,
  ParticlesProps,
  LayoutProps,
} from "./types";

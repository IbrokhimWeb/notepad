import { Dispatch, SetStateAction } from "react";

export type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export interface NoteType {
  reload: Dispatch<SetStateAction<number>>;
  id: number;
  title: string;
  content: string;
  isCompleted: boolean;
}

export interface PaginationProps {
  pageSize: number;
  totalCount: number;
  currentPage: number;
  siblingCount?: number;
}

export interface ParamsState {
  search: string;
  isCompleted: string;
  page: number;
  page_size: number;
}

export interface ResponseState {
  loading: boolean;
  response: any;
}

export interface NoteState {
  id: null | number;
  title: string;
  content: string;
  isCompleted: boolean;
}

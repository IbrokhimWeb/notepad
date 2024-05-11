"use client";

import { FC } from "react";
import { useDispatch } from "react-redux";
import { PaginationProps, setPage, usePagination } from "@/utils";
import { Button } from "./button";
export const Pagination: FC<PaginationProps> = (props) => {
  const { pageSize, totalCount, currentPage, siblingCount = 1 } = props;
  const dispatch = useDispatch();

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) return null;

  const lastPage = paginationRange[paginationRange?.length - 1];

  const onNext = () => {
    dispatch(setPage(currentPage + 1));
  };

  const onPrevious = () => {
    dispatch(setPage(currentPage - 1));
  };

  const onPageChange = (selected: number) => {
    dispatch(setPage(selected));
  };

  return (
    <ul className="flex list-none select-none">
      <li
        className={`pagination ${currentPage <= 1 ? "disabled" : ""}`}
        onClick={onPrevious}
      >
        <button className="arrow left" />
      </li>
      {paginationRange?.map((pageNumber: number | string, i: number) =>
        pageNumber === "..." ? (
          <li key={i} className="pagination dots">
            &#8230;
          </li>
        ) : (
          <Button
            variant="outline"
            key={i}
            className={`pagination ${
              pageNumber === currentPage ? "selected" : ""
            }`}
            onClick={() => onPageChange(+pageNumber)}
          >
            {pageNumber}
          </Button>
        ),
      )}
      <li
        className={`pagination ${currentPage === lastPage ? "disabled" : ""}`}
        onClick={onNext}
      >
        <button className="arrow right" />
      </li>
    </ul>
  );
};

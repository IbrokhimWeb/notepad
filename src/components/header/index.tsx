"use client";

import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setIsCompleted, setSearch } from "@/utils";

export const Header = () => {
  const dispatch = useDispatch();

  const handleSelect = useCallback(
    (selected: string) => {
      const handler = setTimeout(() => {
        if (selected?.length === 0 || selected?.trim()?.length > 2) {
          dispatch(setIsCompleted(selected?.trim()));
        }
      }, 3000);

      return () => {
        clearTimeout(handler);
      };
    },
    [dispatch],
  );

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearch(e.target.value));
    },
    [dispatch],
  );

  return (
    <header className="flex items-center justify-between gap-10 z-50 top-10 py-5 backdrop-blur-md sticky max-lg:flex-col max-lg:items-start">
      <Link href={"/"} className="select-none relative flex items-center">
        <h1 className="app__name">NOTEPAD</h1>
        <h1 className="app__name">NOTEPAD</h1>
      </Link>
      <div className="flex items-center gap-5 justify-end max-md:flex-col max-md:w-full">
        <Input
          name="Search Note Input"
          type="search"
          placeholder="Search..."
          className="min-w-[300px] max-md:min-w-full"
          onChange={handleSearch}
        />
        <Select onValueChange={handleSelect} name="Filter by status">
          <SelectTrigger
            name="Filter by status"
            className="min-w-[200px] max-md:min-w-full"
          >
            <SelectValue placeholder="Select a status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="null">All</SelectItem>
              <SelectItem value="true">Completed</SelectItem>
              <SelectItem value="false">Not completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

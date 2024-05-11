"use client";

import axios from "axios";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";
import React, { useCallback } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";

import {
  cn,
  setId,
  setTitle,
  NoteType,
  setContent,
  setCompleted,
} from "@/utils";
import { useDispatch } from "react-redux";

export const Note = (props: NoteType) => {
  const dispatch = useDispatch();
  const { id, title, content, isCompleted = false, reload } = props;

  const handleDelete = useCallback(async () => {
    const controller = new AbortController();

    (async () => {
      try {
        const resp = await axios.delete(`/api/notes`, {
          signal: controller.signal,
          params: { id },
        });

        if (!resp?.data?.error) {
          reload((prev) => prev + 1);
          toast.success(resp?.data?.results?.message);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          const error = err as unknown as {
            response: { data: { message: string } };
          };
          toast.error(error?.response?.data?.message);
        }
      }
    })();

    return () => controller.abort();
  }, [id, reload]);

  const handleEdit = useCallback(async () => {
    dispatch(setId(id));
    dispatch(setTitle(title));
    dispatch(setContent(content));
    dispatch(setCompleted(isCompleted));
  }, [content, dispatch, id, isCompleted, title]);

  return (
    <Card className="w-[calc(100%-0.5rem)] h-auto rounded-xl p-5 mr-2">
      <CardTitle className="mb-2">{title}</CardTitle>
      <CardDescription
        className="mb-5"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <div className="flex items-center justify-between">
        <Badge
          className={cn(
            "cursor-pointer text-white",
            isCompleted
              ? "bg-green-500 hover:bg-green-600"
              : "bg-orange-500 hover:bg-orange-600",
          )}
        >
          {isCompleted ? "Yakunlangan" : "Yakunlanmagan"}
        </Badge>
        <div className="flex items-center gap-1">
          <Button
            variant={"ghost"}
            className="text-xl cursor-pointer rounded-full py-0 px-3 hover:text-blue-500"
            onClick={handleEdit}
          >
            <MdEdit />
          </Button>
          <Button
            variant={"ghost"}
            className="text-xl cursor-pointer rounded-full py-0 px-3 hover:text-red-500"
            onClick={handleDelete}
          >
            <RiDeleteBin5Fill />
          </Button>
        </div>
      </div>
    </Card>
  );
};

"use client";

import axios from "axios";
import { Dispatch, SetStateAction, useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tinymce } from "../tinymce";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

import { State } from "@/utils/store";
import { setTitle, setCompleted, setId, setContent } from "@/utils";
import { MdClose } from "react-icons/md";

interface MyFormProps {
  reload: Dispatch<SetStateAction<number>>;
}

export const MyForm = ({ reload }: MyFormProps) => {
  const dispatch = useDispatch();

  const { id, title, content, isCompleted } = useSelector(
    ({ note }: State) => note,
  );

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setTitle(e.target.value));
    },
    [dispatch],
  );

  const handleChangeCompleted = useCallback(() => {
    dispatch(setCompleted(!isCompleted));
  }, [dispatch, isCompleted]);

  const handleClear = useCallback(async () => {
    dispatch(setId(null));
    dispatch(setTitle(""));
    dispatch(setContent(""));
    dispatch(setCompleted(false));
  }, [dispatch]);

  const handleSubmit = useCallback(() => {
    const controller = new AbortController();

    (async () => {
      const newData = {
        signal: controller.signal,
        body: { title, content, isCompleted },
        params: { id },
      };

      try {
        const resp =
          typeof id !== "number"
            ? await axios.post(`/api/notes`, newData)
            : await axios.patch(`/api/notes`, newData);

        if (!resp?.data?.error) {
          reload((prev) => prev + 1);
          handleClear();
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
  }, [content, handleClear, id, isCompleted, reload, title]);

  return (
    <Card className="w-full h-auto flex flex-col gap-5 rounded-xl p-5 pr-10 mb-10">
      <div className="w-full flex items-center justify-between">
        <h1 className="font-bold text-xl">Create a new note</h1>
        {id ? (
          <Button
            variant={"secondary"}
            className="text-xl cursor-pointer rounded-full py-0 px-3 text-red-500"
            onClick={handleClear}
          >
            <MdClose />
          </Button>
        ) : null}
      </div>
      <Input
        type="text"
        placeholder="Give the note a name"
        className="w-full"
        value={title}
        onChange={handleChangeTitle}
      />
      <div className="w-full h-[300px]">
        <Tinymce />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          name="Note Status Checkbox"
          checked={isCompleted}
          onClick={handleChangeCompleted}
        />
        <Label htmlFor="terms" className="cursor-pointer">
          Have you completed the memo?
        </Label>
      </div>
      <Button className="w-full" onClick={handleSubmit}>
        Save
      </Button>
    </Card>
  );
};

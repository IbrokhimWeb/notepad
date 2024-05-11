"use client";

import axios from "axios";

import { MyForm, Note } from "@/components";
import { Card } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { CardDescription } from "@/components/ui/card";

import { NoteType } from "@/utils";
import { State } from "@/utils/store";
import { response } from "@/utils/store/responseSlice";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Home = () => {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(1);
  const { res, params } = useSelector((store: State) => store);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const resp = await axios.get(`/api/notes`, {
          signal: controller.signal,
          params,
        });

        dispatch(response(resp?.data));
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
  }, [dispatch, params, reload]);

  return (
    <section className="w-full h-full grid grid-cols-2 gap-5 py-10 max-lg:grid-cols-1">
      <div className="w-full gap-5">
        <MyForm reload={setReload} />
      </div>
      <div className="w-full h-full pb-20 flex flex-col gap-5">
        {!res?.response ? (
          <div className="w-full text-center">Loading...</div>
        ) : res?.response?.results?.length > 0 ? (
          res?.response?.results?.map((item: NoteType, idx: number) => (
            <Note {...item} key={idx} reload={setReload} />
          ))
        ) : (
          <Card className="w-[calc(100%-0.5rem)] h-auto flex items-center gap-5 rounded-xl p-5 mr-2">
            <div className="flex items-center justify-cente text-5xl my-5">
              <Image
                src="/empty.png"
                alt="Empty"
                width={0}
                height={0}
                sizes="100%"
                className="w-[40px] h-full"
              />
            </div>
            <div>
              <CardTitle className="mb-2">You have no notes</CardTitle>
              <CardDescription>
                You can create your own notes using the field below
              </CardDescription>
            </div>
          </Card>
        )}

        <div className="w-full flex items-center justify-end">
          <Pagination
            // key={Math.random()}
            totalCount={res?.response?.count} // Umumiy miqdor
            pageSize={params?.page_size} // Nechta kelsin
            currentPage={params?.page} // Hozirgi page
          />
        </div>
      </div>
    </section>
  );
};

export default Home;

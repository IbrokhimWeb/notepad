import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ERROR, RES } from "@/utils";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const page_size = Number(req.nextUrl.searchParams.get("page_size"));
  const page = Number(req.nextUrl.searchParams.get("page"));

  const take: number = Number(page_size) || 10;
  const skip: number = ((Number(page) || 1) - 1) * take;

  try {
    const [notes, count] = await Promise.all([
      prisma.note.findMany({
        take,
        skip,
        select: {
          id: true,
          title: true,
          content: true,
          isCompleted: true,
        },
        orderBy: [{ id: "asc" }],
      }),
      prisma.note.count({}),
    ]);

    return NextResponse.json(RES(notes, count), {
      status: 200,
    });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json(ERROR(result.message), { status: 500 });
  }
};

// export const GET = async () => {
//   try {
//     const notes = await prisma.note.findMany();

//     return NextResponse.json(RES(notes, 100), {
//       status: 200,
//     });
//   } catch (error) {
//     const result = error as Error;
//     return NextResponse.json(ERROR(result.message), { status: 500 });
//   }
// };

export const POST = async (req: NextRequest) => {
  try {
    const { body } = await req.json();

    await prisma.note.create({
      data: body,
    });

    return NextResponse.json(RES({ message: `Note created successfully` }), {
      status: 201,
    });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json(ERROR(result.message), { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { title, content, isCompleted } = data?.body;
    const { id } = data?.params;

    console.log(data?.body, `ID: ${id}`);

    if (typeof id === "number") {
      await prisma.note.update({
        where: { id },
        data: { title, content, isCompleted },
      });
    }

    return NextResponse.json(
      RES({ message: `${id} ID number Note edited successfully` }),
      {
        status: 200,
      },
    );
  } catch (error) {
    const result = error as Error;
    return NextResponse.json(ERROR(result.message), { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const id = Number(req.nextUrl.searchParams.get("id"));

    if (typeof id === "number") {
      await prisma.note.deleteMany({
        where: { id },
      });
    }

    return NextResponse.json(RES({ message: `${id} ID number Note removed` }), {
      status: 200,
    });
  } catch (error) {
    const result = error as Error;
    return NextResponse.json(ERROR(result.message), { status: 500 });
  }
};

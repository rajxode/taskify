import { taskTable } from "@/db/schema";
import { getTokenData } from "@/utils/getTokenData";
import {
  handleApiError,
  unAuthorizedError,
  validationError,
} from "@/utils/handleApiError";
import { and, eq, InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { NextRequest, NextResponse } from "next/server";
import { TaskInterface } from "@/types/commonType";

type Task = InferSelectModel<typeof taskTable>;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    if (!id) {
      return validationError("Bad request");
    }
    const token = await getTokenData(req);
    if (!token) {
      return unAuthorizedError();
    }
    const userId = token?.id as string;
    const db = await drizzle(process.env.DATABASE_URL!);
    const foundTask: Task[] = await db
      .select()
      .from(taskTable)
      .where(and(eq(taskTable.id, id), eq(taskTable.userId, userId)));
    const task: TaskInterface = foundTask[0];
    if (!task) {
      return validationError("Bad request");
    }
    return NextResponse.json(
      {
        success: true,
        task,
      },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

interface ResData {
  success: boolean;
  message: string;
  task: TaskInterface;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/task/${id}`,
      {
        headers: {
          Cookie: `token=${req.cookies.get("token")?.value}`,
        },
      }
    );
    const data = await result.json();
    const { success, message, task }: ResData = data;
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message,
        },
        {
          status: result.status,
        }
      );
    }
    const db = await drizzle(process.env.DATABASE_URL!);
    const body = await req.json();
    const { name, description } = body;
    if (!name) {
      return validationError("Task name is required");
    }
    const updatedTask: Task[] = await db
      .update(taskTable)
      .set({ name: name, description: description })
      .where(and(eq(taskTable.id, id), eq(taskTable.userId, task.userId)))
      .returning();
    const newTask: TaskInterface = updatedTask[0];
    return NextResponse.json(
      {
        success: true,
        updatedTask: newTask,
      },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/task/${id}`,
      {
        headers: {
          Cookie: `token=${req.cookies.get("token")?.value}`,
        },
      }
    );
    const data = await result.json();
    const { success, message, task }: ResData = data;
    if (!success) {
      return NextResponse.json(
        {
          success: false,
          message,
        },
        {
          status: result.status,
        }
      );
    }
    const db = await drizzle(process.env.DATABASE_URL!);
    await db
      .delete(taskTable)
      .where(and(eq(taskTable.id, id), eq(taskTable.userId, task.userId)));
    return NextResponse.json(
      {
        success: true,
        message: "Task deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

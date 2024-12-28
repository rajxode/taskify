import { timeEntries } from "@/db/schema";
import { TaskInterface, TimeEntryInterface } from "@/types/commonType";
import { handleApiError } from "@/utils/handleApiError";
import { InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import { NextRequest, NextResponse } from "next/server";

type Entry = InferSelectModel<typeof timeEntries>;

interface ResData {
  success: boolean;
  message: string;
  task: TaskInterface;
}

export async function POST(
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
    const entries: Entry[] = await db
      .insert(timeEntries)
      .values({ userId: task.userId, taskId: task.id })
      .returning();
    const entry: TimeEntryInterface = entries[0];
    return NextResponse.json(
      {
        success: true,
        entryId: entry.id,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

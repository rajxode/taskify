import { timeEntries } from "@/db/schema";
import { TaskInterface, TimeEntryInterface } from "@/types/commonType";
import { handleApiError } from "@/utils/handleApiError";
import { and, eq, InferSelectModel, isNull, sql } from "drizzle-orm";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

type Entry = InferSelectModel<typeof timeEntries>;

interface ResData {
  success: boolean;
  message: string;
  task: TaskInterface;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; entryId: string }> }
) {
  try {
    const { id, entryId } = await params;
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
    const now = new Date();

    const entries: Entry[] = await db
      .update(timeEntries)
      .set({
        endTime: now,
        durationSeconds: sql`EXTRACT(EPOCH FROM now() - start_time)`, // Using PostgreSQL's now()
      })
      .where(
        and(
          eq(timeEntries.id, entryId),
          eq(timeEntries.taskId, id),
          isNull(timeEntries.endTime)
        )
      )
      .returning();
    const entry: TimeEntryInterface = entries[0];
    return NextResponse.json(
      {
        success: true,
        entry,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

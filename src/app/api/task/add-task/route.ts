import { taskTable } from "@/db/schema";
import { getTokenData } from "@/utils/getTokenData";
import {
  handleApiError,
  unAuthorizedError,
  validationError,
} from "@/utils/handleApiError";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await getTokenData(req);
    if (!token) {
      return unAuthorizedError();
    }
    const userId = token.id as string;
    const body = await req.json();
    const { name, description } = body;

    if (!name) {
      return validationError("task name is required");
    }

    const task = await db
      .insert(taskTable)
      .values({ name: name, description: description, userId: userId })
      .returning();

    console.log("task", task[0]);

    return NextResponse.json(
      {
        success: true,
        message: "Task created",
        task: task[0],
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

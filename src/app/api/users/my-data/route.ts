import { getTokenData } from "@/utils/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { UserInterface } from "@/types/commonType";
import { handleApiError } from "@/utils/handleApiError";

export async function GET(req: NextRequest) {
  try {
    const token = await getTokenData(req);

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    const userId = token.id as string;
    const userExist = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));
    const user: UserInterface = userExist[0];
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
    user.password = undefined;
    return NextResponse.json(
      {
        success: true,
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

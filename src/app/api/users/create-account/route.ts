import { NextRequest, NextResponse } from "next/server";
import { userTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import { UserInterface } from "@/types/commonType";
import { handleApiError } from "@/utils/handleApiError";

export async function POST(req: NextRequest) {
  try {
    const db = drizzle(process.env.DATABASE_URL!);
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields required",
        },
        {
          status: 400,
        }
      );
    }

    const userExist = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email.toLowerCase()));
    if (userExist[0]) {
      return NextResponse.json(
        {
          success: false,
          message: "user already exist",
        },
        {
          status: 400,
        }
      );
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const [user] = await db
      .insert(userTable)
      .values({ name, email: email.toLowerCase(), password: hashPassword })
      .returning();
    const newUser: UserInterface = user;
    newUser.password = undefined;
    return NextResponse.json(
      {
        success: true,
        message: "user created",
        user: newUser,
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    return handleApiError(error);
  }
}

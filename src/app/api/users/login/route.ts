import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/postgres-js";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcryptjs from "bcryptjs";
import { UserInterface } from "@/types/commonType";
import { SignJWT } from "jose";
import { handleApiError } from "@/utils/handleApiError";

interface BodyType {
  email: string;
  password: string;
}

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export async function POST(req: NextRequest) {
  try {
    const db = await drizzle(process.env.DATABASE_URL!);
    const body: BodyType = await req.json();
    const { email, password } = body;

    if (!email || !password) {
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
    const user: UserInterface = userExist[0];
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "user doesn't exists",
        },
        {
          status: 400,
        }
      );
    }
    const isVerified = await bcryptjs.compare(password, user.password!);

    if (!isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "wrong email/password",
        },
        {
          status: 401,
        }
      );
    }

    const tokenData = {
      id: user.id,
      email: user.email,
    };

    const token = await new SignJWT(tokenData)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(process.env.NEXT_PUBLIC_JWT_EXP!)
      .sign(secret);

    user.password = undefined;
    const response = NextResponse.json(
      {
        success: true,
        message: "user logged in",
        user,
        token,
      },
      {
        status: 200,
      }
    );
    const maxAge = Number(process.env.NEXT_PUBLIC_COOKIE_EXP) * 24 * 60 * 60;
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: maxAge,
    });

    return response;
  } catch (error: any) {
    return handleApiError(error);
  }
}

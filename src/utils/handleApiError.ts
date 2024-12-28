import { NextResponse } from "next/server";

export function handleApiError(error: unknown) {
  console.error("API Error:", error);
  if (error instanceof Error) {
    return NextResponse.json(
      {
        success: false,
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json(
    {
      success: false,
      message: "An unknown error occurred",
    },
    {
      status: 500,
    }
  );
}

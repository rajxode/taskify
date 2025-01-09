
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getTokenData } from "@/utils/getTokenData";
import { handleApiError, unAuthorizedError } from "@/utils/handleApiError";
import { taskTable } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function GET(req:NextRequest) {
    try {
        const token = await getTokenData(req);
        if(!token) {
            return unAuthorizedError();
        }
        const userId = token?.id as string;
        const taskList = await db
                            .select()
                            .from(taskTable)
                            .where(eq(taskTable.userId, userId))
                            .orderBy(asc(taskTable.createdAt));
        if(!taskList) {
            return NextResponse.json({
                    success:true,
                    tasks:[]
                },{
                    status:200
                }
            )
        }
        return NextResponse.json({
                success:true,
                tasks:taskList
            },{
                status:200
            }
        )
    } catch (error:unknown) {
        return handleApiError(error);
    }
}
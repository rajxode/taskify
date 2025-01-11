import { db } from "@/db";
import { userTable } from "@/db/schema";
import { UserInterface } from "@/types/commonType";
import { getTokenData } from "@/utils/getTokenData";
import { handleApiError, unAuthorizedError } from "@/utils/handleApiError";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getRecentActivities, todayTimeDistribution, totalTimeDistribution } from "@/server-actions/action";

export async function GET(req:NextRequest) {
    try {
        const token = await getTokenData(req);
        if(!token) {
            return unAuthorizedError();
        }
        const userId = token?.id as string;
        const findUser = await db
            .select()
            .from(userTable)
            .where(eq(userTable.id, userId));
        const user:UserInterface = findUser[0];
        user.password = undefined;
        const totalTime = await totalTimeDistribution(userId);
        const todayTime = await todayTimeDistribution(userId);
        const recentActivities = await getRecentActivities(userId);
        let stats = {
            user,
            totalTime,
            todayTime,
            recentActivities:  (recentActivities && recentActivities?.length > 10) ? recentActivities.slice(0,10) : recentActivities
        }
        return NextResponse.json({
                success:true,
                stats
            },{
                status:200
            }
        )
    } catch (error:unknown) {
        return handleApiError(error);
    }
}
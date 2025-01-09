import { db } from "@/db";
import { taskTable, timeEntries } from "@/db/schema";
import { frequentTasks } from "@/server-actions/action";
import { ActivityStatsInterface } from "@/types/commonType";
import { getTokenData } from "@/utils/getTokenData";
import { handleApiError, unAuthorizedError } from "@/utils/handleApiError";
import { desc, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const token = await getTokenData(req);
        if(!token) {
            unAuthorizedError();
            return;
        }
        const userId = token.id as string;
        let stats : ActivityStatsInterface = {
            totalTime:null,
            todayTime:null,
            mostActive:null,
            lastTask:null,
            lastActivity:null
        }
        const entries = await db
                        .select({
                            id:timeEntries.id,
                            taskId:timeEntries.taskId,
                            startTime:timeEntries.startTime,
                            endTime: timeEntries.endTime,
                            durationSeconds: timeEntries.durationSeconds,
                            taskName: taskTable.name
                        })
                        .from(timeEntries)
                        .where(eq(timeEntries.userId, userId))
                        .leftJoin(taskTable,eq(timeEntries.taskId, taskTable.id))
                        .orderBy(desc(timeEntries.startTime));
        if(entries.length > 0) {
            const date = (new Date).toISOString().slice(0,10);
            const frequentTask = await frequentTasks(userId);
            stats.lastTask = entries[0].taskName;
            stats.lastActivity = entries[0].durationSeconds;
            stats.totalTime = entries.reduce((acc,cur) => acc + cur.durationSeconds, 0);
            stats.todayTime = entries.filter((entry) => entry.startTime.toISOString().includes(date)).reduce((acc,cur) => acc + cur.durationSeconds,0);
            if(frequentTask) {
                stats.mostActive = frequentTask[0].taskName;
            }
        }
        return NextResponse.json({
                success:true,
                stats,
            },{
                status:200
            }
        )
    } catch (error:unknown) {
        return handleApiError(error);
    }
}
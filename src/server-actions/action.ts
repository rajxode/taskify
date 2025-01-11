import { db } from "@/db";
import { taskTable, timeEntries } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

function errorHandler(error:unknown, errorName:string) {
    if(error instanceof Error) {
        console.log(`error in getting ${errorName}`, error.message);
    } else {
        console.log(`unknown error in getting ${errorName}`, error);
    }
    return null;
}

export async function frequentTasks(userId:string) {
    try {
        const result = await db
            .select({
                taskId: taskTable.id,
                taskName: taskTable.name,
                totalDuration: sql<number>`cast(sum(${timeEntries.durationSeconds}) as int)`.as('total_duration'),
                totalEntries: sql<number>`cast(count(${timeEntries.id}) as int)`.as('total_entries'),
            })
            .from(taskTable)
            .leftJoin(timeEntries, sql`${taskTable.id} = ${timeEntries.taskId}`)
            .where(sql`${taskTable.userId} = ${userId}`)
            .groupBy(taskTable.id, taskTable.name)
            .orderBy(
                desc(sql`count(${timeEntries.id})`),
                sql`sum(${timeEntries.durationSeconds})`
            )
            .limit(5);
        return result;
    } catch (error:unknown) {
        if(error instanceof Error) {
            console.log('error in getting frequent task', error.message);
        } else {
            console.log('unknown error in getting frequent task', error);
        }
        return null;
    }
}

export async function totalTimeDistribution(userId:string) {
    try {
        if(!userId) {
            return null;
        }
        const result = await db
            .select({
                taskId: taskTable.id,
                taskName: taskTable.name,
                totalDuration: sql<number>`cast(sum(${timeEntries.durationSeconds}) as int)`.as('total_duration'),
            })
            .from(taskTable)
            .leftJoin(timeEntries, sql`${taskTable.id} = ${timeEntries.taskId}`)
            .where(sql`${taskTable.userId} = ${userId}`)
            .groupBy(taskTable.id, taskTable.name)
            .orderBy(
                desc(sql`count(${timeEntries.id})`),
                sql`sum(${timeEntries.durationSeconds})`
            );
        return result;
    } catch (error:unknown) {
        return errorHandler(error,"totalTimeDistribution");
    }
}

export async function todayTimeDistribution(userId:string) {
    try {
        if(!userId) {
            return null;
        }
        const today = new Date();
        const startOfDay = new Date(
            Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0)
        ).toISOString();
        const endOfDay = new Date(
            Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)
        ).toISOString();
        const result = await db
            .select({
                taskId: taskTable.id,
                taskName: taskTable.name,
                totalDurationToday: sql<bigint>`cast(sum(${timeEntries.durationSeconds}) as int)`.as('total_duration'),
            })
            .from(taskTable)
            .innerJoin(timeEntries, sql`${taskTable.id} = ${timeEntries.taskId}`)
            .where(sql`
                ${timeEntries.userId} = ${userId}
                AND ${timeEntries.startTime} >= ${startOfDay}::timestamp
                AND ${timeEntries.startTime} < ${endOfDay}::timestamp
            `)
            .groupBy(taskTable.id);
        return result;
    } catch (error) {
        return errorHandler(error,"todayTimeDistribution");
    }
}

export async function getRecentActivities(userId:string) {
    try {
        if(!userId) {
            return null;
        }
        const result = await db
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
        return result;
    } catch (error:unknown) {
        return errorHandler(error,"recentActivities");
    }
}
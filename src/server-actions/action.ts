import { db } from "@/db";
import { taskTable, timeEntries } from "@/db/schema";
import { and, desc, eq, sql } from "drizzle-orm";

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
                totalDurationToday: sql<number>`cast(sum(${timeEntries.durationSeconds}) as int)`.as('total_duration'),
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

export async function getWeeklyTaskTimeBreakdown(taskId: string, userId: string) {
    try {
        if(!userId || !taskId) {
            return null;
        }
        // Get dates for the past 7 days
        const now = new Date();
        const pastWeekDates = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
        }).reverse(); // Reverse to get oldest to newest
      
        // Get the start and end bounds for the query
        const weekStart = pastWeekDates[0];
        const weekEnd = new Date(now).toISOString();
    
    
        // Query to get daily totals
        const dailyTotals = await db
          .select({
            date: sql<string>`DATE(${timeEntries.startTime})`.as('date'),
            totalDuration: sql<number>`cast(sum(${timeEntries.durationSeconds}) as int)`.as('total_duration'),
            entryCount: sql<number>`cast(count(${timeEntries.id}) as int)`.as('entry_count'),
          })
          .from(timeEntries)
          .where(sql`
            ${timeEntries.taskId} = ${taskId}
            AND ${timeEntries.userId} = ${userId}
            AND ${timeEntries.startTime} >= ${weekStart}::timestamp
            AND ${timeEntries.startTime} < ${weekEnd}::timestamp
          `)
          .groupBy(sql`DATE(${timeEntries.startTime})`);
      
        // Create a map of date to duration for easier lookup
        const durationMap = new Map(
          dailyTotals.map((entry) => [entry.date, {
            totalSeconds: entry.totalDuration,
            entryCount: entry.entryCount
          }])
        );
      
        // Format the result with all 7 days, including zeros for days with no entries
        const formattedResult = pastWeekDates.map(date => {
          const dayDate = date.split('T')[0];
          const dayData = durationMap.get(dayDate) || { totalSeconds: 0, entryCount: 0 };
          
          return {
            date: dayDate,
            totalSeconds: dayData.totalSeconds,
            numberOfEntries: dayData.entryCount
          };
        });
        return formattedResult;   
    } catch (error) {
        return errorHandler(error,"getWeeklyTaskTimeBreakdown")
    }
}

export async function getRecentTaskActivities (taskId:string, userId:string) {
    try {
        if(!userId || !taskId){
            return null;
        }
        const result = await db
            .select({
                id:timeEntries.id,
                taskId:timeEntries.taskId,
                startTime:timeEntries.startTime,
                endTime: timeEntries.endTime,
                durationSeconds: timeEntries.durationSeconds,
            })
            .from(timeEntries)
            .where(and(eq(timeEntries.userId, userId), eq(timeEntries.taskId, taskId)))
            .orderBy(desc(timeEntries.startTime))
            .limit(5);
        return result;
    } catch (error) {
        return errorHandler(error,"getRecentTaskActivities");
    }
}

export async function getMonthlyTaskTimeBreakdown(taskId: string, userId: string) {
    try {
        if(!userId || !taskId) {
            return null;
        }

        const now = new Date();
        const monthDates = Array.from({ length: now.getDate() }, (_, i) => {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
        }).reverse();
      
        // Get the start and end bounds for the query
        const monthStart = monthDates[0];
        const monthEnd = new Date(now).toISOString();
    
        const dailyTotals = await db
          .select({
            date: sql<string>`DATE(${timeEntries.startTime})`.as('date'),
            totalDuration: sql<number>`cast(sum(${timeEntries.durationSeconds}) as int)`.as('total_duration'),
            entryCount: sql<number>`cast(count(${timeEntries.id}) as int)`.as('entry_count'),
          })
          .from(timeEntries)
          .where(sql`
            ${timeEntries.taskId} = ${taskId}
            AND ${timeEntries.userId} = ${userId}
            AND ${timeEntries.startTime} >= ${monthStart}::timestamp
            AND ${timeEntries.startTime} < ${monthEnd}::timestamp
          `)
          .groupBy(sql`DATE(${timeEntries.startTime})`);
      
        const durationMap = new Map(
          dailyTotals.map((entry) => [entry.date, {
            totalSeconds: entry.totalDuration,
            entryCount: entry.entryCount
          }])
        );
        
        const formattedResult = monthDates.map(date => {
          const dayDate = date.split('T')[0];
          const dayData = durationMap.get(dayDate) || { totalSeconds: 0, entryCount: 0 };
          
          return {
            date: dayDate,
            totalSeconds: dayData.totalSeconds,
            numberOfEntries: dayData.entryCount
          };
        });
        return formattedResult;   
    } catch (error) {
        return errorHandler(error,"getMonthlyTaskTimeBreakdown")
    }
}
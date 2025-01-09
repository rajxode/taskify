import { db } from "@/db";
import { taskTable, timeEntries } from "@/db/schema";
import { desc, sql } from "drizzle-orm";

export async function frequentTasks(userId:string) {
    try {
        const result = await db
            .select({
                taskId: taskTable.id,
                taskName: taskTable.name,
                totalDuration: sql<number>`sum(${timeEntries.durationSeconds})`.as('total_duration'),
            })
            .from(taskTable)
            .leftJoin(timeEntries, sql`${taskTable.id} = ${timeEntries.taskId}`)
            .where(sql`${taskTable.userId} = ${userId}`)
            .groupBy(taskTable.id, taskTable.name)
            .orderBy(
                desc(sql`count(${timeEntries.id})`),
                sql`sum(${timeEntries.durationSeconds})`
            )
            .limit(3);
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
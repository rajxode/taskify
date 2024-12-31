
import { bigint, json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: varchar("id")
        .primaryKey()
        .$default(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const taskTable = pgTable("tasks",{
    id: varchar()
        .primaryKey()
        .$default(() => crypto.randomUUID()),
    name: text("task_name").notNull(),
    description: text("task_description"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    userId: varchar("user_id").notNull().references(() => userTable.id),
    lastTimerDuration: bigint("last_timer_duration",{mode:"number"}).default(0).notNull(),
    lastPerformedAt: timestamp("last_performed_at"),
});

export const timeEntries = pgTable("time_entries",{
    id: varchar()
        .primaryKey()
        .$default(() => crypto.randomUUID()),
    taskId: varchar("task_id").notNull().references(() => taskTable.id),
    userId: varchar("user_id").notNull().references(() => userTable.id),
    startTime: timestamp("start_time").notNull().defaultNow(),
    endTime: timestamp("end_time"),
    durationSeconds: bigint("duration_seconds",{mode:"number"}).default(0).notNull(),
});


export const timeTable = pgTable("time_table",{
    id: varchar()
        .primaryKey()
        .$default(() => crypto.randomUUID()),
    userId: varchar("user_id").notNull().references(() => userTable.id),
    name: text("table_name").notNull(),
    schedule: json("schedule").notNull(),
    createAt: timestamp("created_at").notNull().defaultNow()
});

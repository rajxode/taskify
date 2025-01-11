
import React from "react";

export default async function TaskInfoPage({
    params
}:{
    params: Promise<{ taskId:string}>
}) {
    const taskId = (await params).taskId;
    return (
        <div>
            Task Info page: {taskId}
        </div>
    )
} 
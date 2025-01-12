
import { UserInterface } from "@/types/commonType";
import { firstLetterUpper } from "@/utils/commonFunctions";
import React from "react";

export default function PersonalInfoCard({user}:{user:UserInterface}) {
    return (
        <div className="w-full bg-white dark:bg-[#171717] border shadow rounded-lg p-6">
            <div className="w-full mb-2">
                <h2 className="text-lg font-semibold text-[#36621f] dark:text-white">
                    Personal Info
                </h2>
            </div>
            <div className="w-full grid md:grid-cols-3 gap-4">
                <div className="flex flex-col p-3 bg-gray-100 dark:bg-[#212121] border rounded-lg">
                    <div className="text-xs text-gray-600 dark:text-gray-500">Name</div>
                    <div>{firstLetterUpper(user.name)}</div>
                </div>
                <div className="flex flex-col p-3 bg-gray-100 dark:bg-[#212121] border rounded-lg">
                    <div className="text-xs text-gray-600 dark:text-gray-500">Email</div>
                    <div>{user.email}</div>
                </div>
                <div className="flex flex-col p-3 bg-gray-100 dark:bg-[#212121] border rounded-lg">
                    <div className="text-xs text-gray-600 dark:text-gray-500">Joined on</div>
                    <div>{new Date(user.createdAt)?.toDateString()}</div>
                </div>
            </div>
        </div>
    )
}
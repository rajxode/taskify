import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "../ui/card"

export function ActivityPageSkeleton() {
  return (
    <div className="w-full flex flex-col space-y-6">
        <ProfileSkeleton />
        <div className="w-full grid md:grid-cols-3 gap-4">
            <TotalSkeleton />
            <TodaySkeleton />
        </div>
        <div className="w-full grid md:grid-cols-5 gap-4">
            <MostPerformedSkeleton />
            <FrequentSkeleton />
        </div>
        <div className="w-full bg-white dark:bg-[#171717] border shadow rounded-lg p-6 space-y-4">
            <div className="w-full mb-2">
                <Skeleton className="h-5 max-w-[250px]" />
            </div>
            <RecentSkeleton />
        </div>
    </div>
  )
}

export function ProfileSkeleton() {
    return (
        <div className="w-full bg-white dark:bg-[#171717] border shadow rounded-lg p-6">
            <div className="w-full mb-2">
                <Skeleton className="h-5 max-w-[250px]" />
            </div>
            <div className="w-full grid md:grid-cols-3 gap-4">
                {
                    (new Array(3))
                        .fill(0)
                        .map((_,i) => (
                            <div className="p-3 space-y-2 border rounded-lg">
                                <Skeleton className="h-3 max-w-[150px]" />
                                <Skeleton className="h-4 max-w-[200px]" />
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export function TotalSkeleton() {
    return (
        <Card className="bg-white dark:bg-[#171717] h-[250px] md:col-span-2 p-6">
            <div className="space-y-2 mb-4">
                <Skeleton className="h-3 max-w-[150px]" />
                <Skeleton className="h-4 max-w-[200px]" />
            </div>
            <Skeleton className="h-[150px] w-full rounded-xl" />
        </Card>
    )
}

export function TodaySkeleton() {
    return (
        <Card className="bg-white dark:bg-[#171717] h-[250px] p-6">
            <div className="space-y-2 mb-4">
                <Skeleton className="h-3 max-w-[150px]" />
                <Skeleton className="h-4 max-w-[200px]" />
            </div>
            <Skeleton className="h-[150px] w-full rounded-xl" />
        </Card>
    )
}

export function MostPerformedSkeleton() {
    return (
        <Card className="bg-white dark:bg-[#171717] h-[250px] md:col-span-2 p-6">
            <div className="space-y-2 mb-4">
                <Skeleton className="h-3 max-w-[150px]" />
                <Skeleton className="h-4 max-w-[200px]" />
            </div>
            <Skeleton className="h-[150px] w-full rounded-xl" />
        </Card>
    )
}

export function FrequentSkeleton() {
    return (
        <Card className="bg-white dark:bg-[#171717] h-[250px] md:col-span-3 p-6">
            <div className="space-y-2 mb-4">
                <Skeleton className="h-3 max-w-[150px]" />
                <Skeleton className="h-4 max-w-[200px]" />
            </div>
            <Skeleton className="h-[150px] w-full rounded-xl" />
        </Card>
    )
}

export function RecentSkeleton() {
    return (
        <div className="w-full space-y-3">
            {
                (new Array(5))
                    .fill(0)
                    .map((_,i) => (
                        <div className="w-full">
                            <Skeleton className="h-12 w-full" />
                        </div>
                    )
                )
            }
        </div>
    )
}
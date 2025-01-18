import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRecentTaskActivities } from "@/server-actions/action";
import { formatTime, getDateAndTime } from "@/utils/commonFunctions";
  
export default async function RecentSection({taskId,userId}:{taskId:string;userId:string}) {
  let recentActivities = null;
  try {
    const result = await getRecentTaskActivities(taskId,userId);
    if(result) {
      recentActivities = result;
    }
  } catch (error) {
    console.log("error in recentActivities in task-info",error); 
  }
  if(!recentActivities || recentActivities.length === 0) {
    return (
      <div className="w-full flex justify-center items-center">
        <p className="text-sm text-muted-foreground">
          Add and perform task to see your progress
        </p>
      </div>
    )
  }
  return (
    <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="md:w-[100px]">S.No.</TableHead>
              <TableHead className="hidden sm:table-cell">Started At</TableHead>
              <TableHead className="hidden sm:table-cell">Ended At</TableHead>
              <TableHead className="text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              recentActivities?.map((activity,i) => (
                <TableRow key={activity.id} className="py-1">
                  <TableCell className="font-medium">{i+1}</TableCell>
                  <TableCell className="hidden sm:table-cell">{getDateAndTime(activity.startTime)}</TableCell>
                  <TableCell className="hidden sm:table-cell">{getDateAndTime(activity.endTime!)}</TableCell>
                  <TableCell className="text-right">{formatTime(activity.durationSeconds)}</TableCell>
                </TableRow>
              ))
            }        
          </TableBody>
        </Table>
  )
}
  
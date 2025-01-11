import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TimeEntryInterface } from "@/types/commonType";
import { firstLetterUpper, formatTime, getDateAndTime } from "@/utils/commonFunctions";

interface PropType {
  recentActivities:TimeEntryInterface[];
}

export default function RecentEntryTable({recentActivities}:PropType) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="md:w-[100px]">S.No.</TableHead>
          <TableHead>Task Name</TableHead>
          <TableHead className="hidden sm:table-cell">Started At</TableHead>
          <TableHead className="hidden sm:table-cell">Ended At</TableHead>
          <TableHead className="text-right">Duration</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentActivities.map((activity,i) => (
          <TableRow key={activity.id} className="py-1">
            <TableCell className="font-medium">{i+1}</TableCell>
            <TableCell>{firstLetterUpper(activity?.taskName!)}</TableCell>
            <TableCell className="hidden sm:table-cell">{getDateAndTime(activity.startTime)}</TableCell>
            <TableCell className="hidden sm:table-cell">{getDateAndTime(activity.endTime!)}</TableCell>
            <TableCell className="text-right">{formatTime(activity.durationSeconds)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
  
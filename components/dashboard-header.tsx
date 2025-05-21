import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function DashboardHeader() {
  return (
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects I must Complete Before Reaching Unc Status</h1>
        <p className="text-muted-foreground">
          Locked In
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={"/og.png"}></AvatarImage>
          <AvatarFallback>UNC</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

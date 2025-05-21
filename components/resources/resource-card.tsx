import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Resource } from "@/types"
import { getCategoryIcon } from "@/lib/resource-utils"

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = getCategoryIcon(resource.category)

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </div>
        <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Badge variant="outline" className="mb-2">
          {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <a href={resource.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <span>View Resource</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

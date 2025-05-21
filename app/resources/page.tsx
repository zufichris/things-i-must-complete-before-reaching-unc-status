import { getResources } from "./actions"
import { ResourcesHeader } from "@/components/resources/resources-header"
import { ResourcesList } from "@/components/resources/resources-list"

export const metadata = {
  title: "Resources | Roadmap Management",
  description: "Browse helpful resources for your projects",
}

export default async function ResourcesPage() {
  const resources = await getResources()

  return (
    <div className="container mx-auto py-6 space-y-8">
      <ResourcesHeader />
      <ResourcesList initialResources={resources} />
    </div>
  )
}

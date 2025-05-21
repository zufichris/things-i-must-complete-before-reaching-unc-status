import { SeedForm } from "@/components/admin/seed-form"

export default function SeedPage() {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Database Management</h1>
          <p className="text-muted-foreground">Seed the database with sample roadmap data or reset existing data.</p>
        </div>

        <SeedForm />
      </div>
    </div>
  )
}

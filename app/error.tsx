"use client";

import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="mx-auto py-9">
      <h1>An unexpected error occured</h1>
      <Button>
        Back to Home
        <HomeIcon />
      </Button>
    </div>
  );
}

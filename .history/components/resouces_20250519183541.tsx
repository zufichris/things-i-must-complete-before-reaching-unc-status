import { resources } from "@/lib/resources";
import { Dialog, DialogContent, DialogDescription } from "./ui/dialog";
import Link from "next/link";

export function ResourcesModal() {
    return (
        <Dialog>
            <DialogDescription>List Of  Resources</DialogDescription>
            <DialogContent>
                {resources.map((resource, i) => (
                    <Link key={resource.link + i} href={resource.link} target="_blank">{resource.title}</Link>
                ))}
            </DialogContent>
        </Dialog>
    )
}
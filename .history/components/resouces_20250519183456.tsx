import { resources } from "@/lib/resources";
import { Dialog, DialogContent, DialogDescription } from "./ui/dialog";
import Link from "next/link";

export function ResourcesModal() {
    return (
        <Dialog>
            <DialogDescription>List Of  Resources</DialogDescription>
            <DialogContent>
                {resources.map((resource) => (
                    <Link key={re}></Link>
                ))}
            </DialogContent>
        </Dialog>
    )
}
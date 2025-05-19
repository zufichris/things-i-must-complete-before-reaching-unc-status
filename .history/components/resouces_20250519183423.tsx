import { Dialog, DialogContent, DialogDescription } from "./ui/dialog";

export function ResourcesModal() {
    return (
        <Dialog>
            <DialogDescription>List Of  Resources</DialogDescription>
            <DialogContent>
                {reeso}
            </DialogContent>
        </Dialog>
    )
}
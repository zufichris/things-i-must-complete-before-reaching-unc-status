import { resources } from "@/lib/resources";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import Link from "next/link";

export function ResourcesModal() {
    return (
        <Dialog>
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-2">Resources</DialogTitle>
                <DialogDescription className="mb-4 text-gray-500">
                    Curated list of helpful resources for you.
                </DialogDescription>
            </DialogHeader>
            <DialogContent>
                <ul className="space-y-3">
                    {resources.map((resource, i) => (
                        <li key={resource.link + i} className="bg-gray-50 hover:bg-gray-100 rounded-md p-3 transition">
                            <Link
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline font-medium flex items-center gap-2"
                            >
                                <span>🔗</span>
                                {resource.title}
                            </Link>
                            {resource.description && (
                                <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                            )}
                        </li>
                    ))}
                </ul>
            </DialogContent>
            <DialogFooter>
                <span className="text-green-600 font-semibold">Enjoy!</span>
            </DialogFooter>
        </Dialog>
    );
}
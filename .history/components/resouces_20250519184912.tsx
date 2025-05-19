import { useState } from "react";
import { resources, Resource } from "@/lib/resources";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BookOpen, Code, Palette, Component, Zap, Video, Settings, FileText } from "lucide-react";

export interface ResourcesModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ResourcesModal() {
    const [open, setOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const categories = [
        { id: "all", label: "All" },
        { id: "documentation", label: "Docs" },
        { id: "video", label: "Videos" },
        { id: "tool", label: "Tools" },
        { id: "article", label: "Articles" }
    ];

    const filteredResources = activeCategory === "all"
        ? resources
        : resources.filter(resource => resource.category === activeCategory);

    const getIcon = (resource: Resource) => {
        switch (resource.icon) {
            case "book-open": return <BookOpen className="h-4 w-4" />;
            case "code": return <Code className="h-4 w-4" />;
            case "palette": return <Palette className="h-4 w-4" />;
            case "component": return <Component className="h-4 w-4" />;
            case "zap": return <Zap className="h-4 w-4" />;
            default:
                switch (resource.category) {
                    case "video": return <Video className="h-4 w-4" />;
                    case "tool": return <Settings className="h-4 w-4" />;
                    case "article": return <FileText className="h-4 w-4" />;
                    default: return <BookOpen className="h-4 w-4" />;
                }
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "documentation": return "bg-blue-100 text-blue-800";
            case "video": return "bg-red-100 text-red-800";
            case "tool": return "bg-green-100 text-green-800";
            case "article": return "bg-purple-100 text-purple-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <Dialog open={open} onOpenChange={(open)}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Learning Resources</DialogTitle>
                    <DialogDescription className="text-base">
                        A curated collection of helpful resources for your development journey.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mt-4">
                    <TabsList className="grid grid-cols-5 mb-4">
                        {categories.map(category => (
                            <TabsTrigger key={category.id} value={category.id}>
                                {category.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value={activeCategory} className="space-y-4 mt-2">
                        {filteredResources.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                No resources found in this category.
                            </div>
                        ) : (
                            filteredResources.map((resource, i) => (
                                <Card key={resource.link + i} className="group hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-2">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                                <span className="p-1 rounded-md bg-muted flex items-center justify-center">
                                                    {getIcon(resource)}
                                                </span>
                                                {resource.title}
                                            </CardTitle>
                                            <Badge className={`${getCategoryColor(resource.category)}`}>
                                                {resource.category}
                                            </Badge>
                                        </div>
                                        <CardDescription className="text-sm mt-1">
                                            {resource.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardFooter className="pt-2">
                                        <a
                                            href={resource.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                                        >
                                            Visit resource
                                            <ExternalLink className="ml-1 h-3 w-3" />
                                        </a>
                                    </CardFooter>
                                </Card>
                            ))
                        )}
                    </TabsContent>
                </Tabs>

                <DialogFooter className="flex items-center justify-between sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                        Have a suggestion? Let us know!
                    </p>
                    <DialogClose asChild>
                        <Button>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

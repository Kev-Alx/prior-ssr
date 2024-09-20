import { router, useForm } from "@inertiajs/react";
import { ArrowLeft, Loader2, Share, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCategory from "@/hooks/useCategory";
import useChangePanel from "@/hooks/useChangePanel";
import { Category } from "@/types/admin";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

type Props = {
    category?: Category;
};

const CategoryForm = ({ category }: Props) => {
    const { data, setData } = useForm({
        name: category?.name || "",
        description: category?.description || "",
    });
    const [isExiting, setIsExiting] = useState(false);
    const isEditing = !!category;
    const { createNewCategory, isLoading, updateCategory, deleteCategory } =
        useCategory();
    const submit = (e: any) => {
        e.preventDefault();
        if (isExiting) return;
        if (data.name.length < 1 || data.description.length < 1) {
            toast({
                title: "Name and description is required.",
                variant: "destructive",
            });
            return;
        }
        if (isEditing) {
            updateCategory({
                name: data.name,
                description: data.description,
                uuid: category?.uuid || "",
            });
        } else {
            createNewCategory({
                name: data.name,
                description: data.description,
            });
        }
    };
    const handleDelete = () => {
        setIsExiting(true);
        handleChangePanel("two");
        deleteCategory({
            uuid: category?.uuid || "",
        });
    };
    const handleChangePanel = useChangePanel();
    return (
        <section className="bg-bg h-full ">
            <form onSubmit={submit}>
                <div className="flex justify-between px-4 py-4 border-b-2 border-neutral-950 items-center">
                    <h1>{category?.name || "Untitled"}</h1>
                    <div className="flex gap-2">
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => {
                                        setIsExiting(true);
                                        handleChangePanel("two");
                                        router.replace(`/admin/category`);
                                    }}
                                    size={"icon"}
                                    variant={"secondary"}
                                    type="button"
                                    asChild
                                    className="p-1 cursor-pointer"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                Cancel
                            </TooltipContent>
                        </Tooltip>
                        {isLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <Button size={"icon"} type="submit">
                                        <Share className="h-5 w-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    Publish
                                </TooltipContent>
                            </Tooltip>
                        )}

                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={handleDelete}
                                    size={"icon"}
                                    variant={"destructive"}
                                    type="button"
                                    asChild
                                    className="p-1 cursor-pointer"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                Delete
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
                <div className="p-4">
                    <label htmlFor="title">Name</label>
                    <Input
                        id="title"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mb-2 mt-1"
                    />
                    <label htmlFor="description">Description</label>
                    <Input
                        id="description"
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="mb-2 mt-1"
                    />
                </div>
            </form>
        </section>
    );
};

export default CategoryForm;

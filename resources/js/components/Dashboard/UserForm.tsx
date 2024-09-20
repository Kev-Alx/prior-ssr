import { router, useForm } from "@inertiajs/react";
import { ArrowLeft, Loader2, Share, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import useChangePanel from "@/hooks/useChangePanel";
import { User } from "@/types/admin";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

type Props = {
    user?: User;
};

const UserForm = ({ user }: Props) => {
    const { data, setData } = useForm({
        name: user?.name || "",
        email: user?.email || "",
    });
    const [isExiting, setIsExiting] = useState(false);
    const isEditing = !!user;
    const { createNewUser, isLoading, updateUser, deleteUser } = useUser();
    const submit = (e: any) => {
        e.preventDefault();
        if (isExiting) return;
        if (data.name.length < 1 || data.email.length < 1) {
            toast({
                title: "Name and email is required.",
                variant: "destructive",
            });
            return;
        }
        if (isEditing) {
            updateUser({
                name: data.name,
                email: data.email,
                id: user?.id || "",
            });
        } else {
            createNewUser({
                name: data.name,
                email: data.email,
            });
        }
    };
    const handleDelete = () => {
        setIsExiting(true);
        handleChangePanel("two");
        deleteUser({
            id: user?.id || "",
        });
    };
    const handleChangePanel = useChangePanel();
    return (
        <section className="bg-bg h-full ">
            <form onSubmit={submit}>
                <div className="flex justify-between px-4 py-4 border-b-2 border-neutral-950 items-center">
                    <h1>{user?.name || "Untitled"}</h1>
                    <div className="flex gap-2">
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => {
                                        setIsExiting(true);
                                        handleChangePanel("two");
                                        router.replace(`/admin/user`);
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
                    <label htmlFor="name">Name</label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="mb-2 mt-1"
                    />
                    <label htmlFor="email">Email</label>
                    <Input
                        id="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="mb-2 mt-1"
                    />
                </div>
            </form>
        </section>
    );
};

export default UserForm;

import { router, useForm } from "@inertiajs/react";
import { ArrowLeft, Loader2, Share, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useFaq from "@/hooks/useFaq";
import useChangePanel from "@/hooks/useChangePanel";
import { Faq } from "@/types/admin";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

type Props = {
    faq?: Faq;
};

const FaqForm = ({ faq }: Props) => {
    const { data, setData } = useForm({
        slug: faq?.slug || "",
        question: faq?.question || "",
        answer: faq?.answer || "",
    });
    const [isExiting, setIsExiting] = useState(false);
    const isEditing = !!faq;
    const { createNewFaq, isLoading, updateFaq, deleteFaq } = useFaq();
    const submit = (e: any) => {
        e.preventDefault();
        if (isExiting) return;
        if (
            data.slug.length < 1 ||
            data.question.length < 1 ||
            data.answer.length < 1
        ) {
            toast({
                title: "Name and description is required.",
                variant: "destructive",
            });
            return;
        }
        if (isEditing) {
            updateFaq({
                slug: data.slug,
                question: data.question,
                answer: data.answer,
                uuid: faq?.uuid || "",
            });
        } else {
            createNewFaq({
                slug: data.slug,
                question: data.question,
                answer: data.answer,
            });
        }
    };
    const handleDelete = () => {
        setIsExiting(true);
        handleChangePanel("two");
        deleteFaq({
            uuid: faq?.uuid || "",
        });
    };
    const handleChangePanel = useChangePanel();
    return (
        <section className="bg-bg h-full ">
            <form onSubmit={submit}>
                <div className="flex justify-between px-4 py-4 border-b-2 border-neutral-950 items-center">
                    <h1>{faq?.slug || "Untitled"}</h1>
                    <div className="flex gap-2">
                        <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() => {
                                        setIsExiting(true);
                                        handleChangePanel("two");
                                        router.replace(`/admin/faq`);
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
                        value={data.slug}
                        onChange={(e) => setData("slug", e.target.value)}
                        className="mb-2 mt-1"
                    />
                    <label htmlFor="description">Question</label>
                    <Input
                        id="question"
                        value={data.question}
                        onChange={(e) => setData("question", e.target.value)}
                        className="mb-2 mt-1"
                    />
                    <label htmlFor="description">Answer</label>
                    <Input
                        id="answer"
                        value={data.answer}
                        onChange={(e) => setData("answer", e.target.value)}
                        className="mb-2 mt-1"
                    />
                </div>
            </form>
        </section>
    );
};

export default FaqForm;

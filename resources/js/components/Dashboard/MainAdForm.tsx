import { router, useForm } from "@inertiajs/react";
import { ArrowLeft, Loader2, Share } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useChangePanel from "@/hooks/useChangePanel";
import { MainAd } from "@/types/admin";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useMainAd } from "@/hooks/useAds";
import axios from "axios";

type Props = {
    mainAd?: MainAd;
};

const MainAdForm = ({ mainAd }: Props) => {
    const { data, setData } = useForm({
        title: mainAd?.title || "",
        description: mainAd?.description || "",
        link: mainAd?.link || "",
        image: mainAd?.image || "",
    });
    const [isExiting, setIsExiting] = useState(false);
    const { isLoading, updateFaq } = useMainAd();
    const submit = (e: any) => {
        e.preventDefault();
        if (isExiting) return;
        if (
            data.description.length < 1 ||
            data.link.length < 1 ||
            data.title.length < 1
        ) {
            toast({
                title: "All answers are required.",
                variant: "destructive",
            });
            return;
        }
        updateFaq({
            title: data?.title || "",
            description: data?.description || "",
            link: data?.link || "",
            image: data?.image || "",
        });
    };
    const handleChangePanel = useChangePanel();
    return (
        <section className="bg-bg h-full ">
            <form onSubmit={submit}>
                <div className="flex justify-between px-4 py-4 border-b-2 border-neutral-950 items-center">
                    <h1>Homepage Ad</h1>
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
                                    Update
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                </div>
                <div className="p-4">
                    <label htmlFor="title">Title</label>
                    <Input
                        id="title"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className="mb-2 mt-1"
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={data.description}
                        rows={3}
                        onChange={(e) => setData("description", e.target.value)}
                        className="mb-2 mt-1 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <label htmlFor="answer">Link</label>
                    <div className="flex gap-2 items-center">
                        <Input
                            id="answer"
                            value={data.link}
                            onChange={(e) => setData("link", e.target.value)}
                            className="mb-2 mt-1 "
                        />
                        <Button
                            role="button"
                            size="sm"
                            onClick={(e) => {
                                e.preventDefault();
                                setData("link", "/ad");
                            }}
                        >
                            Set to default
                        </Button>
                    </div>
                    <label>Image</label>
                    <Input
                        type="file"
                        className="w-full mb-3 mt-2"
                        onChange={async (e) => {
                            const body = new FormData();
                            //@ts-ignore
                            body.append("file", e.target.files[0]);
                            const response = await axios.post(
                                "/admin/upload",
                                body
                            );
                            setData(
                                "image",
                                `${origin}/storage/` + response.data.path
                            );
                        }}
                    />
                </div>
            </form>
        </section>
    );
};

export default MainAdForm;

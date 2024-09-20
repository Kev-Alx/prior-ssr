import { toast } from "@/components/ui/use-toast";
import { router } from "@inertiajs/react";
import { useState } from "react";

type FaqCreationReq = {
    slug: string;
    question: string;
    answer: string;
};

type FaqDeletionReq = {
    uuid: string;
};

type FaqUpdateReq = {
    uuid: string;
    slug: string;
    question: string;
    answer: string;
};

const useFaq = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const createNewFaq = async (payload: FaqCreationReq) => {
        setIsLoading(true);
        router.post(
            "/faq",
            {
                ...payload,
            },
            {
                onSuccess: () => {
                    toast({
                        title: "FAQ succesfully created.",
                    });
                    setIsLoading(false);
                },
                onError: () => {
                    setError(error);
                    toast({
                        title: "Failed to create FAQ.",
                        variant: "destructive",
                        duration: 800,
                    });
                    setIsLoading(false);
                },
            }
        );
    };

    const updateFaq = async (payload: FaqUpdateReq) => {
        const { uuid } = payload;
        setIsLoading(true);
        router.put(
            `/faq/${uuid}`,
            {
                ...payload,
            },
            {
                onError: () => {
                    setError(error);
                    toast({
                        title: "Update failed.",
                        variant: "destructive",
                        duration: 800,
                    });
                    setIsLoading(false);
                },
                onSuccess: () => {
                    toast({
                        title: "Update success.",
                        duration: 800,
                    });
                    setIsLoading(false);
                },
            }
        );
    };

    const deleteFaq = async (payload: FaqDeletionReq) => {
        setIsLoading(true);
        const { uuid } = payload;
        const result = window.confirm(`Are you sure you want to delete FAQ?`);
        if (!result) return;
        router.delete(`/faq/${uuid}`, {
            onSuccess: () => {
                toast({
                    title: `Faq successfully deleted.`,
                    duration: 800,
                });
                setIsLoading(false);
            },
            onError: () => {
                setError(error);
                toast({
                    title: `Faq is unable to be deleted.`,
                    variant: "destructive",
                    duration: 800,
                });
                setIsLoading(false);
            },
        });
    };

    return {
        isLoading,
        error,
        createNewFaq,
        deleteFaq,
        updateFaq,
    };
};

export default useFaq;

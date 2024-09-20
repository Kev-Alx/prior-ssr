import { toast } from "@/components/ui/use-toast";
import { router } from "@inertiajs/react";
import { useState } from "react";

type ArticleCreationReq = {
    title: string;
    description: string;
    slug: string;
    author: string;
    category_id: string;
    read_time: number;
    publish_date: Date;
    main_image: string;
    main_featured: boolean;
    category_featured: boolean;
    content?: string;
};

type ArticleDeletionReq = {
    uuid: string;
};

type ArticleUpdateReq = {
    uuid: string;
    title: string;
    description: string;
    slug: string;
    author: string;
    category_id: string;
    read_time: number;
    main_image?: string;
    main_featured: boolean;
    category_featured: boolean;
    publish_date: Date;
    content?: string;
};

const useArticle = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const createNewArticle = async (payload: ArticleCreationReq) => {
        setIsLoading(true);
        router.post(
            "/article",
            {
                ...payload,
            },
            {
                onSuccess: () => {
                    toast({
                        title: "Article succesfully created.",
                    });
                    setIsLoading(false);
                },
                onError: () => {
                    setError(error);
                    toast({
                        title: "Failed to create article.",
                        variant: "destructive",
                        duration: 800,
                    });
                    setIsLoading(false);
                },
            }
        );
    };

    const updateArticle = async (payload: ArticleUpdateReq) => {
        const { uuid } = payload;
        setIsLoading(true);
        router.put(
            `/article/${uuid}`,
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

    const deleteArticle = async (payload: ArticleDeletionReq) => {
        setIsLoading(true);
        const { uuid } = payload;
        const result = window.confirm(
            `Are you sure you want to delete article?`
        );
        if (!result) return;
        router.delete(`/article/${uuid}`, {
            onSuccess: () => {
                toast({
                    title: `Article successfully deleted.`,
                    duration: 800,
                });
                setIsLoading(false);
            },
            onError: () => {
                setError(error);
                toast({
                    title: `Article is unable to be deleted.`,
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
        createNewArticle,
        deleteArticle,
        updateArticle,
    };
};

export default useArticle;

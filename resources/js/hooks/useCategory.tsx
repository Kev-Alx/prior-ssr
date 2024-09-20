import { toast } from "@/components/ui/use-toast";
import { router } from "@inertiajs/react";
import { useState } from "react";

type CategoryCreationReq = {
    name: string;
    description: string;
};

type CategoryDeletionReq = {
    uuid: string;
};

type CategoryUpdateReq = {
    uuid: string;
    name: string;
    description: string;
};

const useCategory = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const createNewCategory = async (payload: CategoryCreationReq) => {
        setIsLoading(true);
        router.post(
            "/category",
            {
                ...payload,
            },
            {
                onSuccess: () => {
                    toast({
                        title: "Category succesfully created.",
                    });
                    setIsLoading(false);
                },
                onError: () => {
                    setError(error);
                    toast({
                        title: "Failed to create category.",
                        variant: "destructive",
                        duration: 800,
                    });
                    setIsLoading(false);
                },
            }
        );
    };

    const updateCategory = async (payload: CategoryUpdateReq) => {
        const { uuid } = payload;
        setIsLoading(true);
        router.put(
            `/category/${uuid}`,
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

    const deleteCategory = async (payload: CategoryDeletionReq) => {
        setIsLoading(true);
        const { uuid } = payload;
        const result = window.confirm(
            `Are you sure you want to delete category?`
        );
        if (!result) return;
        router.delete(`/category/${uuid}`, {
            onSuccess: () => {
                toast({
                    title: `Category successfully deleted.`,
                    duration: 800,
                });
                setIsLoading(false);
            },
            onError: () => {
                setError(error);
                toast({
                    title: `Category is unable to be deleted.`,
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
        createNewCategory,
        deleteCategory,
        updateCategory,
    };
};

export default useCategory;

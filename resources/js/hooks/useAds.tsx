import { toast } from "@/components/ui/use-toast";
import { router } from "@inertiajs/react";
import { useState } from "react";

type MainAdUpdateReq = {
    title: string;
    description: string;
    link: string;
    image: string;
};

type AdCreationReq = {
    name: string;
    main_image: string;
    description: string;
    link: string;
};

type AdDeletionReq = {
    uuid: string;
};

type AdUpdateReq = {
    uuid: string;
    name: string;
    main_image: string;
    description: string;
    link: string;
};

export const useMainAd = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const updateFaq = async (payload: MainAdUpdateReq) => {
        setIsLoading(true);
        router.put(
            `/mainad`,
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

    return {
        isLoading,
        error,
        updateFaq,
    };
};

export const useAd = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const createNewAd = async (payload: AdCreationReq) => {
        setIsLoading(true);
        router.post(
            "/ad",
            {
                ...payload,
            },
            {
                onSuccess: () => {
                    toast({
                        title: "Ad succesfully created.",
                    });
                    setIsLoading(false);
                },
                onError: () => {
                    setError(error);
                    toast({
                        title: "Failed to create Ad.",
                        variant: "destructive",
                        duration: 800,
                    });
                    setIsLoading(false);
                },
            }
        );
    };

    const updateAd = async (payload: AdUpdateReq) => {
        const { uuid } = payload;
        setIsLoading(true);
        router.put(
            `/ad/${uuid}`,
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

    const deleteAd = async (payload: AdDeletionReq) => {
        setIsLoading(true);
        const { uuid } = payload;
        const result = window.confirm(`Are you sure you want to delete Ad?`);
        if (!result) return;
        router.delete(`/ad/${uuid}`, {
            onSuccess: () => {
                toast({
                    title: `Ad successfully deleted.`,
                    duration: 800,
                });
                setIsLoading(false);
            },
            onError: () => {
                setError(error);
                toast({
                    title: `Ad is unable to be deleted.`,
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
        createNewAd,
        deleteAd,
        updateAd,
    };
};

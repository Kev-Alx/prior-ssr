import { toast } from "@/components/ui/use-toast";
import { router } from "@inertiajs/react";
import { useState } from "react";

type UserCreationReq = {
    name: string;
    email: string;
};

type UserDeletionReq = {
    id: string;
};

type UserUpdateReq = {
    id: string;
    name: string;
    email: string;
};

const useUser = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const createNewUser = async (payload: UserCreationReq) => {
        setIsLoading(true);
        router.post(
            "/user",
            {
                ...payload,
            },
            {
                onSuccess: () => {
                    toast({
                        title: "User succesfully created.",
                    });
                    setIsLoading(false);
                },
                onError: () => {
                    setError(error);
                    toast({
                        title: "Failed to create User.",
                        variant: "destructive",
                        duration: 800,
                    });
                    setIsLoading(false);
                },
            }
        );
    };

    const updateUser = async (payload: UserUpdateReq) => {
        const { id } = payload;
        setIsLoading(true);
        router.put(
            `/user/${id}`,
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

    const deleteUser = async (payload: UserDeletionReq) => {
        setIsLoading(true);
        const { id } = payload;
        const result = window.confirm(`Are you sure you want to delete User?`);
        if (!result) return;
        router.delete(`/user/${id}`, {
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
                    title: `User is unable to be deleted.`,
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
        createNewUser,
        deleteUser,
        updateUser,
    };
};

export default useUser;

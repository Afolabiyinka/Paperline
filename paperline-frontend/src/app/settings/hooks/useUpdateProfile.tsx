import { useAuthStore } from "@/app/auth/store/authStore";
import type { UpdateUserPayload } from "@/app/auth/types/types";
import useToastMessage from "@/shared/lib/useToastmsg";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { update } from "../services/user";

export const useUpdateUser = () => {
    const [updatedData, setupdatedData] = useState<Partial<UpdateUserPayload>>(
        {},
    );
    const { authUser, setAuthUser } = useAuthStore();

    const { toastError, toastSuccess } = useToastMessage();

    useEffect(() => {
        if (authUser) {
            setupdatedData({
                email: authUser.email,
                username: authUser.username,
                lastname: authUser.lastname,
                firstname: authUser.firstname,
                profilePic: authUser.profilePic,
            });
        }
    }, [authUser]);

    //   Update User
    const { mutate, isPending } = useMutation({
        mutationFn: (payload: UpdateUserPayload) => update(payload),
        onSuccess: (data) => {
            toastSuccess(data.message);
            if (data.user) {
                setAuthUser(data.user);
            }
        },
        onError: () => {
            toastError("Something went wrong");
        },
    });

    function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        mutate(updatedData);
    }

    async function updateProfilePic(url: string) {
        if (!authUser?.id) return toastError("Unathorised");

        mutate({ profilePic: url });

        setupdatedData((prev) => ({
            ...prev,
            profilePic: url,
        }));
    }

    return {
        updatedData,
        setupdatedData,
        handleUpdate,
        loading: isPending,
        updateProfilePic,
    };
};

import { useMutation } from "@tanstack/react-query"
import { logout } from "../services/user"
import { queryClient } from "@/shared/constants/api"
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            navigate("/")
        }
    })

    return {
        logoutMutate: mutate,
        logoutLoading: isPending,
    }
}
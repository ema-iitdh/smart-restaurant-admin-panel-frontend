import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function useLogout(params = {}, config = {}) {
	const navigate = useNavigate();

	const {
		mutate: handleLogout,
		isPending: logoutPending,
		isError: logoutIsError,
		error: logoutError,
	} = useMutation({
		mutationFn: () => authApi.logout(),
		onSuccess: () => {
			localStorage.removeItem("user");
			navigate("/auth/login", { replace: true });
			toast.success("Logout successful");
		},
		onError: (error) => {
			toast.error(error.response.data.message);
		},
		...config,
	});

	return { handleLogout, logoutPending, logoutIsError, logoutError };
}

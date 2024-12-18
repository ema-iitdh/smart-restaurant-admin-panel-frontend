import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function useLogin(params = {}, config = {}) {
	const navigate = useNavigate();

	const {
		mutate: handleLogin,
		isPending: loginPending,
		isError: loginIsError,
		error: loginError,
	} = useMutation({
		mutationFn: (values) => {
			return authApi.login(values);
		},
		onSuccess: (data) => {
			localStorage.setItem("user", JSON.stringify(data?.data));

			if (
				data?.data?.role === "Super_Admin" ||
				data?.data?.role === "Restaurant_Admin"
			) {
				navigate("/", { replace: true });
			}
		},
		onError: (error) => {
			toast.error(error.response.data.message);
		},
		...config,
	});

	return { handleLogin, loginPending, loginIsError, loginError };
}

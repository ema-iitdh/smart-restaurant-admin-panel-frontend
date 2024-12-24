import { handleAddPermission } from "@/api/apiServices";
import { useMutation } from "@tanstack/react-query";

export default function useHandleAddPermission() {
  return useMutation(({ values, userId }) => handleAddPermission(values, userId));
}


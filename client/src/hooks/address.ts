import { TAddressData } from "@/utils/address";
import axiosAPI from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export function useFetchAddress() {
  return useQuery<TAddressData[]>({
    queryKey: ["address"],
    queryFn: async () => {
      const { data } = await axiosAPI("/api/address");
      return data.address;
    },
  });
}

export function useEditAddress() {}

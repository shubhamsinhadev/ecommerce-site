import { TAddressData } from "@/utils/address";
import { useQuery } from "@tanstack/react-query";

export const fetchAddress = async () => {
  return await fetch("/api/address", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (!res.status) {
        throw new Error("Failed to fetch address");
      }
      return res.address;
    });
};

export function useFetchAddress() {
  return useQuery<TAddressData[]>({
    queryKey: ["address"],
    queryFn: fetchAddress,
  });
}

export function useEditAddress(){
  
}
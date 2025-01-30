import { useFetchCart } from "@/hooks/cart";
import { TAddressData } from "@/utils/address";
import axiosAPI from "@/utils/axios";
import { IOrderProps, IOrderResponse } from "@/utils/orders";
import { Spinner, VStack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PROMISE);

export default function CheckoutPayment({ order }: IOrderProps) {
  const { address: addressData } = order;

  const { data: cartData } = useFetchCart();

  const products = cartData.map(({ productId, quantity }) => {
    return { productId, quantity };
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _id, _v, ...address } = addressData as TAddressData;

  const { isPending, isError, error, data } = useQuery<IOrderResponse>({
    queryKey: ["cart"],
    queryFn: async () =>
      await axiosAPI.post("/api/order", { products, address }).then((res) => {
        return res.data;
      }),
  });

  if (isPending)
    return (
      <VStack colorPalette="blue" w={"100%"} h={"100%"}>
        <Spinner color="blue.600" />
        <Text color="blue.600">Loading...</Text>
      </VStack>
    );

  if (isError || !data)
    return <div>Error: {error?.message || "Something went wrong"}</div>;

  const appearance: Appearance = {
    theme: "stripe",
  };
  const loader = "auto";

  const { clientSecret } = data;

  return (
    <>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <Payment />
        </Elements>
      )}
    </>
  );
}

import { useQuery } from "@tanstack/react-query";
import z from "zod";

const zipStaticApiResponseSchema = z.object({
  country: z.literal("US"),
  state: z.string().min(2),
  city: z.string().min(2),
});

type ZipStaticApiResponse = z.infer<typeof zipStaticApiResponseSchema>;

type ZipCodeOptions = {
  zipCode: string;
  onSuccess: (data: ZipStaticApiResponse) => void;
};

function decapitalizeCity(city: string) {
  return city
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function useZipCode({ zipCode, onSuccess }: ZipCodeOptions) {
  const query = useQuery({
    queryKey: ["zipCode", zipCode],
    queryFn: async () => {
      const response = await fetch(`https://ZiptasticAPI.com/${zipCode}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();
      const { city, state, country } = zipStaticApiResponseSchema.parse(json);

      onSuccess({
        city: decapitalizeCity(city),
        state,
        country,
      });

      return json;
    },
    enabled: zipCode.length >= 5,
  });

  return query;
}

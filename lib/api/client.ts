import { ApiService } from "@/lib/api";
import { env } from "@/lib/env";

export const clientApiService = new ApiService(
  env.NEXT_PUBLIC_CORESAVE_API_URL,
);

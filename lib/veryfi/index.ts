import Veryfi from "@veryfi/veryfi-sdk";
import { env } from "@/lib/env";

export const client = new Veryfi(
  env.VERYFI_CLIENT_ID,
  env.VERYFI_CLIENT_SECRET,
  env.VERYFI_USERNAME,
  env.VERYFI_API_KEY,
);

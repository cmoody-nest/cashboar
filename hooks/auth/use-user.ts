import { useQuery } from "@tanstack/react-query";
import { getSupabaseUser } from "@/lib/supabase/utils.client";

export function useUser() {
  const query = useQuery({
    queryKey: ["supabase-user"],
    queryFn: getSupabaseUser,
  });

  return query;
}

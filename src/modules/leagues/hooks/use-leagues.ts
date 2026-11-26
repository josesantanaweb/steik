"use client";

import { useQuery } from "@tanstack/react-query";
import { getLeagues } from "@/lib/api/leagues";

export const LEAGUES_QUERY_KEY = ["leagues"] as const;

export const useLeagues = () => {
  return useQuery({
    queryKey: LEAGUES_QUERY_KEY,
    queryFn: getLeagues,
  });
};

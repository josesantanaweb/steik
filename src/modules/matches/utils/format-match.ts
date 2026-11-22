export const formatKickoffTime = (kickoff: string): string =>
  new Date(kickoff).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatKickoffDate = (kickoff: string): string =>
  new Date(kickoff).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

export const formatOdd = (value: number): string => value.toFixed(2);

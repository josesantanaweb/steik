import type { ReactElement } from "react";
import { TeamLogo } from "@/modules/teams/components/team-logo";
import type { MatchTeam } from "@/modules/matches/types";

interface MatchTeamSideProps {
  team: MatchTeam;
}

export const MatchTeamSide = ({ team }: MatchTeamSideProps): ReactElement => {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1">
      <TeamLogo src={team.logo} name={team.name} className="size-12" />
      <h2 className="line-clamp-2 text-center text-sm font-semibold text-white">
        {team.name}
      </h2>
    </div>
  );
};

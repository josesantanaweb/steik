import type { ReactElement } from "react";
import { notFound } from "next/navigation";
import { PAGE_TITLES } from "@/constants";
import { PageTitle } from "@/modules/shared/components";
import {
  LeagueLogo,
  MatchTeamSide,
  OddsGrid,
} from "@/modules/matches/components";
import { MATCH_LEAGUE_LOGOS } from "@/modules/matches/types";
import {
  formatKickoffDate,
  formatKickoffTime,
  getMatchById,
} from "@/modules/matches/utils";

interface MatchDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MatchDetailPage({
  params,
}: MatchDetailPageProps): Promise<ReactElement> {
  const { id } = await params;
  const match = getMatchById(id);

  if (!match) {
    notFound();
  }

  return (
    <>
      <PageTitle title={PAGE_TITLES.MATCH_DETAIL} showBackButton />
      <div className="flex flex-col gap-6 px-5">
        <section className="border-stroke bg-surface flex flex-col gap-5 rounded-2xl border p-4">
          
        </section>
      </div>
    </>
  );
}

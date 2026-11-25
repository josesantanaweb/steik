import { MatchStatus } from "@prisma/client";
import { z } from "zod";

const optionalNullableText = z.string().trim().min(1).nullable().optional();
const optionalNullableScore = z
  .number()
  .int()
  .nonnegative()
  .nullable()
  .optional();

export const CreateMatchSchema = z
  .object({
    externalId: optionalNullableText,
    kickoff: z.string().datetime("La fecha de inicio no es válida"),
    status: z.nativeEnum(MatchStatus).optional(),
    season: z.string().trim().min(1, "La temporada es requerida"),
    round: optionalNullableText,
    homeScore: optionalNullableScore,
    awayScore: optionalNullableScore,
    leagueId: z.string().uuid("La liga no es válida"),
    homeTeamId: z.string().uuid("El equipo local no es válido"),
    awayTeamId: z.string().uuid("El equipo visitante no es válido"),
  })
  .refine((data) => data.homeTeamId !== data.awayTeamId, {
    path: ["awayTeamId"],
    message: "El equipo visitante debe ser distinto del equipo local",
  });

export const UpdateMatchSchema = CreateMatchSchema.innerType()
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debes enviar al menos un campo para actualizar",
  });

export type CreateMatchInput = z.infer<typeof CreateMatchSchema>;
export type UpdateMatchInput = z.infer<typeof UpdateMatchSchema>;

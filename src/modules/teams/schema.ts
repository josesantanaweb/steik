import { z } from "zod";

const optionalNullableText = z.string().trim().min(1).nullable().optional();

export const CreateTeamSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido"),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug no es válido"),
  leagueId: z.string().uuid("La liga no es válida"),
  logo: optionalNullableText,
  externalId: optionalNullableText,
});

export const UpdateTeamSchema = CreateTeamSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  "Debes enviar al menos un campo para actualizar",
);

export type CreateTeamInput = z.infer<typeof CreateTeamSchema>;
export type UpdateTeamInput = z.infer<typeof UpdateTeamSchema>;

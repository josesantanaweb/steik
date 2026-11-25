import { z } from "zod";

const optionalNullableText = z.string().trim().min(1).nullable().optional();

export const CreateLeagueSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido"),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "El slug no es válido"),
  country: optionalNullableText,
  logo: optionalNullableText,
  externalId: optionalNullableText,
});

export const UpdateLeagueSchema = CreateLeagueSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  "Debes enviar al menos un campo para actualizar",
);

export type CreateLeagueInput = z.infer<typeof CreateLeagueSchema>;
export type UpdateLeagueInput = z.infer<typeof UpdateLeagueSchema>;

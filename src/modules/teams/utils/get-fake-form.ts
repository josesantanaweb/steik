import { FormResult, type FormResult as Result } from "../types";

const FAKE_FORM_LENGTH = 5;

const hashSeed = (seed: string): number => {
  let hash = 2166136261;
  for (const char of seed) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0 || 1;
};

/**
 * Fake, deterministic form for UI development: the same seed always
 * yields the same results. Replace with real match data later.
 */
export const getFakeForm = (
  seed: string,
  length: number = FAKE_FORM_LENGTH,
): Result[] => {
  let state = hashSeed(seed);

  return Array.from({ length }, () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) % 2 === 0 ? FormResult.WIN : FormResult.LOSS;
  });
};

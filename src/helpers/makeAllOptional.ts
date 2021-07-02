import { ValidationChain } from "express-validator";

export function makeAllOptional(chain: ValidationChain[]): ValidationChain[] {
  return chain.map((c) => c.optional());
}

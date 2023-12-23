import crypto from "node:crypto";

/**
 * Generates a random universal unique identifier, *also known as* {@link crypto.UUID | UUID} (v4), and
 * returns it as a string.
 */
export async function generateRandomId(): Promise<string> {
  return await Promise.resolve(crypto.randomUUID());
}

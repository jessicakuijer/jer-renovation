/** Adresse destinataire obfusquée (XOR) — absente du HTML pour limiter le scraping. */
const ENCODED = [79, 94, 89, 4, 64, 79, 88, 79, 68, 69, 92, 75, 94, 67, 69, 68, 106, 77, 71, 75, 67, 70, 4, 73, 69, 71] as const
const KEY = 42

export function getContactRecipient(): string {
  return ENCODED.map((code) => String.fromCharCode(code ^ KEY)).join('')
}

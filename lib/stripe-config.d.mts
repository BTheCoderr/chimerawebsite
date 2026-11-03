export type StripeEnv = Record<string, string | undefined>;
export type ParsedCheckout = { variantCode: string; quantity: number; priceId: string };
export const PRICE_ENV_FOR_VARIANT: Readonly<Record<string, string>>;
export function getAllowedShippingCountries(env: StripeEnv): string[] | null;
export function isStripeCheckoutReady(env: StripeEnv): boolean;
export function parseCheckoutSelection(input: unknown, env: StripeEnv): ParsedCheckout | null;

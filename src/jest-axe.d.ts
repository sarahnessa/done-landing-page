declare module "jest-axe" {
  export function axe(element: Element): Promise<{ violations: unknown[] }>;
}

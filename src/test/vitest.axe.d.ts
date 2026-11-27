import type { AxeMatchers } from 'vitest-axe';

declare module 'vitest' {
  interface Assertion<T = unknown, R = unknown> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}

import type { Accessor, JSX } from 'solid-js';

import { AccessorArray } from 'solid-js/types/reactive/signal';

export type RerunProps<T> = {
  children: ((input: T, prevInput: T | undefined) => JSX.Element) | JSX.Element;
  on: T | Accessor<T> | AccessorArray<T>;
};

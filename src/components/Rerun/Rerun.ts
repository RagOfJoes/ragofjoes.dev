import { Accessor, createMemo, on } from 'solid-js';
import type { JSX } from 'solid-js';

import type { RerunProps } from './types';

const Rerun = <T>(props: RerunProps<T>): Accessor<JSX.Element> => {
  const key =
    typeof props.on === 'function' || Array.isArray(props.on)
      ? props.on
      : () => props.on;

  return createMemo(
    on(key as any, (a, b) => {
      const child = props.children;

      return typeof child === 'function' && child.length > 0
        ? (child as any)(a, b)
        : child;
    })
  );
};

export default Rerun;

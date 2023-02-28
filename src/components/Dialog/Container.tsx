import { mergeProps } from 'solid-js';

import { useDialogContext } from './Context';
import type { DialogContainerProps } from './types';

export function DialogContainer(props: DialogContainerProps) {
  const { api } = useDialogContext();

  const mergedProps = mergeProps(api().containerProps, props);

  return <div {...mergedProps} />;
}

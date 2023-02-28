import { mergeProps } from 'solid-js';

import { useDialogContext } from './Context';
import type { DialogTriggerProps } from './types';

export function DialogTrigger(props: DialogTriggerProps) {
  const { api } = useDialogContext();

  const mergedProps = mergeProps(props, api().triggerProps);

  return <button {...mergedProps} />;
}

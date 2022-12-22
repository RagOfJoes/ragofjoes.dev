import { mergeProps } from 'solid-js';

import { useDialogContext } from './Context';
import type { DialogTriggerProps } from './types';

const Trigger = (props: DialogTriggerProps) => {
  const { api } = useDialogContext();

  const mergedProps = mergeProps(props, api().triggerProps);

  return <button {...mergedProps} />;
};

export default Trigger;

import { mergeProps } from 'solid-js';

import { useDialogContext } from './Context';
import type { DialogContainerProps } from './types';

const Container = (props: DialogContainerProps) => {
  const { api } = useDialogContext();

  const mergedProps = mergeProps(api().containerProps, props);

  return <div {...mergedProps} />;
};

export default Container;

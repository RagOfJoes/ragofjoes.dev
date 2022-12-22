import { DialogProvider } from './Context';
import type { DialogProps } from './types';
import useDialog from './useDialog';

const Dialog = (props: DialogProps) => {
  const context = useDialog(props);

  return <DialogProvider value={context}>{props.children}</DialogProvider>;
};

export default Dialog;

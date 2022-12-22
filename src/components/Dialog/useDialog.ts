import { createEffect, createMemo, createUniqueId } from 'solid-js';

import * as dialog from '@zag-js/dialog';
import { normalizeProps, useMachine } from '@zag-js/solid';

import { DialogProps, UseDialog } from './types';

const useDialog = (props: DialogProps): UseDialog => {
  const { onClose = () => {}, onOpen = () => {} } = props;

  const [state, send] = useMachine(
    dialog.machine({
      closeOnEsc: true,
      closeOnOutsideClick: true,
      id: createUniqueId(),
      preventScroll: false,
    })
  );

  const api = createMemo(() => dialog.connect(state, send, normalizeProps));

  createEffect(() => {
    if (api().isOpen) {
      onOpen();
      return;
    }

    onClose();
  });

  return {
    api,
    dialogProps: props,
  };
};

export default useDialog;
